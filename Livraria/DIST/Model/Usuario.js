"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const ValidarCPF_1 = require("../untils/ValidarCPF");
class Usuario {
    id;
    nome;
    cpf;
    status;
    CursoID;
    CatUsuID;
    constructor(nome, cpf, status, CursoID, CatUsuID, id) {
        if (!(0, ValidarCPF_1.validarCPF)(cpf))
            throw new Error("CPF inválido");
        this.nome = nome;
        this.cpf = cpf;
        this.status = status;
        if (id)
            this.id = id;
        this.CursoID = CursoID;
        this.CatUsuID = CatUsuID;
    }
}
exports.Usuario = Usuario;
