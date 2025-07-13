import { Emprestimo } from "../Model/Emprestimo";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";
import { UsuarioRepository } from "../Repository/UsuarioRepository";
import { EstoqueRepository } from "../Repository/EstoqueRepository";
import { LivroRepository } from "../Repository/LivroRepository";
import { CursoRepository } from "../Repository/CursoRepository";
import { CatUsuarioRepository } from "../Repository/CatUsuarioRepository";
import { CatLivroRepository } from "../Repository/CatLivroRepository";

enum StatusUsuario {
  Ativo = "ativo",
  Suspenso = "suspenso",
  Inativo = "inativo"
}

export class EmprestimoService {
  private emprestimoRepository = EmprestimoRepository.getInstance();
  private usuarioRepository = UsuarioRepository.getInstance();
  private estoqueRepository = EstoqueRepository.getInstance();
  private livroRepository = LivroRepository.getInstance();
  private cursoRepository = CursoRepository.getInstance();
  private catUsuarioRepository: CatUsuarioRepository = CatUsuarioRepository.getInstance();
  private CatLivroRepository = CatLivroRepository.getInstance();

  listarEmprestimos(): Emprestimo[] {
    return this.emprestimoRepository.listarEmprestimos();
  }

  async registrarEmprestimo(data_emprestimo: Date, CPF: string, UsuarioID: number, EstoqueID: number): Promise<Emprestimo> {
    const usuario = await this.usuarioRepository.filtrarUsuarioporCPF(CPF);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const exemplar = this.estoqueRepository.filtrarExemplarPorCodigo(EstoqueID);
    if (!exemplar) {
      throw new Error("Exemplar não encontrado.");
    }
    if (!exemplar.disponivel) {
      throw new Error("Este exemplar não está disponível para empréstimo.");
    }

    const hoje = new Date();
    const emprestimosSuspensos = this.emprestimoRepository.listarEmprestimos()
      .filter(e => e.UsuarioID === usuario.id && e.suspensao_ate && e.suspensao_ate > hoje);

    if (emprestimosSuspensos.length > 0) {
      throw new Error(`Usuário está suspenso até ${emprestimosSuspensos[0].suspensao_ate.toLocaleDateString()} e não pode realizar empréstimos.`);
    }

    if (usuario.status !== "ativo") {
      throw new Error("Usuário não está ativo para realizar empréstimos.");
    }

    const emprestimoExistente = this.emprestimoRepository.listarEmprestimos()
      .find(e => e.EstoqueID === EstoqueID && e.data_entrega.getTime() === 0);

    if (emprestimoExistente) {
      throw new Error("Este exemplar já está emprestado.");
    }

    const emprestimosAtivos = this.emprestimoRepository.listarEmprestimos()
      .filter(e => e.UsuarioID === UsuarioID && e.data_entrega.getTime() === 0);

    const catUsuario= await this.catUsuarioRepository.buscarCategoriaPorID(usuario.CatUsuID);
    const categoria = catUsuario?.nome.toLowerCase() ?? "";
    const limite = categoria === "professor" ? 5 : 3;

    if (emprestimosAtivos.length >= limite) {
      throw new Error("Usuário atingiu o limite de livros emprestados.");
    }

    const novoEmprestimo = new Emprestimo(data_emprestimo, UsuarioID, EstoqueID);
    this.emprestimoRepository.RegistrarEmprestimo(novoEmprestimo);
    return novoEmprestimo;
  }

  async registrarDevolucao(idEmprestimo: number, dataEntrega: Date): Promise<Emprestimo | undefined> {
    const emprestimo = this.emprestimoRepository.registrarDevolucao(idEmprestimo, dataEntrega);
    if (!emprestimo) return undefined;

    const usuario = await this.usuarioRepository.filtrarUsuarioporCPF(String(emprestimo.UsuarioID));
    const estoque = this.estoqueRepository.filtrarExemplarPorCodigo(emprestimo.EstoqueID);
    if (!usuario || !estoque) return undefined;

     const catUsuario = await this.catUsuarioRepository.buscarCategoriaPorID(usuario.CatUsuID);
    const categoria = catUsuario?.nome.toLowerCase() ?? "";
    
    let diasPrazo = 0;

    if (categoria === "professor") {
      diasPrazo = 40;
    } else {
      const livros = await this.livroRepository.listarLivros({ id: estoque.LivroID });
      const livro = livros[0];
      if (!livro) return undefined;

      const curso = await this.cursoRepository.buscarCursoPorID(usuario.CursoID);
      if (!curso) throw new Error("Curso não encontrado");
      const cursoCategoria = curso.nome.toLowerCase();

       const liv = await this.CatLivroRepository.buscarCatLivroPorID(livro.CategoriaID);
      const LivroCat = liv?.nome.toLowerCase() ?? "";

      diasPrazo = cursoCategoria === LivroCat ? 30 : 15;
    }

    const dataLimite = new Date(emprestimo.data_emprestimo);
    dataLimite.setDate(dataLimite.getDate() + diasPrazo);

    if (dataEntrega > dataLimite) {
      const diasAtraso = Math.ceil((dataEntrega.getTime() - dataLimite.getTime()) / (1000 * 3600 * 24));
      emprestimo.dias_atraso = diasAtraso;

      const diasSuspensao = diasAtraso * 3;
      const dataSuspensao = new Date(dataEntrega);
      dataSuspensao.setDate(dataEntrega.getDate() + diasSuspensao);
      emprestimo.suspensao_ate = dataSuspensao;
    } else {
      emprestimo.dias_atraso = 0;
      emprestimo.suspensao_ate = new Date(0);
    }
    return emprestimo;
  }
}

