const viniciusModel = require("../models/viniciusModel");

function pegarDadosMaquinas(req, res) {
    viniciusModel.pegarDadosMaquinas(req.params.fkHospital).then(
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

function taxaMaquinasOperando(req, res) {
    viniciusModel.taxaMaquinasOperando(req.params.fkHospital).then(
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

function chamadosAbertos(req, res) {
    viniciusModel.chamadosAbertos(req.params.fkHospital).then(
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


function estadoMaquinas(req, res) {
    viniciusModel.estadoMaquinas(req.params.fkHospital).then(
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


function desempenhoPorModelo(req, res) {
    viniciusModel.desempenhoPorModelo(req.params.fkHospital).then(
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

function tiposDeMaquinasCadastradas(req, res) {
    viniciusModel.tiposDeMaquinasCadastradas(req.params.fkHospital).then(
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

function modelosDeMaquinasCadastradas(req, res) {
    viniciusModel.modelosDeMaquinasCadastradas(req.params.fkTipo,req.params.fkHospital).then(
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

function totalChamadosPorTipo(req, res) {
    viniciusModel.totalChamadosPorTipo(req.params.fkHospital).then(
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

function totalChamadosPorModelo(req, res) {
    viniciusModel.totalChamadosPorModelo(req.params.fkTipo, req.params.fkHospital).then(
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
    pegarDadosMaquinas,
    taxaMaquinasOperando,
    chamadosAbertos,
    estadoMaquinas,
    desempenhoPorModelo,
    tiposDeMaquinasCadastradas,
    modelosDeMaquinasCadastradas,
    totalChamadosPorTipo,
    totalChamadosPorModelo
}