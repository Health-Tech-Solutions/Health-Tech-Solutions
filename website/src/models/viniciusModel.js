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
        select count(*) as totalMaquinas,(select count(*) from ordemManutencao
        JOIN maquinario on idMaquinario = fkMaquina
        where estado = 'funcionando') as maquinasOK from maquinario;
        `
    } else {
        instrucao = `
        select count(*) as totalMaquinas,(select count(*) from ordemManutencao
        JOIN maquinario on idMaquinario = fkMaquina
        where estado = 'funcionando' and fkHospital = ${fkHospital}) as maquinasOK from maquinario where fkHospital = ${fkHospital};
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
        select count(*) as maquinasFuncionando,( select count(*) from ordemManutencao
        JOIN maquinario on idMaquinario = fkMaquina
        where estado = 'parado') as maquinasParadas from ordemManutencao
        JOIN maquinario on idMaquinario = fkMaquina
        where estado = 'funcionando';
        `
    } else {
        instrucao = `
        select count(*) as maquinasFuncionando,( select count(*) from ordemManutencao
        JOIN maquinario on idMaquinario = fkMaquina
        where estado = 'parado'
        and maquinario.fkHospital = ${fkHospital}) as maquinasParadas from ordemManutencao
        JOIN maquinario on idMaquinario = fkMaquina
        where estado = 'funcionando'
        and maquinario.fkHospital = ${fkHospital};
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
        select idTipo,
		nome from tipo
        JOIN modelo on fkTipo = idTipo
        JOIN maquinario on fkModelo = idModelo
        group by idTipo 
        order by idTipo asc; 
        `
    } else {
        instrucao = `
        select idTipo,
		nome from tipo
        JOIN modelo on fkTipo = idTipo
        JOIN maquinario on fkModelo = idModelo where fkHospital = ${fkHospital}
        group by idTipo 
        order by idTipo asc; 
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
        select modelo,idModelo from modelo where fkTipo = ${fkTipo} and fkHospital = ${fkHospital};
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function dadosQuantidadeChamados(tipo,modelo,fkHospital) {
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        select count(*) as chamadosPorMaquina,
        (select count(*) from vw_chamados where tipo = '${tipo}' and idHospital = ${fkHospital}) as chamadosPorModelo 
        from vw_chamados where modelo = '${modelo}' and idHospital = ${fkHospital};
        `
    } else {
        instrucao = `
        select count(*) as chamadosPorMaquina,
        (select count(*) from vw_chamados where tipo = '${tipo}') as chamadosPorModelo 
        from vw_chamados where modelo = '${modelo}';
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
    dadosQuantidadeChamados,
    tiposDeMaquinasCadastradas,
    modelosDeMaquinasCadastradas
    
}