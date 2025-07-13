export class Emprestimo{

     id?: number;
     data_emprestimo : Date;
     data_devolucao : Date;
     data_entrega : Date;
     dias_atraso : number;
     suspensao_ate : Date;
     UsuarioID : number;
     EstoqueID: number;
     
     constructor(data_emprestimo:Date, UsuarioID:number,EstoqueID:number,id?: number){

         if (!(data_emprestimo instanceof Date) || isNaN(data_emprestimo.getTime())) {
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

         this.data_emprestimo = data_emprestimo;
         this.id = id;
         this.UsuarioID = UsuarioID;
         this.EstoqueID = EstoqueID;
         this.data_devolucao = new Date(0);
         this.data_entrega = new Date(0);
         this.dias_atraso = 0;
         this.suspensao_ate = new Date(0);
         
     }
 }