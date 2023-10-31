const express = require("express")
const router = express.Router()

const sofhiaController = require("../controllers/sofhiaController")

router.get("/buscarHospitais/:fkHospital", function(req,res){
    sofhiaController.buscarHospitais(req,res);
})

router.get("/buscarComponente", function(req,res){
    sofhiaController.buscarComponente(req,res);
})

router.get("/buscarModelo", function(req,res){
    sofhiaController.buscarModelo(req,res);
})

module.exports = router
