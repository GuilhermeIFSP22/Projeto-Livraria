"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    id;
    titulo;
    autor;
    editora;
    edicao;
    isbn;
    CategoriaID;
    constructor(titulo, autor, editora, edicao, isbn, CategoriaID, id) {
        if (!titulo || !autor || !editora || !edicao || !isbn || !CategoriaID) {
            throw new Error("Informações incompletas");
        }
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.CategoriaID = CategoriaID;
        this.id = id;
    }
}
exports.Livro = Livro;
