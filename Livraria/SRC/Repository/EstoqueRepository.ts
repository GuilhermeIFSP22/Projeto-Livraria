import { Estoque } from "../Model/Estoque";
import { executarComandoSQL } from "../DataBase/mysql";

export class EstoqueRepository{
    
    private static instance: EstoqueRepository;

    private constructor() {
    this.createTable();
  }

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `
          CREATE TABLE IF NOT EXISTS Livraria.Estoque (
            id INT PRIMARY KEY AUTO_INCREMENT,
            quantidade INT NOT NULL,
            quantidade_emprestada INT NOT NULL,
            disponivel BOOLEAN NOT NULL,
            LivroID INT NOT NULL
          )
        `;
        try {
          await executarComandoSQL(query, []);
          console.log("Tabela Estoque criada (ou já existia).");
        } catch (err) {
          console.error("Erro ao criar a tabela Estoque:", err);
        }
    }

      async cadastrarEstoque (estoque : Estoque): Promise<void>{
          const query = `
          INSERT INTO Livraria.Estoque 
          (quantidade, quantidade_emprestada, LivroID, disponivel) 
          VALUES (?, ?, ?, ?)
        `;
        const valores = [
          estoque.quantidade,
          estoque.quantidade_emprestada,
          estoque.LivroID,
          estoque.disponivel,
          estoque.id,
        ];

        try {
          await executarComandoSQL(query, valores);
          console.log("Estoque cadastrado com sucesso!");
        } catch (err) {
          console.error("Erro ao cadastrar estoque:", err);
          throw err;
        }
    }

      async listarEstoqueDisponivel () : Promise<Estoque[]> {
        const query = `SELECT * FROM Livraria.Estoque`;
        const resultado = await executarComandoSQL(query, []);

        return resultado.map((registro: any) => new Estoque(
          registro.quantidade,
          registro.quantidade_emprestada,
          registro.LivroID,
          Boolean(registro.disponivel),
          registro.id,
        ));
    }
  
      async filtrarExemplarPorCodigo (id:number) : Promise<Estoque | undefined> {
        const query = `SELECT * FROM Livraria.Estoque WHERE id = ?`;
        const resultado = await executarComandoSQL(query, [id]);
        const registro = resultado[0];

        if (!registro) return undefined;

        return new Estoque(
          registro.quantidade,
          registro.quantidade_emprestada,
          registro.LivroID,
          registro.disponivel,
          registro.id,
        );
      }

      async atualizarDispoExemplarPorCodigo (id:number, disponivel:boolean) : Promise<Estoque | undefined> {
        const query = `
        UPDATE Livraria.Estoque
        SET disponivel = ?
        WHERE id = ?
      `;
        await executarComandoSQL(query, [disponivel, id]);

        return this.filtrarExemplarPorCodigo(id);
    }

    async removerUsuarioPorCodigo(id: number) : Promise<boolean> {
      const query = `DELETE FROM Livraria.Estoque WHERE id = ?`;
      const resultado = await executarComandoSQL(query, [id]);
      return resultado.affectedRows > 0;
    }
}