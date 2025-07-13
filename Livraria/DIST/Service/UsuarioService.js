"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const CategoriaUsuario_1 = require("../Model/CategoriaUsuario");
const Usuario_1 = require("../Model/Usuario");
const UsuarioRepository_1 = require("../Repository/UsuarioRepository");
const EmprestimoRepository_1 = require("../Repository/EmprestimoRepository");
const CursoRepository_1 = require("../Repository/CursoRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    async cadastrarUsuario(usuarioData) {
        const { nome, cpf, CursoID, CatUsuID } = usuarioData;
        if (!nome || !cpf || !CursoID || !CatUsuID) {
            throw new Error("Informações incompletas");
        }
        const usuarioExistente = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
        if (usuarioExistente) {
            throw new Error("Já existe um usuário com este CPF");
        }
        const curso = await this.cursoRepository.buscarCursoPorID(CursoID);
        if (!curso)
            throw new Error("Curso inválido ou inexistente");
        const novoUsuario = new Usuario_1.Usuario(nome, cpf, "ativo", CursoID, CatUsuID);
        const idGerado = await this.usuarioRepository.cadastrarUsuario(novoUsuario);
        novoUsuario.id = idGerado;
        return {
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            cpf: novoUsuario.cpf,
            status: novoUsuario.status,
            curso: curso.nome,
            categoria: novoUsuario.getNomeCategoria(),
        };
    }
    async consultarUsuarios() {
        const usuarios = await this.usuarioRepository.listarUsuarios();
        const usuariosInstanciados = usuarios.map(u => new Usuario_1.Usuario(u.nome, u.cpf, u.status, u.CursoID, u.CatUsuID, u.id));
        return Promise.all(usuariosInstanciados.map(async (usuario) => {
            const curso = await this.cursoRepository.buscarCursoPorID(usuario.CursoID);
            const categoria = CategoriaUsuario_1.CategoriaUsuario.buscarNomePorID(usuario.CatUsuID);
            return {
                id: usuario.id,
                nome: usuario.nome,
                cpf: usuario.cpf,
                status: usuario.status,
                curso: curso?.nome ?? "Curso não encontrado",
                categoria: categoria ?? "Categoria não encontrada",
            };
        }));
    }
    async consultarUsuarioPorCPF(cpf) {
        const u = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
        if (!u)
            return undefined;
        const curso = await this.cursoRepository.buscarCursoPorID(u.CursoID);
        const categoria = CategoriaUsuario_1.CategoriaUsuario.buscarNomePorID(u.CatUsuID);
        return {
            id: u.id,
            nome: u.nome,
            cpf: u.cpf,
            status: u.status,
            curso: curso?.nome ?? "Curso não encontrado",
            categoria: categoria ?? "Categoria não encontrada",
        };
    }
    async atualizarUsuarioPorCPF(cpf, nome, cursoNome, categoriaNome) {
        const usuarioAtualizado = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
        if (!usuarioAtualizado)
            return undefined;
        if (nome)
            usuarioAtualizado.nome = nome;
        if (cursoNome) {
            const curso = await this.cursoRepository.buscarCursoPorNome(cursoNome);
            if (!curso)
                throw new Error("Curso inválido ou inexistente");
            usuarioAtualizado.CursoID = curso.id;
        }
        if (categoriaNome) {
            const idCategoria = CategoriaUsuario_1.CategoriaUsuario.buscarIDPorNome(categoriaNome);
            if (!idCategoria)
                throw new Error("Categoria de usuário inválida ou inexistente");
            usuarioAtualizado.CatUsuID = idCategoria;
        }
        const atualizado = await this.usuarioRepository.atualizarUsuarioporCPF(usuarioAtualizado);
        if (!atualizado)
            throw new Error("Falha ao atualizar o usuário");
        const cursoAtualizado = await this.cursoRepository.buscarCursoPorID(usuarioAtualizado.CursoID);
        const categoriaAtualizada = CategoriaUsuario_1.CategoriaUsuario.buscarNomePorID(usuarioAtualizado.CatUsuID);
        return {
            id: usuarioAtualizado.id,
            nome: usuarioAtualizado.nome,
            cpf: usuarioAtualizado.cpf,
            status: usuarioAtualizado.status,
            curso: cursoAtualizado?.nome ?? "Curso não encontrado",
            categoria: categoriaAtualizada ?? "Categoria não encontrada",
        };
    }
    async removerUsuarioPorCPF(cpf) {
        const usuario = await this.usuarioRepository.filtrarUsuarioporCPF(cpf);
        if (!usuario)
            return "Usuário não encontrado";
        const emprestimos = await this.emprestimoRepository.listarEmprestimos();
        const emprestimosAtivos = emprestimos.filter(e => e.UsuarioID === usuario.id && e.data_entrega.getTime() === 0);
        if (emprestimosAtivos.length > 0) {
            return "Usuário possui empréstimos ativos e não pode ser removido";
        }
        const removido = await this.usuarioRepository.removerUsuarioporCPF(cpf);
        return removido ? "Usuário removido com sucesso" : "Falha ao remover usuário";
    }
}
exports.UsuarioService = UsuarioService;
