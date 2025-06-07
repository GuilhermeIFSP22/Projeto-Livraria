import { Curso } from "./Curso";
import { CategoriaUsuario } from "./CategoriaUsuario";

export class Usuario{

    private static ultimoID : number = 0;

    id: number;
    nome : string;
    cpf : string;
    status : string;
    CursoID : number;
    CatUsuID: number;
    
    constructor(nome:string, cpf:string, status:string, CursoID:number, CatUsuID:number){
        this.nome = nome;
        this.cpf = cpf;
        this.status = status;
        this.id = ++Usuario.ultimoID;
        this.CursoID = CursoID;
        this.CatUsuID = CatUsuID;
    }
}