
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

function updateLimite(req, res) {
    componentesModel.updateLimite(req.params.fkPeca,req.params.valor).then(
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

function cadastrarPeca(req, res) {
    const {nome, descricao, modelo, fkTipoRegistro, fkMaquinario, valor} = req.body; 
    componentesModel.cadastrarPeca(nome, descricao, modelo, fkTipoRegistro, fkMaquinario).then(
        function (resultado) {
            componentesModel.cadastrarLimite(valor, resultado.insertId).then(
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
    obterDadosPeca,
    updateLimite,
    cadastrarPeca

}