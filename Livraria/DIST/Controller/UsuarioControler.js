"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarUsuario = CadastrarUsuario;
exports.ConsultarUsuarios = ConsultarUsuarios;
exports.ConsultarUsuarioPorCPF = ConsultarUsuarioPorCPF;
exports.AtualizarUsuarioPorCPF = AtualizarUsuarioPorCPF;
exports.RemoverUsuarioPorCPF = RemoverUsuarioPorCPF;
const UsuarioService_1 = require("../Service/UsuarioService");
const usuarioService = new UsuarioService_1.UsuarioService();
async function CadastrarUsuario(req, res) {
    try {
        const novoUsuario = await usuarioService.cadastrarUsuario(req.body);
        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            Usuario: novoUsuario
        });
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
async function ConsultarUsuarios(req, res) {
    try {
        const usuarios = await usuarioService.consultarUsuarios();
        res.status(200).json({
            mensagem: "Usuários encontrados com sucesso",
            Usuarios: usuarios
        });
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
async function ConsultarUsuarioPorCPF(req, res) {
    const { CPF } = req.params;
    try {
        const usuario = await usuarioService.consultarUsuarioPorCPF(CPF);
        if (usuario) {
            res.status(200).json({
                mensagem: "Usuário encontrado com sucesso",
                Usuario: usuario
            });
        }
        else {
            res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
async function AtualizarUsuarioPorCPF(req, res) {
    const { CPF } = req.params;
    const { nome, CursoNome, categoriaNome } = req.body;
    try {
        const usuarioAtualizado = await usuarioService.atualizarUsuarioPorCPF(CPF, nome, CursoNome, categoriaNome);
        if (usuarioAtualizado) {
            res.status(200).json({
                mensagem: "Usuário atualizado com sucesso",
                Usuario: usuarioAtualizado
            });
        }
        else {
            res.status(404).json({
                mensagem: "Usuário não encontrado para atualização"
            });
        }
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
async function RemoverUsuarioPorCPF(req, res) {
    const { CPF } = req.params;
    try {
        const resultado = await usuarioService.removerUsuarioPorCPF(CPF);
        const statusCode = resultado === "Usuário removido com sucesso" ? 200 : 404;
        res.status(statusCode).json({ mensagem: resultado });
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
