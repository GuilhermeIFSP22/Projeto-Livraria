"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    static instance = null;
    ListaEstoque = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    cadastrarEstoque(Estoque) {
        this.ListaEstoque.push(Estoque);
    }
    listarEstoqueDisponivel() {
        return this.ListaEstoque;
    }
    filtrarExemplarPorCodigo(CodigoExemplar) {
        return this.ListaEstoque.find(Estoque => Estoque.Codigo === CodigoExemplar);
    }
    atualizarDispoExemplarPorCodigo(CodigoExemplar, disponivel) {
        const index = this.ListaEstoque.findIndex(Estoque => Estoque.Codigo === CodigoExemplar);
        if (index !== -1) {
            this.ListaEstoque[index].disponivel = disponivel;
            return this.ListaEstoque[index];
        }
        return undefined;
    }
    removerUsuarioPorCodigo(CodigoExemplar) {
        const index = this.ListaEstoque.findIndex(Estoque => Estoque.Codigo === CodigoExemplar);
        if (index !== -1) {
            this.ListaEstoque.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.EstoqueRepository = EstoqueRepository;
