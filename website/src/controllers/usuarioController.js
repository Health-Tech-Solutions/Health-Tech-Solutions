var enviarEmail = require("../utils/enviarEmail");
var usuarioModel = require("../models/usuarioModel");

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

function buscarModelos(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idEmresa = req.body.idEmpresaServer;
    var fkTipo = req.body.fkTipoServer;
 

    // Faça as validações dos valores
    if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (fkTipo == undefined) {
        res.status(400).send("Seu tipo está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.buscarModelos(idEmresa, fkTipo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o buscarModelos! Erro: ",
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

function verifEmail(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.body.emailServer;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.verifEmail(email)
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

function verifCNPJ(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var CNPJ = req.body.cnpjServer;
    console.log(CNPJ)

    // Faça as validações dos valores
    if (CNPJ == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.verifCNPJ(CNPJ)
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

function cadastrarPlano(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var plano = req.body.planoEscolhidoServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores
    if (plano == undefined) {
        res.status(400).send("Seu plano está undefined!");
    } 
    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarPlano(plano, fkEmpresa)
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

function cadastrarEndereco(req, res) {
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;

    // Faça as validações dos valores
    if (cep == undefined) {
        res.status(400).send("Seu email está undefined!");
    } if (numero == undefined) {
        res.status(400).send("Seu email está undefined!");
    } if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    }
     else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEndereco(cep, numero, complemento)
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

function buscarFkEndereco(req, res) {
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;

    // Faça as validações dos valores
    if (cep == undefined) {
        res.status(400).send("Seu email está undefined!");
    } if (numero == undefined) {
        res.status(400).send("Seu email está undefined!");
    } if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    }
     else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.buscarFkEndereco(cep, numero, complemento)
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

function cadastrarEmpresa(req, res) {
    var nomeFantasia = req.body.nomeFantasiaServer;
    var telefone = req.body.telefoneServer;
    var cnpj = req.body.cnpjServer;
    var fkEndereco = req.body.fkEnderecoServer

    // Faça as validações dos valores
    if (nomeFantasia == undefined) {
        res.status(400).send("Seu nomeFantasia está undefined!");
    } if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } if (fkEndereco == undefined) {
        res.status(400).send("Seu está undefined!");
    }
     else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(nomeFantasia, telefone, cnpj, fkEndereco)
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

function buscarFkEmpresa(req, res) {
    var nomeFantasia = req.body.nomeFantasiaServer;
    var telefone = req.body.telefoneServer;
    var cnpj = req.body.cnpjServer;
    var fkEndereco = req.body.fkEnderecoServer

    // Faça as validações dos valores
    if (nomeFantasia == undefined) {
        res.status(400).send("Seu nomeFantasia está undefined!");
    } if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } if (fkEndereco == undefined) {
        res.status(400).send("Seu está undefined!");
    }
     else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.buscarFkEmpresa(nomeFantasia, telefone, cnpj, fkEndereco)
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

function cadastrarFuncionario(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    }
     else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarFuncionario(nome, email, senha, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro de funcionario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    recuperar,
    alterarSenha,
    buscarModelos,
    verifEmail,
    verifCNPJ,
    cadastrarEndereco,
    cadastrarEmpresa,
    buscarFkEndereco,
    buscarFkEmpresa,
    cadastrarFuncionario,
    cadastrarPlano
}