"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoRepository = void 0;
const CursoRepository_1 = require("../Repository/CursoRepository");
const CatUsuarioRepository_1 = require("./CatUsuarioRepository");
const CatLivroRepository_1 = require("./CatLivroRepository");
class CatalogoRepository {
    static instance = null;
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    CatUsuarioRepository = CatUsuarioRepository_1.CatUsuarioRepository.getInstance();
    CatLivroRepository = CatLivroRepository_1.CatLivroRepository.getInstance();
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CatalogoRepository();
        }
        return this.instance;
    }
    async listarCategoriaLivro() {
        return await this.CatLivroRepository.listarCatLivro();
    }
    async listarCategoriaUsuario() {
        return await this.CatUsuarioRepository.listarCategorias();
    }
    async listarCurso() {
        return await this.cursoRepository.listarCursos();
    }
}
exports.CatalogoRepository = CatalogoRepository;
