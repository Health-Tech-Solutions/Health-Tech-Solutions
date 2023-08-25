const express = require("express")
const router = express.Router()

const maquinaController = require("../controllers/maquinaController")

router.post("/cadastrar", (req, res) => {
    maquinaController.cadastrar(req,res)
})

module.exports = router