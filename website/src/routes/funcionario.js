const express = require("express")
const router = express.Router()

const funcionarioController = require("../controllers/funcionarioController")

router.post("/cadastrar", (res, req) => {
    funcionarioController.cadastrar(res, req)
}) 

router.get("/listar/:fkEmpresa", (res, req) => {
    funcionarioController.listar(res,req)
})

module.exports = router