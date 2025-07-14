import { Request, Response } from "express";
import { UsuarioService } from "../Service/UsuarioService";
import { Body, Controller , Delete , Get , Path , Post , Put , Query , Res , Route , Tags , TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../Model/Entidade/DTO/BasicResponseDTO";
import { UsuarioDTO } from "../Model/Entidade/DTO/UsuarioDTO";

@Route("Usuario")
@Tags("Usuario")
export class UsuarioController extends Controller {
  private usuarioService = new UsuarioService();

  @Post()
  public async cadastrarUsuario(
    @Body() usuario: UsuarioDTO,
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<201, BasicResponseDto>
  ): Promise<void> {
    try {
      const novoUsuario = await this.usuarioService.cadastrarUsuario(usuario);
      return success(201, new BasicResponseDto("Usuário cadastrado com sucesso", novoUsuario));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Get()
  public async consultarUsuarios(
    @Res() fail: TsoaResponse<400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const usuarios = await this.usuarioService.consultarUsuarios();
      return success(200, new BasicResponseDto("Usuários encontrados com sucesso", usuarios));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Get("{CPF}")
  public async consultarUsuarioPorCPF(
    @Path() CPF: string,
    @Res() fail: TsoaResponse<404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const usuario = await this.usuarioService.consultarUsuarioPorCPF(CPF);
      if (!usuario) {
        return fail(404, new BasicResponseDto("Usuário não encontrado", undefined));
      }
      return success(200, new BasicResponseDto("Usuário encontrado com sucesso", usuario));
    } catch (error: any) {
      return fail(404, new BasicResponseDto(error.message, undefined));
    }
  }

  @Put("{CPF}")
  public async atualizarUsuarioPorCPF(
    @Path() CPF: string,
    @Body() dadosAtualizacao: { nome?: string; CursoNome?: string; categoriaNome?: string },
    @Res() fail: TsoaResponse<404 | 400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const usuarioAtualizado = await this.usuarioService.atualizarUsuarioPorCPF(
        CPF,
        dadosAtualizacao.nome,
        dadosAtualizacao.CursoNome,
        dadosAtualizacao.categoriaNome
      );
      if (!usuarioAtualizado) {
        return fail(404, new BasicResponseDto("Usuário não encontrado para atualização", undefined));
      }
      return success(200, new BasicResponseDto("Usuário atualizado com sucesso", usuarioAtualizado));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Delete("{CPF}")
  public async removerUsuarioPorCPF(
    @Path() CPF: string,
    @Res() fail: TsoaResponse<404 | 400, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const resultado = await this.usuarioService.removerUsuarioPorCPF(CPF);
      if (resultado !== "Usuário removido com sucesso") {
        return fail(404, new BasicResponseDto(resultado, undefined));
      }
      return success(200, new BasicResponseDto(resultado, undefined));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }
}