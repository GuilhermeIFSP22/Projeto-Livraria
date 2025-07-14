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
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../Service/EstoqueService");
const tsoa_1 = require("tsoa");
const BasicResponseDTO_1 = require("../Model/Entidade/DTO/BasicResponseDTO");
const EstoqueDTO_1 = require("../Model/Entidade/DTO/EstoqueDTO");
let EstoqueController = class EstoqueController extends tsoa_1.Controller {
    estoqueService = new EstoqueService_1.EstoqueService();
    async cadastrarEstoque(estoque, fail, success) {
        try {
            const novoEstoque = await this.estoqueService.cadastrarEstoque(estoque);
            return success(201, new BasicResponseDTO_1.BasicResponseDto("Livro cadastrado no estoque com sucesso", novoEstoque));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarEstoqueDisponivel(fail, success) {
        try {
            const estoqueDisponivel = await this.estoqueService.listarEstoqueDisponivel();
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Estoque disponível listado com sucesso", estoqueDisponivel));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message || "Erro ao listar estoque disponível", undefined));
        }
    }
    async consultarExemplarPorCodigo(Codigo, fail, success) {
        try {
            const estoque = await this.estoqueService.ConsultarExemplarPorCodigo(Codigo);
            if (!estoque) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Livro não encontrado no estoque", undefined));
            }
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Livro encontrado no estoque com sucesso", estoque));
        }
        catch (error) {
            return fail(404, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async atualizarDispoPorCodigo(Codigo, body, fail, success) {
        try {
            const estoqueAtualizado = await this.estoqueService.AtualizarDispoPorCodigo(Codigo, body.disponivel);
            if (!estoqueAtualizado) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Exemplar não encontrado para atualização", undefined));
            }
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Exemplar atualizado com sucesso no estoque", estoqueAtualizado));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async removerExemplarPorCodigo(id, fail, success) {
        try {
            const resultado = await this.estoqueService.RemoverExemplarPorCodigo(id);
            if (resultado !== "Livro removido com sucesso") {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto(resultado, undefined));
            }
            return success(200, new BasicResponseDTO_1.BasicResponseDto(resultado, undefined));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EstoqueDTO_1.EstoqueDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "cadastrarEstoque", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "listarEstoqueDisponivel", null);
__decorate([
    (0, tsoa_1.Get)("{Codigo}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "consultarExemplarPorCodigo", null);
__decorate([
    (0, tsoa_1.Put)("{Codigo}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "atualizarDispoPorCodigo", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "removerExemplarPorCodigo", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, tsoa_1.Route)("Estoque"),
    (0, tsoa_1.Tags)("Estoque")
], EstoqueController);
