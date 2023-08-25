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
            res.status(200).json({msg: resModelo})
        })
        .cactch((erro) => {
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