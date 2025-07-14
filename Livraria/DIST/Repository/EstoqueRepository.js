"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const Estoque_1 = require("../Model/Entidade/Estoque");
const mysql_1 = require("../DataBase/mysql");
class EstoqueRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    async createTable() {
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
            await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Estoque criada (ou já existia).");
        }
        catch (err) {
            console.error("Erro ao criar a tabela Estoque:", err);
        }
    }
    async cadastrarEstoque(estoque) {
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
            await (0, mysql_1.executarComandoSQL)(query, valores);
            console.log("Estoque cadastrado com sucesso!");
        }
        catch (err) {
            console.error("Erro ao cadastrar estoque:", err);
            throw err;
        }
    }
    async listarEstoqueDisponivel() {
        const query = `SELECT * FROM Livraria.Estoque`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
        return resultado.map((registro) => new Estoque_1.Estoque(registro.quantidade, registro.quantidade_emprestada, registro.LivroID, Boolean(registro.disponivel), registro.id));
    }
    async filtrarExemplarPorCodigo(id) {
        const query = `SELECT * FROM Livraria.Estoque WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        const registro = resultado[0];
        if (!registro)
            return undefined;
        return new Estoque_1.Estoque(registro.quantidade, registro.quantidade_emprestada, registro.LivroID, registro.disponivel, registro.id);
    }
    async atualizarDispoExemplarPorCodigo(id, disponivel) {
        const query = `
        UPDATE Livraria.Estoque
        SET disponivel = ?
        WHERE id = ?
      `;
        await (0, mysql_1.executarComandoSQL)(query, [disponivel, id]);
        return this.filtrarExemplarPorCodigo(id);
    }
    async removerUsuarioPorCodigo(id) {
        const query = `DELETE FROM Livraria.Estoque WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        return resultado.affectedRows > 0;
    }
}
exports.EstoqueRepository = EstoqueRepository;
