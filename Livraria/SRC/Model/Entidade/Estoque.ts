export class Estoque{

    id?: number
    quantidade : number;
    quantidade_emprestada : number;
    LivroID : number;
    disponivel : boolean;

    constructor(quantidade:number, quantidade_emprestada:number,LivroID:number,disponivel: boolean = true,id?: number){

        if (quantidade < 0) {
            throw new Error("Quantidade não pode ser negativa");
        }

        if (quantidade_emprestada < 0) {
            throw new Error("Quantidade emprestada não pode ser negativa");
        }

        if (quantidade_emprestada > quantidade) {
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total");
        }

        if (LivroID <= 0) {
            throw new Error("LivroID inválido");
        }
        
        this.quantidade = quantidade,
        this.quantidade_emprestada= quantidade_emprestada;
        this.LivroID = LivroID,
        this.disponivel = disponivel;
        this.id = id;
    }

}