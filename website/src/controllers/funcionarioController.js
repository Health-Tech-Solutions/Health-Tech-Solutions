const funcionarioModel = require("../models/funcionarioModel")

function cadastrar(req, res){
    
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var cpf = req.body.cpf;
    var fkEmpresa = req.body.fkEmpresa;
    var fkRepresentante = req.body.fkRepresentante;
    
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

module.exports = {
    cadastrar,
    listar
}