import { Request, Response } from "express";
import { EmprestimoService } from "../Service/EmprestimoService";

const emprestimoService = new EmprestimoService();

  export function registrarEmprestimo(req: Request, res: Response): void {
    try {
      const { data_emprestimo,CPF, UsuarioID, EstoqueID } = req.body;

      if (!data_emprestimo || !UsuarioID || !EstoqueID) {
        res.status(400).json({ mensagem: "Campos obrigatórios: data_emprestimo,CPF, UsuarioID, EstoqueID" });
        return;
      }

      const novoEmprestimo = emprestimoService.registrarEmprestimo(new Date(data_emprestimo),CPF, UsuarioID, EstoqueID);
      res.status(201).json({ mensagem: "Empréstimo registrado com sucesso", emprestimo: novoEmprestimo });
    } catch (error: any) {
      res.status(500).json({ mensagem: error.message || "Erro ao registrar empréstimo" });
    }
  }

  export function listarEmprestimos(req: Request, res: Response): void {
    try {
      const lista = emprestimoService.listarEmprestimos();
      res.status(200).json(lista);
    } catch (error: any) {
      res.status(500).json({ mensagem: error.message || "Erro ao listar empréstimos" });
    }
  }

  export function registrarDevolucao(req: Request, res: Response): void {
    try {
      const idEmprestimo = Number(req.params.id);
      const { dataEntrega } = req.body;

      if (!dataEntrega) {
        res.status(400).json({ mensagem: "Campo obrigatório: dataEntrega" });
        return;
      }

      const emprestimoAtualizado = emprestimoService.registrarDevolucao(idEmprestimo, new Date(dataEntrega));
      if (!emprestimoAtualizado) {
        res.status(404).json({ mensagem: "Empréstimo não encontrado" });
        return;
      }

      res.status(200).json({ mensagem: "Devolução registrada com sucesso", emprestimo: emprestimoAtualizado });
    } catch (error: any) {
      res.status(500).json({ mensagem: error.message || "Erro ao registrar devolução" });
    }
  }