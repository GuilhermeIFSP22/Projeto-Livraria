import { CategoriaLivro } from "./CategoriaLivro";

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
}