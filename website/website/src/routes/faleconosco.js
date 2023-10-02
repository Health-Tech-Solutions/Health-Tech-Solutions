var express = require("express");
var router = express.Router();
var path = require("path");

var faleConosco = require("../controllers/faleconoscoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    faleConosco.cadastrar(req, res);
})

module.exports = router