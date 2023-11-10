const database = require("../database/config")


function pegarDadosMaquinas(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        SELECT COUNT(*) as total
        FROM vw_chamados
        WHERE nivel = 'Alto' AND dataHora >= DATE_SUB(NOW(), INTERVAL 24 HOUR);
        `
    } else {
        instrucao = `
        SELECT COUNT(*) as total
        FROM vw_chamados
        WHERE nivel = 'Alto' AND dataHora >= DATE_SUB(NOW(), INTERVAL 24 HOUR) 
        AND idHospital = ${fkHospital};
        `   
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function taxaMaquinasOperando(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        Select count(*) as totalMaquinas,(SELECT COUNT(*) 
        FROM vw_chamados
        WHERE nivel = 'Alto' AND dataHora >= DATE_SUB(NOW(), INTERVAL 24 HOUR)) as maquinasOperando from maquinario;
        `
    } else {
        instrucao = `
        Select count(*) as totalMaquinas,(SELECT COUNT(*) 
        FROM vw_chamados
        WHERE nivel = 'Alto' AND dataHora >= DATE_SUB(NOW(), INTERVAL 24 HOUR)) as maquinasOperando from maquinario where fkHospital = ${fkHospital};
        `   
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function chamadosAbertos(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        select count(*) as totalChamados from vw_chamados where estado = 'aberto';
        `
    } else {
        instrucao = `
        select count(*) as totalChamados from vw_chamados where estado = 'aberto' and idHospital = ${fkHospital};
        `   
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    pegarDadosMaquinas,
    taxaMaquinasOperando,
    chamadosAbertos
}