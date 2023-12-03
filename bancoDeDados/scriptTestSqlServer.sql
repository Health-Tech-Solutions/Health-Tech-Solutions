
SELECT * FROM ordemManutencao WHERE fkChamado = 3;
SELECT * FROM ordemManutencao ORDER BY dataFechamento DESC

SELECT fkMaquina, count(*) 
		FROM registro 
		WHERE valor >=95
		GROUP BY fkMaquina;
		 
SELECT 
	count(*) as total,
	c.nivel,
	r.fkMaquina
	FROM chamado AS c
	JOIN registro AS r ON c.fkRegistro = r.idRegistro
	WHERE c.nivel = 'Alto'
	GROUP BY nivel,r.fkMaquina


SELECT * FROM chamado WHERE idChamado = 3;
SELECT * FROM registro WHERE valor >= 90;

UPDATE ordemManutencao SET estado = 'parado',
			dataAbertura = GETDATE(),
			qtdFalhas = qtdFalhas + 1,
			somaFuncionamento = dbo.subtrai_data(GETDATE(), dataInicioFunc),
			fkChamado = 3
		WHERE fkMaquina =(SELECT fkMaquina 
								FROM registro 
								WHERE idRegistro = 33);
EXEC fechar_chamados

exec inserir_registros

insert into
	chamado (nivel, estado, sla,dataHora, descricao, fkRegistro)
select 
	case when r.valor > 95
		then 'Alto'
		else case when r.valor > 90
			then 'Médio'
			else 'Baixo'
		end
	end nivel,
	'Aberto' estado,
	case when r.valor > 95
		then '2 horas'
		else case when r.valor > 90
			then '6 horas'
			else '10 horas'
		end
	end sla,
	dataHora = GETDATE(),
	'' descricao,
	r.idRegistro
from registro AS r where r.valor > 85;


SELECT @@SERVERNAME AS 'Nome do Servidor';
SELECT CURRENT_USER AS 'Nome do Usuário Atual';

USE hts;

SELECT 
    DAY(dataHora) AS dia,
    COUNT(*) AS quantidade	
FROM vw_chamados
WHERE idHospital = 2
GROUP BY DAY(dataHora)
ORDER BY dia;


		 SELECT
					ROUND(AVG(om.qtdFalhas), 2) AS qtdFalhas,
					ROUND(AVG(om.somaFuncionamento), 2) AS tempoFuncionamento,
					ROUND(AVG(om.somaManutencao), 2) AS tempoManutencao
				FROM ordemManutencao AS om
				WHERE om.qtdFalhas <> 0;


SELECT * FROM ordemManutencao

INSERT INTO chamado (nivel,estado,sla,descricao,dataHora,fkRegistro)VALUES('alto','Aberto','2 horas','deu certo',GETDATE(),606);

UPDATE chamado SET estado = 'fechado' WHERE idChamado = 2767

SELECT fkMaquina FROM registro GROUP BY fkMAquina;

select * FROM registro WHERE fkMaquina = 209;

exec fechar_chamados

	 SELECT
		ROUND(AVG(om.qtdFalhas), 0) AS qtdFalhas,
		ROUND(AVG(om.somaFuncionamento), 0) AS tempoFuncionamento,
		ROUND(AVG(om.somaManutencao), 0) AS tempoManutencao
	FROM ordemManutencao AS om
	;

EXEC fechar_chamados

 SELECT 
                MONTH(dataHora) AS mes,
                COUNT(*) AS quantidade	
            FROM vw_chamados
            GROUP BY MONTH(dataHora)
            ORDER BY mes;