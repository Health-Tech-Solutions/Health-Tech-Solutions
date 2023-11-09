const database = require("../database/config")

function buscarSemanal(fkHospital){
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if(fkHospital == 'null'){
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
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function buscarMensal(fkHospital){
    var instrucao = ``

    if(fkHospital == 'null'){
        instrucao = `
        SELECT 
	    MONTH(dataHora) AS mes,
	    COUNT(*) AS quantidade	
	FROM vw_chamados
    GROUP BY mes
    ORDER BY mes;
        `

    }else{
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

    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}



function buscarHospitais() {
    var instrucao = `
        SELECT 
            hospital,
            COUNT(*) AS chamados
        FROM vw_chamados
        GROUP BY hospital;
    `

    // else {
    //     instrucao = `
    //     SELECT COUNT(idChamado) AS chamados,
    //             tipoRegistro AS hospital,
    //             hospital AS h
    //     FROM vw_chamados
    //     WHERE idHospital = ${fkHospital}
    //     GROUP BY hospital, tipoRegistro;
    //     `
    // }
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarComponente(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            p.nome AS Nome_da_Peca
        FROM peca p
        LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
        WHERE c.estado <> 'fechado'
        GROUP BY p.nome
        ORDER BY COUNT(c.idChamado) DESC
        LIMIT 1;
    `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    } else {
        const instrucao = `
        SELECT 
            p.nome AS Nome_da_Peca
        FROM peca p
        LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
        WHERE c.idHospital = ${fkHospital} AND c.estado <> 'fechado'
        GROUP BY p.nome
        ORDER BY COUNT(c.idChamado) DESC
        LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarTipo(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            tipo 
            FROM vw_chamados 
            GROUP BY tipo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    } else {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            tipo 
            FROM vw_chamados 
            WHERE idHospital = ${fkHospital}
            GROUP BY tipo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarModelo(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            modelo 
            FROM vw_chamados 
            GROUP BY modelo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    } else {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            modelo 
            FROM vw_chamados 
            WHERE idHospital = ${fkHospital}
            GROUP BY modelo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function listarHospitais() {
    const instrucao = `
        SELECT * FROM empresa;
    `
    console.log("Executando a seguinte instrução no sql " + instrucao)
    return database.executar(instrucao)
}

function buscarAlertaComponente() {
    var instrucao = `
        SELECT COUNT(idChamado) AS chamados,
                tipoRegistro AS hospital,
                hospital AS h
        FROM vw_chamados
        WHERE idHospital = ${fkHospital}
        GROUP BY hospital, tipoRegistro;
    `

    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function obterAlertasDoDia(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        SELECT 
            DAYOFMONTH(dataHora) AS dia,
            COUNT(*) AS quantidade	
        FROM vw_chamados
        WHERE DATE(dataHora) = CURDATE() 
        GROUP BY dia
        ORDER BY dia;

        `
    } else {
        instrucao = `
        SELECT 
            DAYOFMONTH(dataHora) AS dia,
            COUNT(*) AS quantidade	
        FROM vw_chamados
        WHERE DATE(dataHora) = CURDATE() AND idHospital = ${fkHospital} 
        GROUP BY dia
        ORDER BY dia;
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function buscarSemana(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
        instrucao = `
        SELECT dia, quantidade FROM (
            SELECT
                DAYOFMONTH(dataHora) AS dia,
                COUNT(*) AS quantidade
                FROM vw_chamados
                GROUP BY dia
                ORDER BY dia DESC
                LIMIT 7
        ) AS subquery
        ORDER BY dia;
        `
    } else {
        instrucao = `
        SELECT dia, quantidade FROM (
            SELECT
                DAYOFMONTH(dataHora) AS dia,
                COUNT(*) AS quantidade
            FROM vw_chamados
            WHERE idHospital = ${fkHospital}
            GROUP BY dia
            ORDER BY dia DESC
            LIMIT 7
        ) AS subquery
        ORDER BY dia;
        `
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}
function buscarMes(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (fkHospital == 'null') {
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
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function buscarAno(fkHospital) {
    var instrucao = ``

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

    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    buscarHospitais,
    buscarComponente,
    buscarTipo,
    buscarModelo,
    listarHospitais,
    buscarAlertaComponente,
    buscarMensal,
    buscarSemanal
}