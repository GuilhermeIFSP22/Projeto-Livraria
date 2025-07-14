import { EstoqueService } from "../Service/EstoqueService";
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../Model/Entidade/DTO/BasicResponseDTO";
import { EstoqueDTO } from "../Model/Entidade/DTO/EstoqueDTO";

@Route("Estoque")
@Tags("Estoque")
export class EstoqueController extends Controller {
  private estoqueService = new EstoqueService();

  @Post()
  public async cadastrarEstoque(
    @Body() estoque: EstoqueDTO,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>
  ): Promise<void> {
    try {
      const novoEstoque = await this.estoqueService.cadastrarEstoque(estoque);
      return success(201, new BasicResponseDto("Livro cadastrado no estoque com sucesso", novoEstoque));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Get()
  public async listarEstoqueDisponivel(
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const estoqueDisponivel = await this.estoqueService.listarEstoqueDisponivel();
      return success(200, new BasicResponseDto("Estoque disponível listado com sucesso", estoqueDisponivel));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message || "Erro ao listar estoque disponível", undefined));
    }
  }

  @Get("{Codigo}")
  public async consultarExemplarPorCodigo(
    @Path() Codigo: number,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const estoque = await this.estoqueService.ConsultarExemplarPorCodigo(Codigo);
      if (!estoque) {
        return fail(404, new BasicResponseDto("Livro não encontrado no estoque", undefined));
      }
      return success(200, new BasicResponseDto("Livro encontrado no estoque com sucesso", estoque));
    } catch (error: any) {
      return fail(404, new BasicResponseDto(error.message, undefined));
    }
  }

  @Put("{Codigo}")
  public async atualizarDispoPorCodigo(
    @Path() Codigo: number,
    @Body() body: { disponivel: boolean },
    @Res() fail: TsoaResponse<404 | 400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const estoqueAtualizado = await this.estoqueService.AtualizarDispoPorCodigo(Codigo, body.disponivel);
      if (!estoqueAtualizado) {
        return fail(404, new BasicResponseDto("Exemplar não encontrado para atualização", undefined));
      }
      return success(200, new BasicResponseDto("Exemplar atualizado com sucesso no estoque", estoqueAtualizado));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Delete("{id}")
  public async removerExemplarPorCodigo(
    @Path() id: number,
    @Res() fail: TsoaResponse<404 | 400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const resultado = await this.estoqueService.RemoverExemplarPorCodigo(id);
      if (resultado !== "Livro removido com sucesso") {
        return fail(404, new BasicResponseDto(resultado, undefined));
      }
      return success(200, new BasicResponseDto(resultado, undefined));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }
}
