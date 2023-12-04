const database = require("../database/config")

function buscarSemanal(fkHospital) {
    console.log("estou na buscarSemanal no chamadoModel")
    var instrucao = `
    `
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == 'null') {
            instrucao = `
                SELECT 
                    DAY(dataHora) AS dia,
                    COUNT(*) AS quantidade
                FROM vw_chamados
                WHERE DAY(dataHora) <> 31
                GROUP BY DAY(dataHora)
                ORDER BY dia;
            `
        } else {
            instrucao = `
                SELECT 
                    DAY(dataHora) AS dia,
                    COUNT(*) AS quantidade
                FROM vw_chamados
                WHERE idHospital = ${fkHospital}
                    AND DAY(dataHora) <> 31
                GROUP BY DAY(dataHora)
                ORDER BY dia;
            `
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == 'null') {
            instrucao = `
                SELECT 
                    DAYOFMONTH(dataHora) AS dia,
                    COUNT(*) AS quantidade	
                FROM vw_chamados
                WHERE DAYOFMONTH(dataHora) <> 31
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
                    AND DAYOFMONTH(dataHora) <> 31
                GROUP BY dia
                ORDER BY dia;
            `
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("executando a seguinte instrução SQL " + instrucao)
    return database.executar(instrucao)
}

function buscarMensal(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == 'null') {
            instrucao = `
                SELECT 
                    MONTH(dataHora) AS mes,
                    COUNT(*) AS quantidade	
                FROM vw_chamados
                GROUP BY MONTH(dataHora)
                ORDER BY mes;
            `
        } else {
            instrucao = `
                SELECT 
                    MONTH(dataHora) AS mes,
                    COUNT(*) AS quantidade	
                FROM vw_chamados
                WHERE idHospital = ${fkHospital}
                GROUP BY MONTH(dataHora)
                ORDER BY mes;
            `
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == 'null') {
            instrucao = `
                SELECT 
                    MONTH(dataHora) AS mes,
                    COUNT(*) AS quantidade	
                FROM vw_chamados
                GROUP BY mes
                ORDER BY mes;
            `
        } else {
            instrucao = `
                SELECT 
                    MONTH(dataHora) AS mes,
                    COUNT(*) AS quantidade	
                FROM vw_chamados
                WHERE idHospital = ${fkHospital}
                GROUP BY mes
                ORDER BY mes;
            `
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarHospitaisDaSemana() {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            SELECT 
                hospital,
                COUNT(*) AS chamados
            FROM vw_chamados c
            WHERE c.dataHora >= DATEADD(DAY, -7, GETDATE())
            GROUP BY hospital;
        `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `
            SELECT 
                hospital,
                COUNT(*) AS chamados
            FROM vw_chamados c
            WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
            GROUP BY hospital;
        `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarHospitaisDoMes() {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            SELECT 
                hospital,
                COUNT(*) AS chamados
            FROM vw_chamados c
            WHERE c.dataHora >= DATEADD(DAY, -30, GETDATE())
            GROUP BY hospital;
        `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `
            SELECT 
                hospital,
                COUNT(*) AS chamados
            FROM vw_chamados c
            WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
            GROUP BY hospital;
        `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarHospitaisDoAno() {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            SELECT 
                hospital,
                COUNT(*) AS chamados
            FROM vw_chamados c
            WHERE c.dataHora >= DATEADD(DAY, -365, GETDATE())
            GROUP BY hospital;
        `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `
            SELECT 
                hospital,
                COUNT(*) AS chamados
            FROM vw_chamados c
            WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
            GROUP BY hospital;
        `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}

function buscarComponenteDaSemana(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT TOP 1
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -7, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT TOP 1
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -7, GETDATE()) AND CAST(GETDATE() AS DATE)
                AND idHospital = ${fkHospital}
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC;
                `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT 
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC
                LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT 
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE idHospital = ${fkHospital}
                    AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE() 
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC
                LIMIT 1;
                `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function buscarComponenteDoMes(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT TOP 1
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -30, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT TOP 1
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -30, GETDATE()) AND CAST(GETDATE() AS DATE)
                AND idHospital = ${fkHospital}
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC;
                `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT 
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC
                LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT 
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE idHospital = ${fkHospital}
                    AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE() 
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC
                LIMIT 1;
                `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function buscarComponenteDoAno(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT TOP 1
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -365, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT TOP 1
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -365, GETDATE()) AND CAST(GETDATE() AS DATE)
                AND idHospital = ${fkHospital}
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC;
                `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT 
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC
                LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT 
                    p.nome AS Nome_da_Peca
                FROM peca p
                LEFT JOIN vw_chamados c ON p.idPeca = c.idPeca
                WHERE idHospital = ${fkHospital}
                    AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE() 
                GROUP BY p.nome
                ORDER BY COUNT(c.idChamado) DESC
                LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}


function buscarTipoDaSemana(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -7, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY tipo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -7, GETDATE()) AND CAST(GETDATE() AS DATE)
                    AND idHospital = ${fkHospital}
                GROUP BY tipo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
                GROUP BY tipo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE idHospital = ${fkHospital} 
                    AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
                GROUP BY tipo
                ORDER BY numeroChamados DESC LIMIT 1;
                `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function buscarTipoDoMes(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -30, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY tipo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -30, GETDATE()) AND CAST(GETDATE() AS DATE)
                    AND idHospital = ${fkHospital}
                GROUP BY tipo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                tipo 
                FROM vw_chamados c
                WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
                GROUP BY tipo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE idHospital = ${fkHospital} 
                    AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
                GROUP BY tipo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function buscarTipoDoAno(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -365, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY tipo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -365, GETDATE()) AND CAST(GETDATE() AS DATE)
                    AND idHospital = ${fkHospital}
                GROUP BY tipo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                tipo 
                FROM vw_chamados c
                WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
                GROUP BY tipo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                    tipo 
                FROM vw_chamados c
                WHERE idHospital = ${fkHospital} 
                    AND DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
                GROUP BY tipo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function buscarModeloDaSemana(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    modelo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -7, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY modelo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    modelo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -7, GETDATE()) AND CAST(GETDATE() AS DATE)
                    AND idHospital = ${fkHospital}
                GROUP BY modelo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                modelo 
                FROM vw_chamados c
                WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
                GROUP BY modelo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                modelo 
                FROM vw_chamados c
                WHERE idHospital = ${fkHospital} 
                    AND c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
                GROUP BY modelo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function buscarModeloDoMes(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    modelo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -30, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY modelo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    modelo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -30, GETDATE()) AND CAST(GETDATE() AS DATE)
                    AND idHospital = ${fkHospital}
                GROUP BY modelo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                modelo 
                FROM vw_chamados c
                WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
                GROUP BY modelo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                modelo 
                FROM vw_chamados c
                WHERE idHospital = ${fkHospital} 
                    AND c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
                GROUP BY modelo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function buscarModeloDoAno(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    modelo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -365, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY modelo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT TOP 1
                    COUNT(idChamado) AS numeroChamados,
                    modelo 
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -365, GETDATE()) AND CAST(GETDATE() AS DATE)
                    AND idHospital = ${fkHospital}
                GROUP BY modelo
                ORDER BY numeroChamados DESC;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                modelo 
                FROM vw_chamados c
                WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
                GROUP BY modelo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT 
                    COUNT(idChamado) AS numeroChamados,
                modelo 
                FROM vw_chamados c
                WHERE idHospital = ${fkHospital} 
                    AND c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
                GROUP BY modelo
                ORDER BY numeroChamados DESC LIMIT 1;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function listarHospitais() {
    const instrucao = `
        SELECT * FROM empresa;
    `
    console.log("Executando a seguinte instrução no sql " + instrucao)
    return database.executar(instrucao)
}

function buscarAlertaComponenteDaSemana(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -7, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -7, GETDATE()) AND CAST(GETDATE() AS DATE)
                    AND idHospital = ${fkHospital}
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
                    AND idHospital = ${fkHospital}
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function buscarAlertaComponenteDoMes(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -30, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -30, GETDATE()) AND CAST(GETDATE() AS DATE)
                    AND idHospital = ${fkHospital}
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
                    AND idHospital = ${fkHospital}
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}

function buscarAlertaComponenteDoAno(fkHospital) {
    var instrucao = ``
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -365, GETDATE()) AND CAST(GETDATE() AS DATE)
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE CAST(c.dataHora AS DATE) BETWEEN DATEADD(DAY, -365, GETDATE()) AND CAST(GETDATE() AS DATE)
                    AND idHospital = ${fkHospital}
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null") {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        } else {
            instrucao = `
                SELECT COUNT(*) AS quantidade,
                    nomePeca
                FROM vw_chamados c
                WHERE c.dataHora BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
                    AND idHospital = ${fkHospital}
                GROUP BY nomePeca;
            `
            console.log("Executando a seguinte instrução sql" + instrucao)
            return database.executar(instrucao)
        }
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
}


module.exports = {
    buscarHospitaisDaSemana,
    buscarHospitaisDoMes,
    buscarHospitaisDoAno,
    buscarComponenteDaSemana,
    buscarComponenteDoMes,
    buscarComponenteDoAno,
    buscarTipoDaSemana,
    buscarTipoDoMes,
    buscarTipoDoAno,
    buscarModeloDaSemana,
    buscarModeloDoMes,
    buscarModeloDoAno,
    listarHospitais,
    buscarAlertaComponenteDaSemana,
    buscarAlertaComponenteDoMes,
    buscarAlertaComponenteDoAno,
    buscarMensal,
    buscarSemanal
}