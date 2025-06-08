import { Emprestimo } from "../Model/Emprestimo";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";

export class EmprestimoService {
  private emprestimoRepository = EmprestimoRepository.getInstance();

  listarEmprestimos(): Emprestimo[] {
    return this.emprestimoRepository.listarEmprestimos();
  }

  registrarEmprestimo(data_emprestimo: Date, UsuarioID: number, EstoqueID: number): Emprestimo {
    const novoEmprestimo = new Emprestimo(data_emprestimo, UsuarioID, EstoqueID);
    this.emprestimoRepository.RegistrarEmprestimo(novoEmprestimo);
    return novoEmprestimo;
  }

  registrarDevolucao(idEmprestimo: number, dataEntrega: Date): Emprestimo | undefined {
    return this.emprestimoRepository.registrarDevolucao(idEmprestimo, dataEntrega);
  }
}
