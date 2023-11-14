const express = require("express")
const router = express.Router()

const henriqueController = require("../controllers/henriqueController")

router.get(`/pegarModelos`, (req,res) =>{
    henriqueController.pegarModelos(req,res)
})

router.get('buscarSomaFuncionamento', (req,res) => {
    henriqueController.buscarSomaFuncionamento(req,res)
})

module.exports = router;