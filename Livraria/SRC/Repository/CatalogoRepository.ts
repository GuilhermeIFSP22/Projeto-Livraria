import { CursoRepository } from "../Repository/CursoRepository";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { CatUsuarioRepository } from "./CatUsuarioRepository";
import { CatLivroRepository } from "./CatLivroRepository";

export class CatalogoRepository{
    
    private static instance: CatalogoRepository | null = null;
    private cursoRepository = CursoRepository.getInstance();
    private CatUsuarioRepository = CatUsuarioRepository.getInstance();
    private CatLivroRepository = CatLivroRepository.getInstance();

    private constructor() {}

    public static getInstance(): CatalogoRepository {
        if (!this.instance) {
            this.instance = new CatalogoRepository();
        }
        return this.instance;
    }
    
      async listarCategoriaLivro () : Promise<{ id: number; nome: string }[]> {
        return await this.CatLivroRepository.listarCatLivro(); 
    }  
      
      async listarCategoriaUsuario(): Promise<{ id: number; nome: string }[]> {
        return await this.CatUsuarioRepository.listarCategorias();
    }

      async listarCurso(): Promise<{ id: number; nome: string }[]> {
        return await this.cursoRepository.listarCursos();
    }
}