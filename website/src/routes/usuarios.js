var express = require("express");
var router = express.Router();
var path = require("path");

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/recuperar", function(req, res) {
    usuarioController.recuperar(req, res)
})
router.get("/tela/alterarSenha/:id",function(req, res) {
    res.sendFile(path.join(__dirname,"../../public/dashboard/change-password.html"))
})
router.post("/alterarSenha", function(req, res) {
    usuarioController.alterarSenha(req, res)
})

module.exports = router;