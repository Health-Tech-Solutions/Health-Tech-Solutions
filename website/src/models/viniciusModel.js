const database = require("../database/config")



function pegarDadosMaquinas(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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
    }

    else if (process.env.AMBIENTE_PROCESSO == "producao") {

        if (fkHospital == 'null') {
            instrucao = `
        SELECT COUNT(*) as total
        FROM vw_chamados
        WHERE nivel = 'Alto' AND dataHora >= DATEADD(HOUR, -24, GETDATE());
        `
        } else {
            instrucao = `
        SELECT COUNT(*) as total
        FROM vw_chamados
        WHERE nivel = 'Alto' AND dataHora >= DATEADD(HOUR, -24, GETDATE()) 
        AND idHospital = ${fkHospital};
        `
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
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
        SELECT tipo.idTipo, tipo.nome
        FROM tipo
        JOIN modelo ON tipo.idTipo = modelo.fkTipo
        JOIN maquinario ON modelo.idModelo = maquinario.fkModelo
        GROUP BY tipo.idTipo, tipo.nome
        ORDER BY tipo.idTipo ASC;
        `
    } else {
        instrucao = `
        select idTipo,
		nome from tipo
        JOIN modelo on fkTipo = idTipo
        JOIN maquinario on fkModelo = idModelo where fkHospital = ${fkHospital}
        GROUP BY tipo.idTipo, tipo.nome
        ORDER BY tipo.idTipo ASC;
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function modelosDeMaquinasCadastradas(fkTipo, fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        select modelo,idModelo from modelo where fkTipo = ${fkTipo};
        `
    } else {
        instrucao = `
        SELECT modelo.modelo, idModelo
        FROM modelo
        JOIN maquinario ON idModelo = fkModelo
        WHERE fkTipo = ${fkTipo} AND fkHospital = ${fkHospital}
        GROUP BY modelo.modelo, idModelo;
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
        SELECT nomeTipo, idTipo, COUNT(*) AS totalChamadosTipo
        FROM vw_vinicius
        GROUP BY nomeTipo, idTipo
        ORDER BY idTipo ASC;

        `
    } else {
        instrucao = `
        SELECT nomeTipo, idTipo, COUNT(*) AS totalChamadosTipo
        FROM vw_vinicius
        WHERE idHospital = ${fkHospital}
        GROUP BY nomeTipo, idTipo
        ORDER BY idTipo ASC;
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function totalChamadosPorModelo(fkTipo, fkHospital) {
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

function buscarSomaFuncionamento(fkModelo) {
    var instrucao;

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkModelo == 'null') {
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
    } else {
        if (fkModelo == 'null') {
            instrucao = `
            SELECT
            ROUND(AVG(om.qtdFalhas), 0) AS qtdFalhas,
            ROUND(AVG(om.somaFuncionamento), 0) AS tempoFuncionamento,
            ROUND(AVG(om.somaManutencao), 0) AS tempoManutencao
        FROM ordemManutencao AS om
        WHERE om.qtdFalhas <> 0;
            `
        }
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