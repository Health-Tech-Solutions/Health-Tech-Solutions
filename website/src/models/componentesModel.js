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

function obterDadosPeca(idMaquinario) {
    console.log("estou na buscarSemanal no chamadoModel")
   
    var instrucao = `
    select * from peca where fkMaquinario = ${idMaquinario};
    `
    
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function updateLimite(fkPeca,valor) {
    console.log("estou na buscarSemanal no chamadoModel")
   
    var instrucao = `
    update limite set valor = ${valor} where fkpeca = ${fkPeca};
    `
    
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    modelosDeMaquinasCadastradas,
    obterDadosPeca,
    updateLimite
  
}