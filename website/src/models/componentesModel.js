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
    select * from peca JOIN limite on fkPeca = idPeca where fkMaquinario = ${idMaquinario};
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

function cadastrarPeca(nome, descricao, modelo, fkTipoRegistro, fkMaquinario) {
    console.log("estou na buscarSemanal no chamadoModel")
   
    var instrucao = `
    INSERT INTO peca (nome, descricao, modelo, fkTipoRegistro, fkMaquinario) 
    VALUES ('${nome}', '${descricao}', '${modelo}', ${fkTipoRegistro}, ${fkMaquinario});
    `
    
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function cadastrarLimite(valor, fkPeca) {
    console.log("estou na buscarSemanal no chamadoModel")
   
    var instrucao = `
    INSERT INTO limite (valor, fkPeca) 
    VALUES (${valor}, ${fkPeca});
    `
    
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    modelosDeMaquinasCadastradas,
    obterDadosPeca,
    updateLimite,
    cadastrarPeca,
    cadastrarLimite
  
}