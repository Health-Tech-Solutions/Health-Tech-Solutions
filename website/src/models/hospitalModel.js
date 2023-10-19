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
        SELECT COUNT(DISTINCT reg.fkMaquina)as qtdMaquinaInstaveis FROM chamado 
        JOIN registro AS reg ON chamado.fkRegistro = reg.idRegistro
       WHERE chamado.nivel = 'Alto'
        `
    }else{
        instrucao = `
        SELECT COUNT(DISTINCT reg.fkMaquina) as qtdMaquinaInstaveis FROM chamado 
        JOIN registro AS reg ON chamado.fkRegistro = reg.idRegistro
       WHERE chamado.nivel = 'Alto'
        `
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}


function situacaoGeral(fkHospital) { 
    const instrucao = `
    SELECT COUNT(*), modelo FROM vw_chamados WHERE estado = 'aberto' and idHospital = ${fkHospital}  GROUP BY modelo ;

        `

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}



function situacaoGeral2(fkHospital) { 
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
    situacaoGeral2,
    maquinasInstaveis
}