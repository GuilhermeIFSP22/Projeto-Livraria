import { promises } from "dns";
import { EmprestimoRepository } from "../Repository/EmprestimoRepository";
import { UsuarioRepository } from "../Repository/UsuarioRepository";

const emprestimoRepository = EmprestimoRepository.getInstance();
const usuarioRepository = UsuarioRepository.getInstance();

export async function atualizarStatusUsuariosPorSuspensao(): Promise<void> {
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
    } else {
      console.warn(`Usuário com CPF ${usuario.cpf} não atualizado por falta de CursoID ou CatUsuID.`);
    }
  }
}