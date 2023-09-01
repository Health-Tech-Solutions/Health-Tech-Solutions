const database = require("../database/config")

function cadastrar(nome, email, senha, fkEmpresa, fkRepresentante){
    const sql = `
        INSERT INTO 
            funcionario(nome, email, senha, fkIndustria, fkRepresentante, funcao) 
        VALUES 
            ('${nome}', '${email}', '${senha}', ${fkEmpresa}, ${fkRepresentante}, 'Funcionario')
    `

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

module.exports = {
    cadastrar,
    verifyEmail,
    listar
}