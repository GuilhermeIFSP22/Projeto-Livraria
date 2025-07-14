export class Livro{

    id : number;
    titulo : string;
    autor : string;
    editora : string;
    edicao : string;
    isbn : string;
    CategoriaID : number;

    constructor(titulo:string, autor:string,editora:string,edicao:string,isbn:string,CategoriaID:number,id:number){

        if(!titulo || !autor || !editora || !edicao || !isbn || !CategoriaID){
                throw new Error ("Informações incompletas");
            }

        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.CategoriaID = CategoriaID;
        this.id = id;
    }
}