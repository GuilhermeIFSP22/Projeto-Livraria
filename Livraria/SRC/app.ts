import express from 'express';

import { CadastrarUsuario, ConsultarUsuarios, ConsultarUsuarioPorCPF, AtualizarUsuarioPorCPF, RemoverUsuarioPorCPF} from './Controller/UsuarioControler';
import {ConsultarCategoriaLivro,ConsultarCurso,ConsultarCategoriaUsuario} from './Controller/CatalogoControler';

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
    console.log(`API em execução na URL:  http://localhost:${PORT}`)
}

app.post("/Library/Usuario/Cadastrar", CadastrarUsuario);
app.get('/Library/Usuario/ConsultarTodos', ConsultarUsuarios);
app.get('/Library/Usuario/Consultar/:CPF', ConsultarUsuarioPorCPF);
app.put('/Library/Usuario/Atualizar/:CPF', AtualizarUsuarioPorCPF);
app.delete('/Library/Usuario/Remover/:CPF', RemoverUsuarioPorCPF);

app.get('/Library/Catalogo/CategoriaLivro', ConsultarCategoriaLivro);
app.get('/Library/Catalogo/CategoriaUsuario', ConsultarCategoriaUsuario);
app.get('/Library/Catalogo/CategoriaCurso', ConsultarCurso);

app.listen(PORT, logInfo);