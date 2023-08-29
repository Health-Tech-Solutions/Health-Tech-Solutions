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

router.post("/verifEmail", function (req, res) {
    usuarioController.verifEmail(req, res);
});

router.post("/verifCNPJ", function (req, res) {
    usuarioController.verifCNPJ(req, res);
});

router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
});

router.post("/buscarFkEndereco", function (req, res) {
    usuarioController.buscarFkEndereco(req, res);
});


router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
});

router.post("/buscarFkEmpresa", function (req, res) {
    usuarioController.buscarFkEmpresa(req, res);
});

router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
});

router.post("/cadastrarPlano", function (req, res) {
    usuarioController.cadastrarPlano(req, res);
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