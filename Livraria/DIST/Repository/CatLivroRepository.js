"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatLivroRepository = void 0;
const mysql_1 = require("../DataBase/mysql");
class CatLivroRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CatLivroRepository();
        }
        return this.instance;
    }
    async createTable() {
        try {
            await (0, mysql_1.executarComandoSQL)(`
        CREATE TABLE IF NOT EXISTS Livraria.CategoriaLivro (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL UNIQUE
        )
      `, []);
            await (0, mysql_1.executarComandoSQL)(`
        INSERT IGNORE INTO Livraria.CategoriaLivro (nome) VALUES
        ('Romance'),
        ('Computação'),
        ('Letras'),
        ('Gestão')
      `, []);
            console.log("Tabela CategoriaLivro criada e categorias padrão inseridas.");
        }
        catch (err) {
            console.error("Erro ao criar a tabela CategoriaLivro:", err);
        }
    }
    async listarCatLivro() {
        const query = `SELECT * FROM Livraria.CategoriaLivro`;
        const resultados = await (0, mysql_1.executarComandoSQL)(query, []);
        return resultados;
    }
    async buscarCatLivroPorID(id) {
        const query = `SELECT * FROM Livraria.CategoriaLivro WHERE id = ?`;
        const resultados = await (0, mysql_1.executarComandoSQL)(query, [id]);
        return resultados[0] ?? undefined;
    }
    async buscarCatLivroPorNome(nome) {
        const query = `SELECT * FROM Livraria.CategoriaLivro WHERE LOWER(nome) = LOWER(?)`;
        const resultados = await (0, mysql_1.executarComandoSQL)(query, [nome]);
        return resultados[0] ?? undefined;
    }
}
exports.CatLivroRepository = CatLivroRepository;
