var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:fkTipo", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/dadosMaquina/:fkMaquina", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/buscarHospitais", function (req,res){
    medidaController.buscarHospitais(req,res)
});

module.exports = router;