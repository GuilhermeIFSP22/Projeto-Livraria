import { Estoque } from "../Model/Estoque";
import { EstoqueRepository } from "../Repository/EstoqueRepository";
import { LivroRepository } from "../Repository/LivroRepository";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";

export class EstoqueService{

    EstoqueRepository : EstoqueRepository = EstoqueRepository.getInstance();
    livroRepository : LivroRepository = LivroRepository.getInstance();
    emprestimoRepository : EmprestimoRepository = EmprestimoRepository.getInstance();
    
    cadastrarEstoque(EstoqueData: any): Estoque {
        const { quantidade, quantidade_emprestada, Codigo, ISBN, disponivel } = EstoqueData;

        if (!ISBN || Codigo === undefined) {
            throw new Error("Campos obrigatórios ausentes: ISBN do livro e código do exemplar");
        }

        const livro = this.livroRepository.filtrarLivroPorISBN(ISBN);
        if (!livro) {
            throw new Error("Livro com o ISBN fornecido não encontrado");
        }

        const exemplarExistente = this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
        if (exemplarExistente) {
            throw new Error("Já existe um exemplar com esse código");
        }

        const novoEstoque = new Estoque(
            quantidade ?? 1,
            quantidade_emprestada ?? 0,
            Codigo,
            livro.id
        );

        novoEstoque.disponivel = disponivel ?? true;

        this.EstoqueRepository.cadastrarEstoque(novoEstoque);

        return novoEstoque;
    }

     listarEstoqueDisponivel(): Estoque[] {
        const todosEstoques = this.EstoqueRepository.listarEstoqueDisponivel();
        return todosEstoques.filter(estoque => estoque.disponivel === true);
    }


    ConsultarExemplarPorCodigo(Codigo: number): Estoque | undefined {
        return this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
    }

    AtualizarDispoPorCodigo(Codigo: number, disponivel: boolean): Estoque | undefined {

        const exemplar = this.EstoqueRepository.filtrarExemplarPorCodigo(Codigo);
        if (!exemplar) {
            console.log("Exemplar não encontrado");
            return undefined;
        }

        exemplar.disponivel = disponivel;

        return this.EstoqueRepository.atualizarDispoExemplarPorCodigo(Codigo, disponivel);
    }

    RemoverExemplarPorCodigo(Codigo:number) :string{

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
        
        const removido = this.EstoqueRepository.removerUsuarioPorCodigo(Codigo);
        return removido ? "Exemplar removido com sucesso" : "Erro ao remover exemplar";
    }
}
