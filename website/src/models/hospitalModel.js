const database = require("../database/config")

function listarHospitais(){
    const instrucao = `
        SELECT * FROM empresa;
    `
    console.log("Executando a seguinte instrução no sql " + instrucao)
    return database.executar(instrucao)
}


function pegarTotalMaquinas(fkHospital) {
    var instrucao = ""
    if (fkHospital != "null"){
        instrucao = `
        SELECT COUNT(*) as contagem from maquinario where fkHospital = ${fkHospital};
        `
    }else{
        instrucao = `
        SELECT COUNT(*) as contagem from maquinario;
        `
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

function maquinasInstaveis(fkHospital) {
    var instrucao = ""
    if (fkHospital != "null"){
        instrucao = `
        SELECT COUNT(DISTINCT idMaquina) AS qtdMaquinaInstaveis
        FROM vw_chamados
        WHERE nivel = 'Alto' and idHospital = ${fkHospital};
        `
    }else{
        instrucao = `
        SELECT COUNT(DISTINCT reg.fkMaquina)as qtdMaquinaInstaveis FROM chamado 
        JOIN registro AS reg ON chamado.fkRegistro = reg.idRegistro
       WHERE chamado.nivel = 'Alto';
        `
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}


function situacaoGeral(fkHospital) { 
    const instrucao = `
    SELECT COUNT(idChamado) AS quantidade, tipo FROM vw_chamados GROUP BY tipo;
        `

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}



function totalMaquinasPorTipo(fkHospital) { 
    console.log("Estou no hospital Model, situação geral 2")
    const instrucao = `
    SELECT * FROM modelo JOIN maquinario on idModelo = fkModelo where fkHospital = ${fkHospital};
        `

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}


module.exports = {
    listarHospitais,
    pegarTotalMaquinas,
    situacaoGeral,
    totalMaquinasPorTipo,
    maquinasInstaveis
}