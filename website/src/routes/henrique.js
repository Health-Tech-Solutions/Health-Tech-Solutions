const express = require("express")
const router = express.Router()

const henriqueController = require("../controllers/henriqueController")

router.get(`/pegarModelos`, (req,res) =>{
    henriqueController.pegarModelos(req,res)
})

router.get('/buscarSomaFuncionamento/:fkModelo', (req,res) => {
    henriqueController.buscarSomaFuncionamento(req,res)
})

router.get('/buscarMensal/:fkHospital', function (req,res){
    henriqueController.buscarMensal(req,res)
})

router.get('/buscarSemanal/:fkHospital', (req,res) =>{
    henriqueController.buscarSemanal(req,res);
})
module.exports = router;