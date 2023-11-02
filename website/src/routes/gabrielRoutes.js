const express = require("express")
const router = express.Router()

const gabrielController = require("../controllers/gabrielController")


router.get("/listarTiposMaquinas", (req,res) => {
    gabrielController.listarTiposMaquinas(req,res)
})



router.get("/listarMeses", (req,res) => {
    gabrielController.listarMeses(req,res)
})


router.get("/mediaTemperatura/:idMes", (req,res) => {
    gabrielController.mediaTemperatura(req,res)
})


//Gráficos

router.get("/totalMaquinasPorTipoChamadoAberto/:fkHospital/:hospital", (req,res) => {
    gabrielController.totalMaquinasPorTipoChamadoAberto(req,res)
})

router.get("/totalMaquinasPorTipo/:fkHospital", (req,res) => {
    gabrielController.totalMaquinasPorTipo(req,res)
})

router.get("/buscarMensal/:fkHospital", function(req,res){
    gabrielController.buscarMensal(req,res);
})
module.exports = router