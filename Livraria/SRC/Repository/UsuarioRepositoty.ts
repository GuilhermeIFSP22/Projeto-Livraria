import { Usuario } from "../Model/Usuario";

export class UsuarioRepository{
    
    private static instance: UsuarioRepository | null = null;
    private ListaUsuarios: Usuario[] = [];

    private constructor() {}

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

      cadastrarUsuario (Usuario : Usuario){
        this.ListaUsuarios.push(Usuario);
      }
    
      listarUsuarios () : Usuario[] {
        return this.ListaUsuarios;
      }

      filtrarUsuarioporCPF (cpf:string) : Usuario | undefined {
        return this.ListaUsuarios.find (Usuario => Usuario.cpf === cpf);
      }

      atualizarUsuarioporCPF (cpf:string, nome?: string, CursoID?:number, CatUsuID?:number) : Usuario | undefined {

        const usuario = this.filtrarUsuarioporCPF(cpf);
        
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

            return usuario;
      }

      return undefined;
    }

    removerUsuarioporCPF(cpf: string): boolean {
        const index = this.ListaUsuarios.findIndex(usuario => usuario.cpf === cpf);
        if (index !== -1) {
          
          this.ListaUsuarios.splice(index, 1);
          return true;
        }
        return false;
      }
}