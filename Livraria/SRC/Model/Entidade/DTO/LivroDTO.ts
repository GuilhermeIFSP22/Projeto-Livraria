export class LivroDTO {
  id?: number;
  titulo: string;
  autor: string;
  editora: string;
  edicao: string;
  isbn: string;
  CategoriaID: number;

  constructor(titulo?: string,autor?: string,editora?: string,edicao?: string,isbn?: string,CategoriaID?: number,id?: number) {
    if (!titulo || !autor || !editora || !edicao || !isbn || !CategoriaID) {
      throw new Error("Informações incompletas para o cadastro do livro.");
    }

    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.edicao = edicao;
    this.isbn = isbn;
    this.CategoriaID = CategoriaID;

    if (id !== undefined) {
      this.id = id;
    }
  }
}