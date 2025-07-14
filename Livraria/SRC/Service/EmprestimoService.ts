import { Emprestimo } from "../Model/Entidade/Emprestimo";
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

  async listarEmprestimos(): Promise<Emprestimo[]> {
    return await this.emprestimoRepository.listarEmprestimos();
  }

  async registrarEmprestimo(data_emprestimo: Date, CPF: string, UsuarioID: number, EstoqueID: number): Promise<Emprestimo> {
    const usuario = await this.usuarioRepository.filtrarUsuarioporCPF(CPF);
    if (!usuario) throw new Error("Usuário não encontrado.");

    const exemplar = await this.estoqueRepository.filtrarExemplarPorCodigo(EstoqueID);
    if (!exemplar) throw new Error("Exemplar não encontrado.");
    if (!exemplar.disponivel) throw new Error("Este exemplar não está disponível para empréstimo.");

    const hoje = new Date();
    const emprestimos = await this.emprestimoRepository.listarEmprestimos();
    const emprestimosSuspensos = emprestimos.filter(e =>
      e.UsuarioID === usuario.id && e.suspensao_ate && e.suspensao_ate > hoje
    );

    if (emprestimosSuspensos.length > 0)
      throw new Error(`Usuário está suspenso até ${emprestimosSuspensos[0].suspensao_ate.toLocaleDateString()}.`);

    if (usuario.status !== "ativo") throw new Error("Usuário não está ativo para realizar empréstimos.");

    const emprestimosAtivos = emprestimos.filter(e => e.UsuarioID === UsuarioID && e.data_devolucao.getTime() === 0);
    const catUsuario = await this.catUsuarioRepository.buscarCategoriaPorID(usuario.CatUsuID);
    const categoria = catUsuario?.nome.toLowerCase() ?? "";
    const limite = categoria === "professor" ? 5 : 3;
    if (emprestimosAtivos.length >= limite) throw new Error("Usuário atingiu o limite de livros emprestados.");

    const livro = await this.livroRepository.filtrarLivroPorID(exemplar.LivroID);
    const curso = await this.cursoRepository.buscarCursoPorID(usuario.CursoID);
    const catLivro = await this.CatLivroRepository.buscarCatLivroPorID(livro!.CategoriaID);

    let prazoDias = 15;
    if (categoria === "professor") {
      prazoDias = 40;
    } else if (categoria === "aluno") {
      const cursoNome = curso?.nome.toLowerCase();
      const catLivroNome = catLivro?.nome.toLowerCase();
      prazoDias = cursoNome === catLivroNome ? 30 : 15;
    }

    const data_devolucao = new Date(data_emprestimo);
    data_devolucao.setDate(data_emprestimo.getDate() + prazoDias);

    const novoEmprestimo = new Emprestimo(data_emprestimo, UsuarioID, EstoqueID);
    novoEmprestimo.data_devolucao = data_devolucao;

    await this.emprestimoRepository.registrarEmprestimo(novoEmprestimo);
    return novoEmprestimo;
}

  async registrarDevolucao(idEmprestimo: number, dataEntrega: Date): Promise<Emprestimo | undefined> {
  
    return await this.emprestimoRepository.registrarDevolucao(idEmprestimo, dataEntrega);
  }
}

