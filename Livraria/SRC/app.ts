import express from 'express';

import { CadastrarUsuario, ConsultarUsuarios, ConsultarUsuarioPorCPF, AtualizarUsuarioPorCPF, RemoverUsuarioPorCPF} from './Controller/UsuarioControler';
import {ConsultarCategoriaLivro,ConsultarCurso,ConsultarCategoriaUsuario} from './Controller/CatalogoControler';
import { atualizarLivroPorISBN, cadastrarLivro, ConsultarLivroPorISBN, listarLivros, removerLivroPorISBN } from './Controller/LivroControler';
import {cadastrarEstoque, listarEstoqueDisponivel, ConsultarExemplarPorCodigo, atualizarDispoPorCodigo, RemoverExemplarPorCodigo} from './Controller/EstoqueControler';
import {registrarEmprestimo, listarEmprestimos, registrarDevolucao} from './Controller/EmprestimoControler';

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
    console.log(`API em execução na URL:  http://localhost:${PORT}`)
}

app.post("/Library/usuarios/Cadastrar", CadastrarUsuario);
app.get('/Library/usuarios/ConsultarTodos', ConsultarUsuarios);
app.get('/Library/usuarios/Consultar/:CPF', ConsultarUsuarioPorCPF);
app.put('/Library/usuarios/Atualizar/:CPF', AtualizarUsuarioPorCPF);
app.delete('/Library/usuarios/Remover/:CPF', RemoverUsuarioPorCPF);

app.get('/Library/catalogos/CategoriaLivro', ConsultarCategoriaLivro);
app.get('/Library/catalogos/CategoriaUsuario', ConsultarCategoriaUsuario);
app.get('/Library/catalogos/CategoriaCurso', ConsultarCurso);

app.post("/Library/livros/Cadastrar", cadastrarLivro);
app.get('/Library/livros/ListarTodos', listarLivros);
app.get('/Library/livros/Consultar/:ISBN', ConsultarLivroPorISBN);
app.put('/Library/livros/Atualizar/:ISBN', atualizarLivroPorISBN);
app.delete('/Library/livros/Remover/:ISBN', removerLivroPorISBN);

app.post("/Library/estoque/CadastrarExemplar", cadastrarEstoque);
app.get('/Library/estoque/ListarExemplaresDisponiveis', listarEstoqueDisponivel);
app.get('/Library/estoque/ConsultarExemplar/:Codigo', ConsultarExemplarPorCodigo);
app.put('/Library/estoque/AtualizarDisponibilidade/:Codigo', atualizarDispoPorCodigo);
app.delete('/Library/estoque/RemoverExemplar/:Codigo', RemoverExemplarPorCodigo);

app.post("/Library/emprestimos/RegistrarEmprestimo", registrarEmprestimo);
app.get('/Library/emprestimos/ListarEmprestimos', listarEmprestimos);
app.get('/Library/emprestimos/RegistrarDevolucao', registrarDevolucao);


app.listen(PORT, logInfo);