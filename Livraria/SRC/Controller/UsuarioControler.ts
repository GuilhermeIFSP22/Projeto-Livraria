import {Request, Response} from "express";
import { UsuarioService } from "../Service/UsuarioService";

const usuarioService = new UsuarioService;

export function CadastrarUsuario (req:Request, res:Response){
    try{
        const novoUsuario = usuarioService.CadastrarUsuario(req.body);
        res.status(201).json(
            {
                mensagem: "Usuário cadastrado com sucesso",
                Usuario : novoUsuario
            }
        );
    }catch(error:any) {
        res.status(400).json({mensagem: error.mensagem});
    }
}

export function ConsultarUsuarios(req: Request, res: Response) {
        try {
            const usuarios = usuarioService.ConsultarUsuarios();
            res.status(200).json({
                mensagem: "Usuários encontrados com sucesso",
                Usuarios: usuarios,
            });
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
    
    
    export function ConsultarUsuarioPorCPF(req: Request, res: Response) {
        const { CPF } = req.params; 
    
        try {
            const usuario = usuarioService.ConsultarUsuarioPorCPF(CPF);
    
            if (usuario) {
                res.status(200).json({
                    mensagem: "Usuário encontrado com sucesso",
                    Usuario: usuario,
                });
            } else {
                res.status(404).json({
                    mensagem: "Usuário não encontrado",
                });
            }
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
    
    
    export function AtualizarUsuarioPorCPF(req: Request, res: Response) {
        const { CPF } = req.params; 
        const { nome, CursoID, CatUsuID } = req.body;
    
        try {
            const usuarioAtualizado = usuarioService.AtualizarUsuarioPorCPF(CPF, nome, CursoID, CatUsuID);
    
            if (usuarioAtualizado) {
                res.status(200).json({
                    mensagem: "Usuário atualizado com sucesso",
                    Usuario: usuarioAtualizado,
                });
            } else {
                res.status(404).json({
                    mensagem: "Usuário não encontrado para atualização",
                });
            }
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
    
   
    export function RemoverUsuarioPorCPF(req: Request, res: Response) {
        const { CPF } = req.params; 
    
        try {
            const resultado = usuarioService.RemoverUsuarioPorCPF(CPF);
    
            if (resultado === "Usuário removido com sucesso") {
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