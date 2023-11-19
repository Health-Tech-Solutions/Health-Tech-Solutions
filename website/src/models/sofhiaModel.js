const database = require("../database/config")

function buscarSemanal(fkHospital){
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `

    if (process.env.AMBIENTE_PROCESSO == "producao") {


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
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

function buscarHospitaisDoDia() {
    var instrucao = `
        SELECT 
            hospital,
            COUNT(*) AS chamados
        FROM vw_chamados c
        WHERE c.dataHora = CURDATE()
        GROUP BY hospital;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarHospitaisDaSemana() {
    var instrucao = `
        SELECT 
            hospital,
            COUNT(*) AS chamados
        FROM vw_chamados c
        WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
        GROUP BY hospital;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarHospitaisDoMes() {
    var instrucao = `
        SELECT 
            hospital,
            COUNT(*) AS chamados
        FROM vw_chamados c
        WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
        GROUP BY hospital;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarHospitaisDoAno() {
    var instrucao = `
        SELECT 
            hospital,
            COUNT(*) AS chamados
        FROM vw_chamados c
        WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
        GROUP BY hospital;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarComponenteDoDia(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            p.nome AS Nome_da_Peca
        FROM peca p
        LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
        WHERE DATE(c.dataHora) = CURDATE() 
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
        WHERE idHospital = ${fkHospital}
            AND DATE(c.dataHora) = CURDATE() 
        GROUP BY p.nome
        ORDER BY COUNT(c.idChamado) DESC
        LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarComponenteDaSemana(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            p.nome AS Nome_da_Peca
        FROM peca p
        LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
        WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
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
        WHERE idHospital = ${fkHospital}
            AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE() 
        GROUP BY p.nome
        ORDER BY COUNT(c.idChamado) DESC
        LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarComponenteDoMes(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            p.nome AS Nome_da_Peca
        FROM peca p
        LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
        WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
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
        WHERE idHospital = ${fkHospital}
            AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE() 
        GROUP BY p.nome
        ORDER BY COUNT(c.idChamado) DESC
        LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarComponenteDoAno(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            p.nome AS Nome_da_Peca
        FROM peca p
        LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
        WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
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
        WHERE idHospital = ${fkHospital}
            AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE() 
        GROUP BY p.nome
        ORDER BY COUNT(c.idChamado) DESC
        LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarTipoDoDia(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            tipo 
            FROM vw_chamados c
            WHERE DATE(c.dataHora) = CURDATE() 
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
            FROM vw_chamados c
            WHERE idHospital = ${fkHospital} AND DATE(c.dataHora) = CURDATE()
            GROUP BY tipo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarTipoDaSemana(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            tipo 
            FROM vw_chamados c
            WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
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
            FROM vw_chamados c
            WHERE idHospital = ${fkHospital} 
                AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
            GROUP BY tipo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarTipoDoMes(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            tipo 
            FROM vw_chamados c
            WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
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
            FROM vw_chamados c
            WHERE idHospital = ${fkHospital} 
                AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
            GROUP BY tipo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarTipoDoAno(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            tipo 
            FROM vw_chamados c
            WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
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
            FROM vw_chamados c
            WHERE idHospital = ${fkHospital} 
                AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
            GROUP BY tipo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarModeloDoDia(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            modelo 
            FROM vw_chamados c
            WHERE c.dataHora = CURDATE()
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
            FROM vw_chamados c
            WHERE idHospital = ${fkHospital} 
                AND c.dataHora = CURDATE()
            GROUP BY modelo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarModeloDaSemana(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            modelo 
            FROM vw_chamados c
            WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
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
            FROM vw_chamados c
            WHERE idHospital = ${fkHospital} 
                AND c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
            GROUP BY modelo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarModeloDoMes(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            modelo 
            FROM vw_chamados c
            WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
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
            FROM vw_chamados c
            WHERE idHospital = ${fkHospital} 
                AND c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
            GROUP BY modelo
            ORDER BY numeroChamados DESC LIMIT 1;
        `
        console.log("Executando a seguinte instrução sql" + instrucao)
        return database.executar(instrucao)
    }
}

function buscarModeloDoAno(fkHospital) {
    if (fkHospital == "null") {
        const instrucao = `
        SELECT 
            COUNT(idChamado) AS numeroChamados,
            modelo 
            FROM vw_chamados c
            WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
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
            FROM vw_chamados c
            WHERE idHospital = ${fkHospital} 
                AND c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
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

function buscarAlertaComponenteDoDia(fkHospital) {
    if(fkHospital == "null") {
        var instrucao = `
        SELECT COUNT(*) AS quantidade,
            nomePeca
        FROM vw_chamados c
        WHERE c.dataHora = CURDATE()
        GROUP BY nomePeca;   
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
    } else {
        var instrucao = `
        SELECT COUNT(*) AS quantidade,
            nomePeca
        FROM vw_chamados c
        WHERE c.dataHora = CURDATE() 
        AND idHospital = ${fkHospital}
        GROUP BY nomePeca;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
    }   
}

function buscarAlertaComponenteDaSemana(fkHospital) {
    if(fkHospital == "null") {
        var instrucao = `
        SELECT COUNT(*) AS quantidade,
            nomePeca
        FROM vw_chamados c
        WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
        GROUP BY nomePeca;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
    } else {
        var instrucao = `
        SELECT COUNT(*) AS quantidade,
            nomePeca
        FROM vw_chamados c
        WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
        AND idHospital = ${fkHospital}
        GROUP BY nomePeca;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
    }
}

function buscarAlertaComponenteDoMes(fkHospital) {
    if(fkHospital == "null") {
        var instrucao = `
        SELECT COUNT(*) AS quantidade,
            nomePeca
        FROM vw_chamados c
        WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
        GROUP BY nomePeca;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
    } else {
        var instrucao = `
        SELECT COUNT(*) AS quantidade,
            nomePeca
        FROM vw_chamados c
        WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
        AND idHospital = ${fkHospital}
        GROUP BY nomePeca;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
    }
}

function buscarAlertaComponenteDoAno(fkHospital) {
    if(fkHospital == "null") {
        var instrucao = `
        SELECT COUNT(*) AS quantidade,
            nomePeca
        FROM vw_chamados c
        WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
        GROUP BY nomePeca;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
    } else {
        var instrucao = `
        SELECT COUNT(*) AS quantidade,
            nomePeca
        FROM vw_chamados c
        WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
        AND idHospital = ${fkHospital}
        GROUP BY nomePeca;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
    }
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
    buscarHospitaisDoDia,
    buscarHospitaisDaSemana,
    buscarHospitaisDoMes,
    buscarHospitaisDoAno,
    buscarComponenteDoDia,
    buscarComponenteDaSemana,
    buscarComponenteDoMes,
    buscarComponenteDoAno,
    // buscarTipo,
    buscarTipoDoDia,
    buscarTipoDaSemana,
    buscarTipoDoMes,
    buscarTipoDoAno,
    buscarModeloDoDia,
    buscarModeloDaSemana,
    buscarModeloDoMes,
    buscarModeloDoAno,
    listarHospitais,
    buscarAlertaComponenteDoDia,
    buscarAlertaComponenteDaSemana,
    buscarAlertaComponenteDoMes,
    buscarAlertaComponenteDoAno,
    buscarMensal,
    buscarSemanal
}