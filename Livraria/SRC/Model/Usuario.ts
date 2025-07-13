import { CategoriaUsuario } from "./CategoriaUsuario";
import { validarCPF } from "../untils/ValidarCPF";


CategoriaUsuario.inicializarCategoriaUsuario();

export class Usuario{

    id?: number;
    nome : string;
    cpf : string;
    status : "ativo" | "suspenso" | "inativo";
    CursoID : number;
    CatUsuID: number;
    
    constructor(nome:string, cpf:string,status:"ativo" | "suspenso" | "inativo", CursoID:number, CatUsuID:number, id?: number){

        if (!validarCPF(cpf)) throw new Error("CPF inválido");

        const categoriaValida = CategoriaUsuario.buscarNomePorID(CatUsuID);
        if (!categoriaValida) throw new Error("Categoria inválida");
    
        this.nome = nome;
        this.cpf = cpf;
        this.status = status;
        if (id) this.id = id;
        this.CursoID = CursoID;
        this.CatUsuID = CatUsuID;
    }

    getNomeCategoria(): string {
        return CategoriaUsuario.buscarNomePorID(this.CatUsuID) ?? "Categoria não encontrada";
      }
 
}