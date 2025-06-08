import { Livro } from "../Model/Livro";
import { LivroRepository } from "../Repository/LivroRepository";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { EstoqueRepository } from "../Repository/EstoqueRepository";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";

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

    LivroRepository : LivroRepository = LivroRepository.getInstance();
    estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
    emprestimoRepository: EmprestimoRepository = EmprestimoRepository.getInstance();

        cadastrarLivro (LivroData:any) : LivroResposta {
            const {titulo, autor, editora, edicao,isbn, categoria} = LivroData;
            if(!titulo || !isbn || !autor || !editora || !edicao || !isbn || !categoria){
                throw new Error ("Informações incompletas");
            }

            const livrosExistentes = this.LivroRepository.listarLivros();
            const livroDuplicado = livrosExistentes.find(l =>
                l.autor === autor && l.editora === editora && l.edicao === edicao
            );

            if (livroDuplicado) {
                throw new Error("Já existe um livro cadastrado com essa combinação de autor, editora e edição.");
            }

            // Verifica se a categoria é válida
            const nomeCategoria = CategoriaLivro.buscarNomePorID(categoria);
            if (!nomeCategoria) {
                throw new Error("Categoria inválida.");
            }

            const novoLivro = new Livro (titulo,autor,editora,edicao,isbn,categoria);
            this.LivroRepository.cadastrarLivro(novoLivro);

            const CatLivro = CategoriaLivro.buscarNomePorID(categoria);

            return {
                id : novoLivro.id,
                titulo: novoLivro.titulo,
                autor: novoLivro.autor,
                editora: novoLivro.editora,
                edicao: novoLivro.edicao,
                isbn: novoLivro.isbn,
                categoria: CatLivro
            };
        }

        listarLivros(filtros: { 
                id?: number; 
                titulo?: string; 
                autor?: string; 
                editora?: string; 
                edicao?: string; 
                isbn?: string; 
                CategoriaID?: number 
            } = {}): LivroResposta[] {
            
            const Livro =  this.LivroRepository.listarLivros(filtros);

              return Livro.map(livro => {
                const nomeCategoria = CategoriaLivro.buscarNomePorID(livro.CategoriaID);
                
                return {
                id : livro.id,
                titulo: livro.titulo,
                autor: livro.autor,
                editora: livro.editora,
                edicao: livro.edicao,
                isbn: livro.isbn,
                categoria: nomeCategoria || "Categoria desconhecida"
                };
            });
        }


          ConsultarLivroPorISBN(ISBN: any): any | undefined {
            const Livro = this.LivroRepository.filtrarLivroPorISBN(ISBN);

              if (!Livro) return undefined;

            const CatLivro = CategoriaLivro.buscarNomePorID(Livro.CategoriaID);

            return {
            titulo: Livro.titulo,
            autor: Livro.autor,
            editora: Livro.editora,
            edicao: Livro.edicao,
            isbn: Livro.isbn,
            categoria: CatLivro
         };
    }

    AtualizarLivroPorISBN(ISBN:any, titulo?:string, autor?:string, editora?:string, edicao?:string, CategoriaID?:number): Livro | undefined{
        
        const Livro = this.LivroRepository.atualizarLivroPorISBN(ISBN);

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

            return this.LivroRepository.atualizarLivroPorISBN(ISBN);
      }

      console.log("Livro não encontrado");
      return undefined;
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
                e.EstoqueID === exemplar.CodigoExemplar && 
                (!e.data_entrega || e.data_entrega.getTime?.() === 0)
            );

            if (emprestimoAtivo) {
                return "Não é possível remover o livro, o exemplar está emprestado";
            }

        this.estoqueRepository.removerUsuarioPorCodigo(exemplar.CodigoExemplar);
        const removido = this.LivroRepository.removerLivroPorISBN(ISBN);

        return removido ? "Livro removido com sucesso" : "Livro não encontrado";
}
}
