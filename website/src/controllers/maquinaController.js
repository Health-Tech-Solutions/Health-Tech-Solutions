const maquinaModel = require("../models/maquinaModel.js")

function cadastrar(req, res){
    const {
        modelo,
        descricao,
        tipo,
        limites,
    } = req.body

    maquinaModel.cadastrarModelo(modelo, descricao, tipo)
        .then((resModelo) => {
            limites.map(i => {
                maquinaModel.cadastrarPeca(i.nome)
                    .then((resPeca) => {
                        maquinaModel.cadastrarLimites(i.valores, resModelo.insertId, resPeca.insertId)
                    })
            })
            res.status(200).json({msg: "Novo Modelo Cadastrado"})
        })
        .catch((erro) => {
            res.status(500).json({erro: erro})
        })
}

/*
    limites = [{
        nome,
        valores: [
            {
                valor,
                medida
            }
        ]
    }]
*/

module.exports = {
    cadastrar
}