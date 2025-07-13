import { CursoRepository } from "../Repository/CursoRepository";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { CatUsuarioRepository } from "./CatUsuarioRepository";

CategoriaLivro.inicializarCategoriaLivro();

export class CatalogoRepository{
    
    private static instance: CatalogoRepository | null = null;
    private cursoRepository = CursoRepository.getInstance();
    private CatUsuarioRepository = CatUsuarioRepository.getInstance();

    private constructor() {}

    public static getInstance(): CatalogoRepository {
        if (!this.instance) {
            this.instance = new CatalogoRepository();
        }
        return this.instance;
    }
    
      listarCategoriaLivro () : CategoriaLivro[] {
        return CategoriaLivro.listaLivro;
      }  
      
      async listarCategoriaUsuario(): Promise<{ id: number; nome: string }[]> {
      return await this.CatUsuarioRepository.listarCategorias();
    }

      async listarCurso(): Promise<{ id: number; nome: string }[]> {
      return await this.cursoRepository.listarCursos();
    }
}