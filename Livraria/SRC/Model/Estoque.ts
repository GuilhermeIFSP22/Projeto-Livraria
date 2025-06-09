import { Livro } from "./Livro";

export class Estoque{

    private static ultimoID : number = 0;

    id : number;
    quantidade : number;
    quantidade_emprestada : number;
    Codigo : number;
    LivroID : number;
    disponivel : boolean;

    constructor(quantidade:number, quantidade_emprestada:number,Codigo:number,LivroID:number){
        this.quantidade = quantidade,
        this.quantidade_emprestada= quantidade_emprestada;
        this.Codigo = Codigo;
        this.LivroID = LivroID,
        this.id = Estoque.incrementarID();
        this.disponivel = true;
    }

    private static incrementarID(): number {
        return ++Estoque.ultimoID;
    }

}