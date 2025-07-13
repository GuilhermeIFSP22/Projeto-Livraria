import { executarComandoSQL } from "../DataBase/mysql";

export class CursoRepository {

  private static instance: CursoRepository;

  private constructor() {
    this.createTable();
  }

  public static getInstance(): CursoRepository {
    if (!this.instance) {
      this.instance = new CursoRepository();
    }
    return this.instance;
  }

  async createTable() {
    try {
      await executarComandoSQL(`
        CREATE TABLE IF NOT EXISTS Livraria.Curso (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL UNIQUE
        )
      `, []);

      await executarComandoSQL(`
        INSERT IGNORE INTO Livraria.Curso (nome) VALUES
        ('ADS'),
        ('Pedagogia'),
        ('Administração')
      `, []);

      console.log("Tabela Curso criada e cursos padrão inseridos.");
    } catch (err) {
      console.error("Erro ao criar a tabela Curso:", err);
      throw err;
    }
  }

  async listarCursos(): Promise<{id: number, nome: string}[]> {
    const query = `SELECT * FROM Livraria.Curso`;
    const resultados = await executarComandoSQL(query, []);
    return resultados;
  }

  async buscarCursoPorID(id: number): Promise<{id: number, nome: string} | undefined> {
    const query = `SELECT * FROM Livraria.Curso WHERE id = ?`;
    const resultados = await executarComandoSQL(query, [id]);
    if (resultados.length === 0) return undefined;
    return resultados[0];
  }

  async buscarCursoPorNome(nome: string): Promise<{id: number, nome: string} | undefined> {
    const query = `SELECT * FROM Livraria.Curso WHERE LOWER(nome) = LOWER(?)`;
    const resultados = await executarComandoSQL(query, [nome]);
    if (resultados.length === 0) return undefined;
    return resultados[0];
  }
}