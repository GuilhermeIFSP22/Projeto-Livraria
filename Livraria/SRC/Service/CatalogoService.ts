import { CategoriaUsuario } from "../Model/CategoriaUsuario";
import { CursoRepository } from "../Repository/CursoRepository";
import { CategoriaLivro } from "../Model/CategoriaLivro";
import { CatalogoRepository } from "../Repository/CatalogoRepository";
import { Curso } from "../Model/Curso";
import { CatUsuarioRepository } from "../Repository/CatUsuarioRepository";

export class CatalogoService {

  private catalogoRepository: CatalogoRepository = CatalogoRepository.getInstance();
  private cursoRepository: CursoRepository = CursoRepository.getInstance();
  private catUsuarioRepository: CatUsuarioRepository = CatUsuarioRepository.getInstance();

  async ConsultarCategoriaUsuario(): Promise<CategoriaUsuario[]> {
    const categoriaLista = await this.catUsuarioRepository.listarCategorias();
    const categoria = categoriaLista.map(c => new CategoriaUsuario(c.id, c.nome));
    return categoria;
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