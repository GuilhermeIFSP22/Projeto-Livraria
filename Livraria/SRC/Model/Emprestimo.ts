export class Emprestimo{
 
     private static ultimoID : number = 0;
 
     id: number;
     data_emprestimo : Date;
     data_devolucao : Date;
     data_entrega : Date;
     dias_atraso : number;
     suspensao_ate : Date;
     UsuarioID : number;
     EstoqueID: number;
     
     constructor(data_emprestimo:Date, UsuarioID:number,EstoqueID:number){
         this.data_emprestimo = data_emprestimo;
         this.id = Emprestimo.incrementarID();
         this.UsuarioID = UsuarioID;
         this.EstoqueID = EstoqueID;
         this.data_devolucao = new Date(0);
         this.data_entrega = new Date(0);
         this.dias_atraso = 0;
         this.suspensao_ate = new Date(0);
         
     }
     private static incrementarID(): number {
         return ++Emprestimo.ultimoID;
     }
  
 }