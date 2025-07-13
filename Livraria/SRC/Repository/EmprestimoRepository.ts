import { Emprestimo } from "../Model/Emprestimo";

export class EmprestimoRepository {
  private static instance: EmprestimoRepository;
  private ListaEmprestimos: Emprestimo[] = [];

  private constructor() {}

  public static getInstance(): EmprestimoRepository {
    if (!EmprestimoRepository.instance) {
      EmprestimoRepository.instance = new EmprestimoRepository();
    }
    return EmprestimoRepository.instance;
  }

  RegistrarEmprestimo(emprestimo: Emprestimo): void {
    this.ListaEmprestimos.push(emprestimo);
  }

  listarEmprestimos(): Emprestimo[] {
    return this.ListaEmprestimos;
  }

  registrarDevolucao(idEmprestimo: number, dataEntrega: Date): Emprestimo | undefined {
    const emprestimo = this.ListaEmprestimos.find(e => e.id === idEmprestimo);
    if (!emprestimo) return undefined;

    if (isNaN(dataEntrega.getTime())) {
      throw new Error("Data de entrega inválida");
    }
    emprestimo.data_entrega = dataEntrega;

    return emprestimo;
  }
}
