"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarStatusUsuariosPorSuspensao = atualizarStatusUsuariosPorSuspensao;
const EmprestimoRepository_1 = require("../Repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../Repository/UsuarioRepository");
const emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
const usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
async function atualizarStatusUsuariosPorSuspensao() {
    const usuarios = await usuarioRepository.listarUsuarios();
    const todosEmprestimos = await emprestimoRepository.listarEmprestimos();
    const hoje = new Date();
    for (const usuario of usuarios) {
        const emprestimosUsuario = todosEmprestimos.filter(e => e.UsuarioID === usuario.id);
        const emprestimosAtivos = emprestimosUsuario.filter(e => e.data_entrega.getTime() === 0);
        if (emprestimosAtivos.length === 0) {
            continue;
        }
        const emprestimosSuspensos = emprestimosUsuario.filter(e => e.suspensao_ate && e.suspensao_ate > hoje);
        const suspensaoMaior60 = emprestimosSuspensos.some(e => {
            const diffDias = Math.ceil((e.suspensao_ate.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
            return diffDias > 60;
        });
        if (suspensaoMaior60) {
            usuario.status = "suspenso";
        }
        const atrasos = emprestimosUsuario.filter(e => e.dias_atraso > 0);
        if (atrasos.length >= 2) {
            usuario.status = "inativo";
        }
        if (usuario.CursoID && usuario.CatUsuID) {
            await usuarioRepository.atualizarUsuarioporCPF(usuario);
        }
        else {
            console.warn(`Usuário com CPF ${usuario.cpf} não atualizado por falta de CursoID ou CatUsuID.`);
        }
    }
}
