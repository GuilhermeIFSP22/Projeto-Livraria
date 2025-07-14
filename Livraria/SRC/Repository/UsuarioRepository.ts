import { Usuario } from "../Model/Entidade/Usuario";
import { executarComandoSQL } from "../DataBase/mysql";

export class UsuarioRepository {
  private static instance: UsuarioRepository;

  private constructor() {
    this.createTable();
  }

  public static getInstance(): UsuarioRepository {
    if (!this.instance) {
      this.instance = new UsuarioRepository();
    }
    return this.instance;
  }

  private async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS Livraria.Usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        cpf VARCHAR(14) NOT NULL UNIQUE,
        status VARCHAR(20) NOT NULL,
        cursoID INT NOT NULL,
        CatUsuID INT NOT NULL
      )
    `;
    try {
      await executarComandoSQL(query, []);
      console.log("Tabela Usuario criada (ou já existia).");
    } catch (err) {
      console.error("Erro ao criar a tabela Usuario:", err);
    }
  }

  async cadastrarUsuario(usuario: Usuario): Promise<number> {
    const query = `INSERT INTO Livraria.Usuario (nome, cpf, status, cursoID, CatUsuID) VALUES (?, ?, ?, ?, ?)`;
    const valores = [usuario.nome, usuario.cpf, usuario.status, usuario.CursoID, usuario.CatUsuID];

    try {
      const resultado: any = await executarComandoSQL(query, valores);
      console.log("Usuário cadastrado com sucesso!");
      return resultado.insertId;
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      throw err;
    }
  }

  async listarUsuarios(): Promise<Usuario[]> {
    const query = `SELECT * FROM Livraria.Usuario`;
    const resultado = await executarComandoSQL(query, []);

    return resultado.map((registro: any) => new Usuario(
      registro.nome,
      registro.cpf,
      registro.status,
      registro.cursoID ?? registro.cursoid,
      registro.CatUsuID ?? registro.catusuid,
      registro.id
    ));
}

  async filtrarUsuarioporCPF(cpf: string): Promise<Usuario | undefined> {
    const query = `SELECT * FROM Livraria.Usuario WHERE cpf = ?`;
    const resultado = await executarComandoSQL(query, [cpf]);
    const Registro = resultado[0];

    if (!Registro) return undefined;

    return new Usuario(
      Registro.nome,
      Registro.cpf,
      Registro.status,
      Registro.cursoID ?? Registro.cursoid,
      Registro.CatUsuID ?? Registro.catusuid,
      Registro.id
    );
}

  async atualizarUsuarioporCPF(usuarioAtualizado: Usuario): Promise<Usuario | undefined> {
  
    const query = `
      UPDATE Livraria.Usuario
      SET nome = ?, cursoID = ?, CatUsuID = ?
      WHERE cpf = ?
    `;
    const valores = [usuarioAtualizado.nome, usuarioAtualizado.CursoID, usuarioAtualizado.CatUsuID, usuarioAtualizado.cpf];
    await executarComandoSQL(query, valores);
    return usuarioAtualizado;
  }

  async removerUsuarioporCPF(cpf: string): Promise<boolean> {
    const query = `DELETE FROM Livraria.Usuario WHERE cpf = ?`;
    const resultado = await executarComandoSQL(query, [cpf]);
    return resultado.affectedRows > 0;
  }
  async filtrarUsuarioporID(id: number): Promise<Usuario | undefined> {
    const query = `SELECT * FROM Livraria.Usuario WHERE id = ?`;
    const resultado = await executarComandoSQL(query, [id]);
    const registro = resultado[0];

    if (!registro) return undefined;

    return new Usuario(
      registro.nome,
      registro.cpf,
      registro.status,
      registro.cursoID ?? registro.cursoid,
      registro.CatUsuID ?? registro.catusuid,
      registro.id
    );
  }
}