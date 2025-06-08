import {Request, Response} from "express";
import { EstoqueService } from "../Service/EstoqueService";

const estoqueService = new EstoqueService();

    export function cadastrarEstoque (req:Request, res:Response){
        try{
            const novoEstoque = estoqueService.cadastrarEstoque(req.body);
            res.status(201).json(
                {
                    mensagem: "Livro cadastrado no estoque com sucesso",
                    Estoque : novoEstoque
                }
            );
        }catch(error:any) {
            res.status(400).json({mensagem: error.message});
        }
    }

    export function listarEstoqueDisponivel(req: Request, res: Response): void {
            try {
                const estoqueDisponivel = estoqueService.listarEstoqueDisponivel();
                res.status(200).json(estoqueDisponivel);
            } catch (error: any) {
                res.status(400).json({ erro: error.message || "Erro ao listar estoque disponível" });
            }
        }
    
    
    export function ConsultarExemplarPorCodigo(req: Request, res: Response) {
        const CodigoExemplar = Number(req.params.CodigoExemplar); 
    
        try {
            const estoque = estoqueService.ConsultarExemplarPorCodigo(CodigoExemplar);
    
            if (estoque) {
                res.status(200).json({
                    mensagem: "Livro encontrado no estoque com sucesso",
                    Estoque: estoque,
                });
            } else {
                res.status(404).json({
                    mensagem: "Livro não encontrado no estoque",
                });
            }
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
    
    
    export function atualizarDispoPorCodigo(req: Request, res: Response) {
        const CodigoExemplar = Number(req.params.CodigoExemplar); 
        const { disponivel } = req.body;
    
        try {
            const DisponibilidadeAtualizado = estoqueService.AtualizarDispoPorCodigo(CodigoExemplar,disponivel)
    
            if (DisponibilidadeAtualizado) {
                res.status(200).json({
                    mensagem: "Exemplar atualizado com sucesso no estoque",
                    Estoque: DisponibilidadeAtualizado,
                });
            } else {
                res.status(404).json({
                    mensagem: "Exemplar não encontrado para atualização",
                });
            }
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
    
   
    export function RemoverExemplarPorCodigo(req: Request, res: Response) {
       const CodigoExemplar = Number(req.params.CodigoExemplar); 
    
        try {
            const resultado = estoqueService.RemoverExemplarPorCodigo(CodigoExemplar);
    
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