import { CursoRepository } from "../Repository/CursoRepository";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { CategoriaUsuario } from "../Model/CategoriaUsuario";

CategoriaLivro.inicializarCategoriaLivro();
CategoriaUsuario.inicializarCategoriaUsuario();

export class CatalogoRepository{
    
    private static instance: CatalogoRepository | null = null;
    private cursoRepository = CursoRepository.getInstance();

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
      
      listarCategoriaUsuario () : CategoriaUsuario[] {
        return CategoriaUsuario.listaCatUsu;
      }

      async listarCurso(): Promise<{ id: number; nome: string }[]> {
    return await this.cursoRepository.listarCursos();
    }
}