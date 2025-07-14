import {Body,Controller,Get,Post,Put,Route,Tags,Res,TsoaResponse,} from "tsoa";
import { BasicResponseDto } from "../Model/Entidade/DTO/BasicResponseDTO";
import { EmprestimoService } from "../Service/EmprestimoService";
import { EmprestimoDTO } from "../Model/Entidade/DTO/EmprestimoDTO";

@Route("Emprestimo")
@Tags("Emprestimo")
export class EmprestimoController extends Controller {
  private emprestimoService = new EmprestimoService();

  @Post()
  public async registrarEmprestimo(
  @Body() emprestimo: EmprestimoDTO,
  @Res() fail: TsoaResponse<400, BasicResponseDto>,
  @Res() success: TsoaResponse<201, BasicResponseDto>
): Promise<void> {
  try {
    const { data_emprestimo, CPF, UsuarioID, EstoqueID } = emprestimo;

    if (!data_emprestimo || !CPF || !UsuarioID || !EstoqueID) {
      return fail(400, new BasicResponseDto("Informações incompletas", undefined));
    }

    const data = new Date(data_emprestimo);
    if (isNaN(data.getTime())) {
      return fail(400, new BasicResponseDto("Data de empréstimo inválida", undefined));
    }

    const novoEmprestimo = await this.emprestimoService.registrarEmprestimo(data,CPF,UsuarioID,EstoqueID);
    
    return success(201, new BasicResponseDto("Empréstimo registrado com sucesso", novoEmprestimo));
  } catch (error: any) {
    return fail(400, new BasicResponseDto(error.message || "Erro ao registrar empréstimo", undefined));
  }
}

  @Get()
  public async listarEmprestimos(
    @Res() fail: TsoaResponse<500, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const lista = await this.emprestimoService.listarEmprestimos();
      return success(200, new BasicResponseDto("Empréstimos listados com sucesso", lista));
    } catch (error: any) {
      return fail(500, new BasicResponseDto(error.message || "Erro ao listar empréstimos", undefined));
    }
  }

  @Put("Devolucao")
  public async registrarDevolucao(
    @Body()
    body: {idEmprestimo: number;dataEntrega: string;},
    @Res() fail: TsoaResponse<400 | 404, BasicResponseDto>,
    @Res() success: TsoaResponse<200, BasicResponseDto>
  ): Promise<void> {
    try {
      const { idEmprestimo, dataEntrega } = body;

      if (!idEmprestimo) {
        return fail(400, new BasicResponseDto("Falta o campo idEmprestimo", undefined));
      }

      if (!dataEntrega) {
        return fail(400, new BasicResponseDto("Falta o campo dataEntrega", undefined));
      }

      const datEntrega = new Date(dataEntrega);
      if (isNaN(datEntrega.getTime())) {
        return fail(400, new BasicResponseDto("Data de entrega inválida", undefined));
      }

      const emprestimoAtualizado = await this.emprestimoService.registrarDevolucao(
        idEmprestimo,
        datEntrega
      );

      if (!emprestimoAtualizado) {
        return fail(404, new BasicResponseDto("Empréstimo não encontrado ou não atualizado.", undefined));
      }

      return success(200, new BasicResponseDto("Devolução registrada com sucesso", emprestimoAtualizado));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message || "Erro ao registrar devolução", undefined));
    }
  }
}

