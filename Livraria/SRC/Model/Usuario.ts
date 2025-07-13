import { Curso } from "./Curso";
import { CategoriaUsuario } from "./CategoriaUsuario";
import { validarCPF } from "../untils/ValidarCPF";

Curso.inicializarCursos();
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

        const cursoValido = Curso.buscarNomePorID(CursoID);
        if (!cursoValido) throw new Error("Curso inválido");

        const categoriaValida = CategoriaUsuario.buscarNomePorID(CatUsuID);
        if (!categoriaValida) throw new Error("Categoria inválida");
    
        this.nome = nome;
        this.cpf = cpf;
        this.status = status;
        if (id) this.id = id;
        this.CursoID = CursoID;
        this.CatUsuID = CatUsuID;
    }
        
    getNomeCurso(): string {
        return Curso.buscarNomePorID(this.CursoID) ?? "Curso não encontrado";
      }

    getNomeCategoria(): string {
        return CategoriaUsuario.buscarNomePorID(this.CatUsuID) ?? "Categoria não encontrada";
      }
 
}