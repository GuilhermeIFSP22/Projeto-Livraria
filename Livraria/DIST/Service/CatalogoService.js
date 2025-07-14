"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoService = void 0;
const CategoriaUsuario_1 = require("../Model/Entidade/CategoriaUsuario");
const CursoRepository_1 = require("../Repository/CursoRepository");
const CategoriaLivro_1 = require("../Model/Entidade/CategoriaLivro");
const CatalogoRepository_1 = require("../Repository/CatalogoRepository");
const Curso_1 = require("../Model/Entidade/Curso");
const CatUsuarioRepository_1 = require("../Repository/CatUsuarioRepository");
const CatLivroRepository_1 = require("../Repository/CatLivroRepository");
class CatalogoService {
    catalogoRepository = CatalogoRepository_1.CatalogoRepository.getInstance();
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    catUsuarioRepository = CatUsuarioRepository_1.CatUsuarioRepository.getInstance();
    CatLivroRepository = CatLivroRepository_1.CatLivroRepository.getInstance();
    async ConsultarCategoriaUsuario() {
        const categoriaLista = await this.catUsuarioRepository.listarCategorias();
        const categoria = categoriaLista.map(c => new CategoriaUsuario_1.CategoriaUsuario(c.id, c.nome));
        return categoria;
    }
    async ConsultarCategoriaLivro() {
        const CatLivroLista = await this.CatLivroRepository.listarCatLivro();
        const CatLivro = CatLivroLista.map(c => new CategoriaLivro_1.CategoriaLivro(c.id, c.nome));
        return CatLivro;
    }
    async ConsultarCurso() {
        const cursosLista = await this.cursoRepository.listarCursos();
        const cursos = cursosLista.map(c => new Curso_1.Curso(c.id, c.nome));
        return cursos;
    }
}
exports.CatalogoService = CatalogoService;
