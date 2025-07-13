"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoRepository = void 0;
const CursoRepository_1 = require("../Repository/CursoRepository");
const CategoriaLivro_1 = require("../Model/CategoriaLivro");
const CategoriaUsuario_1 = require("../Model/CategoriaUsuario");
CategoriaLivro_1.CategoriaLivro.inicializarCategoriaLivro();
CategoriaUsuario_1.CategoriaUsuario.inicializarCategoriaUsuario();
class CatalogoRepository {
    static instance = null;
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
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
    async listarCurso() {
        return await this.cursoRepository.listarCursos();
    }
}
exports.CatalogoRepository = CatalogoRepository;
