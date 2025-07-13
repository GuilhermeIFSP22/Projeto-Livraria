import { validarCPF } from "../untils/ValidarCPF";

export class Usuario{

    id?: number;
    nome : string;
    cpf : string;
    status : "ativo" | "suspenso" | "inativo";
    CursoID : number;
    CatUsuID: number;
    
    constructor(nome:string, cpf:string,status:"ativo" | "suspenso" | "inativo", CursoID:number, CatUsuID:number, id?: number){

        if (!validarCPF(cpf)) throw new Error("CPF inválido");
    
        this.nome = nome;
        this.cpf = cpf;
        this.status = status;
        if (id) this.id = id;
        this.CursoID = CursoID;
        this.CatUsuID = CatUsuID;
    }
}