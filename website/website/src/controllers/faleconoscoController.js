var faleconoscoModel = require("../models/faleconoscoModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var email = req.body.email;
    var telefone = req.body.telefone;
    var mensagem = req.body.mensagem;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (mensagem == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {
    
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        faleconoscoModel.cadastrar(email, telefone, mensagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o envio Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
};