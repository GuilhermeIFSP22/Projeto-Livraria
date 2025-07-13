"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    ListaEmprestimos = [];
    constructor() { }
    static getInstance() {
        if (!EmprestimoRepository.instance) {
            EmprestimoRepository.instance = new EmprestimoRepository();
        }
        return EmprestimoRepository.instance;
    }
    RegistrarEmprestimo(emprestimo) {
        this.ListaEmprestimos.push(emprestimo);
    }
    listarEmprestimos() {
        return this.ListaEmprestimos;
    }
    registrarDevolucao(idEmprestimo, dataEntrega) {
        const emprestimo = this.ListaEmprestimos.find(e => e.id === idEmprestimo);
        if (!emprestimo)
            return undefined;
        if (isNaN(dataEntrega.getTime())) {
            throw new Error("Data de entrega inválida");
        }
        emprestimo.data_entrega = dataEntrega;
        return emprestimo;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
