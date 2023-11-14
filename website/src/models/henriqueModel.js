const database = require("../database/config")

function pegarModelos(){
    var instrucao = `
    
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
    return database.executar(instrucao)
}

function buscarSomaFuncionamento(){
    
    var instrucao = `
    SELECT
        qtdFalhas,
        somaManutencao
    FROM ordemManutencao
    WHERE somaManutencao <> 0;
    `
    console.log("VOU EXECUTAR A SEGUINTE INSTRUÇÃO SQL " + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    pegarModelos,
    buscarSomaFuncionamento
}