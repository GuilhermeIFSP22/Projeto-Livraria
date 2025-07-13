"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarLivro = cadastrarLivro;
exports.listarLivros = listarLivros;
exports.ConsultarLivroPorISBN = ConsultarLivroPorISBN;
exports.atualizarLivroPorISBN = atualizarLivroPorISBN;
exports.removerLivroPorISBN = removerLivroPorISBN;
const LivroService_1 = require("../Service/LivroService");
const livroService = new LivroService_1.LivroService;
function cadastrarLivro(req, res) {
    try {
        const novoLivro = livroService.cadastrarLivro(req.body);
        res.status(201).json({
            mensagem: "Livro cadastrado com sucesso",
            Livro: novoLivro
        });
    }
    catch (error) {
        res.status(400).json({ mensagem: error.mensagem });
    }
}
function listarLivros(req, res) {
    try {
        const filtros = req.query;
        const Lista = livroService.listarLivros(filtros);
        res.status(200).json({
            mensagem: "Livros encontrados com sucesso",
            Livros: Lista,
        });
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
function ConsultarLivroPorISBN(req, res) {
    const { ISBN } = req.params;
    try {
        const livro = livroService.ConsultarLivroPorISBN(ISBN);
        if (livro) {
            res.status(200).json({
                mensagem: "Livro encontrado com sucesso",
                Livro: livro,
            });
        }
        else {
            res.status(404).json({
                mensagem: "Livro não encontrado",
            });
        }
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
function atualizarLivroPorISBN(req, res) {
    const { ISBN } = req.params;
    const { titulo, autor, editora, edicao, CategoriaID } = req.body;
    try {
        const livroAtualizado = livroService.AtualizarLivroPorISBN(ISBN, titulo, autor, editora, edicao, CategoriaID);
        if (livroAtualizado) {
            res.status(200).json({
                mensagem: "Livro atualizado com sucesso",
                Livro: livroAtualizado,
            });
        }
        else {
            res.status(404).json({
                mensagem: "Livro não encontrado para atualização",
            });
        }
    }
    catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
}
function removerLivroPorISBN(req, res) {
    const { ISBN } = req.params;
    try {
        const resultado = livroService.RemoverLivroPorISBN(ISBN);
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
