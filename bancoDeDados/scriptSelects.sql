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


SELECT * FROM ordemManutencao WHERE estado = 'parado';
INSERT INTO registro (dataHora, valor, fkMaquina, fkPeca)
	VALUES (NOW(), 97 , 95, 3);

SELECT
		AVG(SUM(om.qtdFalhas)) AS qtdFalhas,
        AVG(SUM(om.somaFuncionamento)) AS tempoManutencao,
        maq.fkModelo,
        m.modelo
    FROM ordemManutencao AS om
    JOIN maquinario AS maq ON fkMaquina = idMaquinario
    JOIN modelo AS m ON m.idModelo = maq.fkModelo
    WHERE somaFuncionamento <> 0
    AND maq.fkModelo = 3
	GROUP BY maq.fkModelo;
    
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
    
select * from vw_vinicius;


select * from vw_chamados;

	

SELECT COUNT(*) AS quantidade,
nomePeca
FROM vw_chamados
GROUP BY nomePeca;

	(1,'2023-03-05 09:00:00', 4, 1),
	(2,'2023-03-05 09:00:00', 4, 2),
	(3,'2023-03-05 09:00:00', 4, 3),
	(4,'2023-03-05 09:00:00', 4, 4),
	(5,'2023-03-05 09:00:00', 4, 5),
	(6,'2023-03-05 09:00:00', 4, 6),
	(7,'2023-03-05 09:00:00', 4, 7),
	(8,'2023-03-05 09:00:00', 4, 8),
	(9,'2023-03-05 09:00:00', 4, 9),
	(10,'2023-03-05 09:00:00', 4, 10),
	(11,'2023-03-05 09:00:00', 4, 11),
	(12,'2023-03-05 09:00:00', 4, 12),
	(13,'2023-03-05 09:00:00', 4, 1),
	(14,'2023-03-05 09:00:00', 4, 2),
	(15,'2023-03-05 09:00:00', 4, 3),
	(16,'2023-03-05 09:00:00', 4, 4),
	(17,'2023-03-05 09:00:00', 4, 5),
	(18,'2023-03-05 09:00:00', 4, 6),
	(19,'2023-03-05 09:00:00', 4, 7),
	(20,'2023-03-05 09:00:00', 4, 8),
	(21,'2023-03-05 09:00:00', 4, 9),
	(22,'2023-03-05 09:00:00', 4, 10),
	(23,'2023-03-05 09:00:00', 4, 11),
	(24,'2023-03-05 09:00:00', 4, 12),
	(25,'2023-03-05 09:00:00', 4, 1),
	(26,'2023-03-05 09:00:00', 4, 2),
	(27,'2023-03-05 09:00:00', 4, 3),
	(28,'2023-03-05 09:00:00', 4, 4),
	(29,'2023-03-05 09:00:00', 4, 5),
	(30,'2023-03-05 09:00:00', 4, 6),
	(31,'2023-03-05 09:00:00', 4, 7),
	(32,'2023-03-05 09:00:00', 4, 8),
	(33,'2023-03-05 09:00:00', 4, 9),
	(34,'2023-03-05 09:00:00', 4, 10),
	(35,'2023-03-05 09:00:00', 4, 11),
	(36,'2023-03-05 09:00:00', 4, 12),
	(37,'2023-03-05 09:00:00', 4, 1),
	(38,'2023-03-05 09:00:00', 4, 2),
	(39,'2023-03-05 09:00:00', 4, 3),
	(40,'2023-03-05 09:00:00', 4, 4),
	(41,'2023-03-05 09:00:00', 4, 5),
	(42,'2023-03-05 09:00:00', 4, 6),
	(43,'2023-03-05 09:00:00', 4, 7),
	(44,'2023-03-05 09:00:00', 4, 8),
	(45,'2023-03-05 09:00:00', 4, 9),
	(46,'2023-03-05 09:00:00', 4, 10),
	(47,'2023-03-05 09:00:00', 4, 11),
	(48,'2023-03-05 09:00:00', 4, 12),
	(49,'2023-03-05 09:00:00', 4, 1),
	(50,'2023-03-05 09:00:00', 4, 2),
	(51,'2023-03-05 09:00:00', 4, 3),
	(52,'2023-03-05 09:00:00', 4, 4),
	(53,'2023-03-05 09:00:00', 4, 5),
	(54,'2023-03-05 09:00:00', 4, 6),
	(55,'2023-03-05 09:00:00', 4, 7),
	(56,'2023-03-05 09:00:00', 4, 8),
	(57,'2023-03-05 09:00:00', 4, 9),
	(58,'2023-03-05 09:00:00', 4, 10),
	(59,'2023-03-05 09:00:00', 4, 11),
	(60,'2023-03-05 09:00:00', 4, 12);


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
