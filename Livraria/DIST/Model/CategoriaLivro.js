"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivro = void 0;
class CategoriaLivro {
    static ultimoID = 0;
    id;
    nome;
    static listaLivro = [];
    constructor(nome) {
        this.nome = nome;
        this.id = ++CategoriaLivro.ultimoID;
    }
    static inicializarCategoriaLivro() {
        CategoriaLivro.ultimoID = 0;
        CategoriaLivro.listaLivro = [
            new CategoriaLivro("Romance"),
            new CategoriaLivro("Computação"),
            new CategoriaLivro("Letras"),
            new CategoriaLivro("Gestão"),
        ];
    }
    static buscarNomePorID(id) {
        const CatLivro = CategoriaLivro.listaLivro.find(usu => usu.id === id);
        return CatLivro ? CatLivro.nome : "Categoria de Livro não encontrada";
    }
}
exports.CategoriaLivro = CategoriaLivro;
