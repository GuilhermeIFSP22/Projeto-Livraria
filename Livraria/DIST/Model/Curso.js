"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = void 0;
class Curso {
    static ultimoID = 0;
    id;
    nome;
    static listaCursos = [];
    constructor(nome) {
        this.nome = nome;
        this.id = ++Curso.ultimoID;
    }
    static inicializarCursos() {
        Curso.ultimoID = 0;
        Curso.listaCursos = [
            new Curso("ADS"),
            new Curso("Pedagogia"),
            new Curso("Administração"),
        ];
    }
    static buscarNomePorID(id) {
        const curso = Curso.listaCursos.find(c => c.id === id);
        return curso ? curso.nome : "Curso não encontrado";
    }
    static buscarIDPorNome(nome) {
        const curso = this.listaCursos.find(c => c.nome.toLowerCase() === nome.toLowerCase());
        return curso ? curso.id : undefined;
    }
}
exports.Curso = Curso;
