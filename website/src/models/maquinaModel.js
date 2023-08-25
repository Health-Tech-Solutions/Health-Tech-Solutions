const database = require("../database/config");

function cadastrarModelo(modelo, descricao, tipo){
    const sql = `insert into modelo (modelo, descricao, fkTipo) values ('${modelo}','${descricao}',${tipo})`

    return database.executar(sql)
}

module.exports = {
    cadastrarModelo
}