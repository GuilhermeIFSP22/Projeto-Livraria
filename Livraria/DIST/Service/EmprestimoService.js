"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const Emprestimo_1 = require("../Model/Emprestimo");
const EmprestimoRepository_1 = require("../Repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../Repository/UsuarioRepository");
const EstoqueRepository_1 = require("../Repository/EstoqueRepository");
const CategoriaLivro_1 = require("../Model/CategoriaLivro");
const LivroRepository_1 = require("../Repository/LivroRepository");
const Curso_1 = require("../Model/Curso");
var StatusUsuario;
(function (StatusUsuario) {
    StatusUsuario["Ativo"] = "ativo";
    StatusUsuario["Suspenso"] = "suspenso";
    StatusUsuario["Inativo"] = "inativo";
})(StatusUsuario || (StatusUsuario = {}));
class EmprestimoService {
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    listarEmprestimos() {
        return this.emprestimoRepository.listarEmprestimos();
    }
    async registrarEmprestimo(data_emprestimo, CPF, UsuarioID, EstoqueID) {
        const usuario = await this.usuarioRepository.filtrarUsuarioporCPF(CPF);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }
        const exemplar = this.estoqueRepository.filtrarExemplarPorCodigo(EstoqueID);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        if (!exemplar.disponivel) {
            throw new Error("Este exemplar não está disponível para empréstimo.");
        }
        const hoje = new Date();
        const emprestimosSuspensos = this.emprestimoRepository.listarEmprestimos()
            .filter(e => e.UsuarioID === usuario.id && e.suspensao_ate && e.suspensao_ate > hoje);
        if (emprestimosSuspensos.length > 0) {
            throw new Error(`Usuário está suspenso até ${emprestimosSuspensos[0].suspensao_ate.toLocaleDateString()} e não pode realizar empréstimos.`);
        }
        if (usuario.status !== "ativo") {
            throw new Error("Usuário não está ativo para realizar empréstimos.");
        }
        const emprestimoExistente = this.emprestimoRepository.listarEmprestimos()
            .find(e => e.EstoqueID === EstoqueID && e.data_entrega.getTime() === 0);
        if (emprestimoExistente) {
            throw new Error("Este exemplar já está emprestado.");
        }
        const emprestimosAtivos = this.emprestimoRepository.listarEmprestimos()
            .filter(e => e.UsuarioID === UsuarioID && e.data_entrega.getTime() === 0);
        const categoria = usuario.getNomeCategoria();
        const limite = categoria === "professor" ? 5 : 3;
        if (emprestimosAtivos.length >= limite) {
            throw new Error("Usuário atingiu o limite de livros emprestados.");
        }
        const novoEmprestimo = new Emprestimo_1.Emprestimo(data_emprestimo, UsuarioID, EstoqueID);
        this.emprestimoRepository.RegistrarEmprestimo(novoEmprestimo);
        return novoEmprestimo;
    }
    async registrarDevolucao(idEmprestimo, dataEntrega) {
        const emprestimo = this.emprestimoRepository.registrarDevolucao(idEmprestimo, dataEntrega);
        if (!emprestimo)
            return undefined;
        const usuario = await this.usuarioRepository.filtrarUsuarioporCPF(String(emprestimo.UsuarioID));
        const estoque = this.estoqueRepository.filtrarExemplarPorCodigo(emprestimo.EstoqueID);
        if (!usuario || !estoque)
            return undefined;
        const categoria = usuario.getNomeCategoria();
        let diasPrazo = 0;
        if (categoria === "professor") {
            diasPrazo = 40;
        }
        else {
            const livro = this.livroRepository.listarLivros({ id: estoque.LivroID })[0];
            if (!livro)
                return undefined;
            const cursoCategoria = Curso_1.Curso.buscarNomePorID(usuario.CursoID).toLowerCase();
            const livroCategoria = CategoriaLivro_1.CategoriaLivro.buscarNomePorID(livro.CategoriaID).toLowerCase();
            diasPrazo = cursoCategoria === livroCategoria ? 30 : 15;
        }
        const dataLimite = new Date(emprestimo.data_emprestimo);
        dataLimite.setDate(dataLimite.getDate() + diasPrazo);
        if (dataEntrega > dataLimite) {
            const diasAtraso = Math.ceil((dataEntrega.getTime() - dataLimite.getTime()) / (1000 * 3600 * 24));
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
        return emprestimo;
    }
}
exports.EmprestimoService = EmprestimoService;
