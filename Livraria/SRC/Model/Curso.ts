export class Curso {

    private static ultimoID : number = 0;

    id : number;
    nome : string;

    constructor(nome:string){

        this.nome = nome;
        this.id = ++Curso.ultimoID;
    }
}