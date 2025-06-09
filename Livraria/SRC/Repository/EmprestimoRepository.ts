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

    const dataLimite = new Date(emprestimo.data_emprestimo);
    dataLimite.setDate(dataLimite.getDate() + 7);

    if (dataEntrega > dataLimite) {
        const diasAtraso = Math.ceil((dataEntrega.getTime() - dataLimite.getTime()) / (1000 * 3600 * 24));
        emprestimo.dias_atraso = diasAtraso;

        const dataSuspensao = new Date(dataEntrega);
        dataSuspensao.setDate(dataEntrega.getDate() + diasAtraso);
        emprestimo.suspensao_ate = dataSuspensao;
    } else {
        emprestimo.dias_atraso = 0;
        emprestimo.suspensao_ate = new Date(0);
    }

    return emprestimo;
}
}
