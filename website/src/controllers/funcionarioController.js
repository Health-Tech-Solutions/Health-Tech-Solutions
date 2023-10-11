const funcionarioModel = require("../models/funcionarioModel")

function cadastrar(req, res){
    
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cpf = req.body.cpfServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var fkRepresentante = req.body.fkRepresentanteServer;
    
    console.log("fk:",fkRepresentante)

    funcionarioModel.verifyEmail(email)
        .then((resEmail) => {
            if(resEmail.length == 0){
                funcionarioModel.cadastrar(nome, email, senha, fkEmpresa, fkRepresentante,cpf)
                    .then(() => {
                        res.status(200).json({msg: "Usuário cadastrado"})
                    })
                    .catch((error) => {
                        res.status(500).json({error: error})
                    })
            }
            else{
                res.status(400).json({msg: "Email já está um uso!"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: error})
           
        })
}

function listar(req, res){
    const { fkEmpresa } = req.params

    funcionarioModel.listar(fkEmpresa)
        .then((resFuncionario) => {
            res.status(200).json({funcionarios: resFuncionario})
        })
}


function enviarFoto(req, res) {
    const imagem = req.file.filename;
    const idFuncionario = req.params.idFuncionario
    funcionarioModel.enviarFoto(imagem, idFuncionario)
        .then(resultado => {
            res.status(201).send("foto enviada com sucesso para a model");
        }).catch(err => {
            res.status(500).send(err);
        });
}

function mostrarFoto(req, res) {
    console.log("Ta aqui")
    var idFuncionario = req.params.idFuncionario;

    funcionarioModel.mostrarFoto(idFuncionario)
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

function pegarInfromacoes (req,res){
    console.log("Entrou no pegarInfomações")
    var idFuncionario = req.params.idFuncionario

    funcionarioModel.pegarInfromacoes(idFuncionario)
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
    cadastrar,
    listar,
    enviarFoto,
    mostrarFoto
}