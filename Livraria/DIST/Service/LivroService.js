"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../Model/Livro");
const LivroRepository_1 = require("../Repository/LivroRepository");
const EstoqueRepository_1 = require("../Repository/EstoqueRepository");
const EmprestimoRepository_1 = require("../Repository/EmprestimoRepository");
const CatLivroRepository_1 = require("../Repository/CatLivroRepository");
class LivroService {
    LivroRepository = LivroRepository_1.LivroRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    CatLivroRepository = CatLivroRepository_1.CatLivroRepository.getInstance();
    async cadastrarLivro(LivroData) {
        const { titulo, autor, editora, edicao, isbn, categoria } = LivroData;
        const livrosExistentes = await this.LivroRepository.listarLivros();
        const livroDuplicado = livrosExistentes.find(l => l.autor === autor && l.editora === editora && l.edicao === edicao);
        if (livroDuplicado) {
            throw new Error("Já existe um livro cadastrado com essa combinação de autor, editora e edição.");
        }
        const categoriaInfo = await this.CatLivroRepository.buscarCatLivroPorID(categoria);
        if (!categoriaInfo) {
            throw new Error("Categoria inválida.");
        }
        const novoLivro = new Livro_1.Livro(titulo, autor, editora, edicao, isbn, categoria, 0);
        const idGerado = await this.LivroRepository.cadastrarLivro(novoLivro);
        novoLivro.id = idGerado;
        return {
            id: novoLivro.id,
            titulo: novoLivro.titulo,
            autor: novoLivro.autor,
            editora: novoLivro.editora,
            edicao: novoLivro.edicao,
            isbn: novoLivro.isbn,
            categoria: categoriaInfo.nome,
        };
    }
    async listarLivros(filtros = {}) {
        const livrosData = await this.LivroRepository.listarLivros(filtros);
        const livrosInstanciados = livrosData.map(l => new Livro_1.Livro(l.titulo, l.autor, l.editora, l.edicao, l.isbn, l.CategoriaID, l.id));
        return Promise.all(livrosInstanciados.map(async (livro) => {
            const categoria = await this.CatLivroRepository.buscarCatLivroPorID(livro.CategoriaID);
            return {
                id: livro.id,
                titulo: livro.titulo,
                autor: livro.autor,
                editora: livro.editora,
                edicao: livro.edicao,
                isbn: livro.isbn,
                categoria: categoria?.nome || "Categoria desconhecida",
            };
        }));
    }
    async ConsultarLivroPorISBN(ISBN) {
        const Livro = await this.LivroRepository.filtrarLivroPorISBN(ISBN);
        if (!Livro)
            return undefined;
        const categoria = await this.CatLivroRepository.buscarCatLivroPorID(Livro.CategoriaID);
        return {
            titulo: Livro.titulo,
            autor: Livro.autor,
            editora: Livro.editora,
            edicao: Livro.edicao,
            isbn: Livro.isbn,
            categoria: categoria?.nome
        };
    }
    async AtualizarLivroPorISBN(ISBN, titulo, autor, editora, edicao, CategoriaID) {
        const Livro = await this.LivroRepository.filtrarLivroPorISBN(ISBN);
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
    async RemoverLivroPorISBN(ISBN) {
        const livro = await this.LivroRepository.filtrarLivroPorISBN(ISBN);
        if (!livro) {
            return "Livro não encontrado";
        }
        const estoques = await this.estoqueRepository.listarEstoqueDisponivel();
        const exemplar = estoques.find(ex => ex.LivroID === livro.id);
        if (!exemplar) {
            const removido = await this.LivroRepository.removerLivroPorISBN(ISBN);
            return removido ? "Livro removido com sucesso" : "Livro não encontrado";
        }
        const emprestimoAt = await this.emprestimoRepository.listarEmprestimos();
        const emprestimoAtivo = emprestimoAt.some(e => e.EstoqueID === exemplar.id && (!e.data_entrega || e.data_entrega.getTime?.() === 0));
        if (emprestimoAtivo) {
            return "Não é possível remover o livro, o exemplar está emprestado";
        }
        if (!exemplar.id) {
            throw new Error("ID do exemplar inválido.");
        }
        await this.estoqueRepository.removerUsuarioPorCodigo(exemplar.id);
        const removido = await this.LivroRepository.removerLivroPorISBN(ISBN);
        return removido ? "Livro removido com sucesso" : "Livro não encontrado";
    }
}
exports.LivroService = LivroService;
