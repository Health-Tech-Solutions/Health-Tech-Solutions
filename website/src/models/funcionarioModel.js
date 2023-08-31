const database = require("../database/config")

function cadastrar(nome, email, senha, fkEmpresa){
    const sql = `
        INSERT INTO 
            funcionario(nome, email, senha, fkIndustria) 
        VALUES 
            ('${nome}', '${email}', '${senha}', ${fkEmpresa})
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
        SELECT nome, email FROM funcionario WHERE fkIndustria = ${fkIndustria}
    `

    return database.executar(sql)
}

module.exports = {
    cadastrar,
    verifyEmail,
    listar
}