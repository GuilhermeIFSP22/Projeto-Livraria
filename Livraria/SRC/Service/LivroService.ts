import { Livro } from "../Model/Livro";
import { LivroRepository } from "../Repository/LivroRepository";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { EstoqueRepository } from "../Repository/EstoqueRepository";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";
import { CatLivroRepository } from "../Repository/CatLivroRepository";

type LivroResposta = {
    id : number;
    titulo: string;
    autor: string;
    editora: string;
    edicao: string;
    isbn:String;
    categoria: String;
};


export class LivroService{

    private LivroRepository : LivroRepository = LivroRepository.getInstance();
    private estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
    private emprestimoRepository: EmprestimoRepository = EmprestimoRepository.getInstance();
    private CatLivroRepository = CatLivroRepository.getInstance();

        async cadastrarLivro (LivroData:any) : Promise<LivroResposta> {
            const {titulo, autor, editora, edicao,isbn, categoria} = LivroData;
            const livrosExistentes = this.LivroRepository.listarLivros();
            const livroDuplicado = livrosExistentes.find(l =>
                l.autor === autor && l.editora === editora && l.edicao === edicao
            );

            if (livroDuplicado) {
                throw new Error("Já existe um livro cadastrado com essa combinação de autor, editora e edição.");
            }

            const categoriaInfo = await this.CatLivroRepository.buscarCatLivroPorID(categoria);
                if (!categoriaInfo) {
                throw new Error("Categoria inválida.");
            }
            const novoLivro = new Livro (titulo,autor,editora,edicao,isbn,categoria);
            this.LivroRepository.cadastrarLivro(novoLivro);

            return {
                id : novoLivro.id,
                titulo: novoLivro.titulo,
                autor: novoLivro.autor,
                editora: novoLivro.editora,
                edicao: novoLivro.edicao,
                isbn: novoLivro.isbn,
                categoria: categoriaInfo.nome,
            };
        }

        async listarLivros(filtros: { 
                id?: number; 
                titulo?: string; 
                autor?: string; 
                editora?: string; 
                edicao?: string; 
                isbn?: string; 
                CategoriaID?: number 
            } = {}): Promise<LivroResposta[]> {
            
            const livrosData = this.LivroRepository.listarLivros(filtros);

            const livrosInstanciados = livrosData.map(l =>
                new Livro(l.titulo, l.autor, l.editora, l.edicao, l.isbn, l.CategoriaID)
            );

            return Promise.all(
                livrosInstanciados.map(async (livro) => {
                const categoria = await this.CatLivroRepository.buscarCatLivroPorID(livro.CategoriaID);
                return {
                    id: livro.id,
                    titulo: livro.titulo,
                    autor: livro.autor,
                    editora: livro.editora,
                    edicao: livro.edicao,
                    isbn: livro.isbn,
                    categoria: categoria?.nome || "Categoria desconhecida",
                };
                })
            );
            }

          async ConsultarLivroPorISBN(ISBN: any): Promise <any | undefined> {
            const Livro = this.LivroRepository.filtrarLivroPorISBN(ISBN);

            if (!Livro) return undefined;

            const categoria = await this.CatLivroRepository.buscarCatLivroPorID(Livro.CategoriaID);

            return {
            titulo: Livro.titulo,
            autor: Livro.autor,
            editora: Livro.editora,
            edicao: Livro.edicao,
            isbn: Livro.isbn,
            categoria: categoria?.nome
         };
    }

    AtualizarLivroPorISBN(ISBN:any, titulo?:string, autor?:string, editora?:string, edicao?:string, CategoriaID?:number): Livro | undefined{
        
        const Livro = this.LivroRepository.filtrarLivroPorISBN(ISBN);

        if (!Livro) {
        console.log("Livro não encontrado");
        return undefined;
        }
        if (Livro){

            if(titulo) {
                Livro.titulo = titulo;
            }

            if(autor){
                Livro.autor = autor;
            }

            if(editora){
                Livro.editora = editora;
            }

            if(edicao){
                Livro.edicao = edicao;
            }

            if(CategoriaID){
                Livro.CategoriaID = CategoriaID;
            }

           return Livro;
        }
    }
    RemoverLivroPorISBN(ISBN:string) :string{

        const livro = this.LivroRepository.filtrarLivroPorISBN(ISBN);
            if (!livro) {
                return "Livro não encontrado";
            }


        const exemplar = this.estoqueRepository.listarEstoqueDisponivel()
            .find(ex => ex.LivroID === livro.id);

            if (!exemplar) {
                const removido = this.LivroRepository.removerLivroPorISBN(ISBN);
                return removido ? "Livro removido com sucesso" : "Livro não encontrado";
            }
 
        const emprestimoAtivo = this.emprestimoRepository.listarEmprestimos()
            .some(e => 
                e.EstoqueID === exemplar.Codigo && 
                (!e.data_entrega || e.data_entrega.getTime?.() === 0)
            );

            if (emprestimoAtivo) {
                return "Não é possível remover o livro, o exemplar está emprestado";
            }

        this.estoqueRepository.removerUsuarioPorCodigo(exemplar.Codigo);
        const removido = this.LivroRepository.removerLivroPorISBN(ISBN);

        return removido ? "Livro removido com sucesso" : "Livro não encontrado";
}
}
