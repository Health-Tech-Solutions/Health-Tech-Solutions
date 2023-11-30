const viniciusModel = require("../models/componentesModel");

function modelosDeMaquinasCadastradas(req, res) {
    viniciusModel.modelosDeMaquinasCadastradas(req.params.fkTipo).then(
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
    modelosDeMaquinasCadastradas
   
}