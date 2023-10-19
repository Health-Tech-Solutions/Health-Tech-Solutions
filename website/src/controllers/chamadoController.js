const chamadoModel = require("../models/chamadoModel")

function buscarMensal(req,res){
    var fkHospital = req.params.fkHospital
    chamadoModel.buscarMensal(fkHospital)
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao buscar o histórico mensal", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarSemanal(req,res){
    var fkHospital = req.params.fkHospital
    chamadoModel.buscarSemanal(fkHospital)
        .then((resultado) => {
            if(resultado.length >0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro)
            console.log("Houve um erro ao buscar o histórico semanal ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarHospitais(req,res){
    var fkHospital = req.params.fkHospital
    chamadoModel.buscarHospitais(fkHospital)
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao buscar os chamados de cada hospital", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarComponente(req,res){
    chamadoModel.buscarComponente()
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao buscar o componente com mais chamados", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarModelo(req,res){
    chamadoModel.buscarModelo()
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao buscar o modelo com mais chamados", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarEstado(req,res){
    var fkHospital = req.params.fkHospital
    chamadoModel.buscarEstado(fkHospital)
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao buscar o componente com mais chamados", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}


function listarChamados(req,res){
    var idHospital = req.params.idHospital
    chamadoModel.listarChamados(idHospital)
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao listar os chamados", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

module.exports = {
    buscarMensal,
    buscarHospitais,
    buscarComponente,
    buscarModelo,
    buscarEstado,
    listarChamados,
    buscarSemanal
}