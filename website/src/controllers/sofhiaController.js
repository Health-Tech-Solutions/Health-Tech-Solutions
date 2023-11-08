const { ConnectionPool } = require("mssql")
const sofhiaModel = require("../models/sofhiaModel")

// function buscarMensal(req,res){
//     var fkHospital = req.params.fkHospital
//     sofhiaModel.buscarMensal(fkHospital)
//         .then((resultado) =>{
//             if(resultado.length > 0){
//                 res.status(200).json(resultado)
//             } else {
//                 res.status(204).json([])
//             }
//         })
//         .catch(function (erro){
//             console.log(erro);
//             console.log("Houve um erro ao buscar o histórico mensal", erro.sqlMessage)
//             res.status(500).json(erro.sqlMessage)
//         })
// }

// function buscarSemanal(req,res){
//     var fkHospital = req.params.fkHospital
//     sofhiaModel.buscarSemanal(fkHospital)
//         .then((resultado) => {
//             if(resultado.length >0){
//                 res.status(200).json(resultado)
//             } else {
//                 res.status(204).json([])
//             }
//         })
//         .catch(function (erro){
//             console.log(erro)
//             console.log("Houve um erro ao buscar o histórico semanal ", erro.sqlMessage)
//             res.status(500).json(erro.sqlMessage)
//         })
// }


function buscarHospitais(req,res){
    // var fkHospital = req.params.fkHospital
    sofhiaModel.buscarHospitais()
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
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarComponente(fkHospital)
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

function buscarTipo(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarTipo(fkHospital)
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao buscar o tipo com mais chamados", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarModelo(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarModelo(fkHospital)
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

function buscarAlertas(req,res){
    sofhiaModel.buscarAlertas()
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao buscar a qtde de alertas", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function listarHospitais(req,res){
    sofhiaModel.listarHospitais()
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao listar os hospitais", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function buscarAlertaComponente(req,res){
    sofhiaModel.buscarAlertaComponente()
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao listar os hospitais", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function obterAlertasDoDia(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.obterAlertasDoDia(fkHospital)
        .then((resultado) =>{
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao buscar a qtde de alertas do dia", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}



module.exports = {
    buscarHospitais,
    buscarComponente,
    buscarTipo,
    buscarModelo,
    buscarAlertas,
    listarHospitais,
    buscarAlertaComponente,
    obterAlertasDoDia
}