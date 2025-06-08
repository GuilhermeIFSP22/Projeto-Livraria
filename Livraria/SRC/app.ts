import express from 'express';

import { CadastrarUsuario, ConsultarUsuarios, ConsultarUsuarioPorCPF, AtualizarUsuarioPorCPF, RemoverUsuarioPorCPF} from './Controller/UsuarioControler';;

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
    console.log(`API em execução na URL:  http://localhost:${PORT}`)
}

app.post("/Library/Usuario", CadastrarUsuario);
app.get('/Library/Usuario', ConsultarUsuarios);
app.get('/Library/Usuario/:CPF', ConsultarUsuarioPorCPF);
app.put('/Library/Usuario/:CPF', AtualizarUsuarioPorCPF);
app.delete('/Library/Usuario/:CPF', RemoverUsuarioPorCPF);

app.listen(PORT, logInfo);