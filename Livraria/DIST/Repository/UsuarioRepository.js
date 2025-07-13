"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const mysql_1 = require("../DataBase/mysql");
class UsuarioRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    async createTable() {
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
            await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Usuario criada (ou já existia).");
        }
        catch (err) {
            console.error("Erro ao criar a tabela Usuario:", err);
        }
    }
    async cadastrarUsuario(usuario) {
        const query = `INSERT INTO Livraria.Usuario (nome, cpf, status, cursoID, CatUsuID) VALUES (?, ?, ?, ?, ?)`;
        const valores = [usuario.nome, usuario.cpf, usuario.status, usuario.CursoID, usuario.CatUsuID];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
            console.log("Usuário cadastrado com sucesso!");
            return resultado.insertId;
        }
        catch (err) {
            console.error("Erro ao cadastrar usuário:", err);
            throw err;
        }
    }
    async listarUsuarios() {
        const query = `SELECT * FROM Livraria.Usuario`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
        return resultado;
    }
    async filtrarUsuarioporCPF(cpf) {
        const query = `SELECT * FROM Livraria.Usuario WHERE cpf = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [cpf]);
        return resultado[0];
    }
    async atualizarUsuarioporCPF(usuarioAtualizado) {
        const query = `
      UPDATE Livraria.Usuario
      SET nome = ?, cursoID = ?, CatUsuID = ?
      WHERE cpf = ?
    `;
        const valores = [usuarioAtualizado.nome, usuarioAtualizado.CursoID, usuarioAtualizado.CatUsuID, usuarioAtualizado.cpf];
        await (0, mysql_1.executarComandoSQL)(query, valores);
        return usuarioAtualizado;
    }
    async removerUsuarioporCPF(cpf) {
        const query = `DELETE FROM Livraria.Usuario WHERE cpf = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [cpf]);
        return resultado.affectedRows > 0;
    }
}
exports.UsuarioRepository = UsuarioRepository;
