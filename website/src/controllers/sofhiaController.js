const { ConnectionPool } = require("mssql")
const sofhiaModel = require("../models/sofhiaModel")

function buscarMensal(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarMensal(fkHospital)
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
    sofhiaModel.buscarSemanal(fkHospital)
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

function buscarComponenteDoDia(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarComponenteDoDia(fkHospital)
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

function buscarComponenteDaSemana(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarComponenteDaSemana(fkHospital)
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

function buscarComponenteDoMes(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarComponenteDoMes(fkHospital)
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

function buscarComponenteDoAno(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarComponenteDoAno(fkHospital)
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


function buscarTipoDoDia(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarTipoDoDia(fkHospital)
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

function buscarTipoDaSemana(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarTipoDaSemana(fkHospital)
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

function buscarTipoDoMes(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarTipoDoMes(fkHospital)
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

function buscarTipoDoAno(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarTipoDoAno(fkHospital)
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

function buscarModeloDoDia(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarModeloDoDia(fkHospital)
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

function buscarModeloDaSemana(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarModeloDaSemana(fkHospital)
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

function buscarModeloDoMes(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarModeloDoMes(fkHospital)
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

function buscarModeloDoAno(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarModeloDoAno(fkHospital)
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
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarAlertaComponente(fkHospital)
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

function buscarMensal(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarMensal(fkHospital)
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

function buscarSemanal(req,res){
    var fkHospital = req.params.fkHospital
    sofhiaModel.buscarSemanal(fkHospital)
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
    buscarComponenteDoDia,
    buscarComponenteDaSemana,
    buscarComponenteDoMes,
    buscarComponenteDoAno,
    buscarTipoDoDia,
    buscarTipoDaSemana,
    buscarTipoDoMes,
    buscarTipoDoAno,
    buscarModeloDoDia,
    buscarModeloDaSemana,
    buscarModeloDoMes,
    buscarModeloDoAno,
    buscarAlertas,
    listarHospitais,
    buscarAlertaComponente,
    buscarMensal,
    buscarSemanal
}