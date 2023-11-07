const express = require("express")
const router = express.Router()

const sofhiaController = require("../controllers/sofhiaController")

router.get("/buscarHospitais/:fkHospital", function(req,res){
    sofhiaController.buscarHospitais(req,res);
})

router.get("/buscarComponente/:fkHospital", function(req,res){
    sofhiaController.buscarComponente(req,res);
})

router.get("/buscarTipo:fkHospital", function(req,res){
    sofhiaController.buscarTipo(req,res);
})

router.get("/buscarModelo", function(req,res){
    sofhiaController.buscarModelo(req,res);
})

router.get("/buscarAlertas", function(req,res){
    sofhiaController.buscarAlertas(req,res);
})

router.get("/listarHospitais", function(req,res){
    sofhiaController.listarHospitais(req,res);
})
module.exports = router
