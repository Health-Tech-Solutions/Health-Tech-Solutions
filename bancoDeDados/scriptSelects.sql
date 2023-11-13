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
                
USE hts;
SELECT * FROM maquinario;

SELECT * FROM ordemManutencao WHERE estado = 'parado';
INSERT INTO registro (dataHora, valor, fkMaquina, fkPeca)
	VALUES (NOW(), 97 , 95, 3);

SELECT * FROM chamado ORDER BY idChamado DESC LIMIT 1;


SELECT COUNT(*) FROM registro;
CALL fechar_chamados();

INSERT INTO chamado VALUES(NULL, 'alto','Aberto','2 horas','deu certo',NOW(),87);

SELECT * FROM ordemManutencao order by dataAbertura DESC;


UPDATE ordemManutencao SET estado = 'parado' ,
										dataAbertura = now(),
                                        qtdFalhas = qtdFalhas + 1;

UPDATE chamado SET estado = 'fechado' WHERE idChamado = 559;


INSERT INTO ordemManutencao(mediaFuncionamento) VALUES(subtrai_data(NOW(),'2023-11-11 00:00:00'));
DROP TRIGGER tr_atualiza_ordem;

select count(*) from vw_vinicius where modelo = 'DD15';
select count(*) from vw_vinicius where nomeTipo = 'Desfibriladores';

select count(*) as maquinasOperando ,(select count(*) from vw_teste where estado = 'parado' and idHospital = '4') as maquinasParadas from vw_teste where estado = 'funcionando' and idHospital = '4';

select count(*) from vw_teste where idHospital = 1 and estado = 'funcionando';

