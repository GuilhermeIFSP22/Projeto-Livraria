import { Livro } from "./Livro";

export class Estoque{

    private static ultimoID : number = 0;

    id : number;
    quantidade : number;
    quantidade_emprestada : number;
    LivroID : number;

    constructor(quantidade:number, quantidade_emprestada:number,LivroID:number){
        this.quantidade = quantidade,
        this.quantidade_emprestada= quantidade_emprestada;
        this.LivroID = LivroID,
        this.id = Estoque.incrementarID();
    }

    private static incrementarID(): number {
        return ++Estoque.ultimoID;
    }

}