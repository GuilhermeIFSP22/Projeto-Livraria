"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoService = void 0;
const CatalogoRepository_1 = require("../Repository/CatalogoRepository");
class CatalogoService {
    CatalogoRepository = CatalogoRepository_1.CatalogoRepository.getInstance();
    ConsultarCategoriaUsuario() {
        return this.CatalogoRepository.listarCategoriaUsuario();
    }
    ConsultarCurso() {
        return this.CatalogoRepository.listarCurso();
    }
    ConsultarCategoriaLivro() {
        return this.CatalogoRepository.listarCategoriaLivro();
    }
}
exports.CatalogoService = CatalogoService;
