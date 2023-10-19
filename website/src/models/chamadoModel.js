const database = require("../database/config")

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

function buscarHospitais(fkHospital){
    var instrucao = ``
    if(fkHospital == 'null'){
        instrucao = `
        SELECT 
            hospital,
            COUNT(*) AS chamados
        FROM vw_chamados
        GROUP BY hospital;
    `
    }else{
        instrucao = `
        SELECT COUNT(idChamado) AS chamados,
                tipoRegistro AS hospital,
                hospital AS h
        FROM vw_chamados
        WHERE idHospital = ${fkHospital}
        GROUP BY hospital, tipoRegistro;
        `

    }
    
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarComponente(){
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
        LEFT JOIN registro AS r ON tr.idTipoRegistro = r.fkTipoRegistro
        LEFT JOIN chamado AS c ON r.idRegistro = c.fkRegistro
        GROUP BY TipoRegistro
        ORDER BY NumeroDeChamados DESC
        LIMIT 1;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarModelo(){
    const instrucao = `
    SELECT m.modelo AS Modelo,
            COUNT(c.idChamado) AS NumeroDeChamados
        FROM modelo AS m
        LEFT JOIN maquinario AS maq ON m.idModelo = maq.fkModelo
        LEFT JOIN registro AS r ON maq.idMaquinario = r.fkMaquina
        LEFT JOIN chamado AS c ON r.idRegistro = c.fkRegistro
        GROUP BY Modelo
        ORDER BY NumeroDeChamados DESC
        LIMIT 1;
    `
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarEstado(fkHospital){

    if(fkHospital == 'null'){
        var instrucao = `
        SELECT 
            SUM(CASE WHEN estado = 'Aberto' THEN 1 ELSE 0 END) AS Abertos,
            SUM(CASE WHEN estado = 'Fechado' THEN 1 ELSE 0 END) AS Fechados
        FROM vw_chamados WHERE dataHora >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);;
        `
    } else {
    var instrucao = `
    SELECT 
        SUM(CASE WHEN estado = 'Aberto' THEN 1 ELSE 0 END) AS Abertos,
        SUM(CASE WHEN estado = 'Fechado' THEN 1 ELSE 0 END) AS Fechados
    FROM vw_chamados where idHospital = ${fkHospital} AND dataHora >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);;
    ` 
}
    console.log("Executando a seguinte instrução sql" + instrucao + fkHospital)
    return database.executar(instrucao)

}

function listarChamados(idHospital){

 if(idHospital == 'null'){
        var instrucao = `
        select idMaquina,nivel,estado,sla,dataHora,tipoRegistro from vw_chamados;
        `
    } else {
    var instrucao = `
    select idMaquina,nivel,estado,sla,dataHora,tipoRegistro from vw_chamados where idHospital = ${idHospital};
    ` 
}
    console.log("Executando a seguinte instrução sql" + instrucao + idHospital)
    return database.executar(instrucao)

}

module.exports = {
    buscarMensal,
    buscarHospitais,
    buscarComponente,
    buscarModelo,
    buscarEstado,
    listarChamados
}