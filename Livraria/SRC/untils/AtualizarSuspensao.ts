import { EmprestimoRepository } from "../Repository/EmprestimoRepository";
import { UsuarioRepository } from "../Repository/UsuarioRepository";

const emprestimoRepository = EmprestimoRepository.getInstance();
const usuarioRepository = UsuarioRepository.getInstance();

export function atualizarStatusUsuariosPorSuspensao(): void {
  const usuarios = usuarioRepository.listarUsuarios();
  const hoje = new Date();

  usuarios.forEach(usuario => {
    
    const emprestimosSuspensos = emprestimoRepository.listarEmprestimos()
      .filter(e => e.UsuarioID === usuario.id && e.suspensao_ate > hoje);

    const suspensaoMaior60 = emprestimosSuspensos.some(e => {
      const diffDias = Math.ceil((e.suspensao_ate.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
      return diffDias > 60;
    });

    if (suspensaoMaior60) {
      usuario.status = "suspenso";
    }

    const atrasos = emprestimoRepository.listarEmprestimos()
      .filter(e => e.UsuarioID === usuario.id && e.dias_atraso > 0);

    if (atrasos.length >= 2) {
      usuario.status = "inativo";
    }
    
    usuarioRepository.atualizarUsuarioporCPF(usuario);
  });
}