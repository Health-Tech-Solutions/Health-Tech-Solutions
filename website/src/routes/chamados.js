const express = require("express")
const router = express.Router();

const chamadoController = require("../controllers/chamadoController");

router.get("/buscarMensal/:fkHospital", function(req,res){
    chamadoController.buscarMensal(req,res);
})

router.get("/buscarHospitais/:idEmpresa", function(req,res){
    chamadoController.buscarHospitais(req,res);
})

router.get("/buscarComponente/:fkTipoRegistro", function(req,res){
    chamadoController.buscarComponente(req,res);
})

router.get("/buscarModelo/:idModelo", function(req,res){
    chamadoController.buscarModelo(req,res);
})

router.get("/buscarEstado", function(req,res){
    chamadoController.buscarEstado(req,res)
})

module.exports = router;
