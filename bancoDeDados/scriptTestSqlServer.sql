
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


