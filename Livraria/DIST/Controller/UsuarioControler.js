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
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../Service/UsuarioService");
const tsoa_1 = require("tsoa");
const BasicResponseDTO_1 = require("../Model/Entidade/DTO/BasicResponseDTO");
const UsuarioDTO_1 = require("../Model/Entidade/DTO/UsuarioDTO");
let UsuarioController = class UsuarioController extends tsoa_1.Controller {
    usuarioService = new UsuarioService_1.UsuarioService();
    async cadastrarUsuario(usuario, fail, success) {
        try {
            const novoUsuario = await this.usuarioService.cadastrarUsuario(usuario);
            return success(201, new BasicResponseDTO_1.BasicResponseDto("Usuário cadastrado com sucesso", novoUsuario));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async consultarUsuarios(fail, success) {
        try {
            const usuarios = await this.usuarioService.consultarUsuarios();
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Usuários encontrados com sucesso", usuarios));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async consultarUsuarioPorCPF(CPF, fail, success) {
        try {
            const usuario = await this.usuarioService.consultarUsuarioPorCPF(CPF);
            if (!usuario) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Usuário não encontrado", undefined));
            }
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Usuário encontrado com sucesso", usuario));
        }
        catch (error) {
            return fail(404, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async atualizarUsuarioPorCPF(CPF, dadosAtualizacao, fail, success) {
        try {
            const usuarioAtualizado = await this.usuarioService.atualizarUsuarioPorCPF(CPF, dadosAtualizacao.nome, dadosAtualizacao.CursoNome, dadosAtualizacao.categoriaNome);
            if (!usuarioAtualizado) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Usuário não encontrado para atualização", undefined));
            }
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Usuário atualizado com sucesso", usuarioAtualizado));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async removerUsuarioPorCPF(CPF, fail, success) {
        try {
            const resultado = await this.usuarioService.removerUsuarioPorCPF(CPF);
            if (resultado !== "Usuário removido com sucesso") {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto(resultado, undefined));
            }
            return success(200, new BasicResponseDTO_1.BasicResponseDto(resultado, undefined));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDTO_1.UsuarioDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "cadastrarUsuario", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "consultarUsuarios", null);
__decorate([
    (0, tsoa_1.Get)("{CPF}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "consultarUsuarioPorCPF", null);
__decorate([
    (0, tsoa_1.Put)("{CPF}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizarUsuarioPorCPF", null);
__decorate([
    (0, tsoa_1.Delete)("{CPF}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "removerUsuarioPorCPF", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, tsoa_1.Route)("Usuario"),
    (0, tsoa_1.Tags)("Usuario")
], UsuarioController);
