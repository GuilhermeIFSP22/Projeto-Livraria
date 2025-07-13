"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarEmprestimo = registrarEmprestimo;
exports.listarEmprestimos = listarEmprestimos;
exports.registrarDevolucao = registrarDevolucao;
const EmprestimoService_1 = require("../Service/EmprestimoService");
const emprestimoService = new EmprestimoService_1.EmprestimoService();
async function registrarEmprestimo(req, res) {
    console.log("Recebido no controller:", req.body);
    try {
        const { data_emprestimo, CPF, UsuarioID, EstoqueID } = req.body;
        if (!data_emprestimo || !CPF || !UsuarioID || !EstoqueID) {
            res.status(400).json({ mensagem: "Informações incompletas" });
            return;
        }
        const data = new Date(data_emprestimo);
        if (isNaN(data.getTime())) {
            res.status(400).json({ mensagem: "Data inválida" });
            return;
        }
        const emprestimo = await emprestimoService.registrarEmprestimo(data, CPF, UsuarioID, EstoqueID);
        res.status(201).json({
            mensagem: "Empréstimo registrado com sucesso",
            emprestimo
        });
    }
    catch (error) {
        console.error("Erro no controller registrarEmprestimo:", error);
        res.status(400).json({ mensagem: error.message || "Erro ao registrar empréstimo." });
    }
}
async function listarEmprestimos(req, res) {
    try {
        const lista = await emprestimoService.listarEmprestimos();
        res.status(200).json(lista);
    }
    catch (error) {
        res.status(500).json({ mensagem: error.message || "Erro ao listar empréstimos" });
    }
}
async function registrarDevolucao(req, res) {
    try {
        const { idEmprestimo, dataEntrega } = req.body;
        if (!idEmprestimo) {
            res.status(400).json({ mensagem: "Falta o campo idEmprestimo" });
            return;
        }
        if (!dataEntrega) {
            res.status(400).json({ mensagem: "Falta o campo dataEntrega" });
            return;
        }
        const dataEntregaObj = new Date(dataEntrega);
        if (isNaN(dataEntregaObj.getTime())) {
            res.status(400).json({ mensagem: "Data inválida" });
            return;
        }
        const emprestimoAtualizado = await emprestimoService.registrarDevolucao(idEmprestimo, dataEntregaObj);
        if (!emprestimoAtualizado) {
            res.status(404).json({ mensagem: "Empréstimo não encontrado ou não atualizado." });
            return;
        }
        res.status(200).json({
            mensagem: "Devolução registrada com sucesso",
            emprestimo: emprestimoAtualizado,
        });
    }
    catch (error) {
        res.status(500).json({ mensagem: error.message || "Erro ao registrar devolução." });
    }
}
