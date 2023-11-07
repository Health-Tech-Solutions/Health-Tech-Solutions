const database = require("../database/config")

// function buscarSemanal(fkHospital){
//     console.log("estou na buscarSemanal no chamadoModel")
//     var instrucao = `
//     `
//     if(fkHospital == 'null'){
//         instrucao = `
//         SELECT 
//             DAYOFMONTH(dataHora) AS dia,
//             COUNT(*) AS quantidade	
//         FROM vw_chamados
//         GROUP BY dia
//         ORDER BY dia;
//         `
//     } else {
//         instrucao = `
//         SELECT 
//             DAYOFMONTH(dataHora) AS dia,
//             COUNT(*) AS quantidade	
//         FROM vw_chamados
//         WHERE idHospital = ${fkHospital}
//         GROUP BY dia
//         ORDER BY dia;
//         `
//     }
//     console.log("executando a seguinte instrução SQL " + instrucao)
//     return database.executar(instrucao)
// }

// function buscarMensal(fkHospital){
//     var instrucao = ``

//     if(fkHospital == 'null'){
//         instrucao = `
//         SELECT 
// 	    MONTH(dataHora) AS mes,
// 	    COUNT(*) AS quantidade	
// 	FROM vw_chamados
//     GROUP BY mes
//     ORDER BY mes;
//         `

//     }else{
//          instrucao = `
//     SELECT 
// 	    MONTH(dataHora) AS mes,
// 	    COUNT(*) AS quantidade	
// 	FROM vw_chamados
//     WHERE idHospital = ${fkHospital}
//     GROUP BY mes
//     ORDER BY mes;
//     `

//     }

//     console.log("Executando a seguinte instrução sql" + instrucao)
//     return database.executar(instrucao)
// }



function buscarHospitais(fkHospital) {
    var instrucao = ``
    if (fkHospital == 'null') {
        instrucao = `
        SELECT 
            hospital,
            COUNT(*) AS chamados
        FROM vw_chamados
        GROUP BY hospital;
    `
    } else {
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

function buscarComponente(fkHospital) {
    if (fkHospital == "null") {
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
    } else {
        const instrucao =`
        SELECT
            hospital,
            tipoRegistro AS ComponenteComMaisChamados,
            COUNT(idChamado) AS NumeroDeChamados
        FROM vw_chamados
        WHERE idHospital = ${fkHospital} 
        GROUP BY hospital, tipoRegistro
        ORDER BY NumeroDeChamados DESC
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

function buscarModelo() {
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
}

function listarHospitais() {
    const instrucao = `
        SELECT * FROM empresa;
    `
    console.log("Executando a seguinte instrução no sql " + instrucao)
    return database.executar(instrucao)
}


module.exports = {
    buscarHospitais,
    buscarComponente,
    buscarTipo,
    buscarModelo,
    listarHospitais
}