const express = require("express")
const router = express.Router()
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
const funcionarioController = require("../controllers/funcionarioController")

router.post("/cadastrar", (res, req) => {
    funcionarioController.cadastrar(res, req)
}) 

router.get("/listar/:fkEmpresa", (res, req) => {
    funcionarioController.listar(res,req)
})

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/enviarFoto/:idFuncionario', upload.single('foto'), (req, res) => {
    funcionarioController.enviarFoto(req, res);
});

router.get(`/mostrarFoto/:idFuncionario`, function (req, res) {
    funcionarioController.mostrarFoto(req, res);
});


module.exports = router