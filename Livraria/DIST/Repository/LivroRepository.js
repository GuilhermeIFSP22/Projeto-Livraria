"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const Livro_1 = require("../Model/Livro");
const mysql_1 = require("../DataBase/mysql");
class LivroRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS Livraria.Livro (
          id INT AUTO_INCREMENT PRIMARY KEY,
          titulo VARCHAR(255) NOT NULL,
          autor VARCHAR(255) NOT NULL,
          editora VARCHAR(255) NOT NULL,
          edicao VARCHAR(100) NOT NULL,
          isbn VARCHAR(20) NOT NULL UNIQUE,
          CategoriaID INT NOT NULL
        )
      `;
        try {
            await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Livro criada (ou já existia).");
        }
        catch (err) {
            console.error("Erro ao criar a tabela Livro:", err);
        }
    }
    async cadastrarLivro(livro) {
        const query = `
        INSERT INTO Livraria.Livro (titulo, autor, editora, edicao, isbn, CategoriaID)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
        const valores = [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.CategoriaID];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
            console.log("Livro cadastrado com sucesso!");
            return resultado.insertId;
        }
        catch (err) {
            console.error("Erro ao cadastrar livro:", err);
            throw err;
        }
    }
    async listarLivros(filtros = {}) {
        let query = `SELECT * FROM Livraria.Livro WHERE 1=1`;
        const valores = [];
        if (filtros.id != null) {
            query += ` AND id = ?`;
            valores.push(filtros.id);
        }
        if (filtros.titulo) {
            query += ` AND LOWER(titulo) LIKE ?`;
            valores.push(`%${filtros.titulo.toLowerCase()}%`);
        }
        if (filtros.autor) {
            query += ` AND LOWER(autor) LIKE ?`;
            valores.push(`%${filtros.autor.toLowerCase()}%`);
        }
        if (filtros.editora) {
            query += ` AND LOWER(editora) LIKE ?`;
            valores.push(`%${filtros.editora.toLowerCase()}%`);
        }
        if (filtros.edicao) {
            query += ` AND LOWER(edicao) LIKE ?`;
            valores.push(`%${filtros.edicao.toLowerCase()}%`);
        }
        if (filtros.isbn) {
            query += ` AND LOWER(isbn) LIKE ?`;
            valores.push(`%${filtros.isbn.toLowerCase()}%`);
        }
        if (filtros.CategoriaID != null) {
            query += ` AND CategoriaID = ?`;
            valores.push(filtros.CategoriaID);
        }
        const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
        return resultado.map((registro) => new Livro_1.Livro(registro.titulo, registro.autor, registro.editora, registro.edicao, registro.isbn, registro.CategoriaID, registro.id));
    }
    async filtrarLivroPorISBN(isbn) {
        const query = `SELECT * FROM Livraria.Livro WHERE isbn = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
        const registro = resultado[0];
        if (!registro)
            return undefined;
        return new Livro_1.Livro(registro.titulo, registro.autor, registro.editora, registro.edicao, registro.isbn, registro.CategoriaID, registro.id);
    }
    async atualizarLivroPorISBN(livro) {
        const query = `
        UPDATE Livraria.Livro
        SET titulo = ?, autor = ?, editora = ?, edicao = ?, CategoriaID = ?
        WHERE isbn = ?
      `;
        const valores = [
            livro.titulo,
            livro.autor,
            livro.editora,
            livro.edicao,
            livro.CategoriaID,
            livro.isbn,
        ];
        const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
        return resultado.affectedRows > 0 ? livro : undefined;
    }
    async removerLivroPorISBN(isbn) {
        const query = `DELETE FROM Livraria.Livro WHERE isbn = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
        return resultado.affectedRows > 0;
    }
    async filtrarLivroPorID(id) {
        const query = `SELECT * FROM Livraria.Livro WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        const registro = resultado[0];
        if (!registro) {
            return undefined;
        }
        if (!registro.titulo || !registro.autor) {
            throw new Error("Informações incompletas");
        }
        return new Livro_1.Livro(registro.titulo, registro.autor, registro.editora, registro.edicao, registro.isbn, registro.CategoriaID, registro.id);
    }
}
exports.LivroRepository = LivroRepository;
