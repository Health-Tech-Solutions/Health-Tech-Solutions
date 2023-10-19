const hospitalModel = require("../models/hospitalModel")

function listarHospitais(req,res){
    hospitalModel.listarHospitais()
        .then((resultado) => {
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else {
                res.status(204).json([])
            }
        })
        .catch(function (erro){
            console.log(erro);
            console.log("Houve um erro ao procurar os hospitais: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage);
        });
}


function pegarTotalMaquinas(req,res){
    var fkHospital = req.params.fkHospital;
    console.log("Entrou no pegarTotalMaquinas")

    hospitalModel.pegarTotalMaquinas(fkHospital)
        .then(
            function(resultado){
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

<<<<<<< HEAD
function situacaoGeral(req,res){
    var fkHospital = req.params.fkHospital;
    console.log("Entrou no situacaoGeral")

    hospitalModel.situacaoGeral(fkHospital)
        .then(
            function(resultado){
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

function situacaoGeral2(req,res){
    var fkHospital = req.params.fkHospital;
    console.log("Entrou no situacaoGeral")

    hospitalModel.situacaoGeral2(fkHospital)
=======
function maquinasInstaveis(req,res){
    var fkHospital = req.params.fkHospital;
 

    hospitalModel.maquinasInstaveis(fkHospital)
>>>>>>> 7bcdcc31e42212cee2e319bbd0439aa404229207
        .then(
            function(resultado){
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
    listarHospitais,
    pegarTotalMaquinas,
<<<<<<< HEAD
    situacaoGeral,
    situacaoGeral2
=======
    maquinasInstaveis
>>>>>>> 7bcdcc31e42212cee2e319bbd0439aa404229207
}