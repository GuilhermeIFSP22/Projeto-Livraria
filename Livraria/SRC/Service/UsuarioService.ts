import { Usuario } from "../Model/Entidade/Usuario";
import { UsuarioRepository } from "../Repository/UsuarioRepository";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";
import { CursoRepository } from "../Repository/CursoRepository";
import { CatUsuarioRepository } from "../Repository/CatUsuarioRepository";

interface UsuarioResposta {
  id: number;
  nome: string;
  cpf: string;
  status: string;
  curso: string;
  categoria: string;
}

export class UsuarioService {
  private usuarioRepository = UsuarioRepository.getInstance();
  private emprestimoRepository = EmprestimoRepository.getInstance();
  private cursoRepository = CursoRepository.getInstance();
  private catUsuarioRepository: CatUsuarioRepository = CatUsuarioRepository.getInstance();

  async cadastrarUsuario(usuarioData: any): Promise<UsuarioResposta> {
    const { nome, cpf, CursoID, CatUsuID } = usuarioData;

    if (!nome || !cpf || !CursoID || !CatUsuID) {
      throw new Error("Informações incompletas");
    }

    const usuarioExistente = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
    if (usuarioExistente) {
      throw new Error("Já existe um usuário com este CPF");
    }
    const curso = await this.cursoRepository.buscarCursoPorID(CursoID);
    if (!curso) throw new Error("Curso inválido ou inexistente");

    const categoria = await this.catUsuarioRepository.buscarCategoriaPorID(CatUsuID);
    if (!categoria) throw new Error("Categoria inválida ou inexistente");

    const novoUsuario = new Usuario(nome, cpf, "ativo", CursoID, CatUsuID);
    const idGerado = await this.usuarioRepository.cadastrarUsuario(novoUsuario);
    novoUsuario.id = idGerado;

    return {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      cpf: novoUsuario.cpf,
      status: novoUsuario.status,
      curso: curso.nome,
      categoria: categoria.nome,
    };
  }

  async consultarUsuarios(): Promise<UsuarioResposta[]> {
  const usuarios = await this.usuarioRepository.listarUsuarios();

  const usuariosInstanciados = usuarios.map(u =>
    new Usuario(u.nome, u.cpf, u.status, u.CursoID, u.CatUsuID, u.id)
  );

  return Promise.all(
    usuariosInstanciados.map(async (usuario) => {
      const curso = await this.cursoRepository.buscarCursoPorID(usuario.CursoID);
      const categoria = await this.catUsuarioRepository.buscarCategoriaPorID(usuario.CatUsuID);

      return {
        id: usuario.id!,
        nome: usuario.nome,
        cpf: usuario.cpf,
        status: usuario.status,
        curso: curso?.nome ?? "Curso não encontrado",
        categoria: categoria?.nome ?? "Categoria não encontrada",
      };
    })
  );
}

  async consultarUsuarioPorCPF(cpf: string): Promise<UsuarioResposta | undefined> {
  const u = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
  
  if (!u) return undefined;

  const curso = await this.cursoRepository.buscarCursoPorID(u.CursoID);

  const categoria = await this.catUsuarioRepository.buscarCategoriaPorID(u.CatUsuID);

  return {
    id: u.id!,
    nome: u.nome,
    cpf: u.cpf,
    status: u.status,
    curso: curso?.nome ?? "Curso não encontrado",
    categoria: categoria?.nome ?? "Categoria não encontrada",
  };
}

  async atualizarUsuarioPorCPF(cpf: string, nome?: string, cursoNome?: string, categoriaNome?: string): Promise<UsuarioResposta | undefined> {
  const usuarioAtualizado = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
  
  if (!usuarioAtualizado) return undefined;

  if (nome) usuarioAtualizado.nome = nome;

  if (cursoNome) {
    const curso = await this.cursoRepository.buscarCursoPorNome(cursoNome);
      if (!curso) throw new Error("Curso inválido ou inexistente");
    usuarioAtualizado.CursoID = curso.id;
  }

  if (categoriaNome) {
    const Categoria = await this.catUsuarioRepository.buscarCategoriaPorNome(categoriaNome);
    if (!Categoria) throw new Error("Categoria de usuário inválida ou inexistente");
    usuarioAtualizado.CatUsuID = Categoria.id;
  }

  const atualizado = await this.usuarioRepository.atualizarUsuarioporCPF(usuarioAtualizado);
  if (!atualizado) throw new Error("Falha ao atualizar o usuário");

   const cursoAtualizado = await this.cursoRepository.buscarCursoPorID(usuarioAtualizado.CursoID);
   const categoriaAtualizada = await this.catUsuarioRepository.buscarCategoriaPorID(usuarioAtualizado.CatUsuID);

  return {
    id: usuarioAtualizado.id!,
    nome: usuarioAtualizado.nome,
    cpf: usuarioAtualizado.cpf,
    status: usuarioAtualizado.status,
    curso: cursoAtualizado?.nome ?? "Curso não encontrado",
    categoria: categoriaAtualizada?.nome ?? "Categoria não encontrada",
  };
}

  async removerUsuarioPorCPF(cpf: string): Promise<string> {
    const usuario = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
    if (!usuario) return "Usuário não encontrado";

    const emprestimos = await this.emprestimoRepository.listarEmprestimos();
    const emprestimosAtivos = emprestimos.filter(e => e.UsuarioID === usuario.id && e.data_entrega.getTime() === 0);

    if (emprestimosAtivos.length > 0) {
      return "Usuário possui empréstimos ativos e não pode ser removido";
    }

    const removido = await this.usuarioRepository.removerUsuarioporCPF(cpf);
    return removido ? "Usuário removido com sucesso" : "Falha ao remover usuário";
  }
}