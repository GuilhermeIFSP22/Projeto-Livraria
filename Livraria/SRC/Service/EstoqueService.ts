import { Estoque } from "../Model/Estoque";
import { EstoqueRepository } from "../Repository/EstoqueRepository";
import { LivroRepository } from "../Repository/LivroRepository";

export class EstoqueService{

    EstoqueRepository : EstoqueRepository = EstoqueRepository.getInstance();
    livroRepository = LivroRepository.getInstance();

    cadastrarEstoque(EstoqueData: any): Estoque {
        const { quantidade, quantidade_emprestada, CodigoExemplar, ISBN, disponivel } = EstoqueData;

        if (!ISBN || CodigoExemplar === undefined) {
            throw new Error("Campos obrigatórios ausentes: ISBN do livro e código do exemplar");
        }

        const livro = this.livroRepository.filtrarLivroPorISBN(ISBN);
        if (!livro) {
            throw new Error("Livro com o ISBN fornecido não encontrado");
        }

        const exemplarExistente = this.EstoqueRepository.filtrarExemplarPorCodigo(CodigoExemplar);
        if (exemplarExistente) {
            throw new Error("Já existe um exemplar com esse código");
        }

        const novoEstoque = new Estoque(
            quantidade ?? 1,
            quantidade_emprestada ?? 0,
            CodigoExemplar,
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


    ConsultarExemplarPorCodigo(CodigoExemplar: any): any | undefined {
        return this.EstoqueRepository.filtrarExemplarPorCodigo(CodigoExemplar);
    }

    AtualizarDispoPorCodigo(CodigoExemplar: number, disponivel: boolean): Estoque | undefined {

        const exemplar = this.EstoqueRepository.filtrarExemplarPorCodigo(CodigoExemplar);
        if (!exemplar) {
            console.log("Exemplar não encontrado");
            return undefined;
        }

        exemplar.disponivel = disponivel;

        return this.EstoqueRepository.atualizarDispoExemplarPorCodigo(CodigoExemplar, disponivel);
    }

    RemoverExemplarPorCodigo(CodigoExemplar:number) :string{

            const Estoque = this.EstoqueRepository.removerUsuarioPorCodigo(CodigoExemplar)
    
            if (Estoque) {
                return "Usuário removido com sucesso";
                
            } else {
                return "Usuário não encontrado";
            }
    }
}