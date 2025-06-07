import { Usuario } from "../Model/Usuario";
import { UsuarioRepository } from "../Repository/UsuarioRepositoty";

export class UsuarioService{

    UsuarioRepository : UsuarioRepository = UsuarioRepository.getInstance();

    CadastrarUsuario (UsuarioData:any) : Usuario {
        const {nome, cpf, status, CursoID, CatUsuID} = UsuarioData;
        if(!nome || !cpf || !status || !CursoID || !CatUsuID){
            throw new Error ("Informações incompletas");
        }
        const novoUsuario = new Usuario (nome,cpf,status,CursoID,CatUsuID);
        this.UsuarioRepository.cadastrarUsuario(novoUsuario);
        return novoUsuario;
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


