import { Request, Response } from "express";
import { UsuarioService } from "../Service/UsuarioService";

const usuarioService = new UsuarioService();

export async function CadastrarUsuario(req: Request, res: Response) {
  try {
    const novoUsuario = await usuarioService.cadastrarUsuario(req.body);
    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      Usuario: novoUsuario
    });
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
}

export async function ConsultarUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await usuarioService.consultarUsuarios();
    res.status(200).json({
      mensagem: "Usuários encontrados com sucesso",
      Usuarios: usuarios
    });
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
}

export async function ConsultarUsuarioPorCPF(req: Request, res: Response) {
  const { CPF } = req.params;

  try {
    const usuario = await usuarioService.consultarUsuarioPorCPF(CPF);

    if (usuario) {
      res.status(200).json({
        mensagem: "Usuário encontrado com sucesso",
        Usuario: usuario
      });
    } else {
      res.status(404).json({
        mensagem: "Usuário não encontrado"
      });
    }
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
}

export async function AtualizarUsuarioPorCPF(req: Request, res: Response) {
  const { CPF } = req.params;
  const { nome, CursoNome, categoriaNome} = req.body;

  try {
    const usuarioAtualizado = await usuarioService.atualizarUsuarioPorCPF(CPF, nome, CursoNome, categoriaNome);

    if (usuarioAtualizado) {
      res.status(200).json({
        mensagem: "Usuário atualizado com sucesso",
        Usuario: usuarioAtualizado
      });
    } else {
      res.status(404).json({
        mensagem: "Usuário não encontrado para atualização"
      });
    }
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
}

export async function RemoverUsuarioPorCPF(req: Request, res: Response) {
  const { CPF } = req.params;

  try {
    const resultado = await usuarioService.removerUsuarioPorCPF(CPF);

    const statusCode = resultado === "Usuário removido com sucesso" ? 200 : 404;

    res.status(statusCode).json({ mensagem: resultado });
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
}