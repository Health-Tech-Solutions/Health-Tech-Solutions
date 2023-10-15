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

module.exports = {
    buscarMensal
}