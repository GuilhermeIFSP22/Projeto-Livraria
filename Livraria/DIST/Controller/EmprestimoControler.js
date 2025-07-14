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
exports.EmprestimoController = void 0;
const tsoa_1 = require("tsoa");
const BasicResponseDTO_1 = require("../Model/Entidade/DTO/BasicResponseDTO");
const EmprestimoService_1 = require("../Service/EmprestimoService");
const EmprestimoDTO_1 = require("../Model/Entidade/DTO/EmprestimoDTO");
let EmprestimoController = class EmprestimoController extends tsoa_1.Controller {
    emprestimoService = new EmprestimoService_1.EmprestimoService();
    async registrarEmprestimo(emprestimo, fail, success) {
        try {
            const { data_emprestimo, CPF, UsuarioID, EstoqueID } = emprestimo;
            if (!data_emprestimo || !CPF || !UsuarioID || !EstoqueID) {
                return fail(400, new BasicResponseDTO_1.BasicResponseDto("Informações incompletas", undefined));
            }
            const data = new Date(data_emprestimo);
            if (isNaN(data.getTime())) {
                return fail(400, new BasicResponseDTO_1.BasicResponseDto("Data de empréstimo inválida", undefined));
            }
            const novoEmprestimo = await this.emprestimoService.registrarEmprestimo(data, CPF, UsuarioID, EstoqueID);
            return success(201, new BasicResponseDTO_1.BasicResponseDto("Empréstimo registrado com sucesso", novoEmprestimo));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message || "Erro ao registrar empréstimo", undefined));
        }
    }
    async listarEmprestimos(fail, success) {
        try {
            const lista = await this.emprestimoService.listarEmprestimos();
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Empréstimos listados com sucesso", lista));
        }
        catch (error) {
            return fail(500, new BasicResponseDTO_1.BasicResponseDto(error.message || "Erro ao listar empréstimos", undefined));
        }
    }
    async registrarDevolucao(body, fail, success) {
        try {
            const { idEmprestimo, dataEntrega } = body;
            if (!idEmprestimo) {
                return fail(400, new BasicResponseDTO_1.BasicResponseDto("Falta o campo idEmprestimo", undefined));
            }
            if (!dataEntrega) {
                return fail(400, new BasicResponseDTO_1.BasicResponseDto("Falta o campo dataEntrega", undefined));
            }
            const datEntrega = new Date(dataEntrega);
            if (isNaN(datEntrega.getTime())) {
                return fail(400, new BasicResponseDTO_1.BasicResponseDto("Data de entrega inválida", undefined));
            }
            const emprestimoAtualizado = await this.emprestimoService.registrarDevolucao(idEmprestimo, datEntrega);
            if (!emprestimoAtualizado) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Empréstimo não encontrado ou não atualizado.", undefined));
            }
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Devolução registrada com sucesso", emprestimoAtualizado));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message || "Erro ao registrar devolução", undefined));
        }
    }
};
exports.EmprestimoController = EmprestimoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmprestimoDTO_1.EmprestimoDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "registrarEmprestimo", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "listarEmprestimos", null);
__decorate([
    (0, tsoa_1.Put)("Devolucao"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "registrarDevolucao", null);
exports.EmprestimoController = EmprestimoController = __decorate([
    (0, tsoa_1.Route)("Emprestimo"),
    (0, tsoa_1.Tags)("Emprestimo")
], EmprestimoController);
