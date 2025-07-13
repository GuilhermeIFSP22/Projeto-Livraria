"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarEstoque = cadastrarEstoque;
exports.listarEstoqueDisponivel = listarEstoqueDisponivel;
exports.ConsultarExemplarPorCodigo = ConsultarExemplarPorCodigo;
exports.atualizarDispoPorCodigo = atualizarDispoPorCodigo;
exports.RemoverExemplarPorCodigo = RemoverExemplarPorCodigo;
const EstoqueService_1 = require("../Service/EstoqueService");
const estoqueService = new EstoqueService_1.EstoqueService();
function cadastrarEstoque(req, res) {
    try {
        const novoEstoque = estoqueService.cadastrarEstoque(req.body);
        res.status(201).json({
            mensagem: "Livro cadastrado no estoque com sucesso",
            Estoque: novoEstoque
        });
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
function listarEstoqueDisponivel(req, res) {
    try {
        const estoqueDisponivel = estoqueService.listarEstoqueDisponivel();
        res.status(200).json(estoqueDisponivel);
    }
    catch (error) {
        res.status(400).json({ erro: error.message || "Erro ao listar estoque disponível" });
    }
}
function ConsultarExemplarPorCodigo(req, res) {
    const { Codigo } = req.params;
    const CodigoExemplar = Number(Codigo);
    try {
        const estoque = estoqueService.ConsultarExemplarPorCodigo(CodigoExemplar);
        if (estoque) {
            res.status(200).json({
                mensagem: "Livro encontrado no estoque com sucesso",
                Estoque: estoque,
            });
        }
        else {
            res.status(404).json({
                mensagem: "Livro não encontrado no estoque",
            });
        }
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
function atualizarDispoPorCodigo(req, res) {
    const { Codigo } = req.params;
    const { disponivel } = req.body;
    const CodigoExemplar = Number(Codigo);
    try {
        const DisponibilidadeAtualizado = estoqueService.AtualizarDispoPorCodigo(CodigoExemplar, disponivel);
        if (DisponibilidadeAtualizado) {
            res.status(200).json({
                mensagem: "Exemplar atualizado com sucesso no estoque",
                Estoque: DisponibilidadeAtualizado,
            });
        }
        else {
            res.status(404).json({
                mensagem: "Exemplar não encontrado para atualização",
            });
        }
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
function RemoverExemplarPorCodigo(req, res) {
    const { Codigo } = req.params;
    const CodigoExemplar = Number(Codigo);
    try {
        const resultado = estoqueService.RemoverExemplarPorCodigo(CodigoExemplar);
        if (resultado === "Livro removido com sucesso") {
            res.status(200).json({
                mensagem: resultado,
            });
        }
        else {
            res.status(404).json({
                mensagem: resultado,
            });
        }
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
