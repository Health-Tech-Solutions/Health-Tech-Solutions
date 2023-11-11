const express = require("express")
const router = express.Router()

const sofhiaController = require("../controllers/sofhiaController")

router.get("/buscarHospitaisDoDia", function(req,res){
    sofhiaController.buscarHospitaisDoDia(req,res);
})

router.get("/buscarHospitaisDaSemana", function(req,res){
    sofhiaController.buscarHospitaisDaSemana(req,res);
})

router.get("/buscarHospitaisDoMes", function(req,res){
    sofhiaController.buscarHospitaisDoMes(req,res);
})

router.get("/buscarHospitaisDoAno", function(req,res){
    sofhiaController.buscarHospitaisDoAno(req,res);
})

router.get("/buscarComponenteDoDia/:fkHospital", function(req,res){
    sofhiaController.buscarComponenteDoDia(req,res);
})

router.get("/buscarComponenteDaSemana/:fkHospital", function(req,res){
    sofhiaController.buscarComponenteDaSemana(req,res);
})

router.get("/buscarComponenteDoMes/:fkHospital", function(req,res){
    sofhiaController.buscarComponenteDoMes(req,res);
})

router.get("/buscarComponenteDoAno/:fkHospital", function(req,res){
    sofhiaController.buscarComponenteDoAno(req,res);
})

router.get("/buscarTipoDoDia/:fkHospital", function(req,res){
    sofhiaController.buscarTipoDoDia(req,res);
})

router.get("/buscarTipoDaSemana/:fkHospital", function(req,res){
    sofhiaController.buscarTipoDaSemana(req,res);
})

router.get("/buscarTipoDoMes/:fkHospital", function(req,res){
    sofhiaController.buscarTipoDoMes(req,res);
})

router.get("/buscarTipoDoAno/:fkHospital", function(req,res){
    sofhiaController.buscarTipoDoAno(req,res);
})

router.get("/buscarModeloDoDia/:fkHospital", function(req,res){
    sofhiaController.buscarModeloDoDia(req,res);
})

router.get("/buscarModeloDaSemana/:fkHospital", function(req,res){
    sofhiaController.buscarModeloDaSemana(req,res);
})

router.get("/buscarModeloDoMes/:fkHospital", function(req,res){
    sofhiaController.buscarModeloDoMes(req,res);
})

router.get("/buscarModeloDoAno/:fkHospital", function(req,res){
    sofhiaController.buscarModeloDoAno(req,res);
})

router.get("/buscarAlertas", function(req,res){
    sofhiaController.buscarAlertas(req,res);
})

router.get("/listarHospitais", function(req,res){
    sofhiaController.listarHospitais(req,res);
})

router.get("/buscarAlertaComponenteDoDia/:fkHospital", function(req,res){
    sofhiaController.buscarAlertaComponenteDoDia(req,res);
})

router.get("/buscarAlertaComponenteDaSemana/:fkHospital", function(req,res){
    sofhiaController.buscarAlertaComponenteDaSemana(req,res);
})

router.get("/buscarAlertaComponenteDoMes/:fkHospital", function(req,res){
    sofhiaController.buscarAlertaComponenteDoMes(req,res);
})

router.get("/buscarAlertaComponenteDoAno/:fkHospital", function(req,res){
    sofhiaController.buscarAlertaComponenteDoAno(req,res);
})

router.get("/buscarMensal/:fkHospital", function(req,res){
    sofhiaController.buscarMensal(req,res);
})

router.get("/buscarSemanal/:fkHospital", function(req,res){
    sofhiaController.buscarSemanal(req,res);
})
module.exports = router
