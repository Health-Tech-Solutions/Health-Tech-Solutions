const database = require("../database/config")

function pegarModelos(){

    var instrucao = ``

    if(process.env.AMBIENTE_PROCESSO == "producao"){
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

    if(process.env.AMBIENTE_PROCESSO == "producao"){
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
    } else {
        if(fkModelo == 'null'){
            instrucao = `
            SELECT
            ROUND(AVG(om.qtdFalhas), 2) AS qtdFalhas,
            ROUND(AVG(om.somaFuncionamento), 2) AS tempoFuncionamento,
            ROUND(AVG(om.somaManutencao), 2) AS tempoManutencao
        FROM ordemManutencao AS om
        WHERE om.qtdFalhas <> 0;
            `
    }
}
    
    console.log("VOU EXECUTAR A SEGUINTE INSTRUÇÃO SQL " + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    pegarModelos,
    buscarSomaFuncionamento
}