const { ConnectionPool } = require("mssql")
const database = require("../database/config")


function listarTiposMaquinas(){
    const instrucao = `
        SELECT * FROM tipo;
    `
    console.log("Executando a seguinte instrução no sql " + instrucao)
    return database.executar(instrucao)
}


 function listarMeses(){
     const instrucao = `
     select month(dataTemperatura) as mes from dadosTemperatura group by mes order by mes desc;
     `


     return database.executar(instrucao)
 }



function mediaTemperatura(idMes, fkHospital){
    var instrucao = ""

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
    
    


return database.executar(instrucao)
}



//Gráficos

function totalMaquinasPorTipoChamadoAberto(fkHospital,hospital) { 
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' )
    var instrucao = ""
    if (fkHospital != "null") {
         instrucao = `
         select nome,idMaquinario, count(estado) from tipo join modelo on idTipo = fkTipo join maquinario on idModelo = fkModelo join registro on idMaquinario = fkMaquina join chamado on idRegistro = fkRegistro where estado = "aberto" and fkHospital = '${fkHospital}'  group by nome,idMaquinario;

             ` 
    }else{
        instrucao = `
        select nome,idMaquinario, count(estado) from tipo join modelo on idTipo = fkTipo join maquinario on idModelo = fkModelo join registro on idMaquinario = fkMaquina join chamado on idRegistro = fkRegistro where estado = "aberto" group by nome,idMaquinario;
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


function buscarMensal(fkHospital){
    var instrucao = ``

    if(fkHospital == 'null'){
        instrucao = `
        SELECT 
	    MONTH(dataHora) AS mes,
	    COUNT(*) AS quantidade	
	FROM vw_chamados
    GROUP BY mes
    ORDER BY mes;
        `

    }else{
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
    
    console.log("Executando a seguinte instrução sql" + instrucao)
    return database.executar(instrucao)
}



//Gráfico de pizza 
function graficoPizza(idMes, fkHospital){   
    console.log(idMes, fkHospital)
   

    if (fkHospital == "null" && idMes == 'Todos' || idMes == 'undefined') {
        instrucao = `
        select count(idChamado) as qntChamado,  year(dataHora) as ano, nivel from chamado where year(dataHora) = '2023' and month(dataHora) < 4 group by ano, nivel;
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
      where fkHospital = ${fkHospital} and month(chamado.dataHora) < 4 group by nivel
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


    
    console.log("Executando a seguinte instrução sql " + instrucao)
    return database.executar(instrucao)
}


module.exports = {
    listarTiposMaquinas,
    listarMeses,
    mediaTemperatura,
    totalMaquinasPorTipoChamadoAberto,
    totalMaquinasPorTipo,
    buscarMensal,
    graficoPizza
}