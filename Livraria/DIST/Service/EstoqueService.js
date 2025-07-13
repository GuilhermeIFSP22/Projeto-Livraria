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
    cadastrarEstoque(EstoqueData) {
        const { quantidade, quantidade_emprestada, Codigo, ISBN, disponivel } = EstoqueData;
        if (!ISBN || Codigo === undefined) {
            throw new Error("Campos obrigatórios ausentes: ISBN do livro e código do exemplar");
        }
        const livro = this.livroRepository.filtrarLivroPorISBN(ISBN);
        if (!livro) {
            throw new Error("Livro com o ISBN fornecido não encontrado");
        }
        const exemplarExistente = this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
        if (exemplarExistente) {
            throw new Error("Já existe um exemplar com esse código");
        }
        const novoEstoque = new Estoque_1.Estoque(quantidade ?? 1, quantidade_emprestada ?? 0, Codigo, livro.id);
        novoEstoque.disponivel = disponivel ?? true;
        this.EstoqueRepository.cadastrarEstoque(novoEstoque);
        return novoEstoque;
    }
    listarEstoqueDisponivel() {
        const todosEstoques = this.EstoqueRepository.listarEstoqueDisponivel();
        return todosEstoques.filter(estoque => estoque.disponivel === true);
    }
    ConsultarExemplarPorCodigo(Codigo) {
        return this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
    }
    AtualizarDispoPorCodigo(Codigo, disponivel) {
        const exemplar = this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
        if (!exemplar) {
            console.log("Exemplar não encontrado");
            return undefined;
        }
        exemplar.disponivel = disponivel;
        return this.EstoqueRepository.atualizarDispoExemplarPorCodigo(Codigo, disponivel);
    }
    RemoverExemplarPorCodigo(Codigo) {
        const exemplar = this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
        if (!exemplar) {
            return "Exemplar não encontrado";
        }
        const emprestimoAtivo = this.emprestimoRepository.listarEmprestimos()
            .some(e => e.EstoqueID === Codigo &&
            (!e.data_entrega || e.data_entrega.getTime?.() === 0));
        if (emprestimoAtivo) {
            return "Não é possível remover o exemplar, ele está emprestado";
        }
        const removido = this.EstoqueRepository.removerUsuarioPorCodigo(Codigo);
        return removido ? "Exemplar removido com sucesso" : "Erro ao remover exemplar";
    }
}
exports.EstoqueService = EstoqueService;
