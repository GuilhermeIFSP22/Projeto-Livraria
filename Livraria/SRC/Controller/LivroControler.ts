import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { LivroService } from "../Service/LivroService";
import { BasicResponseDto } from "../Model/Entidade/DTO/BasicResponseDTO";
import { LivroDTO } from "../Model/Entidade/DTO/LivroDTO"; // Supondo que você tenha criado um DTO similar ao do usuário

@Route("Livro")
@Tags("Livro")
export class LivroController extends Controller {
  private livroService = new LivroService();

  @Post()
  public async cadastrarLivro(
    @Body() livro: LivroDTO,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>
  ): Promise<void> {
    try {
      const novoLivro = await this.livroService.cadastrarLivro(livro);
      return success(201, new BasicResponseDto("Livro cadastrado com sucesso", novoLivro));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message,undefined));
    }
  }

  @Get()
  public async listarLivros(
    @Query() titulo: string | undefined,
    @Query() autor: string | undefined,
    @Query() editora: string | undefined,
    @Query() categoriaID: number | undefined,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
    try {
        const filtros = { titulo, autor, editora, categoriaID };
        const livros = await this.livroService.listarLivros(filtros);
        return success(200, new BasicResponseDto("Livros encontrados com sucesso", livros));
    } catch (error: any) {
        return fail(400, new BasicResponseDto(error.message, undefined));
    }
}

  @Get("{ISBN}")
  public async consultarLivroPorISBN(
    @Path() ISBN: string,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const livro = await this.livroService.ConsultarLivroPorISBN(ISBN);
      if (!livro) {
        return fail(404, new BasicResponseDto("Livro não encontrado",undefined));
      }
      return success(200, new BasicResponseDto("Livro encontrado com sucesso", livro));
    } catch (error: any) {
      return fail(404, new BasicResponseDto(error.message,undefined));
    }
  }

  @Put("{ISBN}")
  public async atualizarLivroPorISBN(
    @Path() ISBN: string,
    @Body() dadosAtualizacao: { titulo?: string; autor?: string; editora?: string; edicao?: string; CategoriaID?: number },
    @Res() fail: TsoaResponse<400 | 404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const livroAtualizado = await this.livroService.AtualizarLivroPorISBN(
        ISBN,
        dadosAtualizacao.titulo,
        dadosAtualizacao.autor,
        dadosAtualizacao.editora,
        dadosAtualizacao.edicao,
        dadosAtualizacao.CategoriaID
      );
      if (!livroAtualizado) {
        return fail(404, new BasicResponseDto("Livro não encontrado para atualização", undefined));
      }
      return success(200, new BasicResponseDto("Livro atualizado com sucesso", livroAtualizado));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Delete("{ISBN}")
  public async removerLivroPorISBN(
    @Path() ISBN: string,
    @Res() fail: TsoaResponse<400 | 404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const resultado = await this.livroService.RemoverLivroPorISBN(ISBN);
      if (resultado === "Livro removido com sucesso") {
        return success(200, new BasicResponseDto(resultado,undefined));
      } else {
        return fail(404, new BasicResponseDto(resultado,undefined));
      }
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }
}