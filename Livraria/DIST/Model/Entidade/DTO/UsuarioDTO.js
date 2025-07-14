"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioDTO = void 0;
const ValidarCPF_1 = require("../../../untils/ValidarCPF");
class UsuarioDTO {
    id;
    nome;
    cpf;
    status;
    CursoID;
    CatUsuID;
    constructor(nome, cpf, status, CursoID, CatUsuID, id) {
        if (cpf && !(0, ValidarCPF_1.validarCPF)(cpf)) {
            throw new Error("CPF inválido");
        }
        this.nome = nome || "";
        this.cpf = cpf || "";
        this.status = status || "ativo";
        this.CursoID = CursoID || 0;
        this.CatUsuID = CatUsuID || 0;
        if (id !== undefined)
            this.id = id;
    }
}
exports.UsuarioDTO = UsuarioDTO;
