export class EmprestimoDTO {
  id?: number;
  data_emprestimo: Date;
  data_devolucao: Date;
  data_entrega: Date;
  dias_atraso: number;
  suspensao_ate: Date;
  UsuarioID: number;
  EstoqueID: number;
  CPF: string;

  constructor(data_emprestimo?: Date,UsuarioID?: number,EstoqueID?: number, CPF?: string,id?: number) {

    if (!data_emprestimo || !(data_emprestimo instanceof Date) || isNaN(data_emprestimo.getTime())) {
      throw new Error("Data de empréstimo inválida");
    }

    const hoje = new Date();
    if (data_emprestimo > hoje) {
      throw new Error("Data de empréstimo não pode ser futura");
    }

    if (!UsuarioID || UsuarioID <= 0) {
      throw new Error("ID do usuário inválido");
    }

    if (!EstoqueID || EstoqueID <= 0) {
      throw new Error("ID do exemplar inválido");
    }

     if (!CPF || CPF.trim() === "") {
      throw new Error("CPF inválido");
    }

    this.data_emprestimo = data_emprestimo;
    this.data_devolucao = new Date(0);
    this.data_entrega = new Date(0);
    this.dias_atraso = 0;
    this.suspensao_ate = new Date(0);
    this.UsuarioID = UsuarioID;
    this.EstoqueID = EstoqueID;
    this.CPF = CPF;

    if (id !== undefined) {
      this.id = id;
    }
  }
}
