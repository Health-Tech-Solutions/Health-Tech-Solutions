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
		SUM(om.qtdFalhas) AS qtdFalhas,
        SUM(om.somaManutencao) AS tempoManutencao,
        maq.fkModelo,
        m.modelo
    FROM ordemManutencao AS om
    JOIN maquinario AS maq ON fkMaquina = idMaquinario
    JOIN modelo AS m ON m.idModelo = maq.fkModelo
    WHERE somaManutencao <> 0
	GROUP BY maq.fkModelo
    `
    console.log("VOU EXECUTAR A SEGUINTE INSTRUÇÃO SQL " + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    pegarModelos,
    buscarSomaFuncionamento
}