const express = require("express")
const router = express.Router()

const sofhiaController = require("../controllers/sofhiaController")

router.get("/buscarHospitais", function(req,res){
    sofhiaController.buscarHospitais(req,res);
})

router.get("/buscarComponente/:fkHospital", function(req,res){
    sofhiaController.buscarComponente(req,res);
})

router.get("/buscarTipo/:fkHospital", function(req,res){
    sofhiaController.buscarTipo(req,res);
})

router.get("/buscarModelo/:fkHospital", function(req,res){
    sofhiaController.buscarModelo(req,res);
})

router.get("/buscarAlertas", function(req,res){
    sofhiaController.buscarAlertas(req,res);
})

router.get("/listarHospitais", function(req,res){
    sofhiaController.listarHospitais(req,res);
})

router.get("/buscarAlertaComponente/:fkHospital", function(req,res){
    sofhiaController.buscarAlertaComponente(req,res);
})

router.get("/buscarMensal/:fkHospital", function(req,res){
    sofhiaController.buscarMensal(req,res);
})

router.get("/buscarSemanal/:fkHospital", function(req,res){
    sofhiaController.buscarSemanal(req,res);
})
module.exports = router
