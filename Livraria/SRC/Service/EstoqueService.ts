import { Estoque } from "../Model/Estoque";
import { EstoqueRepository } from "../Repository/EstoqueRepository";
import { LivroRepository } from "../Repository/LivroRepository";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";

export class EstoqueService{

    EstoqueRepository : EstoqueRepository = EstoqueRepository.getInstance();
    livroRepository : LivroRepository = LivroRepository.getInstance();
    emprestimoRepository : EmprestimoRepository = EmprestimoRepository.getInstance();
    
    async cadastrarEstoque(EstoqueData: any): Promise<Estoque> {
        const { quantidade, quantidade_emprestada, ISBN, disponivel } = EstoqueData;

        if (!ISBN === undefined) {
            throw new Error("Campos obrigatórios ausentes: ISBN do livro e código do exemplar");
        }

        const livro = await this.livroRepository.filtrarLivroPorISBN(ISBN);
        if (!livro) {
            throw new Error("Livro com o ISBN fornecido não encontrado");
        }
        
        const novoEstoque = new Estoque(
            quantidade ?? 1,
            quantidade_emprestada ?? 0,
            livro.id,
            disponivel
            
        );

        await this.EstoqueRepository.cadastrarEstoque(novoEstoque);

        return novoEstoque;
    }

     async listarEstoqueDisponivel(): Promise<Estoque[]> {
        const todosEstoques = await this.EstoqueRepository.listarEstoqueDisponivel();
        return todosEstoques.filter(estoque => estoque.disponivel === true);
    }


    async ConsultarExemplarPorCodigo(Codigo: number): Promise<Estoque | undefined>{
        return this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
    }

    async AtualizarDispoPorCodigo(Codigo: number, disponivel: boolean): Promise<Estoque | undefined> {

        const exemplar = await this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
        if (!exemplar) {
            console.log("Exemplar não encontrado");
            return undefined;
        }

        exemplar.disponivel = disponivel;

        return await this.EstoqueRepository.atualizarDispoExemplarPorCodigo(Codigo, disponivel);
    }

    async RemoverExemplarPorCodigo(Codigo:number) :Promise<string>{

             const exemplar = this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);

        if (!exemplar) {
            return "Exemplar não encontrado";
        }

        const emprestimoAtivo = this.emprestimoRepository.listarEmprestimos()
            .some(e =>
                e.EstoqueID === Codigo &&
                (!e.data_entrega || e.data_entrega.getTime?.() === 0)
            );

        if (emprestimoAtivo) {
            return "Não é possível remover o exemplar, ele está emprestado";
        }
        
        const removido = await this.EstoqueRepository.removerUsuarioPorCodigo(Codigo);
        return removido ? "Exemplar removido com sucesso" : "Erro ao remover exemplar";
    }
}
