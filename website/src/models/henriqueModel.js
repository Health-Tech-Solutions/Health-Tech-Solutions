const database = require("../database/config")

function pegarModelos() {
    console.log("entrei no pegar modelos")
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                    tipo,
                    modelo
                FROM vw_chamados c
                WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
                GROUP BY tipo,modelo
                ORDER BY numeroChamados
                LIMIT 15;
        `
    } else {
        instrucao = `
            SELECT TOP 15
                COUNT(idChamado) AS numeroChamados,
                tipo,
                modelo
            FROM vw_chamados c
            WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(YEAR, -1, GETDATE()) AND GETDATE()
            GROUP BY tipo, modelo
            ORDER BY numeroChamados;    
        `
    }
    console.log("VOU EXECUTAR A SEGUINTE INSTRUÇÃO SQL \n" + instrucao)
    return database.executar(instrucao)
}

/* CHART PIE */
function listarModelos(fkHospital) {
    var instrucao;
    console.log("Estou no listar modelos")
    if (fkHospital == 'null') {
        instrucao = `
        SELECT 
            tipo,
            idTipo
        FROM vw_chamados
        GROUP BY tipo,idTipo
        `
    } else {
        instrucao = `
        SELECT 
        tipo,
        idTipo 
    FROM vw_chamados 
    WHERE idHospital = ${fkHospital}
    GROUP BY tipo, idTipo;    
        `
    }
    return database.executar(instrucao)
}

function buscarGravidade(idTipo,fkHospital){
    var instrucao = ``
    console.log("Estou no buscar gravidade")
    if(fkHospital == 'null'){
        instrucao = `
        SELECT 
            COUNT(nivel) AS qtdNivel,
            nivel 
        FROM vw_chamados 
        WHERE idTipo = ${idTipo}
        GROUP BY nivel
        ORDER BY nivel;
        
        `
    } else {
        instrucao = `
        SELECT 
            COUNT(nivel) AS qtdNivel,
            nivel 
        FROM vw_chamados 
        WHERE idTipo = ${idTipo}
        AND idHospital = ${fkHospital}
        GROUP BY nivel;
    `
    }
    
    console.log("Executando a seguinte instrução sql " + instrucao)
    return database.executar(instrucao)
}

/* Fim do chart pie */

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

function buscarMensal(fkHospital) {

    var instrucao;
    if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        if (fkHospital == 'null') {
            instrucao = `
            SELECT 
                MONTH(dataHora) AS mes,
                COUNT(*) AS quantidade	
            FROM vw_chamados
            GROUP BY mes
            ORDER BY mes;
            `
        } else {
            instrucao = `
            SELECT 
                MONTH(dataHora) AS mes,
                COUNT(*) AS quantidade	
            FROM vw_chamados
            WHERE idHospital = ${fkHospital}
            GROUP BY mes
            ORDER BY mes;
        `
        }
    } else {

        if (fkHospital == 'null') {
            instrucao = `
            SELECT 
                MONTH(dataHora) AS mes,
                COUNT(*) AS quantidade	
            FROM vw_chamados
            GROUP BY MONTH(dataHora)
            ORDER BY mes;
        
            `
        } else {
            instrucao = `
            SELECT 
                MONTH(dataHora) AS mes,
                COUNT(*) AS quantidade	
            FROM vw_chamados
            WHERE idHospital = ${fkHospital}
            GROUP BY MONTH(dataHora)
            ORDER BY mes;
            `
        }
    }
    console.log("Executando a seguinte instrução sql " + instrucao)
    return database.executar(instrucao)
}

function buscarSemanal(fkHospital) {
    var instrucao;
    if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        if (fkHospital = 'null') {
            instrucao = `
            SELECT 
                DAYOFMONTH(dataHora) AS dia,
                COUNT(*) AS quantidade	
            FROM vw_chamados
            GROUP BY dia
            ORDER BY dia;
            `
        } else {
            instrucao = `
            SELECT 
                DAYOFMONTH(dataHora) AS dia,
                COUNT(*) AS quantidade	
            FROM vw_chamados
            WHERE idHospital = ${fkHospital}
            GROUP BY dia
            ORDER BY dia;
            `
        }
    } else {
        if (fkHospital == 'null') {
            instrucao = `
            SELECT 
                DAY(dataHora) AS dia,
                COUNT(*) AS quantidade	
            FROM vw_chamados
            GROUP BY DAY(dataHora)
            ORDER BY dia;
            `
        } else {
            instrucao = `
            SELECT 
                DAY(dataHora) AS dia,
                COUNT(*) AS quantidade	
            FROM vw_chamados
            WHERE idHospital = 3
            GROUP BY DAY(dataHora)
            ORDER BY dia;
        
            `
        }
    }
    return database.executar(instrucao)
}

function quantidadeChamados(){
    console.log("Estou verificando a quantidade de chamados")
    var instrucao = 'SELECT COUNT(*) AS qtdChamados FROM chamado'
    return database.executar(instrucao)
}

module.exports = {
    pegarModelos,
    buscarSomaFuncionamento,
    listarModelos,
    buscarMensal,
    buscarGravidade,
    quantidadeChamados, 
    buscarSemanal
}