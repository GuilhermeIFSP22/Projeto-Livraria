import {Request, Response} from "express";
import { LivroService } from "../Service/LivroService";

const livroService = new LivroService;

export function cadastrarLivro (req:Request, res:Response){
    try{
        const novoLivro = livroService.cadastrarLivro(req.body);
        res.status(201).json(
            {
                mensagem: "Livro cadastrado com sucesso",
                Livro : novoLivro
            }
        );
    }catch(error:any) {
        res.status(400).json({mensagem: error.mensagem});
    }
}

export function listarLivros(req: Request, res: Response) {
        try {
            const filtros = req.query;
            const Lista = livroService.listarLivros(filtros);
            res.status(200).json({
                mensagem: "Livros encontrados com sucesso",
                Livros: Lista,
            });
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
    
    
    export function ConsultarLivroPorISBN(req: Request, res: Response) {
        const { ISBN } = req.params; 
    
        try {
            const livro = livroService.ConsultarLivroPorISBN(ISBN)
    
            if (livro) {
                res.status(200).json({
                    mensagem: "Livro encontrado com sucesso",
                    Livro: livro,
                });
            } else {
                res.status(404).json({
                    mensagem: "Livro não encontrado",
                });
            }
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
    
    
    export function atualizarLivroPorISBN(req: Request, res: Response) {
        const { ISBN } = req.params; 
        const { titulo, autor, editora, edicao, CategoriaID } = req.body;
    
        try {
            const livroAtualizado = livroService.AtualizarLivroPorISBN(ISBN,titulo, autor, editora, edicao, CategoriaID)
    
            if (livroAtualizado) {
                res.status(200).json({
                    mensagem: "Livro atualizado com sucesso",
                    Livro: livroAtualizado,
                });
            } else {
                res.status(404).json({
                    mensagem: "Livro não encontrado para atualização",
                });
            }
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
    
   
    export function removerLivroPorISBN(req: Request, res: Response) {
        const { ISBN } = req.params; 
    
        try {
            const resultado = livroService.RemoverLivroPorISBN(ISBN);
    
            if (resultado === "Livro removido com sucesso") {
                res.status(200).json({
                    mensagem: resultado,
                });
            } else {
                res.status(404).json({
                    mensagem: resultado,
                });
            }
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
}