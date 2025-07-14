"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroDTO = void 0;
class LivroDTO {
    id;
    titulo;
    autor;
    editora;
    edicao;
    isbn;
    CategoriaID;
    constructor(titulo, autor, editora, edicao, isbn, CategoriaID, id) {
        if (!titulo || !autor || !editora || !edicao || !isbn || !CategoriaID) {
            throw new Error("Informações incompletas para o cadastro do livro.");
        }
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.CategoriaID = CategoriaID;
        if (id !== undefined) {
            this.id = id;
        }
    }
}
exports.LivroDTO = LivroDTO;
