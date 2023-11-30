const express = require("express")
const router = express.Router()
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
const componentesController = require("../controllers/componentesController")

router.get(`/modelosDeMaquinasCadastradas/:fkTipo/`,(req,res) => {
    componentesController.modelosDeMaquinasCadastradas(req,res);
});

module.exports = router;