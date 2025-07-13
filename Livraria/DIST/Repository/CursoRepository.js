"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const mysql_1 = require("../DataBase/mysql");
class CursoRepository {
    static instance;
    initialized = false;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    async createTable() {
        try {
            await (0, mysql_1.executarComandoSQL)(`
        CREATE TABLE IF NOT EXISTS Livraria.Curso (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL UNIQUE
        )
      `, []);
            await (0, mysql_1.executarComandoSQL)(`
        INSERT IGNORE INTO Livraria.Curso (nome) VALUES
        ('ADS'),
        ('Pedagogia'),
        ('Administração')
      `, []);
            console.log("Tabela Curso criada e cursos padrão inseridos.");
        }
        catch (err) {
            console.error("Erro ao criar a tabela Curso:", err);
            throw err;
        }
    }
    async listarCursos() {
        const query = `SELECT * FROM Livraria.Curso`;
        const resultados = await (0, mysql_1.executarComandoSQL)(query, []);
        return resultados;
    }
    async buscarCursoPorID(id) {
        const query = `SELECT * FROM Livraria.Curso WHERE id = ?`;
        const resultados = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultados.length === 0)
            return undefined;
        return resultados[0];
    }
    async buscarCursoPorNome(nome) {
        const query = `SELECT * FROM Livraria.Curso WHERE LOWER(nome) = LOWER(?)`;
        const resultados = await (0, mysql_1.executarComandoSQL)(query, [nome]);
        if (resultados.length === 0)
            return undefined;
        return resultados[0];
    }
}
exports.CursoRepository = CursoRepository;
