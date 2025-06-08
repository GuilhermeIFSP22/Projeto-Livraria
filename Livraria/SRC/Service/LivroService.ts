import { Livro } from "../Model/Livro";
import { LivroRepository } from "../Repository/LivroRepository";
import { CategoriaLivro } from "../Model/CategoriaLivro";

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

        cadastrarLivro (LivroData:any) : LivroResposta {
            const {titulo, autor, editora, edicao,isbn, categoria} = LivroData;
            if(!titulo || !isbn || !autor || !editora || !edicao || !isbn || !categoria){
                throw new Error ("Informações incompletas");
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

            const usuario = this.LivroRepository.removerLivroPorISBN(ISBN)
    
            if (usuario) {
                return "Usuário removido com sucesso";
                
            } else {
                return "Usuário não encontrado";
            }
    }
}
