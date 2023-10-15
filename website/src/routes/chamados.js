const express = require("express")
const router = express.Router();

const chamadoController = require("../controllers/chamadoController");

router.get("/buscarMensal", function(req,res){
    chamadoController.buscarMensal(req,res);
})

module.exports = router;
