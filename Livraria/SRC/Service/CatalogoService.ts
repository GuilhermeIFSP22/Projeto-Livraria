import { CategoriaUsuario } from "../Model/CategoriaUsuario";
import { CursoRepository } from "../Repository/CursoRepository";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { CatalogoRepository } from "../Repository/CatalogoRepository";
import { Curso } from "../Model/Curso";

export class CatalogoService {

  private catalogoRepository: CatalogoRepository = CatalogoRepository.getInstance();
  private cursoRepository: CursoRepository = CursoRepository.getInstance();

  ConsultarCategoriaUsuario(): CategoriaUsuario[] {
    return this.catalogoRepository.listarCategoriaUsuario();
  }

  ConsultarCategoriaLivro(): CategoriaLivro[] {
    return this.catalogoRepository.listarCategoriaLivro();
  }

  async ConsultarCurso(): Promise<Curso[]> {
    const cursosLista = await this.cursoRepository.listarCursos();
    const cursos = cursosLista.map(c => new Curso(c.id, c.nome));
    return cursos;
  }
}