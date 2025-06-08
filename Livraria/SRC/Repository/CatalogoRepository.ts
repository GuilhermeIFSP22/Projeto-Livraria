import { Curso } from "../Model/Curso";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { CategoriaUsuario } from "../Model/CategoriaUsuario";

CategoriaLivro.inicializarCategoriaLivro();
CategoriaUsuario.inicializarCategoriaUsuario();
Curso.inicializarCursos();

export class CatalogoRepository{
    
    private static instance: CatalogoRepository | null = null;

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

      listarCurso () : Curso[] {
        return Curso.listaCursos;
      }
}