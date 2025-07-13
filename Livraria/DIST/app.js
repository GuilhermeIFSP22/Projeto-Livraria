"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioControler_1 = require("./Controller/UsuarioControler");
const CatalogoControler_1 = require("./Controller/CatalogoControler");
const LivroControler_1 = require("./Controller/LivroControler");
const EstoqueControler_1 = require("./Controller/EstoqueControler");
const EmprestimoControler_1 = require("./Controller/EmprestimoControler");
const AtualizarSuspensao_1 = require("./untils/AtualizarSuspensao");
(0, AtualizarSuspensao_1.atualizarStatusUsuariosPorSuspensao)();
setInterval(() => {
    (0, AtualizarSuspensao_1.atualizarStatusUsuariosPorSuspensao)();
}, 5 * 60 * 1000);
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
app.use(express_1.default.json());
function logInfo() {
    console.log(`API em execução na URL:  http://localhost:${PORT}`);
}
app.post("/Library/usuarios/Cadastrar", UsuarioControler_1.CadastrarUsuario);
app.get('/Library/usuarios/ConsultarTodos', UsuarioControler_1.ConsultarUsuarios);
app.get('/Library/usuarios/Consultar/:CPF', UsuarioControler_1.ConsultarUsuarioPorCPF);
app.put('/Library/usuarios/Atualizar/:CPF', UsuarioControler_1.AtualizarUsuarioPorCPF);
app.delete('/Library/usuarios/Remover/:CPF', UsuarioControler_1.RemoverUsuarioPorCPF);
app.get('/Library/catalogos/CategoriaLivro', CatalogoControler_1.ConsultarCategoriaLivro);
app.get('/Library/catalogos/CategoriaUsuario', CatalogoControler_1.ConsultarCategoriaUsuario);
app.get('/Library/catalogos/CategoriaCurso', CatalogoControler_1.ConsultarCurso);
app.post("/Library/livros/Cadastrar", LivroControler_1.cadastrarLivro);
app.get('/Library/livros/ListarTodos', LivroControler_1.listarLivros);
app.get('/Library/livros/Consultar/:ISBN', LivroControler_1.ConsultarLivroPorISBN);
app.put('/Library/livros/Atualizar/:ISBN', LivroControler_1.atualizarLivroPorISBN);
app.delete('/Library/livros/Remover/:ISBN', LivroControler_1.removerLivroPorISBN);
app.post("/Library/estoque/CadastrarExemplar", EstoqueControler_1.cadastrarEstoque);
app.get('/Library/estoque/ListarExemplaresDisponiveis', EstoqueControler_1.listarEstoqueDisponivel);
app.get('/Library/estoque/ConsultarExemplar/:Codigo', EstoqueControler_1.ConsultarExemplarPorCodigo);
app.put('/Library/estoque/AtualizarDisponibilidade/:Codigo', EstoqueControler_1.atualizarDispoPorCodigo);
app.delete('/Library/estoque/RemoverExemplar/:Codigo', EstoqueControler_1.RemoverExemplarPorCodigo);
app.post("/Library/emprestimos/RegistrarEmprestimo", EmprestimoControler_1.registrarEmprestimo);
app.get('/Library/emprestimos/ListarEmprestimos', EmprestimoControler_1.listarEmprestimos);
app.put('/Library/emprestimos/RegistrarDevolucao', EmprestimoControler_1.registrarDevolucao);
app.listen(PORT, logInfo);
