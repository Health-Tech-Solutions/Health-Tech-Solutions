const database = require("../database/config")

function cadastrar(nome, email, senha, fkEmpresa, fkRepresentante, cpf){
    
    const sql = `
        INSERT INTO 
            funcionario(nome, email, senha, cpf, fkIndustria, fkRepresentante, funcao) 
        VALUES 
            ('${nome}', '${email}', '${senha}',${cpf}, ${fkEmpresa}, ${fkRepresentante}, 'Funcionario')
    `
    console.log("Executando a instrução SQL " + sql)
    return database.executar(sql)
}

function verifyEmail(email){
    const sql = `
        SELECT idFuncionario FROM funcionario WHERE email = '${email}';
    `

    return database.executar(sql)
}

function listar(fkIndustria){
    const sql = `
        SELECT nome, email, funcao FROM funcionario WHERE fkIndustria = ${fkIndustria}
    `

    return database.executar(sql)
}

function enviarFoto(imagem, idFuncionario) {
    var instrucao = `
         UPDATE funcionario SET foto = '${imagem}' where idFuncionario = ${idFuncionario};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarFoto(idFuncionario) {
    var instrucao = `
    SELECT 
    foto
    FROM funcionario WHERE idFuncionario = ${idFuncionario};
    `
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

function pegarInfromacoes(idFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idFuncionario, nome, email, senha, funcao fkIndustria FROM funcionario WHERE idFuncionario = '${idFuncionario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    verifyEmail,
    listar,
    enviarFoto,
    mostrarFoto,
    pegarInfromacoes
}