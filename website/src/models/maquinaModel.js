const database = require("../database/config");

function cadastrarModelo(modelo, descricao, tipo){
    const sql = `insert into modelo (modelo, descricao, fkTipo) values ('${modelo}','${descricao}',${tipo})`

    return database.executar(sql)
}

function cadastrarPeca(peca){
    const sql = `insert into peca (nome) values ('${peca}')`

    return database.executar(sql)
}

function cadastrarLimites(valores, idModelo, idPeca){
    const sql = `
        insert into 
            limite (fkModelo, fkPeca, valor, fkTipoRegistro) 
        values 
            ${valores.map(i => `(${idModelo}, ${idPeca},${i.valor}, ${i.medida})`)}
    `

    return database.executar(sql)
}

module.exports = {
    cadastrarModelo,
    cadastrarPeca,
    cadastrarLimites
}