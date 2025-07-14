/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsuarioController } from './../controller/UsuarioControler';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LivroController } from './../controller/LivroControler';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EstoqueController } from './../controller/EstoqueControler';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EmprestimoController } from './../controller/EmprestimoControler';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UsuarioDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "nome": {"dataType":"string","required":true},
            "cpf": {"dataType":"string","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ativo"]},{"dataType":"enum","enums":["suspenso"]},{"dataType":"enum","enums":["inativo"]}],"required":true},
            "CursoID": {"dataType":"double","required":true},
            "CatUsuID": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "titulo": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "editora": {"dataType":"string","required":true},
            "edicao": {"dataType":"string","required":true},
            "isbn": {"dataType":"string","required":true},
            "CategoriaID": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstoqueDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "quantidade": {"dataType":"double","required":true},
            "quantidade_emprestada": {"dataType":"double","required":true},
            "LivroID": {"dataType":"double","required":true},
            "disponivel": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "data_emprestimo": {"dataType":"datetime","required":true},
            "data_devolucao": {"dataType":"datetime","required":true},
            "data_entrega": {"dataType":"datetime","required":true},
            "dias_atraso": {"dataType":"double","required":true},
            "suspensao_ate": {"dataType":"datetime","required":true},
            "UsuarioID": {"dataType":"double","required":true},
            "EstoqueID": {"dataType":"double","required":true},
            "CPF": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUsuarioController_cadastrarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                usuario: {"in":"body","name":"usuario","required":true,"ref":"UsuarioDTO"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/Usuario',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.cadastrarUsuario)),

            async function UsuarioController_cadastrarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_cadastrarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'cadastrarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_consultarUsuarios: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/Usuario',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.consultarUsuarios)),

            async function UsuarioController_consultarUsuarios(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_consultarUsuarios, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'consultarUsuarios',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_consultarUsuarioPorCPF: Record<string, TsoaRoute.ParameterSchema> = {
                CPF: {"in":"path","name":"CPF","required":true,"dataType":"string"},
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/Usuario/:CPF',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.consultarUsuarioPorCPF)),

            async function UsuarioController_consultarUsuarioPorCPF(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_consultarUsuarioPorCPF, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'consultarUsuarioPorCPF',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_atualizarUsuarioPorCPF: Record<string, TsoaRoute.ParameterSchema> = {
                CPF: {"in":"path","name":"CPF","required":true,"dataType":"string"},
                dadosAtualizacao: {"in":"body","name":"dadosAtualizacao","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"categoriaNome":{"dataType":"string"},"CursoNome":{"dataType":"string"},"nome":{"dataType":"string"}}},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/Usuario/:CPF',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.atualizarUsuarioPorCPF)),

            async function UsuarioController_atualizarUsuarioPorCPF(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuarioPorCPF, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'atualizarUsuarioPorCPF',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_removerUsuarioPorCPF: Record<string, TsoaRoute.ParameterSchema> = {
                CPF: {"in":"path","name":"CPF","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/Usuario/:CPF',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.removerUsuarioPorCPF)),

            async function UsuarioController_removerUsuarioPorCPF(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_removerUsuarioPorCPF, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'removerUsuarioPorCPF',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_cadastrarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                livro: {"in":"body","name":"livro","required":true,"ref":"LivroDTO"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/Livro',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.cadastrarLivro)),

            async function LivroController_cadastrarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_cadastrarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'cadastrarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_listarLivros: Record<string, TsoaRoute.ParameterSchema> = {
                titulo: {"in":"query","name":"titulo","required":true,"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
                autor: {"in":"query","name":"autor","required":true,"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
                editora: {"in":"query","name":"editora","required":true,"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
                categoriaID: {"in":"query","name":"categoriaID","required":true,"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/Livro',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.listarLivros)),

            async function LivroController_listarLivros(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivros, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'listarLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_consultarLivroPorISBN: Record<string, TsoaRoute.ParameterSchema> = {
                ISBN: {"in":"path","name":"ISBN","required":true,"dataType":"string"},
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/Livro/:ISBN',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.consultarLivroPorISBN)),

            async function LivroController_consultarLivroPorISBN(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_consultarLivroPorISBN, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'consultarLivroPorISBN',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_atualizarLivroPorISBN: Record<string, TsoaRoute.ParameterSchema> = {
                ISBN: {"in":"path","name":"ISBN","required":true,"dataType":"string"},
                dadosAtualizacao: {"in":"body","name":"dadosAtualizacao","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"CategoriaID":{"dataType":"double"},"edicao":{"dataType":"string"},"editora":{"dataType":"string"},"autor":{"dataType":"string"},"titulo":{"dataType":"string"}}},
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/Livro/:ISBN',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.atualizarLivroPorISBN)),

            async function LivroController_atualizarLivroPorISBN(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivroPorISBN, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'atualizarLivroPorISBN',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_removerLivroPorISBN: Record<string, TsoaRoute.ParameterSchema> = {
                ISBN: {"in":"path","name":"ISBN","required":true,"dataType":"string"},
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/Livro/:ISBN',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.removerLivroPorISBN)),

            async function LivroController_removerLivroPorISBN(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removerLivroPorISBN, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'removerLivroPorISBN',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_cadastrarEstoque: Record<string, TsoaRoute.ParameterSchema> = {
                estoque: {"in":"body","name":"estoque","required":true,"ref":"EstoqueDTO"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/Estoque',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.cadastrarEstoque)),

            async function EstoqueController_cadastrarEstoque(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_cadastrarEstoque, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'cadastrarEstoque',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_listarEstoqueDisponivel: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/Estoque',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.listarEstoqueDisponivel)),

            async function EstoqueController_listarEstoqueDisponivel(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_listarEstoqueDisponivel, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'listarEstoqueDisponivel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_consultarExemplarPorCodigo: Record<string, TsoaRoute.ParameterSchema> = {
                Codigo: {"in":"path","name":"Codigo","required":true,"dataType":"double"},
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/Estoque/:Codigo',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.consultarExemplarPorCodigo)),

            async function EstoqueController_consultarExemplarPorCodigo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_consultarExemplarPorCodigo, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'consultarExemplarPorCodigo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_atualizarDispoPorCodigo: Record<string, TsoaRoute.ParameterSchema> = {
                Codigo: {"in":"path","name":"Codigo","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"disponivel":{"dataType":"boolean","required":true}}},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/Estoque/:Codigo',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.atualizarDispoPorCodigo)),

            async function EstoqueController_atualizarDispoPorCodigo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_atualizarDispoPorCodigo, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'atualizarDispoPorCodigo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_removerExemplarPorCodigo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/Estoque/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.removerExemplarPorCodigo)),

            async function EstoqueController_removerExemplarPorCodigo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_removerExemplarPorCodigo, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'removerExemplarPorCodigo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_registrarEmprestimo: Record<string, TsoaRoute.ParameterSchema> = {
                emprestimo: {"in":"body","name":"emprestimo","required":true,"ref":"EmprestimoDTO"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/Emprestimo',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.registrarEmprestimo)),

            async function EmprestimoController_registrarEmprestimo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_registrarEmprestimo, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'registrarEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_listarEmprestimos: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"500","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/Emprestimo',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.listarEmprestimos)),

            async function EmprestimoController_listarEmprestimos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_listarEmprestimos, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'listarEmprestimos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_registrarDevolucao: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"dataEntrega":{"dataType":"string","required":true},"idEmprestimo":{"dataType":"double","required":true}}},
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/Emprestimo/Devolucao',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.registrarDevolucao)),

            async function EmprestimoController_registrarDevolucao(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_registrarDevolucao, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'registrarDevolucao',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
