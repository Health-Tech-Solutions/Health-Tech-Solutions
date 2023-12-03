const henriqueModel = require("../models/henriqueModel");
const { cadastrarFuncionario } = require("./usuarioController");


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

function listarModelos(req, res) {
    var fkHospital = req.params.fkHospital;
    henriqueModel.listarModelos(fkHospital)
        .then(
            (resultado) => {
                if (resultado.length > 0) {
                    res.status(200).json(resultado)
                } else {
                    res.status(204).json([])
                }
            }
        )
        .catch(erro => {
            console.log(erro)
            console.log("Houve um erro ao tentar listar os modelos de equipamentos", erro.sqlMessage)
        })
}

function buscarGravidade(req, res) {
    var fks = req.params.fks
    var split = fks.split(',')
    var idHospital = split[0]
    var idTipo = split[1]

    henriqueModel.buscarGravidade(idTipo, idHospital)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (err) {
            console.log(erro);
            console.log(`Houve um erro ao tentar pegar a gravidade dos chamados`, erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function quantidadeChamados(req, res) {
    henriqueModel.quantidadeChamados()
        .then(
            resultado => {
                if(resultado.length > 0) {
                    res.status(200).json(resultado)
                } else {
                    res.status(204).json([])
                }
            }
        )
        .catch( err => {
            console.log(err);
            console.log("Houve um erro ao tentar pegar a gravidade dos chamados", err.sqlMessage)
            res.status(500).json(err.sqlMessage)   
        })
}

function buscarSomaFuncionamento(req, res) {
    var fkModelo = req.params.fkModelo
    fkModelo = 'null'
    henriqueModel.buscarSomaFuncionamento(fkModelo)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.status(204).json(resultado)
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao procurar os hospitais: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarMensal(req, res) {
    var fkHospital = req.params.fkHospital
    henriqueModel.buscarMensal(fkHospital)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(erro => {
            console.log(erro);
            console.log("Houve um erro ao buscar o histórico mensal", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarSemanal(req, res) {
    const fkHospital = req.params.fkHospital
    henriqueModel.buscarSemanal(fkHospital)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch((erro) => {
            console.log(erro)
            console.log("Houve um erro ao buscar o histórico semanal ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

module.exports = {
    pegarModelos,
    buscarSomaFuncionamento,
    buscarMensal,
    buscarGravidade,
    buscarSemanal,
    quantidadeChamados,
    listarModelos
}
