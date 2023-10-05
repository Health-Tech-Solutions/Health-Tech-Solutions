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

module.exports = {
    cadastrar,
    verifyEmail,
    listar
}