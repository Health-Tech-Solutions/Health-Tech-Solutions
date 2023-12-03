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

router.get('/listarModelos/:fkHospital', (req,res) => {
    henriqueController.listarModelos(req,res);
})

router.get(`/buscarGravidade/:fks`, (req,res) => {
    henriqueController.buscarGravidade(req,res);
})

module.exports = router;