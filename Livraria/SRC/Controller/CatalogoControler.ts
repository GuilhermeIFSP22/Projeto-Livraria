import {Request, Response} from "express";
import { CatalogoService } from "../Service/CatalogoService";

const usuarioService = new CatalogoService;

export function ConsultarCategoriaUsuario(req: Request, res: Response) {
        try {
            const CategoriaUsuario = usuarioService.ConsultarCategoriaUsuario();
            res.status(200).json({
                mensagem: "Sucesso",
                Usuarios: CategoriaUsuario,
            });
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }

export function ConsultarCategoriaLivro(req: Request, res: Response) {
        try {
            const CategoriaLivro = usuarioService.ConsultarCategoriaLivro();
            res.status(200).json({
                mensagem: "Sucesso",
                Usuarios: CategoriaLivro,
            });
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }

export function ConsultarCurso(req: Request, res: Response) {
        try {
            const Curso = usuarioService.ConsultarCurso();
            res.status(200).json({
                mensagem: "Sucesso",
                Usuarios: Curso,
            });
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }
