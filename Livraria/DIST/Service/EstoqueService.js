"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../Model/Estoque");
const EstoqueRepository_1 = require("../Repository/EstoqueRepository");
const LivroRepository_1 = require("../Repository/LivroRepository");
const EmprestimoRepository_1 = require("../Repository/EmprestimoRepository");
class EstoqueService {
    EstoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    async cadastrarEstoque(EstoqueData) {
        const { quantidade, quantidade_emprestada, ISBN, disponivel } = EstoqueData;
        if (!ISBN === undefined) {
            throw new Error("Campos obrigatórios ausentes: ISBN do livro e código do exemplar");
        }
        const livro = await this.livroRepository.filtrarLivroPorISBN(ISBN);
        if (!livro) {
            throw new Error("Livro com o ISBN fornecido não encontrado");
        }
        const novoEstoque = new Estoque_1.Estoque(quantidade ?? 1, quantidade_emprestada ?? 0, livro.id, disponivel);
        await this.EstoqueRepository.cadastrarEstoque(novoEstoque);
        return novoEstoque;
    }
    async listarEstoqueDisponivel() {
        const todosEstoques = await this.EstoqueRepository.listarEstoqueDisponivel();
        return todosEstoques.filter(estoque => estoque.disponivel === true);
    }
    async ConsultarExemplarPorCodigo(Codigo) {
        return this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
    }
    async AtualizarDispoPorCodigo(Codigo, disponivel) {
        const exemplar = await this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
        if (!exemplar) {
            console.log("Exemplar não encontrado");
            return undefined;
        }
        exemplar.disponivel = disponivel;
        return await this.EstoqueRepository.atualizarDispoExemplarPorCodigo(Codigo, disponivel);
    }
    async RemoverExemplarPorCodigo(Codigo) {
        const exemplar = this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
        if (!exemplar) {
            return "Exemplar não encontrado";
        }
        const emprestimoAt = await this.emprestimoRepository.listarEmprestimos();
        const emprestimoAtivo = emprestimoAt.some(e => e.EstoqueID === Codigo && (!e.data_entrega || e.data_entrega.getTime?.() === 0));
        if (emprestimoAtivo) {
            return "Não é possível remover o exemplar, ele está emprestado";
        }
        const removido = await this.EstoqueRepository.removerUsuarioPorCodigo(Codigo);
        return removido ? "Exemplar removido com sucesso" : "Erro ao remover exemplar";
    }
}
exports.EstoqueService = EstoqueService;
