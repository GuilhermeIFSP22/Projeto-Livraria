"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UsuarioControler_1 = require("./../controller/UsuarioControler");
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
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
