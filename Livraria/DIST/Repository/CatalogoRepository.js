"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoRepository = void 0;
const Curso_1 = require("../Model/Curso");
const CategoriaLivro_1 = require("../Model/CategoriaLivro");
const CategoriaUsuario_1 = require("../Model/CategoriaUsuario");
CategoriaLivro_1.CategoriaLivro.inicializarCategoriaLivro();
CategoriaUsuario_1.CategoriaUsuario.inicializarCategoriaUsuario();
Curso_1.Curso.inicializarCursos();
class CatalogoRepository {
    static instance = null;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CatalogoRepository();
        }
        return this.instance;
    }
    listarCategoriaLivro() {
        return CategoriaLivro_1.CategoriaLivro.listaLivro;
    }
    listarCategoriaUsuario() {
        return CategoriaUsuario_1.CategoriaUsuario.listaCatUsu;
    }
    listarCurso() {
        return Curso_1.Curso.listaCursos;
    }
}
exports.CatalogoRepository = CatalogoRepository;
