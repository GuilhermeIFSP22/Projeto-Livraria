import { Estoque } from "../Model/Estoque";
import { Livro } from "../Model/Livro";

export class EstoqueRepository{
    
    private static instance: EstoqueRepository | null = null;
    private ListaEstoque: Estoque[] = [];

    private constructor() {}

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }

      cadastrarEstoque (Estoque : Estoque){
        this.ListaEstoque.push(Estoque);
      }
    
      listarEstoqueDisponivel () : Estoque[] {
        return this.ListaEstoque;
      }

      filtrarExemplarPorCodigo (CodigoExemplar:number) : Estoque | undefined {
        return this.ListaEstoque.find (Estoque => Estoque.CodigoExemplar === CodigoExemplar);
      }

      atualizarDispoExemplarPorCodigo (CodigoExemplar:number, disponivel:boolean) : Estoque | undefined {
        const index = this.ListaEstoque.findIndex (Estoque => Estoque.CodigoExemplar === CodigoExemplar)
        if (index !== -1) {
          this.ListaEstoque[index].disponivel = disponivel;
          return this.ListaEstoque[index];
        }
        return undefined;
    }

    removerUsuarioPorCodigo(CodigoExemplar: number) : boolean {
      const index = this.ListaEstoque.findIndex (Estoque => Estoque.CodigoExemplar === CodigoExemplar);

        if (index !== -1) {
          
          this.ListaEstoque.splice(index, 1);
          return true
        }
        return false
      }
}