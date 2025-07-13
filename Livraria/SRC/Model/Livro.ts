import { CategoriaLivro } from "./CategoriaLivro";

CategoriaLivro.inicializarCategoriaLivro();

export class Livro{

    private static ultimoID : number = 0;

    id : number;
    titulo : string;
    autor : string;
    editora : string;
    edicao : string;
    isbn : string;
    CategoriaID : number;

    constructor(titulo:string, autor:string,editora:string,edicao:string,isbn:string,CategoriaID:number){

        if(!titulo || !autor || !editora || !edicao || !isbn || !CategoriaID){
                throw new Error ("Informações incompletas");
            }

        const nomeCategoria = CategoriaLivro.buscarNomePorID(CategoriaID);
            if (!nomeCategoria) {
                throw new Error("Categoria inválida.");
            }

        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.CategoriaID = CategoriaID;
        this.id = Livro.incrementarID();
    }

    private static incrementarID(): number {
        return ++Livro.ultimoID;
    }

    getNomeCategoriaLivro(): string {
            return CategoriaLivro.buscarNomePorID(this.CategoriaID);
          }

}