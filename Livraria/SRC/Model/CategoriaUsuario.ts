export class CategoriaUsuario {

    private static ultimoID : number = 0;

    id : number;
    nome : string;
    static listaCatUsu: CategoriaUsuario[] = [];

    constructor(nome:string){

        this.nome = nome;
        this.id = ++CategoriaUsuario.ultimoID;
    }

    static inicializarCategoriaUsuario() {
        
        CategoriaUsuario.ultimoID = 0;
        CategoriaUsuario.listaCatUsu = [
          new CategoriaUsuario("Professor"),
          new CategoriaUsuario("Aluno"),
          new CategoriaUsuario("Bibliotecário"),
        ];
    }
        static buscarNomePorID(id: number): string {
            const CatUsu = CategoriaUsuario.listaCatUsu.find(usu => usu.id === id);
            return CatUsu ? CatUsu.nome : "Categoria de Usuário não encontrada";
          }
}
