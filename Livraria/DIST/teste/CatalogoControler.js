"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultarCategoriaUsuario = ConsultarCategoriaUsuario;
exports.ConsultarCategoriaLivro = ConsultarCategoriaLivro;
exports.ConsultarCurso = ConsultarCurso;
const CatalogoService_1 = require("../Service/CatalogoService");
const usuarioService = new CatalogoService_1.CatalogoService;
async function ConsultarCategoriaUsuario(req, res) {
    try {
        const categoriasUsuario = await usuarioService.ConsultarCategoriaUsuario();
        res.status(200).json({
            mensagem: "Sucesso",
            dados: categoriasUsuario,
        });
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
async function ConsultarCategoriaLivro(req, res) {
    try {
        const CategoriaLivro = await usuarioService.ConsultarCategoriaLivro();
        res.status(200).json({
            mensagem: "Sucesso",
            Usuarios: CategoriaLivro,
        });
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
async function ConsultarCurso(req, res) {
    try {
        const Curso = await usuarioService.ConsultarCurso();
        res.status(200).json({
            mensagem: "Sucesso",
            Usuarios: Curso,
        });
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
