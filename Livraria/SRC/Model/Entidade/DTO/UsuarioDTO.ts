import { validarCPF } from "../../../untils/ValidarCPF";

export class UsuarioDTO {
  id?: number;
  nome: string;
  cpf: string;
  status: "ativo" | "suspenso" | "inativo";
  CursoID: number;
  CatUsuID: number;

  constructor(nome?: string,cpf?: string,status?: "ativo" | "suspenso" | "inativo",CursoID?: number,CatUsuID?: number,id?: number) {
    if (cpf && !validarCPF(cpf)) {
      throw new Error("CPF inválido");
    }

    this.nome = nome || "";
    this.cpf = cpf || "";
    this.status = status || "ativo";
    this.CursoID = CursoID || 0;
    this.CatUsuID = CatUsuID || 0;
    if (id !== undefined) this.id = id;
  }
}