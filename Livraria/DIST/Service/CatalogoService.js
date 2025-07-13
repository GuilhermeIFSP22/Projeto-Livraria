"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoService = void 0;
const CursoRepository_1 = require("../Repository/CursoRepository");
const CatalogoRepository_1 = require("../Repository/CatalogoRepository");
const Curso_1 = require("../Model/Curso");
class CatalogoService {
    catalogoRepository = CatalogoRepository_1.CatalogoRepository.getInstance();
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    ConsultarCategoriaUsuario() {
        return this.catalogoRepository.listarCategoriaUsuario();
    }
    ConsultarCategoriaLivro() {
        return this.catalogoRepository.listarCategoriaLivro();
    }
    async ConsultarCurso() {
        const cursosLista = await this.cursoRepository.listarCursos();
        const cursos = cursosLista.map(c => new Curso_1.Curso(c.id, c.nome));
        return cursos;
    }
}
exports.CatalogoService = CatalogoService;
