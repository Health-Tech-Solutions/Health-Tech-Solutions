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
        select modelo,idModelo from modelo JOIN maquinario on idModelo = fkModelo where fkTipo = ${fkTipo} and fkHospital = ${fkHospital} group by idModelo;
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function totalChamadosPorTipo(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        select nomeTipo,idTipo,count(*) as totalChamadosTipo from vw_vinicius group by idTipo;
        `
    } else {
        instrucao = `
        select nomeTipo,idTipo,count(*) as totalChamadosTipo from vw_vinicius where idHospital = ${fkHospital} group by idTipo;
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function totalChamadosPorModelo(fkTipo ,fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        SELECT modelo, idModelo, COUNT(*) as totalModelo
        FROM vw_vinicius
        WHERE idTipo = ${fkTipo}
        GROUP BY idModelo, modelo
        ORDER BY idModelo DESC;
        `
    } else {
        instrucao = `
        SELECT modelo, idModelo, COUNT(*) as totalModelo
        FROM vw_vinicius
        WHERE idHospital = ${fkHospital} AND idTipo = ${fkTipo}
        GROUP BY idModelo, modelo
        ORDER BY idModelo DESC;
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function buscarSomaFuncionamento(fkModelo){
    var instrucao;
    if(fkModelo == 'null'){
        instrucao = `
        SELECT
            ROUND(AVG(om.qtdFalhas)) AS qtdFalhas,
            ROUND(AVG(om.somaFuncionamento)) AS tempoFuncionamento,
            ROUND(AVG(om.somaManutencao)) AS tempoManutencao
        FROM ordemManutencao AS om
        WHERE om.qtdFalhas <> 0;
    `    
    } else {
        instrucao = `
        SELECT
        ROUND(AVG(om.qtdFalhas)) AS qtdFalhas,
        ROUND(AVG(om.somaFuncionamento)) AS tempoFuncionamento,
        ROUND(AVG(om.somaManutencao)) AS tempoManutencao
    FROM ordemManutencao AS om
    WHERE om.qtdFalhas <> 0;
   
    `
    }
    
    
    console.log("VOU EXECUTAR A SEGUINTE INSTRUÇÃO SQL " + instrucao)
    return database.executar(instrucao)
}


module.exports = {
    pegarDadosMaquinas,
    taxaMaquinasOperando,
    chamadosAbertos,
    estadoMaquinas,
    desempenhoPorModelo,
    tiposDeMaquinasCadastradas,
    modelosDeMaquinasCadastradas,
    totalChamadosPorTipo,
    totalChamadosPorModelo,
    buscarSomaFuncionamento
    
}