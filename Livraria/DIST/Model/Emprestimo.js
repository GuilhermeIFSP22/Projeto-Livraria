"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    static ultimoID = 0;
    id;
    data_emprestimo;
    data_devolucao;
    data_entrega;
    dias_atraso;
    suspensao_ate;
    UsuarioID;
    EstoqueID;
    constructor(data_emprestimo, UsuarioID, EstoqueID) {
        if (!(data_emprestimo instanceof Date) || isNaN(data_emprestimo.getTime())) {
            throw new Error("Data de empréstimo inválida");
        }
        const hoje = new Date();
        if (data_emprestimo > hoje) {
            throw new Error("Data de empréstimo não pode ser futura");
        }
        if (!UsuarioID || UsuarioID <= 0) {
            throw new Error("ID do usuário inválido");
        }
        if (!EstoqueID || EstoqueID <= 0) {
            throw new Error("ID do exemplar inválido");
        }
        this.data_emprestimo = data_emprestimo;
        this.id = Emprestimo.incrementarID();
        this.UsuarioID = UsuarioID;
        this.EstoqueID = EstoqueID;
        this.data_devolucao = new Date(0);
        this.data_entrega = new Date(0);
        this.dias_atraso = 0;
        this.suspensao_ate = new Date(0);
    }
    static incrementarID() {
        return ++Emprestimo.ultimoID;
    }
}
exports.Emprestimo = Emprestimo;
