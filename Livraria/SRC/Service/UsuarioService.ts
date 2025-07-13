import { CategoriaUsuario } from "../Model/CategoriaUsuario";
import { Curso } from "../Model/Curso";
import { Usuario } from "../Model/Usuario";
import { UsuarioRepository } from "../Repository/UsuarioRepository";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";

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

  async cadastrarUsuario(usuarioData: any): Promise<UsuarioResposta> {
    const { nome, cpf, CursoID, CatUsuID } = usuarioData;

    if (!nome || !cpf || !CursoID || !CatUsuID) {
      throw new Error("Informações incompletas");
    }

    const usuarioExistente = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
    if (usuarioExistente) {
      throw new Error("Já existe um usuário com este CPF");
    }

    const novoUsuario = new Usuario(nome, cpf, "ativo", CursoID, CatUsuID);
    const idGerado = await this.usuarioRepository.cadastrarUsuario(novoUsuario);
    novoUsuario.id = idGerado;

    return {
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      cpf: novoUsuario.cpf,
      status: novoUsuario.status,
      curso: novoUsuario.getNomeCurso(),
      categoria: novoUsuario.getNomeCategoria(),
    };
  }

  async consultarUsuarios(): Promise<UsuarioResposta[]> {
  const usuarios = await this.usuarioRepository.listarUsuarios();

  const usuariosInstanciados = usuarios.map(u => 
    new Usuario(u.nome, u.cpf, u.status, u.CursoID, u.CatUsuID, u.id)
  );

  return usuariosInstanciados.map(usuario => ({
    id: usuario.id!,
    nome: usuario.nome,
    cpf: usuario.cpf,
    status: usuario.status,
    curso: usuario.getNomeCurso(),
    categoria: usuario.getNomeCategoria(),
  }));
}

  async consultarUsuarioPorCPF(cpf: string): Promise<UsuarioResposta | undefined> {
  const u = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
  
  if (!u) return undefined;

  const usuario = new Usuario(u.nome, u.cpf, u.status, u.CursoID, u.CatUsuID, u.id);

  return {
    id: usuario.id!,
    nome: usuario.nome,
    cpf: usuario.cpf,
    status: usuario.status,
    curso: usuario.getNomeCurso(),
    categoria: usuario.getNomeCategoria(),
  };
}

  async atualizarUsuarioPorCPF(cpf: string, nome?: string, cursoNome?: string, categoriaNome?: string): Promise<UsuarioResposta | undefined> {
  const u = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
  
  if (!u) return undefined;

  if (nome) u.nome = nome;

  if (cursoNome) {
    const idCurso = Curso.buscarIDPorNome(cursoNome);
    if (!idCurso) throw new Error("Curso inválido ou inexistente");
    u.CursoID = idCurso;
  }

  if (categoriaNome) {
    const idCategoria = CategoriaUsuario.buscarIDPorNome(categoriaNome);
    if (!idCategoria) throw new Error("Categoria de usuário inválida ou inexistente");
    u.CatUsuID = idCategoria;
  }

  const atualizado = await this.usuarioRepository.atualizarUsuarioporCPF(u);
  if (!atualizado) throw new Error("Falha ao atualizar o usuário");

  const usuarioAtualizado = new Usuario(atualizado.nome, atualizado.cpf, atualizado.status, atualizado.CursoID, atualizado.CatUsuID, atualizado.id);

  return {
    id: usuarioAtualizado.id!,
    nome: usuarioAtualizado.nome,
    cpf: usuarioAtualizado.cpf,
    status: usuarioAtualizado.status,
    curso: usuarioAtualizado.getNomeCurso(),
    categoria: usuarioAtualizado.getNomeCategoria(),
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