const database = require("../database/config")

function modelosDeMaquinasCadastradas(fkTipo) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    select * from maquinario 
    JOIN modelo on idModelo = fkModelo 
    JOIN tipo on idTipo = fktipo 
    where idTipo = ${fkTipo};
    `
    
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    modelosDeMaquinasCadastradas
  
}