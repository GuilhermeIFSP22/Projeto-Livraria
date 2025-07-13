"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const CategoriaUsuario_1 = require("./CategoriaUsuario");
const ValidarCPF_1 = require("../untils/ValidarCPF");
CategoriaUsuario_1.CategoriaUsuario.inicializarCategoriaUsuario();
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
        const categoriaValida = CategoriaUsuario_1.CategoriaUsuario.buscarNomePorID(CatUsuID);
        if (!categoriaValida)
            throw new Error("Categoria inválida");
        this.nome = nome;
        this.cpf = cpf;
        this.status = status;
        if (id)
            this.id = id;
        this.CursoID = CursoID;
        this.CatUsuID = CatUsuID;
    }
    getNomeCategoria() {
        return CategoriaUsuario_1.CategoriaUsuario.buscarNomePorID(this.CatUsuID) ?? "Categoria não encontrada";
    }
}
exports.Usuario = Usuario;
