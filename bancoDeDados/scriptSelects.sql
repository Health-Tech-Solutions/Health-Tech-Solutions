USE hts;

SELECT (SUM(horaAberto) - SUM(horaFechado)) AS mtbf FROM vw_confiabilidade;	

		-- INSERT INTO registroTemperatura (fkDadosTemperatura, fkHospital)
		-- SELECT idDadosTemperatura, idEmpresa
		-- FROM endereco
		-- JOIN empresa ON idEndereco = fkEndereco
		-- JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado
		-- WHERE endereco.estado = 'RJ';

		-- select fkHospital , count(fkDadosTemperatura) as qntDados from registroTemperatura group by fkHospital;
		-- select * from empresa join registroTemperatura on idEmpresa = fkHospital join dadosTemperatura on fkDadosTemperatura = idDadosTemperatura;

		-- select * from dadosTemperatura;
		-- select * from registroTemperatura;
        
		SELECT c.idChamado 
			FROM chamado AS c
			JOIN registro AS r ON fkRegistro = idRegistro
			AND r.idRegistro = 174;

		SELECT COUNT(*)FROM CHAMADO;
		select * from vw_chamados;
		 SELECT 
				idMaquina AS quantidade, 
				tipo FROM 
				vw_chamados group by quantidade, tipo;
                
                
                		SELECT c.idChamado 
			FROM chamado AS c
			JOIN registro AS r ON fkRegistro = idRegistro
			AND r.idRegistro = 174;

		SELECT COUNT(*)FROM CHAMADO;
		select * from vw_chamados;
		 SELECT 
				idMaquina AS quantidade, 
				tipo FROM 
				vw_chamados group by quantidade, tipo;
-- inserts e selects henrique
USE hts;
select * from ordemMAnutencao;
 SELECT
		SUM(om.qtdFalhas) AS qtdFalhas,
        SUM(om.somaManutencao) AS tempoManutencao,
        SUM(om.somaFuncionamento) AS tempoFuncionamento,
        maq.fkModelo,
        m.modelo
    FROM ordemManutencao AS om
    JOIN maquinario AS maq ON fkMaquina = idMaquinario
    JOIN modelo AS m ON m.idModelo = maq.fkModelo
    WHERE somaManutencao <> 0
	GROUP BY maq.fkModelo;

SELECT * FROM maquinario;
SELECT * FROM ordemManutencao;
USE hts;
CALL inserir_registros;
use hts;
SELECT * FROM maquinario ORDER BY idMaquinario DESC;
UPDATE maquinario SET macAdress = '' WHERE idMaquinario = 4559;
SELECT * FROM registro ORDER BY idRegistro DESC;
INSERT INTO maquinario (idMaquinario, fkModelo, fkHospital,macAdress) VALUES (355,1,1,'efdd');

UPDATE maquinario SET macAdress = 'dwdwdwdwdwdd' WHERE idMaquinario = 2;
	
    
    
call fechar_chamados();
SELECT * FROM ordemManutencao WHERE estado = 'parado';
INSERT INTO registro (dataHora, valor, fkMaquina, fkPeca)
	VALUES (NOW(), 97 , 95, 3);

SELECT
		AVG(SUM(om.qtdFalhas)) AS qtdFalhas,
        AVG(SUM(om.somaFuncionamento)) AS tempoManutencao
    FROM ordemManutencao AS om
    JOIN maquinario AS maq ON fkMaquina = idMaquinario
    JOIN modelo AS m ON m.idModelo = maq.fkModelo
    WHERE somaFuncionamento <> 0;
    
    SELECT
		SUM(om.qtdFalhas) AS qtdFalhas,
        SUM(om.somaFuncionamento) AS tempoManutencao,
        maq.fkModelo,
        m.modelo
    FROM ordemManutencao AS om
    JOIN maquinario AS maq ON fkMaquina = idMaquinario
    JOIN modelo AS m ON m.idModelo = maq.fkModelo
    WHERE somaFuncionamento <> 0
    AND maq.fkModelo = 3
	GROUP BY maq.fkModelo;
select * from ordemManutencao;
SELECT
		ROUND(AVG(om.qtdFalhas)) AS qtdFalhas,
        ROUND(AVG(om.somaFuncionamento)) AS tempoFuncionamento,
        ROUND(AVG(om.somaManutencao)) AS tempoManutencao
    FROM ordemManutencao AS om
    WHERE om.qtdFalhas <> 0;
   
CALL fechar_chamados;
SELECT * FROM chamado ORDER BY idChamado DESC LIMIT 1;

SELECT 
            COUNT(idChamado) AS numeroChamados,
            tipo,
            modelo
            FROM vw_chamados c
            WHERE DATE(c.dataHora) BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND CURDATE()
            GROUP BY tipo,modelo
            ORDER BY numeroChamados;

SELECT COUNT(*) FROM registro;
CALL fechar_chamados();

INSERT INTO chamado VALUES(NULL, 'alto','Aberto','2 horas','deu certo',NOW(),87);

SELECT * FROM ordemManutencao order by dataAbertura DESC;

INSERT INTO ordemManutencao(estado,dataInicioFunc,fkMaquina,qtdFalhas) VALUES ('funcionando',now(),12, 0);


UPDATE ordemManutencao SET estado = 'parado' ,
										dataAbertura = now(),
                                        qtdFalhas = qtdFalhas + 1;

UPDATE chamado SET estado = 'fechado' WHERE idChamado = 202;
SELECT * FROM ordemManutencao WHERE fkChamado = 202;
SELECT * FROM ordemManutencao WHERE estado = 'parado';
SELECT * FROM ordemManutencao ;
CALL inserir_registros;
CALL fechar_chamados();
INSERT INTO ordemManutencao(mediaFuncionamento) VALUES(subtrai_data(NOW(),'2023-11-11 00:00:00'));
DROP TRIGGER tr_atualiza_ordem;

-- Henrique

select count(*) from vw_vinicius where modelo = 'DD15';
select count(*) from vw_vinicius where nomeTipo = 'Desfibriladores';
use hts;
SELECT 
            tipo,
            idTipo
        FROM vw_chamados
        GROUP BY tipo,idTipo;

select count(*) as maquinasOperando ,(select count(*) from vw_teste where estado = 'parado' and idHospital = '4') as maquinasParadas from vw_teste where estado = 'funcionando' and idHospital = '4';

select count(*) from vw_teste where idHospital = 1 and estado = 'funcionando';

select count(*) as totalMaquinas,(select count(*) from ordemManutencao
        JOIN maquinario on idMaquinario = fkMaquina
        where estado = 'funcionando' and fkHospital = 2) as maquinasOK from maquinario where fkHospital = 2;

select modelo,idModelo from modelo where fkTipo = 1;

select idModelo,modelo from modelo where fkTipo = 1;

select idTipo,
		nome from tipo
JOIN modelo on fkTipo = idTipo
JOIN maquinario on fkModelo = idModelo
group by idTipo 
order by idTipo asc;   

call inserir_registros;
SELECT COUNT(*) AS qtd,
		nomePeca
		FROM vw_vinicius
        GROUP BY nomePeca;
    



SELECT * FROM peca;

SELECT * FROM registro ORDER BY idRegistro DESC;		

INSERT INTO peca(nome,modelo,fkTipoRegistro,fkMaquinario) VALUES ('RAM','ddr4', 2,277);
INSERT INTO peca (nome,modelo,fkTipoRegistro,fkMaquinario) VALUES ('RAM','ddr4', 1, 277);
SELECT * FROM Peca;
SELECT * FROM tipoRegistro;

SELECT * FROM peca;
SELECT * FROM limite;
select * from vw_vinicius;


select * from vw_chamados;

	

SELECT COUNT(*) AS quantidade,
nomePeca
FROM vw_chamados
GROUP BY nomePeca;



select modelo,idModelo from modelo where fkTipo = 1;

select idTipo,
		nome from tipo
        JOIN modelo on fkTipo = idTipo
        JOIN maquinario on fkModelo = idModelo
        group by idTipo 
        order by idTipo asc;
        
select * from vw_vinicius;

select modelo,idModelo,count(*) as totalModelo from vw_vinicius where idHospital = 3 and idTipo = 2 group by idModelo asc;

SELECT modelo, idModelo, COUNT(*) as totalModelo
FROM vw_vinicius
WHERE idHospital = 3 AND idTipo = 2
GROUP BY idModelo, modelo
ORDER BY idModelo DESC;

 SELECT modelo, idModelo, COUNT(*) as totalModelo
        FROM vw_vinicius
        WHERE idTipo = 2
        GROUP BY idModelo, modelo
        ORDER BY idModelo DESC;

CALL inserir_registros;

        SELECT COUNT(*) as total
        FROM vw_chamados
        WHERE nivel = 'Alto' AND dataHora >= DATE_SUB(NOW(), INTERVAL 24 HOUR);

select nomeTipo,idTipo,count(*) as totalTipo from vw_vinicius group by idTipo;

 select nomeTipo,idTipo,count(*) as totalTipo from vw_vinicius group by idTipo;
    
select * from vw_vinicius;
