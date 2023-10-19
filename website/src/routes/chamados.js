const express = require("express")
const router = express.Router();

const chamadoController = require("../controllers/chamadoController");

router.get("/buscarMensal/:fkHospital", function(req,res){
    chamadoController.buscarMensal(req,res);
})

router.get("/buscarHospitais/:fkHospital", function(req,res){
    chamadoController.buscarHospitais(req,res);
})

router.get("/buscarComponente", function(req,res){
    chamadoController.buscarComponente(req,res);
})

router.get("/buscarModelo", function(req,res){
    chamadoController.buscarModelo(req,res);
})

router.get("/buscarEstado/:fkHospital", function(req,res){
    chamadoController.buscarEstado(req,res)
})

router.get("/listarChamados/:idHospital", function(req,res){
    chamadoController.listarChamados(req,res)
})

router.get("/buscarSemanal/:fkHospital", function(req,res){
    chamadoController.buscarSemanal(req,res)
})

module.exports = router;
