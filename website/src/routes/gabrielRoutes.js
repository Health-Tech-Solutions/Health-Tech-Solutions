const express = require("express")
const router = express.Router()

const gabrielController = require("../controllers/gabrielController")


router.get("/totalMaquinasPorTipoChamadoAberto/:fkHospital/:hospital", (req,res) => {
    gabrielController.totalMaquinasPorTipoChamadoAberto(req,res)
})

router.get("/totalMaquinasPorTipo/:fkHospital", (req,res) => {
    gabrielController.totalMaquinasPorTipo(req,res)
})


module.exports = router