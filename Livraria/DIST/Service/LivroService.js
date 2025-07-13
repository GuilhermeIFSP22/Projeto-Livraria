"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../Model/Livro");
const LivroRepository_1 = require("../Repository/LivroRepository");
const CategoriaLivro_1 = require("../Model/CategoriaLivro");
const EstoqueRepository_1 = require("../Repository/EstoqueRepository");
const EmprestimoRepository_1 = require("../Repository/EmprestimoRepository");
class LivroService {
    LivroRepository = LivroRepository_1.LivroRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    cadastrarLivro(LivroData) {
        const { titulo, autor, editora, edicao, isbn, categoria } = LivroData;
        const livrosExistentes = this.LivroRepository.listarLivros();
        const livroDuplicado = livrosExistentes.find(l => l.autor === autor && l.editora === editora && l.edicao === edicao);
        if (livroDuplicado) {
            throw new Error("Já existe um livro cadastrado com essa combinação de autor, editora e edição.");
        }
        const novoLivro = new Livro_1.Livro(titulo, autor, editora, edicao, isbn, categoria);
        this.LivroRepository.cadastrarLivro(novoLivro);
        const CatLivro = CategoriaLivro_1.CategoriaLivro.buscarNomePorID(categoria);
        return {
            id: novoLivro.id,
            titulo: novoLivro.titulo,
            autor: novoLivro.autor,
            editora: novoLivro.editora,
            edicao: novoLivro.edicao,
            isbn: novoLivro.isbn,
            categoria: CatLivro
        };
    }
    listarLivros(filtros = {}) {
        const Livro = this.LivroRepository.listarLivros(filtros);
        return Livro.map(livro => {
            const nomeCategoria = CategoriaLivro_1.CategoriaLivro.buscarNomePorID(livro.CategoriaID);
            return {
                id: livro.id,
                titulo: livro.titulo,
                autor: livro.autor,
                editora: livro.editora,
                edicao: livro.edicao,
                isbn: livro.isbn,
                categoria: nomeCategoria || "Categoria desconhecida"
            };
        });
    }
    ConsultarLivroPorISBN(ISBN) {
        const Livro = this.LivroRepository.filtrarLivroPorISBN(ISBN);
        if (!Livro)
            return undefined;
        const CatLivro = CategoriaLivro_1.CategoriaLivro.buscarNomePorID(Livro.CategoriaID);
        return {
            titulo: Livro.titulo,
            autor: Livro.autor,
            editora: Livro.editora,
            edicao: Livro.edicao,
            isbn: Livro.isbn,
            categoria: CatLivro
        };
    }
    AtualizarLivroPorISBN(ISBN, titulo, autor, editora, edicao, CategoriaID) {
        const Livro = this.LivroRepository.filtrarLivroPorISBN(ISBN);
        if (!Livro) {
            console.log("Livro não encontrado");
            return undefined;
        }
        if (Livro) {
            if (titulo) {
                Livro.titulo = titulo;
            }
            if (autor) {
                Livro.autor = autor;
            }
            if (editora) {
                Livro.editora = editora;
            }
            if (edicao) {
                Livro.edicao = edicao;
            }
            if (CategoriaID) {
                Livro.CategoriaID = CategoriaID;
            }
            return Livro;
        }
    }
    RemoverLivroPorISBN(ISBN) {
        const livro = this.LivroRepository.filtrarLivroPorISBN(ISBN);
        if (!livro) {
            return "Livro não encontrado";
        }
        const exemplar = this.estoqueRepository.listarEstoqueDisponivel()
            .find(ex => ex.LivroID === livro.id);
        if (!exemplar) {
            const removido = this.LivroRepository.removerLivroPorISBN(ISBN);
            return removido ? "Livro removido com sucesso" : "Livro não encontrado";
        }
        const emprestimoAtivo = this.emprestimoRepository.listarEmprestimos()
            .some(e => e.EstoqueID === exemplar.Codigo &&
            (!e.data_entrega || e.data_entrega.getTime?.() === 0));
        if (emprestimoAtivo) {
            return "Não é possível remover o livro, o exemplar está emprestado";
        }
        this.estoqueRepository.removerUsuarioPorCodigo(exemplar.Codigo);
        const removido = this.LivroRepository.removerLivroPorISBN(ISBN);
        return removido ? "Livro removido com sucesso" : "Livro não encontrado";
    }
}
exports.LivroService = LivroService;
