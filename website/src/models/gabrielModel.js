const { ConnectionPool } = require("mssql")
const database = require("../database/config")


function listarTiposMaquinas(){

     var instrucao = `
        SELECT * FROM tipo;
    `
    
    console.log("Executando a seguinte instrução no sql " + instrucao)
 return database.executar(instrucao) 
}


 function listarMeses(){
    var instrucao = ""
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
         instrucao = `
     select month(dataTemperatura) as mes from dadosTemperatura group by mes order by mes desc;
     `
    }else if (process.env.AMBIENTE_PROCESSO == "producao") {
         instrucao = `
        SELECT MONTH(dataTemperatura) AS mes FROM dadosTemperatura 
        GROUP BY MONTH(dataTemperatura) 
        ORDER BY MONTH(dataTemperatura) DESC;
        `
    }
    
     


     return database.executar(instrucao)
 }



function mediaTemperatura(idMes, fkHospital){
    var instrucao = ""

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        if (fkHospital == "null" && idMes == 'Todos' || idMes == 'undefined') {
            instrucao = `
            SELECT year(dataTemperatura) as ano,  round((avg(temperaturaMax) + avg(temperaturaMin)) / 2) as mediaTemperatura
    FROM endereco JOIN empresa ON idEndereco = fkEndereco JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado
    group by ano;
            `
        }else if(fkHospital == "null" && idMes > 0){
        
            instrucao = `
            SELECT year(dataTemperatura) as ano, month(dataTemperatura) as mes, round((avg(temperaturaMax) + avg(temperaturaMin)) / 2) as mediaTemperatura
    FROM endereco JOIN empresa ON idEndereco = fkEndereco JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado where month(dataTemperatura) = ${idMes}
    group by ano , mes;
            `
    
        } else if(fkHospital != "null" && idMes == 'Todos' || idMes == 'undefined'){
    
            instrucao = `
            SELECT year(dataTemperatura) as ano, round((avg(temperaturaMax) + avg(temperaturaMin)) / 2) as mediaTemperatura
    FROM endereco JOIN empresa ON idEndereco = fkEndereco JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado where idEmpresa = ${fkHospital}
    group by ano;
            `
    
        }else {
    
            instrucao = `
            SELECT year(dataTemperatura) as ano, month(dataTemperatura) as mes, round((avg(temperaturaMax) + avg(temperaturaMin)) / 2) as mediaTemperatura, dadosTemperatura.estado
            FROM endereco JOIN empresa ON idEndereco = fkEndereco JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado where month(dataTemperatura) = ${idMes} and idEmpresa = ${fkHospital}
            group by ano , mes, estado;
            `
    
        }
        
        
    }else if (process.env.AMBIENTE_PROCESSO == "producao") {
        if (fkHospital == "null" && idMes == 'Todos' || idMes == 'undefined') {
            instrucao = `
            SELECT YEAR(dT.dataTemperatura) AS ano, ROUND((AVG(dT.temperaturaMax) + AVG(dT.temperaturaMin)) / 2,0) AS mediaTemperatura
            FROM endereco E
            JOIN empresa EM ON E.idEndereco = EM.fkEndereco
            JOIN dadosTemperatura dT ON E.estado = dT.estado
            GROUP BY YEAR(dT.dataTemperatura);
            `
        }else if(fkHospital == "null" && idMes > 0){
        
            instrucao = `
            SELECT YEAR(dataTemperatura) AS ano,
            MONTH(dataTemperatura) AS mes,
            ROUND((AVG(temperaturaMax) + AVG(temperaturaMin)) / 2,0) AS mediaTemperatura
            FROM endereco
            JOIN empresa ON idEndereco = fkEndereco
            JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado
            WHERE MONTH(dataTemperatura) = ${idMes}
            GROUP BY YEAR(dataTemperatura), MONTH(dataTemperatura);
            `
    
        } else if(fkHospital != "null" && idMes == 'Todos' || idMes == 'undefined'){
    
            instrucao = `
            SELECT YEAR(dt.dataTemperatura) AS ano,
            ROUND((AVG(dt.temperaturaMax) + AVG(dt.temperaturaMin)) / 2,0) AS mediaTemperatura
            FROM endereco e
            JOIN empresa emp ON e.idEndereco = emp.fkEndereco
            JOIN dadosTemperatura dt ON e.estado = dt.estado
            WHERE emp.idEmpresa = ${fkHospital}
            GROUP BY YEAR(dt.dataTemperatura);
            `
    
        }else {
    
            instrucao = `
            SELECT YEAR(dataTemperatura) AS ano, 
            MONTH(dataTemperatura) AS mes, 
            ROUND((AVG(temperaturaMax) + AVG(temperaturaMin)) / 2,0) AS mediaTemperatura, 
            dadosTemperatura.estado
            FROM endereco 
            JOIN empresa ON idEndereco = fkEndereco 
            JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado 
            WHERE MONTH(dataTemperatura) = ${idMes} AND idEmpresa = ${fkHospital}
            GROUP BY YEAR(dataTemperatura), MONTH(dataTemperatura), dadosTemperatura.estado;
            `
    
        }
        
    }

   
    


return database.executar(instrucao)
}


function mediaDesempenho(idMes, fkHospital, idTipo){
    var instrucao = ""

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        
        if(fkHospital == "null" && (idMes == 'Todos' || idMes == 'undefined') && idTipo == 'null'){
            var instrucao = `
            select round(sum(valor)/ count(valor)) as mediaDeDesempenho from registro join maquinario on fkMaquina = idMaquinario 
    join modelo on maquinario.fkModelo = modelo.idModelo 
    join tipo on fkTipo = idTipo where year(dataHora) = 2023;
            `
        }else if(fkHospital == "null" && idMes > 0 && idTipo == 'null'){
    
            var instrucao = `
            select round(sum(valor)/ count(valor)) as mediaDeDesempenho from registro 
            join maquinario on fkMaquina = idMaquinario 
            join empresa on fkHospital = idEmpresa
            where month(dataHora) = ${idMes} and year(registro.dataHora) = 2023;
            `
    
        }else if (fkHospital != "null" && idMes == 'Todos' || idMes == 'undefined' && idTipo == 'null') {
    
            var instrucao = `
            select round(sum(valor)/ count(valor)) as mediaDeDesempenho, nomeFantasia from registro 
            join maquinario on fkMaquina = idMaquinario 
            join empresa on fkHospital = idEmpresa
            where idEmpresa = ${fkHospital} and year(registro.dataHora) = 2023;
            `
    
        }
        
        else if(fkHospital != "null" && idMes > 0 && idTipo == 'null'){
    
            var instrucao = `
            select round(sum(valor)/ count(valor)) as mediaDeDesempenho, nomeFantasia from registro 
            join maquinario on fkMaquina = idMaquinario 
            join empresa on fkHospital = idEmpresa
            where idEmpresa = ${fkHospital} and month(dataHora) = ${idMes} and year(dataHora) = 2023;
            `
        }else if (fkHospital == "null" && (idMes == 'Todos' || idMes == 'undefined') && idTipo > 0){
            
            var instrucao = `  select round(sum(valor)/ count(valor)) as mediaDeDesempenho from registro join maquinario on fkMaquina = idMaquinario 
            join modelo on maquinario.fkModelo = modelo.idModelo 
            join tipo on fkTipo = idTipo where year(dataHora) = 2023 and fkPeca = ${idTipo};`
    
        }else if (fkHospital != "null" && (idMes == 'Todos' || idMes == 'undefined') && idTipo > 0){
    
            var instrucao = `select round(sum(valor)/ count(valor)) as mediaDeDesempenho, nomeFantasia from registro 
            join maquinario on fkMaquina = idMaquinario 
            join empresa on fkHospital = idEmpresa
            where idEmpresa = ${fkHospital} and year(registro.dataHora) = 2023 and fkPeca = ${idTipo};`
    
        }else if (fkHospital == "null" && idMes > 0 && idTipo > 0) {
            var instrucao = `
            select round(sum(valor)/ count(valor)) as mediaDeDesempenho from registro 
            join maquinario on fkMaquina = idMaquinario 
            join empresa on fkHospital = idEmpresa
            where month(dataHora) = ${idMes} and year(registro.dataHora) = 2023 and fkPeca = ${idTipo};
            `
        }else{
            var instrucao = `
            select round(sum(valor)/ count(valor)) as mediaDeDesempenho, nomeFantasia from registro 
            join maquinario on fkMaquina = idMaquinario 
            join empresa on fkHospital = idEmpresa
            where idEmpresa = ${fkHospital} and month(dataHora) = ${idMes} and year(dataHora) = 2023 and fkPeca = ${idTipo};
            `
        }

    }else if(process.env.AMBIENTE_PROCESSO == "producao"){

        if(fkHospital == "null" && (idMes == 'Todos' || idMes == 'undefined') && idTipo == 'null'){
            var instrucao = `
            SELECT ROUND(SUM(valor) / COUNT(valor), 0) AS mediaDeDesempenho
            FROM registro
            INNER JOIN maquinario ON fkMaquina = idMaquinario 
            INNER JOIN modelo ON maquinario.fkModelo = modelo.idModelo 
            INNER JOIN tipo ON fkTipo = idTipo 
            WHERE YEAR(dataHora) = 2023;
            `
        }else if(fkHospital == "null" && idMes > 0 && idTipo == 'null'){
    
            var instrucao = `
            SELECT ROUND(SUM(valor) / COUNT(valor), 0) AS mediaDeDesempenho
            FROM registro
            JOIN maquinario ON fkMaquina = idMaquinario
            JOIN empresa ON fkHospital = idEmpresa
            WHERE MONTH(dataHora) = 1 AND YEAR(registro.dataHora) = 2023;
            `
    
        }else if (fkHospital != "null" && idMes == 'Todos' || idMes == 'undefined' && idTipo == 'null') {
    
            var instrucao = `
            SELECT ROUND(SUM(valor) / COUNT(valor), 0) AS mediaDeDesempenho, empresa.nomeFantasia 
            FROM registro 
            INNER JOIN maquinario ON maquinario.idMaquinario = registro.fkMaquina 
            INNER JOIN empresa ON empresa.idEmpresa = maquinario.fkHospital 
            WHERE empresa.idEmpresa = ${fkHospital} AND YEAR(registro.dataHora) = 2023
            GROUP BY empresa.nomeFantasia;
            `
    
        }else if(fkHospital != "null" && idMes > 0 && idTipo == 'null'){
    
            var instrucao = `
            SELECT ROUND(SUM(valor) / COUNT(valor), 0) AS mediaDeDesempenho, empresa.nomeFantasia
            FROM registro
            JOIN maquinario ON maquinario.idMaquinario = registro.fkMaquina
            JOIN empresa ON empresa.idEmpresa = maquinario.fkHospital
            WHERE empresa.idEmpresa = ${fkHospital}
                AND MONTH(dataHora) = ${idMes}
                AND YEAR(dataHora) = 2023
            GROUP BY empresa.nomeFantasia;
            `
        }else if (fkHospital == "null" && (idMes == 'Todos' || idMes == 'undefined') && idTipo > 0){
            
            var instrucao = `
            SELECT ROUND(SUM(valor) / COUNT(valor), 2) AS mediaDeDesempenho
            FROM registro
            INNER JOIN maquinario ON fkMaquina = idMaquinario
            INNER JOIN modelo ON maquinario.fkModelo = modelo.idModelo
            INNER JOIN tipo ON fkTipo = idTipo
            WHERE YEAR(dataHora) = 2023
            AND fkPeca = ${idTipo};
            `
    
        }else if (fkHospital != "null" && (idMes == 'Todos' || idMes == 'undefined') && idTipo > 0){
    
            var instrucao = `
            SELECT ROUND(SUM(valor) / COUNT(valor), 0) AS mediaDeDesempenho, empresa.nomeFantasia
            FROM registro
            JOIN maquinario ON registro.fkMaquina = maquinario.idMaquinario
            JOIN empresa ON maquinario.fkHospital = empresa.idEmpresa
            WHERE empresa.idEmpresa = ${fkHospital}
            AND YEAR(registro.dataHora) = 2023
            AND registro.fkPeca = ${idTipo}
            GROUP BY empresa.nomeFantasia;
            `
    
        }else if (fkHospital == "null" && idMes > 0 && idTipo > 0) {
            var instrucao = `
            SELECT ROUND(SUM(valor) / COUNT(valor), 0) AS mediaDeDesempenho
            FROM registro 
            JOIN maquinario ON fkMaquina = idMaquinario 
            JOIN empresa ON fkHospital = idEmpresa
            WHERE MONTH(dataHora) = ${idMes} AND YEAR(registro.dataHora) = 2023 AND fkPeca = ${idTipo};
            `
        }else{
            var instrucao = `
            SELECT ROUND(SUM(valor) / COUNT(valor), 0) AS mediaDeDesempenho, empresa.nomeFantasia
            FROM registro
            INNER JOIN maquinario ON maquinario.idMaquinario = registro.fkMaquina
            INNER JOIN empresa ON empresa.idEmpresa = maquinario.fkHospital
            WHERE empresa.idEmpresa = ${fkHospital}
            AND MONTH(dataHora) = ${idMes}
            AND YEAR(dataHora) = 2023
            AND registro.fkPeca = ${idTipo}
            GROUP BY empresa.nomeFantasia;
            `
        }

    }


    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}


function listarMaquina(fkHospital){

    var instrucao = ""
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
         instrucao = `
        select idMaquinario, nome from maquinario join modelo on fkModelo = idModelo join tipo on fkTipo = idTipo where fkHospital = ${fkHospital} order by idMaquinario;
        `
    }else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        SELECT m.idMaquinario, t.nome 
        FROM maquinario m
        JOIN modelo mo ON mo.idModelo = m.fkModelo 
        JOIN tipo t ON t.idTipo = mo.fkTipo 
        WHERE m.fkHospital = ${fkHospital} 
        ORDER BY m.idMaquinario;
        `
    }
  
    

    return database.executar(instrucao)
}



//Gráficos

function totalMaquinasPorTipoChamadoAberto(fkHospital,hospital) { 
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' )
    var instrucao = ""

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        
        if (fkHospital != "null") {
            instrucao = `
            select nome,idMaquinario, count(estado) from tipo join modelo on idTipo = fkTipo join maquinario on idModelo = fkModelo join registro on idMaquinario = fkMaquina join chamado on idRegistro = fkRegistro where estado = "aberto" and fkHospital = '${fkHospital}'  group by nome,idMaquinario;
   
                ` 
       }else{
           instrucao = `
           select nome,idMaquinario, count(estado) from tipo join modelo on idTipo = fkTipo join maquinario on idModelo = fkModelo join registro on idMaquinario = fkMaquina join chamado on idRegistro = fkRegistro where estado = "aberto" group by nome,idMaquinario;
               ` 
       }

   }else if (process.env.AMBIENTE_PROCESSO == "producao") {
       
    if (fkHospital != "null") {
        instrucao = `
        SELECT nome, idMaquinario, COUNT(estado)
        FROM tipo
        JOIN modelo ON idTipo = fkTipo
        JOIN maquinario ON idModelo = fkModelo
        JOIN registro ON idMaquinario = fkMaquina
        JOIN chamado ON idRegistro = fkRegistro
        WHERE estado = 'aberto' AND fkHospital = ${fkHospital}
        GROUP BY nome, idMaquinario;
            ` 
   }else{
       instrucao = `
       SELECT nome, idMaquinario, COUNT(estado) 
       FROM tipo 
       JOIN modelo ON idTipo = fkTipo 
       JOIN maquinario ON idModelo = fkModelo 
       JOIN registro ON idMaquinario = fkMaquina 
       JOIN chamado ON idRegistro = fkRegistro 
       WHERE estado = 'aberto' 
       GROUP BY nome, idMaquinario;
           ` 
   }

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


function graficoLinha(fkHospital,maquina){
    var instrucao = ""

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        if(fkHospital > 0 && maquina > 0){
             instrucao = `
            select fkHospital, fkMaquina, dataTemperatura, round((avg(temperaturaMax) + avg(temperaturaMin)) / 2) as temperaturaMedia, valor
            from registro 
            join maquinario on registro.fkMaquina = idMaquinario 
            join empresa on maquinario.fkHospital = idEmpresa 
            join dadosTemperatura on dataHora = dataTemperatura  
            where fkMaquina = ${maquina} and month(dataTemperatura) < 7 and fkHospital = ${fkHospital}
            group by fkHospital, fkMaquina, dataTemperatura, valor;
            `
        }
        
    }else if (process.env.AMBIENTE_PROCESSO == "producao") {
        
        if(fkHospital > 0 && maquina > 0){
             instrucao = `
            select fkHospital, fkMaquina, dataTemperatura, round((avg(temperaturaMax) + avg(temperaturaMin)) / 2,0) as temperaturaMedia, valor
            from registro 
            join maquinario on registro.fkMaquina = idMaquinario 
            join empresa on maquinario.fkHospital = idEmpresa 
            join dadosTemperatura on dataHora = dataTemperatura  
            where fkMaquina = ${maquina} and month(dataTemperatura) < 7 and fkHospital = ${fkHospital}
            group by fkHospital, fkMaquina, dataTemperatura, valor;
            `
        }

    }
    

    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}



//Gráfico de pizza 
function graficoPizza(idMes, fkHospital){   
    console.log(idMes, fkHospital)



    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        if (fkHospital == "null" && idMes == 'Todos' || idMes == 'undefined') {
            instrucao = `
            select count(idChamado) as qntChamado,  year(dataHora) as ano, nivel from chamado where year(dataHora) = '2023' and month(dataHora) < 13 group by ano, nivel;
            `
        }else if(fkHospital == "null" && idMes > 0){
        
            instrucao = `
            select count(idChamado) as qntChamado,  year(dataHora) as ano, nivel from chamado where year(dataHora) = '2023' and month(dataHora) = ${idMes}  group by ano, nivel;
            `
    
        } else if(fkHospital != "null" && idMes == 'Todos' || idMes == 'undefined'){
    
            instrucao = `
            SELECT
            t.ano,
            t.mediaTemperatura,
            e.qntChamado,
            e.nivel
        FROM
            (
               SELECT
                    YEAR(dataTemperatura) as ano,
                    ROUND((AVG(temperaturaMax) + AVG(temperaturaMin)) / 2) as mediaTemperatura
                FROM
                    empresa 
                join
                    registroTemperatura
                on
                    idEmpresa = fkHospital
                join
                    dadosTemperatura
                on
                    fkDadosTemperatura = idDadosTemperatura
                    where fkHospital = ${fkHospital}
                GROUP BY
                    ano
            ) t
        JOIN
            (
        select 
            count(idChamado) as qntChamado, nivel 
        from 
            endereco 
        join 
            empresa on idEndereco = fkEndereco 
        join 
            maquinario on idEmpresa = fkHospital 
        join 
            registro on idMaquinario = fkMaquina
        join chamado on idRegistro = fkRegistro
          where fkHospital = ${fkHospital} and month(chamado.dataHora) < 13 group by nivel
            ) e;
            `
    
         }else {
             instrucao = `
             SELECT
         t.ano,
         t.mes,
         t.mediaTemperatura,
         e.qntChamado,
         e.nivel
     FROM
         (
            SELECT
                 YEAR(dataTemperatura) as ano,
                 MONTH(dataTemperatura) as mes,
                 ROUND((AVG(temperaturaMax) + AVG(temperaturaMin)) / 2) as mediaTemperatura
             FROM
                 empresa 
             join
                 registroTemperatura
             on
                 idEmpresa = fkHospital
             join
                 dadosTemperatura
             on
                 fkDadosTemperatura = idDadosTemperatura
                 where month(dataTemperatura) = ${idMes} and fkHospital = ${fkHospital}
             GROUP BY
                 ano,
                 mes
         ) t
     JOIN
         (
     select 
         count(idChamado) as qntChamado, nivel 
     from 
         endereco 
     join 
         empresa on idEndereco = fkEndereco 
     join 
         maquinario on idEmpresa = fkHospital 
     join 
         registro on idMaquinario = fkMaquina
     join chamado on idRegistro = fkRegistro
       where month(registro.dataHora) = ${idMes} and fkHospital = ${fkHospital} group by nivel
         ) e;
             `
    
         }
        
    }else if (process.env.AMBIENTE_PROCESSO == "producao") {
        
        if (fkHospital == "null" && idMes == 'Todos' || idMes == 'undefined') {
            instrucao = `
            SELECT COUNT(idChamado) AS qntChamado, YEAR(dataHora) AS ano, nivel
            FROM chamado
            WHERE YEAR(dataHora) = 2023 AND MONTH(dataHora) <= 12
            GROUP BY YEAR(dataHora), nivel;
            `
        }else if(fkHospital == "null" && idMes > 0){
            instrucao = `
            SELECT COUNT(idChamado) AS qntChamado, YEAR(dataHora) AS ano, nivel 
            FROM chamado 
            WHERE YEAR(dataHora) = 2023 AND MONTH(dataHora) = ${idMes}
            GROUP BY YEAR(dataHora), nivel;
            `
        } else if(fkHospital != "null" && idMes == 'Todos' || idMes == 'undefined'){
    
            instrucao = `
            SELECT
    t.ano,
    t.mediaTemperatura,
    e.qntChamado,
    e.nivel
FROM
    (
        SELECT
            YEAR(dataTemperatura) as ano,
            ROUND((AVG(temperaturaMax) + AVG(temperaturaMin)) / 2, 0) as mediaTemperatura
        FROM
            empresa 
        JOIN
            registroTemperatura
        ON
            idEmpresa = fkHospital
        JOIN
            dadosTemperatura
        ON
            fkDadosTemperatura = idDadosTemperatura
        WHERE
            fkHospital = ${fkHospital}
        GROUP BY
            YEAR(dataTemperatura)
    ) t
JOIN
    (
        SELECT 
            COUNT(idChamado) as qntChamado, 
            nivel 
        FROM 
            endereco 
        JOIN 
            empresa 
        ON 
            idEndereco = fkEndereco 
        JOIN 
            maquinario 
        ON 
            idEmpresa = fkHospital 
        JOIN 
            registro 
        ON 
            idMaquinario = fkMaquina
        JOIN 
            chamado 
        ON 
            idRegistro = fkRegistro
        WHERE 
            fkHospital = ${fkHospital}
            AND MONTH(chamado.dataHora) < 13 
        GROUP BY 
            nivel
    ) e
ON 
    1 = 1;
            `
    
         }else {
             instrucao = `
             SELECT
             t.ano,
             t.mes,
             t.mediaTemperatura,
             e.qntChamado,
             e.nivel
         FROM
             (
                 SELECT
                     YEAR(dataTemperatura) as ano,
                     MONTH(dataTemperatura) as mes,
                     ROUND((AVG(temperaturaMax) + AVG(temperaturaMin)) / 2, 2) as mediaTemperatura
                 FROM
                     empresa 
                 INNER JOIN
                     registroTemperatura
                 ON
                     idEmpresa = fkHospital
                 INNER JOIN
                     dadosTemperatura
                 ON
                     fkDadosTemperatura = idDadosTemperatura
                 WHERE
                     MONTH(dataTemperatura) = ${idMes} AND fkHospital = ${fkHospital}
                 GROUP BY
                     YEAR(dataTemperatura),
                     MONTH(dataTemperatura)
             ) t
         JOIN
             (
                 SELECT 
                     COUNT(idChamado) as qntChamado,
                     nivel 
                 FROM 
                     endereco 
                 INNER JOIN 
                     empresa ON idEndereco = fkEndereco 
                 INNER JOIN 
                     maquinario ON idEmpresa = fkHospital 
                 INNER JOIN 
                     registro ON idMaquinario = fkMaquina
                 INNER JOIN 
                     chamado ON idRegistro = fkRegistro
                 WHERE 
                     MONTH(registro.dataHora) = ${idMes} AND fkHospital = ${fkHospital}
                 GROUP BY 
                     nivel
             ) e
         ON
             1=1;
             `
    
         }

    }


   
    
    console.log("Executando a seguinte instrução sql " + instrucao)
    return database.executar(instrucao)
}


module.exports = {
    listarTiposMaquinas,
    listarMeses,
    mediaTemperatura,
    mediaDesempenho,
    listarMaquina,
    totalMaquinasPorTipoChamadoAberto,
    totalMaquinasPorTipo,
    graficoLinha,
    graficoPizza
}