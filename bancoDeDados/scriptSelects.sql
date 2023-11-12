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
                
SELECT
	TIMEDIFF(c.dataHora, m.dataCadastramento) AS diferençaTempo
    FROM chamado AS c
    JOIN registro AS r ON c.fkRegistro = r.idRegistro
    JOIN maquinario AS m ON r.fkMaquina = m.idMaquinario;