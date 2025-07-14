"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const Emprestimo_1 = require("../Model/Entidade/Emprestimo");
const EmprestimoRepository_1 = require("../Repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../Repository/UsuarioRepository");
const EstoqueRepository_1 = require("../Repository/EstoqueRepository");
const LivroRepository_1 = require("../Repository/LivroRepository");
const CursoRepository_1 = require("../Repository/CursoRepository");
const CatUsuarioRepository_1 = require("../Repository/CatUsuarioRepository");
const CatLivroRepository_1 = require("../Repository/CatLivroRepository");
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
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    catUsuarioRepository = CatUsuarioRepository_1.CatUsuarioRepository.getInstance();
    CatLivroRepository = CatLivroRepository_1.CatLivroRepository.getInstance();
    async listarEmprestimos() {
        return await this.emprestimoRepository.listarEmprestimos();
    }
    async registrarEmprestimo(data_emprestimo, CPF, UsuarioID, EstoqueID) {
        const usuario = await this.usuarioRepository.filtrarUsuarioporCPF(CPF);
        if (!usuario)
            throw new Error("Usuário não encontrado.");
        const exemplar = await this.estoqueRepository.filtrarExemplarPorCodigo(EstoqueID);
        if (!exemplar)
            throw new Error("Exemplar não encontrado.");
        if (!exemplar.disponivel)
            throw new Error("Este exemplar não está disponível para empréstimo.");
        const hoje = new Date();
        const emprestimos = await this.emprestimoRepository.listarEmprestimos();
        const emprestimosSuspensos = emprestimos.filter(e => e.UsuarioID === usuario.id && e.suspensao_ate && e.suspensao_ate > hoje);
        if (emprestimosSuspensos.length > 0)
            throw new Error(`Usuário está suspenso até ${emprestimosSuspensos[0].suspensao_ate.toLocaleDateString()}.`);
        if (usuario.status !== "ativo")
            throw new Error("Usuário não está ativo para realizar empréstimos.");
        const emprestimosAtivos = emprestimos.filter(e => e.UsuarioID === UsuarioID && e.data_devolucao.getTime() === 0);
        const catUsuario = await this.catUsuarioRepository.buscarCategoriaPorID(usuario.CatUsuID);
        const categoria = catUsuario?.nome.toLowerCase() ?? "";
        const limite = categoria === "professor" ? 5 : 3;
        if (emprestimosAtivos.length >= limite)
            throw new Error("Usuário atingiu o limite de livros emprestados.");
        const livro = await this.livroRepository.filtrarLivroPorID(exemplar.LivroID);
        const curso = await this.cursoRepository.buscarCursoPorID(usuario.CursoID);
        const catLivro = await this.CatLivroRepository.buscarCatLivroPorID(livro.CategoriaID);
        let prazoDias = 15;
        if (categoria === "professor") {
            prazoDias = 40;
        }
        else if (categoria === "aluno") {
            const cursoNome = curso?.nome.toLowerCase();
            const catLivroNome = catLivro?.nome.toLowerCase();
            prazoDias = cursoNome === catLivroNome ? 30 : 15;
        }
        const data_devolucao = new Date(data_emprestimo);
        data_devolucao.setDate(data_emprestimo.getDate() + prazoDias);
        const novoEmprestimo = new Emprestimo_1.Emprestimo(data_emprestimo, UsuarioID, EstoqueID);
        novoEmprestimo.data_devolucao = data_devolucao;
        await this.emprestimoRepository.registrarEmprestimo(novoEmprestimo);
        return novoEmprestimo;
    }
    async registrarDevolucao(idEmprestimo, dataEntrega) {
        return await this.emprestimoRepository.registrarDevolucao(idEmprestimo, dataEntrega);
    }
}
exports.EmprestimoService = EmprestimoService;
