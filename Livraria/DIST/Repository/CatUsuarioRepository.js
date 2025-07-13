"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatUsuarioRepository = void 0;
const mysql_1 = require("../DataBase/mysql");
class CatUsuarioRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CatUsuarioRepository();
        }
        return this.instance;
    }
    async createTable() {
        try {
            await (0, mysql_1.executarComandoSQL)(`
        CREATE TABLE IF NOT EXISTS Livraria.CategoriaUsuario (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL UNIQUE
        )
      `, []);
            await (0, mysql_1.executarComandoSQL)(`
        INSERT IGNORE INTO Livraria.CategoriaUsuario (nome) VALUES
        ('Professor'),
        ('Aluno'),
        ('Bibliotecário')
      `, []);
            console.log("Tabela CategoriaUsuario criada e categorias padrão inseridas.");
        }
        catch (err) {
            console.error("Erro ao criar a tabela CategoriaUsuario:", err);
        }
    }
    async listarCategorias() {
        const query = `SELECT * FROM Livraria.CategoriaUsuario`;
        const resultados = await (0, mysql_1.executarComandoSQL)(query, []);
        return resultados;
    }
    async buscarCategoriaPorID(id) {
        const query = `SELECT * FROM Livraria.CategoriaUsuario WHERE id = ?`;
        const resultados = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultados.length === 0)
            return undefined;
        return resultados[0];
    }
    async buscarCategoriaPorNome(nome) {
        const query = `SELECT * FROM Livraria.CategoriaUsuario WHERE LOWER(nome) = LOWER(?)`;
        const resultados = await (0, mysql_1.executarComandoSQL)(query, [nome]);
        if (resultados.length === 0)
            return undefined;
        return resultados[0];
    }
}
exports.CatUsuarioRepository = CatUsuarioRepository;
