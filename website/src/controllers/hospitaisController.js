const hospitalModel = require("../models/hospitalModel")

function cadastrar(req, res) {

    var nomeFantasia = req.body.nomeFantasiaServer
    var cnpj = req.body.cnpjServer
    var telefone = req.body.telefoneServer
    var cep = req.body.cepServer
    var numero = req.body.numeroServer
    var complemento = req.body.complementoServer
    var logradouro = req.body.logradouroServer
    var bairro = req.body.bairroServer
    var cidade = req.body.cidadeServer
    var fkEmpresa = req.body.fkEmpresaServer

    hospitalModel.cadastrar(nomeFantasia, cnpj, telefone, cep, numero, complemento, logradouro, bairro, cidade, fkEmpresa).then((resultado) => {
            res.status(201).json(resultado);
        });

    // hospitalModel.buscarPorCnpj(cnpj).then((resultado) => {
    //     if (resultado.length > 0) {
    //       res
    //         .status(401)
    //         .json({ mensagem: `o hospital com o cnpj ${cnpj} já existe` });
    //     } else {
    //       hospitalModel.cadastrar(nomeFantasia, cnpj, telefone, cep, numero, complemento, logradouro, bairro, cidade, fkEmpresa).then((resultado) => {
    //         res.status(201).json(resultado);
    //       });
    //     }
    //   });
}

function listarHospitais(req, res) {
    hospitalModel.listarHospitais()
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


function pegarTotalMaquinas(req, res) {
    var fkHospital = req.params.fkHospital;
    console.log("Entrou no pegarTotalMaquinas")

    hospitalModel.pegarTotalMaquinas(fkHospital)
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

function totalMaquinasPorTipoChamadoAberto(req, res) {
    console.log("ENTROU Controller totalMaquinasPorTipoChamadoAberto")
    var fkHospital = req.params.fkHospital;
    var hospital = req.params.hospital

    hospitalModel.totalMaquinasPorTipoChamadoAberto(fkHospital, hospital)
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

    hospitalModel.totalMaquinasPorTipo(fkHospital)
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




function maquinasInstaveis(req, res) {
    var fkHospital = req.params.fkHospital;
    console.log('TESTE!!!!!!', fkHospital)
    hospitalModel.maquinasInstaveis(fkHospital)
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





module.exports = {
    cadastrar,
    listarHospitais,
    pegarTotalMaquinas,
    totalMaquinasPorTipoChamadoAberto,
    totalMaquinasPorTipo,
    maquinasInstaveis
}