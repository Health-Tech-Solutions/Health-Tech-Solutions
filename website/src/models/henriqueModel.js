const database = require("../database/config")

function pegarModelos(){
    var instrucao = ``
    if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
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
   
    return database.executar(instrucao)
}

function buscarSomaFuncionamento(fkModelo){
    var instrucao;
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
//     instrucao = `
//     SELECT
//     ROUND(AVG(om.qtdFalhas), 2) AS qtdFalhas,
//     ROUND(AVG(om.somaFuncionamento), 2) AS tempoFuncionamento,
//     ROUND(AVG(om.somaManutencao), 2) AS tempoManutencao
// FROM ordemManutencao AS om
// WHERE om.qtdFalhas <> 0;
//     `


    instrucao = `SELECT
                    ROUND(AVG(om.qtdFalhas)) AS qtdFalhas,
                    ROUND(AVG(om.somaFuncionamento)) AS tempoFuncionamento,
                 FROM ordemManutencao AS om
                WHERE om.qtdFalhas <> 0`
//     if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
//         if(fkModelo == 'null'){
//             instrucao = `
            // SELECT
            //     ROUND(AVG(om.qtdFalhas)) AS qtdFalhas,
            //     ROUND(AVG(om.somaFuncionamento)) AS tempoFuncionamento,
            //     ROUND(AVG(om.somaManutencao)) AS tempoManutencao
            // FROM ordemManutencao AS om
            // WHERE om.qtdFalhas <> 0;
//         `    
//         } else {
//             instrucao = `
//             SELECT
//             ROUND(AVG(om.qtdFalhas)) AS qtdFalhas,
//             ROUND(AVG(om.somaFuncionamento)) AS tempoFuncionamento,
//             ROUND(AVG(om.somaManutencao)) AS tempoManutencao
//         FROM ordemManutencao AS om
//         WHERE om.qtdFalhas <> 0;
//         `
//         }
//     } else {
//         if(fkModelo == 'null'){
//             instrucao = `
//             SELECT
//             ROUND(AVG(om.qtdFalhas), 2) AS qtdFalhas,
//             ROUND(AVG(om.somaFuncionamento), 2) AS tempoFuncionamento,
//             ROUND(AVG(om.somaManutencao), 2) AS tempoManutencao
//         FROM ordemManutencao AS om
//         WHERE om.qtdFalhas <> 0;
//             `
//     }
// }   
    
    console.log("VOU EXECUTAR A SEGUINTE INSTRUÇÃO SQL " + instrucao)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    return database.executar(instrucao)
}

function buscarMensal(fkHospital){
    
    var instrucao;
    if(process.env.AMBIENTE_PROCESSO = 'desenvolvimento'){
        if(fkHospital == 'null'){
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
    
        if(fkHospital == 'null'){
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

function buscarSemanal(fkHospital){
    var instrucao;
    if(process.env.AMBIENTE_PROCESSO = 'desenvolvimento'){
        if(fkHospital = 'null'){
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
        if(fkHospital == 'null'){
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


module.exports = {
    pegarModelos,
    buscarSomaFuncionamento,
    buscarMensal,
    buscarSemanal
}