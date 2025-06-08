import { Emprestimo } from "../Model/Emprestimo";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";
import { UsuarioRepository } from "../Repository/UsuarioRepository";
import { EstoqueRepository } from "../Repository/EstoqueRepository";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { LivroRepository } from "../Repository/LivroRepository";
import { Curso } from "../Model/Curso";

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

  listarEmprestimos(): Emprestimo[] {
    return this.emprestimoRepository.listarEmprestimos();
  }

  registrarEmprestimo(data_emprestimo: Date,CPF:string, UsuarioID: number, EstoqueID: number): Emprestimo {
    const usuario = this.usuarioRepository.filtrarUsuarioporCPF(CPF)
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

    const categoria = usuario.getNomeCategoria(); // "aluno" ou "professor"
    const limite = categoria === "professor" ? 5 : 3;

    if (emprestimosAtivos.length >= limite) {
      throw new Error("Usuário atingiu o limite de livros emprestados.");
    }

    const novoEmprestimo = new Emprestimo(data_emprestimo, UsuarioID, EstoqueID);
    this.emprestimoRepository.RegistrarEmprestimo(novoEmprestimo);
    return novoEmprestimo;
  }

  registrarDevolucao(idEmprestimo: number, dataEntrega: Date): Emprestimo | undefined {
    const emprestimo = this.emprestimoRepository.registrarDevolucao(idEmprestimo, dataEntrega);
    if (!emprestimo) return undefined;

    const usuario = this.usuarioRepository.filtrarUsuarioporCPF(String(emprestimo.UsuarioID));
    const estoque = this.estoqueRepository.filtrarExemplarPorCodigo(emprestimo.EstoqueID);
    if (!usuario || !estoque) return undefined;

    const categoria = usuario.getNomeCategoria(); // "professor" ou "aluno"
    let diasPrazo = 0;
4
    if (categoria === "professor") {
      diasPrazo = 40;
    } else {
      
    const livro = this.livroRepository.listarLivros({ id: estoque.LivroID })[0]; // ✅ Busca livro pelo ID
    if (!livro) return undefined;

    const cursoCategoria = Curso.buscarNomePorID(usuario.CursoID).toLowerCase();
    const livroCategoria = CategoriaLivro.buscarNomePorID(livro.CategoriaID).toLowerCase(); // ✅ Corrigido aqui

    diasPrazo = cursoCategoria === livroCategoria ? 30 : 15;
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

      if (diasSuspensao > 60) usuario.status = "suspenso";

      const atrasos = this.emprestimoRepository.listarEmprestimos()
        .filter(e => e.UsuarioID === usuario.id && e.dias_atraso > 0);

      if (atrasos.length > 2) {
        usuario.status = "inativo";
      }

      this.usuarioRepository.atualizarUsuarioporCPF(usuario);
    } else {
      emprestimo.dias_atraso = 0;
      emprestimo.suspensao_ate = new Date(0);
    }

    return emprestimo;
  }
}

