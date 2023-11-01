const gabrielModel = require("../models/gabrielModel")


function listarTiposMaquinas(req, res) {
    gabrielModel.listarTiposMaquinas()
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


function totalMaquinasPorTipoChamadoAberto(req, res) {
    console.log("ENTROU Controller totalMaquinasPorTipoChamadoAberto")
    var fkHospital = req.params.fkHospital;
    var hospital = req.params.hospital

    gabrielModel.totalMaquinasPorTipoChamadoAberto(fkHospital, hospital)
        .then(
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


function totalMaquinasPorTipo(req, res) {
    var fkHospital = req.params.fkHospital;
    console.log("Entrou no totalMaquinasPorTipo")

    gabrielModel.totalMaquinasPorTipo(fkHospital)
        .then(
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


function buscarMensal(req,res){
    var fkHospital = req.params.fkHospital
    gabrielModel.buscarMensal(fkHospital)
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


module.exports = {
    listarTiposMaquinas,
    totalMaquinasPorTipoChamadoAberto,
    totalMaquinasPorTipo,
    buscarMensal
}