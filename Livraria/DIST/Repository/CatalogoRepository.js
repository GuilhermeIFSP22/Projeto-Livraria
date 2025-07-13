"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoRepository = void 0;
const CursoRepository_1 = require("../Repository/CursoRepository");
const CategoriaLivro_1 = require("../Model/CategoriaLivro");
const CatUsuarioRepository_1 = require("./CatUsuarioRepository");
CategoriaLivro_1.CategoriaLivro.inicializarCategoriaLivro();
class CatalogoRepository {
    static instance = null;
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    CatUsuarioRepository = CatUsuarioRepository_1.CatUsuarioRepository.getInstance();
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
    async listarCategoriaUsuario() {
        return await this.CatUsuarioRepository.listarCategorias();
    }
    async listarCurso() {
        return await this.cursoRepository.listarCursos();
    }
}
exports.CatalogoRepository = CatalogoRepository;
