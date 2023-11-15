const henriqueModel = require("../models/henriqueModel")


function pegarModelos(req, res) {
    henriqueModel.pegarModelos()
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao procurar os hospitais: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarSomaFuncionamento(req,res){
    var fkModelo = req.params.fkModelo
    henriqueModel.buscarSomaFuncionamento(fkModelo)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao procurar os hospitais: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage);
        });

}

module.exports = {
    pegarModelos,
    buscarSomaFuncionamento
}
