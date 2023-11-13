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

function estadoMaquinas(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        select count(*) as maquinasOperando ,
        (select count(*) from vw_vinicius where estado = 'parado' and idHospital = '4') as maquinasParadas
         from vw_vinicius where estado = 'funcionando' and idHospital = '4';
        `
    } else {
        instrucao = `
        select count(*) as maquinasOperando ,
        (select count(*) from vw_vinicius where estado = 'parado' and idHospital = ${fkHospital}) as maquinasParadas
         from vw_vinicius where estado = 'funcionando' and idHospital = ${fkHospital};
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function desempenhoPorModelo(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        SELECT 
        COUNT(DISTINCT idMaquina) AS maquinasOperando,
        (SELECT COUNT(DISTINCT idMaquina) 
        FROM vw_chamados 
        WHERE nivel = 'Alto') AS maquinasParadas 
        FROM vw_chamados 
        WHERE nivel = 'Médio' OR nivel = 'Baixo';
        `
    } else {
        instrucao = `
        SELECT 
        COUNT(DISTINCT idMaquina) AS maquinasOperando,
        (SELECT COUNT(DISTINCT idMaquina) 
        FROM vw_chamados 
        WHERE nivel = 'Alto') AS maquinasParadas 
        FROM vw_chamados 
        WHERE nivel = 'Médio' OR nivel = 'Baixo'and idHospital = ${fkHospital};
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}


function tiposDeMaquinasCadastradas(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        select 
	    t.nome,
        t.idTipo 
        from tipo as t
        JOIN modelo as m ON t.idTipo = m.fkTipo
        JOIN maquinario as maq ON m.idModelo = maq.fkModelo;
        `
    } else {
        instrucao = `
        select 
        t.nome,
        t.idTipo 
        from tipo as t
        JOIN modelo as m ON t.idTipo = m.fkTipo
        JOIN maquinario as maq ON m.idModelo = maq.fkModelo
        WHERE maq.fkHospital = ${fkHospital};	
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function modelosDeMaquinasCadastradas(fkTipo,fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        select modelo,idModelo from modelo where fkTipo = ${fkTipo};
        `
    } else {
        instrucao = `
        select modelo,idModelo from modelo where fkTipo = 1 and fkHospital = ${fkHospital};
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}


module.exports = {
    pegarDadosMaquinas,
    taxaMaquinasOperando,
    chamadosAbertos,
    estadoMaquinas,
    desempenhoPorModelo,
    tiposDeMaquinasCadastradas,
    modelosDeMaquinasCadastradas
    
}