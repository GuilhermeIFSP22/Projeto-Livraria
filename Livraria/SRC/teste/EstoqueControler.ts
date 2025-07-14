import {Request, Response} from "express";
import { EstoqueService } from "../Service/EstoqueService";

const estoqueService = new EstoqueService();

    export async function cadastrarEstoque (req:Request, res:Response){
        try{
            const novoEstoque = await estoqueService.cadastrarEstoque(req.body);
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

    export async function listarEstoqueDisponivel(req: Request, res: Response){
            try {
                const estoqueDisponivel = await estoqueService.listarEstoqueDisponivel();
                res.status(200).json(estoqueDisponivel);
            } catch (error: any) {
                res.status(400).json({ erro: error.message || "Erro ao listar estoque disponível" });
            }
        }
    
    
    export async function ConsultarExemplarPorCodigo(req: Request, res: Response) {
       const { Codigo } = req.params; 
       const CodigoExemplar = Number(Codigo);
    
        try {
            const estoque = await estoqueService.ConsultarExemplarPorCodigo(CodigoExemplar);
    
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
    
    
    export async function atualizarDispoPorCodigo(req: Request, res: Response) {
        const { Codigo } = req.params; 
        const { disponivel } = req.body;
        const CodigoExemplar = Number(Codigo);
    
        try {
            const DisponibilidadeAtualizado = await estoqueService.AtualizarDispoPorCodigo(CodigoExemplar,disponivel)
    
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
    
   
    export async function RemoverExemplarPorCodigo(req: Request, res: Response) {
       const { Codigo } = req.params;
       const CodigoExemplar = Number(Codigo); 
    
        try {
            const resultado = await estoqueService.RemoverExemplarPorCodigo(CodigoExemplar);
    
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