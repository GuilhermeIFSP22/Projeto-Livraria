"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuario = void 0;
class CategoriaUsuario {
    static ultimoID = 0;
    id;
    nome;
    static listaCatUsu = [];
    constructor(nome) {
        this.nome = nome;
        this.id = ++CategoriaUsuario.ultimoID;
    }
    static inicializarCategoriaUsuario() {
        CategoriaUsuario.ultimoID = 0;
        CategoriaUsuario.listaCatUsu = [
            new CategoriaUsuario("Professor"),
            new CategoriaUsuario("Aluno"),
            new CategoriaUsuario("Bibliotecário"),
        ];
    }
    static buscarNomePorID(id) {
        const CatUsu = CategoriaUsuario.listaCatUsu.find(usu => usu.id === id);
        return CatUsu ? CatUsu.nome : "Categoria de Usuário não encontrada";
    }
    static buscarIDPorNome(nome) {
        const categoria = this.listaCatUsu.find(c => c.nome.toLowerCase() === nome.toLowerCase());
        return categoria ? categoria.id : undefined;
    }
}
exports.CategoriaUsuario = CategoriaUsuario;
