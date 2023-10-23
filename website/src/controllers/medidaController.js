var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    //const limite_linhas = 7;

    var fkTipo = req.params.fkTipo;
    var fkHospital = req.params.fkHospital;

    //console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(fkTipo,fkHospital).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarDadosMaquinario(req, res) {
    console.log('peiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')

    var fkHospital = req.params.fkHospital;
 
    var componente = req.params.componente;
    var idMaquinario = req.params.idMaquinario;
  
    //console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarDadosMaquinario(fkHospital,componente,idMaquinario)
    .then(function (resultado) {
        if (resultado.length > 0) {
            console.log('1TESTEEEE')
            res.status(200).send(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosMaquina(req, res) {

    //const limite_linhas = 7;

    var fkMaquina = req.params.fkMaquina;

    //console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(fkMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarHospitais(req,res){

    medidaModel.buscarHospitais().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarComponente(req,res){
    var fkTipoRegistro = req.params.fkTipoRegistro;

    medidaModel.buscarComponente(fkTipoRegistro).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarModelo(req,res){
    var idModelo = req.params.idModelo;

    medidaModel.buscarModelo(idModelo).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarDadosMaquina,
    buscarHospitais,
    buscarComponente,
    buscarModelo,
    buscarDadosMaquinario
}