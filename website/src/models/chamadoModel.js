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
    var instrucao;

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
    SELECT 
        COUNT(idChamado) AS numeroChamados,
        tipo 
        FROM vw_chamados 
        GROUP BY tipo
        ORDER BY numeroChamados DESC LIMIT 1;
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
        FROM vw_chamados WHERE dataHora >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) 
        ;
        `
    } else {
    var instrucao = `
    SELECT 
        SUM(CASE WHEN estado = 'Aberto' THEN 1 ELSE 0 END) AS Abertos,
        SUM(CASE WHEN estado = 'Fechado' THEN 1 ELSE 0 END) AS Fechados
    FROM vw_chamados where idHospital = ${fkHospital} AND dataHora >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    ;
    ` 
}
    console.log("Executando a seguinte instrução sql" + instrucao + fkHospital)
    return database.executar(instrucao)

}

function listarChamados(idHospital){

 if(idHospital == 'null'){
        var instrucao = `
        select idMaquina,nivel,estado,sla,
        DATE_FORMAT(dataHora, '%H:%i - %d/%m/%Y ') AS dataHora,tipoRegistro, idChamado from vw_chamados LIMIT 10;
        `
    } else {
    var instrucao = `
    select 
        idMaquina,
        nivel,
        estado,
        sla,
        idChamado,
        DATE_FORMAT(dataHora, '%H:%i - %d/%m/%Y ') AS dataHora,
        tipoRegistro
    from vw_chamados where idHospital = ${idHospital}
        LIMIT 10;
    ` 
}
    console.log("Executando a seguinte instrução sql" + instrucao + idHospital)
    return database.executar(instrucao)

}

function buscarGravidade(idTipo, fkHospital){
    var instrucao = ``
    console.log("PLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
    console.log("Estou no buscar gravidade")
    if(fkHospital == 'null'){
        instrucao = `
        SELECT 
            COUNT(nivel) AS qtdNivel,
            nivel 
        FROM vw_chamados 
        WHERE idTipo = ${idTipo}
        GROUP BY nivel
        ORDER BY nivel;
        
        `
    } else {
        instrucao = `
        SELECT 
            COUNT(nivel) AS qtdNivel,
            nivel 
        FROM vw_chamados 
        WHERE idTipo = ${idTipo}
        AND idHospital = ${fkHospital}
        GROUP BY nivel;
    `
    }
    
    console.log("Executando a seguinte instrução sql " + instrucao)
    return database.executar(instrucao)
}

function listarModelos(fkHospital){
    var instrucao = ``
    console.log("Estou no listar modelos")
    if(fkHospital == 'null'){
        instrucao = `
        SELECT 
            tipo,
            idTipo
        FROM vw_chamados
        GROUP BY tipo,idTipo
        `
    } else {
        instrucao = `
        SELECT 
            tipo,
            idTipo 
        FROM vw_chamados 
        WHERE idHospital = ${fkHospital}
        GROUP BY tipo, idTipo;    
        `
    }
    
    return database.executar(instrucao)
}

function quantidadeChamadosAberto(fkHospital){
    console.log("Estou na função para pegar quantos chamados tem em aberto")
    var instrucao = ``
    if(fkHospital == 'null'){
        instrucao = `SELECT 
	        COUNT(idChamado) AS quantidade
        FROM vw_chamados 
        WHERE estado = "Aberto"
    `
    } else {
        instrucao = `
        SELECT 
            COUNT(idChamado) AS quantidade
        FROM vw_chamados 
        WHERE estado = "Aberto"
        AND idHospital = ${fkHospital}
        `
    }
    console.log("Executando a seguinte instrução SQL" + instrucao)
    return database.executar(instrucao)
}

function fecharChamado(idChamado){
    console.log("Estou no fechar chamados")
    var instrucao = `
    UPDATE chamado SET estado = 'fechado' WHERE idChamado = ${idChamado};
    `

    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}
module.exports = {
    buscarMensal,
    buscarSemanal,
    buscarHospitais,
    buscarComponente,
    buscarModelo,
    buscarEstado,
    listarChamados,
    buscarGravidade,
    listarModelos,
    quantidadeChamadosAberto,
    fecharChamado
}