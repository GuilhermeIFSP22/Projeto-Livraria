"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UsuarioControler_1 = require("./../controller/UsuarioControler");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LivroControler_1 = require("./../controller/LivroControler");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EstoqueControler_1 = require("./../controller/EstoqueControler");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EmprestimoControler_1 = require("./../controller/EmprestimoControler");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CatalogoControler_1 = require("./../controller/CatalogoControler");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UsuarioDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "nome": { "dataType": "string", "required": true },
            "cpf": { "dataType": "string", "required": true },
            "status": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["ativo"] }, { "dataType": "enum", "enums": ["suspenso"] }, { "dataType": "enum", "enums": ["inativo"] }], "required": true },
            "CursoID": { "dataType": "double", "required": true },
            "CatUsuID": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "titulo": { "dataType": "string", "required": true },
            "autor": { "dataType": "string", "required": true },
            "editora": { "dataType": "string", "required": true },
            "edicao": { "dataType": "string", "required": true },
            "isbn": { "dataType": "string", "required": true },
            "CategoriaID": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstoqueDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "quantidade": { "dataType": "double", "required": true },
            "quantidade_emprestada": { "dataType": "double", "required": true },
            "LivroID": { "dataType": "double", "required": true },
            "disponivel": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "data_emprestimo": { "dataType": "datetime", "required": true },
            "data_devolucao": { "dataType": "datetime", "required": true },
            "data_entrega": { "dataType": "datetime", "required": true },
            "dias_atraso": { "dataType": "double", "required": true },
            "suspensao_ate": { "dataType": "datetime", "required": true },
            "UsuarioID": { "dataType": "double", "required": true },
            "EstoqueID": { "dataType": "double", "required": true },
            "CPF": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUsuarioController_cadastrarUsuario = {
        usuario: { "in": "body", "name": "usuario", "required": true, "ref": "UsuarioDTO" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/Usuario', ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController.prototype.cadastrarUsuario)), async function UsuarioController_cadastrarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_cadastrarUsuario, request, response });
            const controller = new UsuarioControler_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'cadastrarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_consultarUsuarios = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Usuario', ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController.prototype.consultarUsuarios)), async function UsuarioController_consultarUsuarios(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_consultarUsuarios, request, response });
            const controller = new UsuarioControler_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'consultarUsuarios',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_consultarUsuarioPorCPF = {
        CPF: { "in": "path", "name": "CPF", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Usuario/:CPF', ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController.prototype.consultarUsuarioPorCPF)), async function UsuarioController_consultarUsuarioPorCPF(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_consultarUsuarioPorCPF, request, response });
            const controller = new UsuarioControler_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'consultarUsuarioPorCPF',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_atualizarUsuarioPorCPF = {
        CPF: { "in": "path", "name": "CPF", "required": true, "dataType": "string" },
        dadosAtualizacao: { "in": "body", "name": "dadosAtualizacao", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "categoriaNome": { "dataType": "string" }, "CursoNome": { "dataType": "string" }, "nome": { "dataType": "string" } } },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/Usuario/:CPF', ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController.prototype.atualizarUsuarioPorCPF)), async function UsuarioController_atualizarUsuarioPorCPF(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuarioPorCPF, request, response });
            const controller = new UsuarioControler_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'atualizarUsuarioPorCPF',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_removerUsuarioPorCPF = {
        CPF: { "in": "path", "name": "CPF", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/Usuario/:CPF', ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioControler_1.UsuarioController.prototype.removerUsuarioPorCPF)), async function UsuarioController_removerUsuarioPorCPF(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_removerUsuarioPorCPF, request, response });
            const controller = new UsuarioControler_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'removerUsuarioPorCPF',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_cadastrarLivro = {
        livro: { "in": "body", "name": "livro", "required": true, "ref": "LivroDTO" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/Livro', ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController.prototype.cadastrarLivro)), async function LivroController_cadastrarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_cadastrarLivro, request, response });
            const controller = new LivroControler_1.LivroController();
            await templateService.apiHandler({
                methodName: 'cadastrarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_listarLivros = {
        titulo: { "in": "query", "name": "titulo", "required": true, "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "undefined" }] },
        autor: { "in": "query", "name": "autor", "required": true, "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "undefined" }] },
        editora: { "in": "query", "name": "editora", "required": true, "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "undefined" }] },
        categoriaID: { "in": "query", "name": "categoriaID", "required": true, "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "undefined" }] },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Livro', ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController.prototype.listarLivros)), async function LivroController_listarLivros(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivros, request, response });
            const controller = new LivroControler_1.LivroController();
            await templateService.apiHandler({
                methodName: 'listarLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_consultarLivroPorISBN = {
        ISBN: { "in": "path", "name": "ISBN", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Livro/:ISBN', ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController.prototype.consultarLivroPorISBN)), async function LivroController_consultarLivroPorISBN(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_consultarLivroPorISBN, request, response });
            const controller = new LivroControler_1.LivroController();
            await templateService.apiHandler({
                methodName: 'consultarLivroPorISBN',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_atualizarLivroPorISBN = {
        ISBN: { "in": "path", "name": "ISBN", "required": true, "dataType": "string" },
        dadosAtualizacao: { "in": "body", "name": "dadosAtualizacao", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "CategoriaID": { "dataType": "double" }, "edicao": { "dataType": "string" }, "editora": { "dataType": "string" }, "autor": { "dataType": "string" }, "titulo": { "dataType": "string" } } },
        fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/Livro/:ISBN', ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController.prototype.atualizarLivroPorISBN)), async function LivroController_atualizarLivroPorISBN(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivroPorISBN, request, response });
            const controller = new LivroControler_1.LivroController();
            await templateService.apiHandler({
                methodName: 'atualizarLivroPorISBN',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_removerLivroPorISBN = {
        ISBN: { "in": "path", "name": "ISBN", "required": true, "dataType": "string" },
        fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/Livro/:ISBN', ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroControler_1.LivroController.prototype.removerLivroPorISBN)), async function LivroController_removerLivroPorISBN(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removerLivroPorISBN, request, response });
            const controller = new LivroControler_1.LivroController();
            await templateService.apiHandler({
                methodName: 'removerLivroPorISBN',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_cadastrarEstoque = {
        estoque: { "in": "body", "name": "estoque", "required": true, "ref": "EstoqueDTO" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/Estoque', ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController.prototype.cadastrarEstoque)), async function EstoqueController_cadastrarEstoque(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_cadastrarEstoque, request, response });
            const controller = new EstoqueControler_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'cadastrarEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_listarEstoqueDisponivel = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Estoque', ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController.prototype.listarEstoqueDisponivel)), async function EstoqueController_listarEstoqueDisponivel(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_listarEstoqueDisponivel, request, response });
            const controller = new EstoqueControler_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'listarEstoqueDisponivel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_consultarExemplarPorCodigo = {
        Codigo: { "in": "path", "name": "Codigo", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Estoque/:Codigo', ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController.prototype.consultarExemplarPorCodigo)), async function EstoqueController_consultarExemplarPorCodigo(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_consultarExemplarPorCodigo, request, response });
            const controller = new EstoqueControler_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'consultarExemplarPorCodigo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_atualizarDispoPorCodigo = {
        Codigo: { "in": "path", "name": "Codigo", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "disponivel": { "dataType": "boolean", "required": true } } },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/Estoque/:Codigo', ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController.prototype.atualizarDispoPorCodigo)), async function EstoqueController_atualizarDispoPorCodigo(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_atualizarDispoPorCodigo, request, response });
            const controller = new EstoqueControler_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'atualizarDispoPorCodigo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEstoqueController_removerExemplarPorCodigo = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/Estoque/:id', ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueControler_1.EstoqueController.prototype.removerExemplarPorCodigo)), async function EstoqueController_removerExemplarPorCodigo(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_removerExemplarPorCodigo, request, response });
            const controller = new EstoqueControler_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'removerExemplarPorCodigo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_registrarEmprestimo = {
        emprestimo: { "in": "body", "name": "emprestimo", "required": true, "ref": "EmprestimoDTO" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/Emprestimo', ...((0, runtime_1.fetchMiddlewares)(EmprestimoControler_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoControler_1.EmprestimoController.prototype.registrarEmprestimo)), async function EmprestimoController_registrarEmprestimo(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_registrarEmprestimo, request, response });
            const controller = new EmprestimoControler_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'registrarEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_listarEmprestimos = {
        fail: { "in": "res", "name": "500", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Emprestimo', ...((0, runtime_1.fetchMiddlewares)(EmprestimoControler_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoControler_1.EmprestimoController.prototype.listarEmprestimos)), async function EmprestimoController_listarEmprestimos(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_listarEmprestimos, request, response });
            const controller = new EmprestimoControler_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'listarEmprestimos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEmprestimoController_registrarDevolucao = {
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "dataEntrega": { "dataType": "string", "required": true }, "idEmprestimo": { "dataType": "double", "required": true } } },
        fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/Emprestimo/Devolucao', ...((0, runtime_1.fetchMiddlewares)(EmprestimoControler_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoControler_1.EmprestimoController.prototype.registrarDevolucao)), async function EmprestimoController_registrarDevolucao(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_registrarDevolucao, request, response });
            const controller = new EmprestimoControler_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'registrarDevolucao',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCatalogoController_consultarCategoriaUsuario = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Catalogo/CategoriaUsuario', ...((0, runtime_1.fetchMiddlewares)(CatalogoControler_1.CatalogoController)), ...((0, runtime_1.fetchMiddlewares)(CatalogoControler_1.CatalogoController.prototype.consultarCategoriaUsuario)), async function CatalogoController_consultarCategoriaUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCatalogoController_consultarCategoriaUsuario, request, response });
            const controller = new CatalogoControler_1.CatalogoController();
            await templateService.apiHandler({
                methodName: 'consultarCategoriaUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCatalogoController_consultarCategoriaLivro = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Catalogo/CategoriaLivro', ...((0, runtime_1.fetchMiddlewares)(CatalogoControler_1.CatalogoController)), ...((0, runtime_1.fetchMiddlewares)(CatalogoControler_1.CatalogoController.prototype.consultarCategoriaLivro)), async function CatalogoController_consultarCategoriaLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCatalogoController_consultarCategoriaLivro, request, response });
            const controller = new CatalogoControler_1.CatalogoController();
            await templateService.apiHandler({
                methodName: 'consultarCategoriaLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCatalogoController_consultarCurso = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/Catalogo/Curso', ...((0, runtime_1.fetchMiddlewares)(CatalogoControler_1.CatalogoController)), ...((0, runtime_1.fetchMiddlewares)(CatalogoControler_1.CatalogoController.prototype.consultarCurso)), async function CatalogoController_consultarCurso(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCatalogoController_consultarCurso, request, response });
            const controller = new CatalogoControler_1.CatalogoController();
            await templateService.apiHandler({
                methodName: 'consultarCurso',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
