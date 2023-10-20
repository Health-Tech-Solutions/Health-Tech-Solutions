const express = require("express")
const router = express.Router()

const hospitaisController = require("../controllers/hospitaisController")


router.get("/listarHospitais", (req,res) => {
    hospitaisController.listarHospitais(req,res)
})


router.get("/TotalMaquinas/:fkHospital", (req,res) => {
    hospitaisController.pegarTotalMaquinas(req,res)
})
router.get("/maquinasInstaveis/:fkHospital", (req,res) => {
    hospitaisController.maquinasInstaveis(req,res)
})

router.get("/situacaoGeral/:fkHospital", (req,res) => {
    hospitaisController.situacaoGeral(req,res)
})

router.get("/totalMaquinasPorTipo/:fkHospital", (req,res) => {
    hospitaisController.totalMaquinasPorTipo(req,res)
})

module.exports = router