const viniciusModel = require("../models/viniciusModel");

function pegarDadosMaquinas(req,res){
    console.log("Entrou no pegarDadosMaquina")
    viniciusModel.pegarDadosMaquinas(req.params.fkHospital).then(
            function(resultado){
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )

}



module.exports = {
    pegarDadosMaquinas
}