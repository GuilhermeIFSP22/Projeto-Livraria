import { CategoriaUsuario } from "../Model/CategoriaUsuario";
import { Curso } from "../Model/Curso";
import { Usuario } from "../Model/Usuario";
import { UsuarioRepository } from "../Repository/UsuarioRepository";
import { validarCPF } from "../untils/ValidarCPF";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";

type UsuarioResposta = {
    id: number;
    nome: string;
    cpf: string;
    status: string;
    curso: string;
    categoria: String;
};

export class UsuarioService{

    UsuarioRepository : UsuarioRepository = UsuarioRepository.getInstance();
    EmprestimoRepository : EmprestimoRepository = EmprestimoRepository.getInstance();

    CadastrarUsuario (UsuarioData:any) : UsuarioResposta {
        const {nome, cpf, CursoID, CatUsuID} = UsuarioData;
        if(!nome || !cpf || !CursoID || !CatUsuID){
            throw new Error ("Informações incompletas");
        }

        if (!validarCPF(cpf)) {
        throw new Error("CPF inválido");
        }

        const usuarioExistente = this.UsuarioRepository.filtrarUsuarioporCPF(cpf);
        if (usuarioExistente) {
        throw new Error("Já existe um usuário com este CPF");
        }

        const nomeCurso = Curso.buscarNomePorID(CursoID);
        if (!nomeCurso) {
            throw new Error("Curso inválido ou inexistente");
        }

        const nomeCategoria = CategoriaUsuario.buscarNomePorID(CatUsuID);
        if (!nomeCategoria) {
            throw new Error("Categoria de usuário inválida ou inexistente");
        }

        const novoUsuario = new Usuario (nome,cpf,"ativo",CursoID,CatUsuID);
        this.UsuarioRepository.cadastrarUsuario(novoUsuario);
       
        return {
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            cpf: novoUsuario.cpf,
            status: novoUsuario.status,
            curso: nomeCurso,
            categoria: nomeCategoria
        };
    }

    ConsultarUsuarios () : any[]  {
        const usuarios = this.UsuarioRepository.listarUsuarios();
        
        return usuarios.map(usuario =>{
            
              const nomeCurso = Curso.buscarNomePorID(usuario.CursoID);
              const nomeCategoria = CategoriaUsuario.buscarNomePorID(usuario.CatUsuID);
          
              return {
                id: usuario.id,
                nome: usuario.nome,
                cpf: usuario.cpf,
                status: usuario.status,
                curso: nomeCurso,
                categoria: nomeCategoria
              };
            });
          }

          ConsultarUsuarioPorCPF(CPF: any): any | undefined {
            const usuario = this.UsuarioRepository.filtrarUsuarioporCPF(CPF);
          
            if (!usuario) return undefined;
          
            const nomeCurso = Curso.buscarNomePorID(usuario.CursoID);
            const nomeCategoria = CategoriaUsuario.buscarNomePorID(usuario.CatUsuID);
          
            return {
              id: usuario.id,
              nome: usuario.nome,
              cpf: usuario.cpf,
              status: usuario.status,
              curso: nomeCurso,
              categoria: nomeCategoria
            };
          }

    AtualizarUsuarioPorCPF(CPF: any, nome?: string, cursoNome?: string, categoriaNome?: string): UsuarioResposta | undefined {
        const usuario = this.UsuarioRepository.filtrarUsuarioporCPF(CPF);

        if (!usuario) {
            console.log("Usuário não encontrado");
            return undefined;
        }

        if (nome) {
            usuario.nome = nome;
        }

        if (cursoNome) {
            const idCurso = Curso.buscarIDPorNome(cursoNome);
            if (!idCurso) throw new Error("Curso inválido ou inexistente");
            usuario.CursoID = idCurso;
        }

        if (categoriaNome) {
            const idCategoria = CategoriaUsuario.buscarIDPorNome(categoriaNome);
            if (!idCategoria) throw new Error("Categoria de usuário inválida ou inexistente");
            usuario.CatUsuID = idCategoria;
        }

        const atualizado = this.UsuarioRepository.atualizarUsuarioporCPF(usuario);

        if (!atualizado) {
        throw new Error("Falha ao atualizar o usuário");
}
        const nomeCurso = Curso.buscarNomePorID(atualizado.CursoID);
        const nomeCategoria = CategoriaUsuario.buscarNomePorID(atualizado.CatUsuID);

        return {
            id: atualizado.id,
            nome: atualizado.nome,
            cpf: atualizado.cpf,
            status: atualizado.status,
            curso: nomeCurso,
            categoria: nomeCategoria
        };
}

   RemoverUsuarioPorCPF(CPF: string): string {
        const usuario = this.UsuarioRepository.filtrarUsuarioporCPF(CPF);

        if (!usuario) {
            return "Usuário não encontrado";
        }

        const emprestimosAtivos = this.EmprestimoRepository.listarEmprestimos()
            .filter(e => e.UsuarioID === usuario.id && e.data_entrega.getTime() === 0);

        if (emprestimosAtivos.length > 0) {
            return "Usuário possui empréstimos ativos e não pode ser removido";
        }

        const removido = this.UsuarioRepository.removerUsuarioporCPF(CPF);

        if (removido) {
            return "Usuário removido com sucesso";
        } else {
            return "Falha ao remover usuário";
        }
    }
}


