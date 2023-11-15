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
		SUM(om.qtdFalhas) AS qtdFalhas,
        SUM(om.somaFuncionamento) AS tempoManutencao,
        maq.fkModelo,
        m.modelo
    FROM ordemManutencao AS om
    JOIN maquinario AS maq ON fkMaquina = idMaquinario
    JOIN modelo AS m ON m.idModelo = maq.fkModelo
    WHERE somaFuncionamento <> 0
    AND maq.fkModelo = 3
	GROUP BY maq.fkModelo;
    `
    }
    
    
    console.log("VOU EXECUTAR A SEGUINTE INSTRUÇÃO SQL " + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    pegarModelos,
    buscarSomaFuncionamento
}