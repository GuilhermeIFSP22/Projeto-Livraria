import { Request, Response } from "express";
import { EmprestimoService } from "../Service/EmprestimoService";

const emprestimoService = new EmprestimoService();

 export async function registrarEmprestimo(req: Request, res: Response): Promise<void> {
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
  } catch (error: any) {
    console.error("Erro no controller registrarEmprestimo:", error);
    res.status(400).json({ mensagem: error.message || "Erro ao registrar empréstimo." });
  }
}

  export async function listarEmprestimos(req: Request, res: Response): Promise<void> {
    try {
      const lista = await emprestimoService.listarEmprestimos();
      res.status(200).json(lista);
    } catch (error: any) {
      res.status(500).json({ mensagem: error.message || "Erro ao listar empréstimos" });
    }
  }

  export async function registrarDevolucao(req: Request, res: Response): Promise<void> {
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
    } catch (error: any) {
      res.status(500).json({ mensagem: error.message || "Erro ao registrar devolução." });
    }
}

