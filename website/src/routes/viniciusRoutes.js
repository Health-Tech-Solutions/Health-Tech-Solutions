const express = require("express")
const router = express.Router()
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
const funcionarioController = require("../controllers/viniciusController")

router.post("/cadastrar", (res, req) => {
    funcionarioController.cadastrar(res, req)
}) 

router.get("/listar/:fkEmpresa", (res, req) => {
    funcionarioController.listar(res,req)
})

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/enviarFoto/:idFuncionario', upload.single('foto'), (req, res) => {
    funcionarioController.enviarFoto(req, res);
});

router.get(`/mostrarFoto/:idFuncionario`, (req, res) => {
    funcionarioController.mostrarFoto(req, res);
});

router.get(`/pegarInformacoes/:idFuncionario`, (req, res) => {
    funcionarioController.pegarInformacoes(req, res);
});

router.get(`/mostrarDados/:idUsuario`, (req,res) => {
    funcionarioController.mostrarDados(req,res);
});

router.get(`/pegarDadosMaquinas/:fkHospital`,(req,res) => {
    funcionarioController.pegarDadosMaquinas(req,res);
});

router.get(`/taxaMaquinasOperando/:fkHospital`,(req,res) => {
    funcionarioController.taxaMaquinasOperando(req,res);
});

router.get(`/chamadosAbertos/:fkHospital`,(req,res) => {
    funcionarioController.chamadosAbertos(req,res);
});

router.get(`/estadoMaquinas/:fkHospital`,(req,res) => {
    funcionarioController.estadoMaquinas(req,res);
});

router.get(`/desempenhoPorModelo/:fkHospital`,(req,res) => {
    funcionarioController.desempenhoPorModelo(req,res);
});

router.get(`/tiposDeMaquinasCadastradas/:fkHospital`,(req,res) => {
    funcionarioController.tiposDeMaquinasCadastradas(req,res);
});

router.get(`/modelosDeMaquinasCadastradas/:fkHospital`,(req,res) => {
    funcionarioController.modelosDeMaquinasCadastradas(req,res);
});

router.get(`/dadosQuantidadeChamados/:idTipo/:idModelo/:fkHospital`,(req,res) => {
    funcionarioController.dadosQuantidadeChamados(req,res);
});





module.exports = router
