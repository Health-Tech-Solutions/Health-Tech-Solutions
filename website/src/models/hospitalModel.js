const database = require("../database/config")

function cadastrar(cep, numero, logradouro, bairro, cidade, nomeFantasia, cnpj, telefone, fkEndereco){
    const instrucao1 = `
        INSERT INTO endereco (cep, numero, logradouro, bairro, cidade) VALUES ('${cep}', '${numero}', '${complemento}', '${logradouro}', '${bairro}', '${cidade}');
    `
    const instrucao2 = `
        INSERT INTO empresa (nomeFantasia, cnpj, telefone, fkEndereco) VALUES ('${nomeFantasia}', '${cnpj}', '${telefone}', '${fkEndereco}');
    `
    console.log("Executando a seguinte instrução no sql " + instrucao1 + instrucao2)
    return database.executar(instrucao1 + instrucao2)
}

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


function totalMaquinasPorTipoChamadoAberto(fkHospital,hospital) { 
    var instrucao = ""
    if (fkHospital != "null") {
         instrucao = `
         SELECT 
     idMaquina AS quantidade, 
     tipo, hospital FROM 
     vw_chamados where hospital = '${hospital}' group by quantidade, tipo, hospital;
             ` 
    }else{
        instrucao = `
        SELECT 
        idMaquina AS quantidade, 
        tipo FROM 
        vw_chamados group by quantidade, tipo;
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


module.exports = {
    cadastrar,
    listarHospitais,
    pegarTotalMaquinas,
    totalMaquinasPorTipoChamadoAberto,
    totalMaquinasPorTipo,
    maquinasInstaveis
}