var enviarEmail = require("../utils/enviarEmail");
var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var empresaId = req.body.empresaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (empresaId == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, empresaId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function recuperar(req, res){
    const { email } = req.body;
    
    if(!email){
        res.status(400).json({msg: "Existem valor faltando"})
    }
    usuarioModel.recuperar(email)
        .then(function(resultado){
            if(resultado.length > 0){
                enviarEmail(email, resultado[0].idFuncionario)
                resultado.status(200).json({msg: "Email enviado!"})
            }
        })
        .catch(function(erro){
            
        })
}

function alterarSenha(req, res){
    const { id, novaSenha } = req.body;
    
    if(!novaSenha || novaSenha < 8){
        res.status(400).json({msg: "A senha não atende os paramentros"})
    }
    usuarioModel.alterarSenha(id, novaSenha)
        .then(function(resultado){
            res.status(200).json({msg: "Senha alterada"})   
        })
        .catch(function(erro){
            
        })
}

module.exports = {
    autenticar,
    cadastrar,
    recuperar,
    alterarSenha
}