export class CategoriaLivro {

    private static ultimoID : number = 0;

    id : number;
    nome : string;
    static listaLivro: CategoriaLivro[] = [];

    constructor(nome:string){

        this.nome = nome;
        this.id = ++CategoriaLivro.ultimoID;
    }

    static inicializarCategoriaLivro() {
        CategoriaLivro.ultimoID = 0;
        CategoriaLivro.listaLivro = [
          new CategoriaLivro("Romance"),
          new CategoriaLivro("Computação"),
          new CategoriaLivro("Letras"),
          new CategoriaLivro("Gestão"),
        ];
    }
        static buscarNomePorID(id: number): string {
            const CatLivro = CategoriaLivro.listaLivro.find(usu => usu.id === id);
            return CatLivro ? CatLivro.nome : "Categoria de Livro não encontrada";
          }
}