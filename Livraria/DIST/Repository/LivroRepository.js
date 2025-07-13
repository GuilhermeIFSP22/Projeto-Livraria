"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    static instance = null;
    ListaLivros = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    cadastrarLivro(Livro) {
        this.ListaLivros.push(Livro);
    }
    listarLivros(filtros = {}) {
        return this.ListaLivros.filter((livro) => (filtros.id == null || livro.id === filtros.id) &&
            (!filtros.titulo || livro.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())) &&
            (!filtros.autor || livro.autor.toLowerCase().includes(filtros.autor.toLowerCase())) &&
            (!filtros.editora || livro.editora.toLowerCase().includes(filtros.editora.toLowerCase())) &&
            (!filtros.edicao || livro.edicao.toLowerCase().includes(filtros.edicao.toLowerCase())) &&
            (!filtros.isbn || livro.isbn.toLowerCase().includes(filtros.isbn.toLowerCase())) &&
            (filtros.CategoriaID == null || livro.CategoriaID === filtros.CategoriaID));
    }
    filtrarLivroPorISBN(ISBN) {
        return this.ListaLivros.find(Livro => Livro.isbn === ISBN);
    }
    atualizarLivroPorISBN(LivroAtualizado) {
        const index = this.ListaLivros.findIndex(Livro => Livro.isbn === LivroAtualizado.isbn);
        if (index !== -1) {
            this.ListaLivros[index] = LivroAtualizado;
            return this.ListaLivros[index];
        }
        return undefined;
    }
    removerLivroPorISBN(ISBN) {
        const index = this.ListaLivros.findIndex(Livro => Livro.isbn === ISBN);
        if (index !== -1) {
            this.ListaLivros.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.LivroRepository = LivroRepository;
