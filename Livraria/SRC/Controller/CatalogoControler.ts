import { Controller, Get, Route, Tags, Res, TsoaResponse } from "tsoa";
import { CatalogoService } from "../Service/CatalogoService";
import { BasicResponseDto } from "../Model/Entidade/DTO/BasicResponseDTO";

@Route("Catalogo")
@Tags("Catálogo")
export class CatalogoController extends Controller {
  private catalogoService = new CatalogoService();

  @Get("CategoriaUsuario")
  public async consultarCategoriaUsuario(
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const categoriasUsuario = await this.catalogoService.ConsultarCategoriaUsuario();
      return success(200, new BasicResponseDto("Categorias de usuário encontradas com sucesso", categoriasUsuario));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message || "Erro ao consultar categorias de usuário", undefined));
    }
  }

  @Get("CategoriaLivro")
  public async consultarCategoriaLivro(
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const categoriasLivro = await this.catalogoService.ConsultarCategoriaLivro();
      return success(200, new BasicResponseDto("Categorias de livro encontradas com sucesso", categoriasLivro));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message || "Erro ao consultar categorias de livro", undefined));
    }
  }

  @Get("Curso")
  public async consultarCurso(
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const cursos = await this.catalogoService.ConsultarCurso();
      return success(200, new BasicResponseDto("Cursos encontrados com sucesso", cursos));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message || "Erro ao consultar cursos", undefined));
    }
  }
}

