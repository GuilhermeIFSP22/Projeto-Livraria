import { executarComandoSQL } from "../DataBase/mysql";

export class CatUsuarioRepository {
  private static instance: CatUsuarioRepository;

  private constructor() {
    this.createTable();
  }

  public static getInstance(): CatUsuarioRepository {
    if (!this.instance) {
      this.instance = new CatUsuarioRepository();
    }
    return this.instance;
  }

  private async createTable() {
    try {
      await executarComandoSQL(`
        CREATE TABLE IF NOT EXISTS Livraria.CategoriaUsuario (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL UNIQUE
        )
      `, []);

      await executarComandoSQL(`
        INSERT IGNORE INTO Livraria.CategoriaUsuario (nome) VALUES
        ('Professor'),
        ('Aluno'),
        ('Bibliotecário')
      `, []);

      console.log("Tabela CategoriaUsuario criada e categorias padrão inseridas.");
    } catch (err) {
      console.error("Erro ao criar a tabela CategoriaUsuario:", err);
    }
  }

  async listarCategorias(): Promise<{ id: number; nome: string }[]> {
    const query = `SELECT * FROM Livraria.CategoriaUsuario`;
    const resultados = await executarComandoSQL(query, []);
    return resultados;
  }

  async buscarCategoriaPorID(id: number): Promise<{ id: number; nome: string } | undefined> {
    const query = `SELECT * FROM Livraria.CategoriaUsuario WHERE id = ?`;
    const resultados = await executarComandoSQL(query, [id]);
    if (resultados.length === 0) return undefined;
    return resultados[0];
  }

  async buscarCategoriaPorNome(nome: string): Promise<{ id: number; nome: string } | undefined> {
    const query = `SELECT * FROM Livraria.CategoriaUsuario WHERE LOWER(nome) = LOWER(?)`;
    const resultados = await executarComandoSQL(query, [nome]);
    if (resultados.length === 0) return undefined;
    return resultados[0];
  }
}
