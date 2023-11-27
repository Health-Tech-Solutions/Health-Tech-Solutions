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

function buscarMensal(req,res){
    var fkHospital = req.params.fkHospital
    henriqueModel.buscarMensal(fkHospital)
        .then((resultado) => {
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(erro =>{
            console.log(erro);
            console.log("Houve um erro ao buscar o histórico mensal", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarSemanal(req,res){
    const fkHospital = req.params.fkHospital
    henriqueModel.buscarSemanal(fkHospital)
        .then((resultado) =>{
            if(resultado.length > 0){
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
    buscarSemanal
}
