"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
const Emprestimo_1 = require("../Model/Entidade/Emprestimo");
const mysql_1 = require("../DataBase/mysql");
class EmprestimoRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    async createTable() {
        const query = `
      CREATE TABLE IF NOT EXISTS Livraria.Emprestimo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        data_emprestimo DATETIME NOT NULL,
        data_devolucao DATETIME NOT NULL,
        data_entrega DATETIME NOT NULL,
        dias_atraso INT NOT NULL,
        suspensao_ate DATETIME NOT NULL,
        UsuarioID INT NOT NULL,
        EstoqueID INT NOT NULL
      )
    `;
        try {
            await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Emprestimo criada (ou já existia).");
        }
        catch (err) {
            console.error("Erro ao criar a tabela Emprestimo:", err);
        }
    }
    async registrarEmprestimo(emprestimo) {
        const query = `
      INSERT INTO Livraria.Emprestimo 
      (data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate, UsuarioID, EstoqueID) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
        const valores = [
            emprestimo.data_emprestimo,
            emprestimo.data_devolucao,
            emprestimo.data_entrega,
            emprestimo.dias_atraso,
            emprestimo.suspensao_ate,
            emprestimo.UsuarioID,
            emprestimo.EstoqueID,
        ];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
            console.log("Empréstimo registrado com sucesso!");
            return resultado.insertId;
        }
        catch (err) {
            console.error("Erro ao registrar empréstimo:", err);
            throw err;
        }
    }
    async listarEmprestimos() {
        const query = `SELECT * FROM Livraria.Emprestimo`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
        return resultado.map((registro) => {
            const emprestimo = new Emprestimo_1.Emprestimo(new Date(registro.data_emprestimo), registro.UsuarioID, registro.EstoqueID, registro.id);
            emprestimo.data_entrega = registro.data_entrega ? new Date(registro.data_entrega) : new Date(0);
            emprestimo.data_devolucao = registro.data_devolucao ? new Date(registro.data_devolucao) : new Date(0);
            emprestimo.dias_atraso = registro.dias_atraso ?? 0;
            emprestimo.suspensao_ate = registro.suspensao_ate ? new Date(registro.suspensao_ate) : new Date(0);
            return emprestimo;
        });
    }
    async registrarDevolucao(idEmprestimo, dataEntrega) {
        const querySelect = `SELECT * FROM Livraria.Emprestimo WHERE id = ?`;
        const resultadoSelect = await (0, mysql_1.executarComandoSQL)(querySelect, [idEmprestimo]);
        const registro = resultadoSelect[0];
        if (!registro)
            return undefined;
        const emprestimo = new Emprestimo_1.Emprestimo(new Date(registro.data_emprestimo), registro.UsuarioID, registro.EstoqueID, registro.id);
        emprestimo.data_devolucao = new Date(registro.data_devolucao);
        emprestimo.data_entrega = dataEntrega;
        if (dataEntrega > emprestimo.data_devolucao) {
            const diasAtraso = Math.ceil((dataEntrega.getTime() - emprestimo.data_devolucao.getTime()) / (1000 * 3600 * 24));
            emprestimo.dias_atraso = diasAtraso;
            const diasSuspensao = diasAtraso * 3;
            const dataSuspensao = new Date(dataEntrega);
            dataSuspensao.setDate(dataEntrega.getDate() + diasSuspensao);
            emprestimo.suspensao_ate = dataSuspensao;
        }
        else {
            emprestimo.dias_atraso = 0;
            emprestimo.suspensao_ate = new Date(0);
        }
        const queryUpdate = `
      UPDATE Livraria.Emprestimo
      SET data_entrega = ?, dias_atraso = ?, suspensao_ate = ?
      WHERE id = ?
    `;
        const valores = [dataEntrega, emprestimo.dias_atraso, emprestimo.suspensao_ate, idEmprestimo];
        const resultadoUpdate = await (0, mysql_1.executarComandoSQL)(queryUpdate, valores);
        if (resultadoUpdate.affectedRows === 0) {
            return undefined;
        }
        return emprestimo;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
