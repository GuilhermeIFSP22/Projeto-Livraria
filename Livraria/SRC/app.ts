import express from 'express';

import { CadastrarUsuario, ConsultarUsuarios, ConsultarUsuarioPorCPF, AtualizarUsuarioPorCPF, RemoverUsuarioPorCPF} from './Controller/UsuarioControler';;

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
    console.log(`API em execução na URL:  http://localhost:${PORT}`)
}

app.post("/Library", CadastrarUsuario);
app.get('/Library', ConsultarUsuarios);
app.get('/Library/:CPF', ConsultarUsuarioPorCPF);
app.put('/Library/:CPF', AtualizarUsuarioPorCPF);
app.delete('/Library/:CPF', RemoverUsuarioPorCPF);

app.listen(PORT, logInfo);