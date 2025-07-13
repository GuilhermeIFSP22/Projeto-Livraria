"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarEmprestimo = registrarEmprestimo;
exports.listarEmprestimos = listarEmprestimos;
exports.registrarDevolucao = registrarDevolucao;
const EmprestimoService_1 = require("../Service/EmprestimoService");
const emprestimoService = new EmprestimoService_1.EmprestimoService();
function registrarEmprestimo(req, res) {
    try {
        const { data_emprestimo, CPF, UsuarioID, EstoqueID } = req.body;
        if (!data_emprestimo || !UsuarioID || !EstoqueID) {
            res.status(400).json({ mensagem: "Campos obrigatórios: data_emprestimo,CPF, UsuarioID, EstoqueID" });
            return;
        }
        const novoEmprestimo = emprestimoService.registrarEmprestimo(new Date(data_emprestimo), CPF, UsuarioID, EstoqueID);
        res.status(201).json({ mensagem: "Empréstimo registrado com sucesso", emprestimo: novoEmprestimo });
    }
    catch (error) {
        res.status(500).json({ mensagem: error.message || "Erro ao registrar empréstimo" });
    }
}
function listarEmprestimos(req, res) {
    try {
        const lista = emprestimoService.listarEmprestimos();
        res.status(200).json(lista);
    }
    catch (error) {
        res.status(500).json({ mensagem: error.message || "Erro ao listar empréstimos" });
    }
}
function registrarDevolucao(req, res) {
    try {
        const idEmprestimo = Number(req.params.id);
        const { dataEntrega } = req.body;
        if (!dataEntrega) {
            res.status(400).json({ mensagem: "Campo obrigatório: dataEntrega" });
            return;
        }
        const emprestimoAtualizado = emprestimoService.registrarDevolucao(idEmprestimo, new Date(dataEntrega));
        if (!emprestimoAtualizado) {
            res.status(404).json({ mensagem: "Empréstimo não encontrado" });
            return;
        }
        res.status(200).json({ mensagem: "Devolução registrada com sucesso", emprestimo: emprestimoAtualizado });
    }
    catch (error) {
        res.status(500).json({ mensagem: error.message || "Erro ao registrar devolução" });
    }
}
