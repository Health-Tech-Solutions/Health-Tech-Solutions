process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var aquariosRouter = require("./src/routes/aquarios");
var empresasRouter = require("./src/routes/empresas");
const hospitaisRouter = require("./src/routes/hospitais")
const maquinaRouter = require("./src/routes/maquinas")
const funcionarioRouter = require("./src/routes/funcionario")
const chamadosRouter = require("./src/routes/chamados")
const gabrielRouter = require("./src/routes/gabrielRoutes")
const sofhiaRouter = require("./src/routes/sofhiaRoute")
const viniciusRouter = require("./src/routes/viniciusRoutes")
const henriqueRouter = require("./src/routes/henrique")
const cadastroComponentes = require("./src/routes/cadastroComponentes")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public/")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/aquarios", aquariosRouter);
app.use("/empresas", empresasRouter);
app.use("/maquinas", maquinaRouter);
app.use("/funcionario", funcionarioRouter)
app.use("/hospitais", hospitaisRouter);
app.use("/chamados", chamadosRouter)
app.use("/gabrielRoutes", gabrielRouter);
app.use("/sofhiaRoute", sofhiaRouter);
app.use("/viniciusRoutes", viniciusRouter);
app.use("/henrique", henriqueRouter)
app.use("/cadastroComponentes", cadastroComponentes)

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
