const express = require("express")
const router = express.Router()
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
const componentesController = require("../controllers/componentesController")

router.get(`/modelosDeMaquinasCadastradas/:fkTipo/`,(req,res) => {
    componentesController.modelosDeMaquinasCadastradas(req,res);
});

router.get(`/obterDadosPeca/:idMaquinario`,(req,res) => {
    componentesController.obterDadosPeca(req,res);
});

router.get(`/cadastrarPeca`,(req,res) => {
    componentesController.obterDadosPeca(req,res);
});

router.get(`/updateLimite/:fkPeca/:valor`,(req,res) => {
    componentesController.updateLimite(req,res);
});

module.exports = router;