const { ConnectionPool } = require("mssql")
const database = require("../database/config")


function listarTiposMaquinas(){
    const instrucao = `
        SELECT * FROM tipo;
    `
    console.log("Executando a seguinte instrução no sql " + instrucao)
    return database.executar(instrucao)
}



//Gráficos

function totalMaquinasPorTipoChamadoAberto(fkHospital,hospital) { 
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' )
    var instrucao = ""
    if (fkHospital != "null") {
         instrucao = `
         select nome,idMaquinario, count(estado) from tipo join modelo on idTipo = fkTipo join maquinario on idModelo = fkModelo join registro on idMaquinario = fkMaquina join chamado on idRegistro = fkRegistro where estado = "aberto" and fkHospital = '${fkHospital}'  group by nome,idMaquinario;

             ` 
    }else{
        instrucao = `
        select nome,idMaquinario, count(estado) from tipo join modelo on idTipo = fkTipo join maquinario on idModelo = fkModelo join registro on idMaquinario = fkMaquina join chamado on idRegistro = fkRegistro where estado = "aberto" group by nome,idMaquinario;
            ` 
    }

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

function totalMaquinasPorTipo(fkHospital) { 
    var instrucao = ""
    if (fkHospital != "null"){
        instrucao = `
        SELECT * FROM modelo JOIN maquinario on idModelo = fkModelo where fkHospital = ${fkHospital};
            `
    }else{
        instrucao = `
        SELECT * FROM modelo JOIN maquinario on idModelo = fkModelo;
            `
    }

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}


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


module.exports = {
    listarTiposMaquinas,
    totalMaquinasPorTipoChamadoAberto,
    totalMaquinasPorTipo,
    buscarSemanal
}