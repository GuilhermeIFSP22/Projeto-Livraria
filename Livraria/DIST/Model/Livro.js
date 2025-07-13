"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const CategoriaLivro_1 = require("./CategoriaLivro");
CategoriaLivro_1.CategoriaLivro.inicializarCategoriaLivro();
class Livro {
    static ultimoID = 0;
    id;
    titulo;
    autor;
    editora;
    edicao;
    isbn;
    CategoriaID;
    constructor(titulo, autor, editora, edicao, isbn, CategoriaID) {
        if (!titulo || !autor || !editora || !edicao || !isbn || !CategoriaID) {
            throw new Error("Informações incompletas");
        }
        const nomeCategoria = CategoriaLivro_1.CategoriaLivro.buscarNomePorID(CategoriaID);
        if (!nomeCategoria) {
            throw new Error("Categoria inválida.");
        }
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.CategoriaID = CategoriaID;
        this.id = Livro.incrementarID();
    }
    static incrementarID() {
        return ++Livro.ultimoID;
    }
    getNomeCategoriaLivro() {
        return CategoriaLivro_1.CategoriaLivro.buscarNomePorID(this.CategoriaID);
    }
}
exports.Livro = Livro;
