import { CategoriaUsuario } from "../Model/CategoriaUsuario";
import { Curso } from "../Model/Curso";
import { Usuario } from "../Model/Usuario";
import { UsuarioRepository } from "../Repository/UsuarioRepositoty";


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

    CadastrarUsuario (UsuarioData:any) : UsuarioResposta {
        const {nome, cpf, CursoID, CatUsuID} = UsuarioData;
        if(!nome || !cpf || !CursoID || !CatUsuID){
            throw new Error ("Informações incompletas");
        }
        const novoUsuario = new Usuario (nome,cpf,CursoID,CatUsuID);
        this.UsuarioRepository.cadastrarUsuario(novoUsuario);
       
        const nomeCurso = Curso.buscarNomePorID(CursoID);
        const nomeCategoria = CategoriaUsuario.buscarNomePorID(CatUsuID);

        return {
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            cpf: novoUsuario.cpf,
            status: novoUsuario.status = "Ativo",
            curso: nomeCurso,
            categoria: nomeCategoria
        };
    }

    ConsultarUsuarios () : Usuario[]  {
        return this.UsuarioRepository.listarUsuarios();
    }

    ConsultarUsuarioPorCPF(CPF:any) : Usuario | undefined{
        return this.UsuarioRepository.filtrarUsuarioporCPF(CPF)
    }

    AtualizarUsuarioPorCPF(CPF:any, nome?:string, CursoID?:number, CatUsuID?:number): Usuario | undefined{
        
        const usuario = this.ConsultarUsuarioPorCPF(CPF)

        if (usuario){

            if(nome) {
                usuario.nome = nome;
            }

            if(CursoID){
                usuario.CursoID = CursoID;
            }

            if(CatUsuID){
                usuario.CatUsuID = CatUsuID;
            }

            return this.UsuarioRepository.atualizarUsuarioporCPF(usuario);
      }

      console.log("Usuário não encontrado");
      return undefined;
    }

    RemoverUsuarioPorCPF(CPF:string) :string{

            const usuario = this.UsuarioRepository.removerUsuarioporCPF(CPF);
    
            if (usuario) {
                return "Usuário removido com sucesso";
                
            } else {
                return "Usuário não encontrado";
            }
    }
}


