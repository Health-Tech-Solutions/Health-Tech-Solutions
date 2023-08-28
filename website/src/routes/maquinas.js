const express = require("express")
const router = express.Router()

const maquinaController = require("../controllers/maquinaController")

router.post("/cadastrar", (req, res) => {
    maquinaController.cadastrar(req,res)
})

router.get("/tipo", (req, res) => {
    maquinaController.tipos(req,res)
})

module.exports = router