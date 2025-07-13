"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    static ultimoID = 0;
    id;
    quantidade;
    quantidade_emprestada;
    Codigo;
    LivroID;
    disponivel;
    constructor(quantidade, quantidade_emprestada, Codigo, LivroID) {
        if (quantidade < 0) {
            throw new Error("Quantidade não pode ser negativa");
        }
        if (quantidade_emprestada < 0) {
            throw new Error("Quantidade emprestada não pode ser negativa");
        }
        if (quantidade_emprestada > quantidade) {
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total");
        }
        if (Codigo <= 0) {
            throw new Error("Código do exemplar deve ser maior que zero");
        }
        if (LivroID <= 0) {
            throw new Error("LivroID inválido");
        }
        this.quantidade = quantidade,
            this.quantidade_emprestada = quantidade_emprestada;
        this.Codigo = Codigo;
        this.LivroID = LivroID,
            this.id = Estoque.incrementarID();
        this.disponivel = true;
    }
    static incrementarID() {
        return ++Estoque.ultimoID;
    }
}
exports.Estoque = Estoque;
