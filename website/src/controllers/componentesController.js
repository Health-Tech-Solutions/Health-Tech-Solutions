
const componentesModel = require("../models/componentesModel");

function modelosDeMaquinasCadastradas(req, res) {
    componentesModel.modelosDeMaquinasCadastradas(req.params.fkTipo).then(
        function (resultado) {
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

function obterDadosPeca(req, res) {
    componentesModel.obterDadosPeca(req.params.idMaquinario).then(
        function (resultado) {
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
    modelosDeMaquinasCadastradas,
    obterDadosPeca

}