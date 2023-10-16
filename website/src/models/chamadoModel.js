const database = require("../database/config")

function buscarMensal(fkHospital){
    const instrucao = `
    SELECT 
	    MONTH(dataHora) AS mes,
	    COUNT(*) AS quantidade	
	FROM vw_chamados
    WHERE idHospital = ${fkHospital}
    GROUP BY mes
    ORDER BY mes;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarHospitais(idEmpresa){
    const instrucao = `
    SELECT e.nomeFantasia AS 'Hospital', COUNT(*) AS 'Nº chamados'
        FROM vw_chamados AS c
        LEFT JOIN empresa AS e ON c.idHospital = e.${idEmpresa}
        GROUP BY c.idHospital, e.nomeFantasia;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarComponente(fkTipoRegistro){
    const instrucao = `
    SELECT
            CASE
                WHEN tr.nome = 'Uso de CPU' THEN 'CPU'
                WHEN tr.nome = 'Uso de RAM' THEN 'RAM'
                WHEN tr.nome = 'Uso de disco' THEN 'Disco'
                ELSE tr.nome
            END AS TipoRegistro,
            COUNT(c.idChamado) AS NumeroDeChamados
        FROM tipoRegistro AS tr
        LEFT JOIN registro AS r ON tr.idTipoRegistro = r.${fkTipoRegistro}
        LEFT JOIN chamado AS c ON r.idRegistro = c.fkRegistro
        GROUP BY TipoRegistro
        ORDER BY NumeroDeChamados DESC
        LIMIT 1;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarModelo(idModelo){
    const instrucao = `
    SELECT m.modelo AS Modelo,
            COUNT(c.idChamado) AS NumeroDeChamados
        FROM modelo AS m
        LEFT JOIN maquinario AS maq ON m.${idModelo} = maq.fkModelo
        LEFT JOIN registro AS r ON maq.idMaquinario = r.fkMaquina
        LEFT JOIN chamado AS c ON r.idRegistro = c.fkRegistro
        GROUP BY Modelo
        ORDER BY NumeroDeChamados DESC
        LIMIT 1;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    buscarMensal,
    buscarHospitais,
    buscarComponente,
    buscarModelo
}