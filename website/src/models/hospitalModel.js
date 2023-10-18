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


module.exports = {
    listarHospitais,
    pegarTotalMaquinas
}