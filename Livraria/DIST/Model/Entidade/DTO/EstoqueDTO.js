"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueDTO = void 0;
class EstoqueDTO {
    id;
    quantidade;
    quantidade_emprestada;
    LivroID;
    disponivel;
    constructor(quantidade, quantidade_emprestada, LivroID, disponivel = true, id) {
        if (quantidade === undefined ||
            quantidade_emprestada === undefined ||
            LivroID === undefined) {
            throw new Error("Informações incompletas para o cadastro do estoque.");
        }
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
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.LivroID = LivroID;
        this.disponivel = disponivel;
        if (id !== undefined) {
            this.id = id;
        }
    }
}
exports.EstoqueDTO = EstoqueDTO;
