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
exports.LivroController = void 0;
const tsoa_1 = require("tsoa");
const LivroService_1 = require("../Service/LivroService");
const BasicResponseDTO_1 = require("../Model/Entidade/DTO/BasicResponseDTO");
const LivroDTO_1 = require("../Model/Entidade/DTO/LivroDTO"); // Supondo que você tenha criado um DTO similar ao do usuário
let LivroController = class LivroController extends tsoa_1.Controller {
    livroService = new LivroService_1.LivroService();
    async cadastrarLivro(livro, fail, success) {
        try {
            const novoLivro = await this.livroService.cadastrarLivro(livro);
            return success(201, new BasicResponseDTO_1.BasicResponseDto("Livro cadastrado com sucesso", novoLivro));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarLivros(titulo, autor, editora, categoriaID, fail, success) {
        try {
            const filtros = { titulo, autor, editora, categoriaID };
            const livros = await this.livroService.listarLivros(filtros);
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Livros encontrados com sucesso", livros));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async consultarLivroPorISBN(ISBN, fail, success) {
        try {
            const livro = await this.livroService.ConsultarLivroPorISBN(ISBN);
            if (!livro) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Livro não encontrado", undefined));
            }
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Livro encontrado com sucesso", livro));
        }
        catch (error) {
            return fail(404, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async atualizarLivroPorISBN(ISBN, dadosAtualizacao, fail, success) {
        try {
            const livroAtualizado = await this.livroService.AtualizarLivroPorISBN(ISBN, dadosAtualizacao.titulo, dadosAtualizacao.autor, dadosAtualizacao.editora, dadosAtualizacao.edicao, dadosAtualizacao.CategoriaID);
            if (!livroAtualizado) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Livro não encontrado para atualização", undefined));
            }
            return success(200, new BasicResponseDTO_1.BasicResponseDto("Livro atualizado com sucesso", livroAtualizado));
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
    async removerLivroPorISBN(ISBN, fail, success) {
        try {
            const resultado = await this.livroService.RemoverLivroPorISBN(ISBN);
            if (resultado === "Livro removido com sucesso") {
                return success(200, new BasicResponseDTO_1.BasicResponseDto(resultado, undefined));
            }
            else {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto(resultado, undefined));
            }
        }
        catch (error) {
            return fail(400, new BasicResponseDTO_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.LivroController = LivroController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroDTO_1.LivroDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "cadastrarLivro", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Res)()),
    __param(5, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "listarLivros", null);
__decorate([
    (0, tsoa_1.Get)("{ISBN}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "consultarLivroPorISBN", null);
__decorate([
    (0, tsoa_1.Put)("{ISBN}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "atualizarLivroPorISBN", null);
__decorate([
    (0, tsoa_1.Delete)("{ISBN}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "removerLivroPorISBN", null);
exports.LivroController = LivroController = __decorate([
    (0, tsoa_1.Route)("Livro"),
    (0, tsoa_1.Tags)("Livro")
], LivroController);
