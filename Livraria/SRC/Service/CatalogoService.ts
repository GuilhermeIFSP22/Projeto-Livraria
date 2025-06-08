import { CategoriaUsuario } from "../Model/CategoriaUsuario";
import { Curso } from "../Model/Curso";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { CatalogoRepository } from "../Repository/CatalogoRepository";


export class CatalogoService{

    CatalogoRepository : CatalogoRepository = CatalogoRepository.getInstance();


    ConsultarCategoriaUsuario () : CategoriaUsuario[]  {
        return this.CatalogoRepository.listarCategoriaUsuario();
    }

    ConsultarCurso () : Curso[]  {
        return this.CatalogoRepository.listarCurso();
    }

    ConsultarCategoriaLivro () : CategoriaLivro[]  {
        return this.CatalogoRepository.listarCategoriaLivro();
    }

}