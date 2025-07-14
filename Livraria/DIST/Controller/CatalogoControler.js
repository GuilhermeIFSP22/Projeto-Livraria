"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoController = void 0;
const tsoa_1 = require("tsoa");
const CatalogoService_1 = require("../Service/CatalogoService");
const BasicResponseDTO_1 = require("../Model/Entidade/DTO/BasicResponseDTO");
let CatalogoController = class CatalogoController extends tsoa_1.Controller {
    catalogoService = new CatalogoService_1.CatalogoService();
    async consultarCategoriaUsuario(fail, success) {
        try {
            const categoriasUsuario = await this.catalogoService.ConsultarCategoriaUsuario();
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Categorias de usuário encontradas com sucesso", categoriasUsuario));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message || "Erro ao consultar categorias de usuário", undefined));
        }
    }
    async consultarCategoriaLivro(fail, success) {
        try {
            const categoriasLivro = await this.catalogoService.ConsultarCategoriaLivro();
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Categorias de livro encontradas com sucesso", categoriasLivro));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message || "Erro ao consultar categorias de livro", undefined));
        }
    }
    async consultarCurso(fail, success) {
        try {
            const cursos = await this.catalogoService.ConsultarCurso();
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Cursos encontrados com sucesso", cursos));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message || "Erro ao consultar cursos", undefined));
        }
    }
};
exports.CatalogoController = CatalogoController;
__decorate([
    (0, tsoa_1.Get)("CategoriaUsuario"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CatalogoController.prototype, "consultarCategoriaUsuario", null);
__decorate([
    (0, tsoa_1.Get)("CategoriaLivro"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CatalogoController.prototype, "consultarCategoriaLivro", null);
__decorate([
    (0, tsoa_1.Get)("Curso"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CatalogoController.prototype, "consultarCurso", null);
exports.CatalogoController = CatalogoController = __decorate([
    (0, tsoa_1.Route)("Catalogo"),
    (0, tsoa_1.Tags)("Catálogo")
], CatalogoController);
