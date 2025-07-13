import { executarComandoSQL } from "../DataBase/mysql";

export class CatLivroRepository {
  private static instance: CatLivroRepository;

  private constructor() {
    this.createTable();
  }

  public static getInstance(): CatLivroRepository {
    if (!this.instance) {
      this.instance = new CatLivroRepository();
    }
    return this.instance;
  }

  private async createTable() {
    try {
      await executarComandoSQL(`
        CREATE TABLE IF NOT EXISTS Livraria.CategoriaLivro (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL UNIQUE
        )
      `, []);

      await executarComandoSQL(`
        INSERT IGNORE INTO Livraria.CategoriaLivro (nome) VALUES
        ('Romance'),
        ('Computação'),
        ('Letras'),
        ('Gestão')
      `, []);

      console.log("Tabela CategoriaLivro criada e categorias padrão inseridas.");
    } catch (err) {
      console.error("Erro ao criar a tabela CategoriaLivro:", err);
    }
  }

  async listarCatLivro(): Promise<{ id: number; nome: string }[]> {
    const query = `SELECT * FROM Livraria.CategoriaLivro`;
    const resultados = await executarComandoSQL(query, []);
    return resultados;
  }

  async buscarCatLivroPorID(id: number): Promise<{ id: number; nome: string } | undefined> {
    const query = `SELECT * FROM Livraria.CategoriaLivro WHERE id = ?`;
    const resultados = await executarComandoSQL(query, [id]);
    return resultados[0] ?? undefined;
  }

  async buscarCatLivroPorNome(nome: string): Promise<{ id: number; nome: string } | undefined> {
    const query = `SELECT * FROM Livraria.CategoriaLivro WHERE LOWER(nome) = LOWER(?)`;
    const resultados = await executarComandoSQL(query, [nome]);
    return resultados[0] ?? undefined;
  }
}