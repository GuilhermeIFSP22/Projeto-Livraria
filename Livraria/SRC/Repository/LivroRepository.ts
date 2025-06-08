import { Livro } from "../Model/Livro";
 
 export class LivroRepository{
     
     private static instance: LivroRepository | null = null;
     private ListaLivros: Livro[] = [];
 
     private constructor() {}
 
     public static getInstance(): LivroRepository {
         if (!this.instance) {
             this.instance = new LivroRepository();
         }
         return this.instance;
     }
 
       cadastrarLivro (Livro : Livro){
         this.ListaLivros.push(Livro);
       }
     
        listarLivros(filtros: { 
            id?: number, 
            titulo?: string, 
            autor?: string, 
            editora?: string, 
            edicao?: string, 
            isbn?: string, 
            CategoriaID?: number 
        } = {}): Livro[] {
            return this.ListaLivros.filter((livro) =>
                (filtros.id == null || livro.id === filtros.id) &&
                (!filtros.titulo || livro.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())) &&
                (!filtros.autor || livro.autor.toLowerCase().includes(filtros.autor.toLowerCase())) &&
                (!filtros.editora || livro.editora.toLowerCase().includes(filtros.editora.toLowerCase())) &&
                (!filtros.edicao || livro.edicao.toLowerCase().includes(filtros.edicao.toLowerCase())) &&
                (!filtros.isbn || livro.isbn.toLowerCase().includes(filtros.isbn.toLowerCase())) &&
                (filtros.CategoriaID == null || livro.CategoriaID === filtros.CategoriaID)
            );
  }
 
       filtrarLivroPorISBN (ISBN:string) : Livro | undefined {
         return this.ListaLivros.find (Livro => Livro.isbn === ISBN);
       }
 
       atualizarLivroPorISBN (LivroAtualizado:Livro) : Livro | undefined {
         const index = this.ListaLivros.findIndex (Livro => Livro.isbn === LivroAtualizado.isbn)
         if (index !== -1) {
           this.ListaLivros[index] = LivroAtualizado;
           return this.ListaLivros[index];
         }
         return undefined;
     }
 
     removerLivroPorISBN(ISBN: string) : boolean {
       const index = this.ListaLivros.findIndex (Livro => Livro.isbn === ISBN);
 
         if (index !== -1) {
           
           this.ListaLivros.splice(index, 1);
           return true
         }
         return false
       }
 }