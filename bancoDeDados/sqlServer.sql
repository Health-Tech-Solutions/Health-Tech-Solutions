CREATE DATABASE hts;
USE hts;

CREATE TABLE endereco(
    idEndereco INT PRIMARY KEY IDENTITY,
    cep CHAR(9),
    numero VARCHAR(10),
    complemento VARCHAR(40),
    logradouro VARCHAR(45),
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    estado VARCHAR(45)
);

CREATE TABLE empresa(
    idEmpresa INT PRIMARY KEY IDENTITY,
    nomeFantasia VARCHAR(45),
    cnpj CHAR(14),
    telefone CHAR(13),
    fkEndereco INT,
    filial INT,
    FOREIGN KEY (filial) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco)
);

CREATE TABLE funcionario(
    idFuncionario INT PRIMARY KEY IDENTITY,
    nome VARCHAR(45),
    email VARCHAR(60),
    senha VARCHAR(45),
    funcao VARCHAR(45),
    tipo CHAR(1),
    CPF CHAR(11),
    foto VARCHAR(300),
    fkIndustria INT,
    FOREIGN KEY (fkIndustria) REFERENCES empresa(idEmpresa),
    fkRepresentante INT,
    FOREIGN KEY (fkRepresentante) REFERENCES funcionario(idFuncionario)
);

CREATE TABLE tipo(
    idTipo INT PRIMARY KEY IDENTITY,
    nome VARCHAR(45)
);

CREATE TABLE modelo(
    idModelo INT PRIMARY KEY IDENTITY,
    modelo VARCHAR(45),
    descricao VARCHAR(255),
    fkTipo INT,
    FOREIGN KEY (fkTipo) REFERENCES tipo(idTipo)
);

CREATE TABLE maquinario(
    idMaquinario INT,
    dataCadastramento DATETIME,
    fkHospital INT,
    FOREIGN KEY (fkHospital) REFERENCES empresa(idEmpresa),
    fkModelo INT,
    FOREIGN KEY (fkModelo) REFERENCES modelo(idModelo),
    PRIMARY KEY(idMaquinario, fkModelo)
);

CREATE TABLE tipoRegistro(
    idTipoRegistro INT PRIMARY KEY IDENTITY,
    nome VARCHAR(45),
    medida VARCHAR(45)
);

CREATE TABLE peca(
    idPeca INT PRIMARY KEY IDENTITY,
    nome VARCHAR(45),
    modelo VARCHAR(45),
    fkTipoRegistro INT,
    FOREIGN KEY (fkTipoRegistro) REFERENCES tipoRegistro(idTipoRegistro)
);

CREATE TABLE registro(
    idRegistro INT PRIMARY KEY IDENTITY,
    dataHora DATETIME,
    valor DECIMAL(7,2),
    fkMaquina INT,
    fkPeca INT,
    FOREIGN KEY (fkPeca) REFERENCES peca(idPeca)
);

CREATE TABLE chamado(
    idChamado INT PRIMARY KEY IDENTITY,
    nivel VARCHAR(45),
    estado VARCHAR(45),
    sla VARCHAR(45),
    descricao VARCHAR(45),
    dataHora DATETIME,
    fkRegistro INT,
    FOREIGN KEY(fkRegistro) REFERENCES registro(idRegistro)
);


CREATE TABLE limite(
    idLimite INT PRIMARY KEY IDENTITY,
    valor DECIMAL(5,2),
    fkPeca INT,
    fkModelo INT,
    FOREIGN KEY (fkModelo) REFERENCES modelo(idModelo),
    FOREIGN KEY (fkPeca) REFERENCES peca(idPeca)
);

CREATE TABLE dadosTemperatura (
    idDadosTemperatura INT PRIMARY KEY IDENTITY,
    estado VARCHAR(25),
    dataTemperatura DATE,
    precipitacao DECIMAL(8,2),
    pressaoMax DECIMAL(8,2),
    pressaoMin DECIMAL(8,2),
    temperaturaMax DECIMAL(8,2),
    temperaturaMin DECIMAL(8,2)
);

CREATE TABLE registroTemperatura(
    fkDadosTemperatura INT,
    fkHospital INT,
    FOREIGN KEY (fkDadosTemperatura) REFERENCES dadosTemperatura(idDadosTemperatura),
    FOREIGN KEY (fkHospital) REFERENCES empresa(idEmpresa)
);


CREATE TABLE ordemManutencao (
    idOrdem INT PRIMARY KEY IDENTITY,
    estado VARCHAR(50),
    dataInicioFunc DATETIME,
    dataAbertura DATETIME,
    dataFechamento DATETIME,
    somaFuncionamento INT,
    somaManutencao INT,
    fkMaquina INT,
    fkChamado INT,
    qtdFalhas INT,
    FOREIGN KEY (fkMaquina) REFERENCES maquinario(idMaquinario),
    FOREIGN KEY (fkChamado) REFERENCES chamado(idChamado)
);


-- Criação da view vw_chamados
CREATE VIEW vw_chamados
AS
	SELECT 
		r.fkMaquina AS idMaquina,
		c.dataHora AS dataHora,
		c.idChamado AS idChamado,
		c.nivel,
		c.estado,
		c.sla,
		c.descricao,
		e.idEmpresa AS idHospital,
		e.nomeFantasia AS hospital,
		t.nome AS tipo,
		t.idTipo,	
		m.modelo,
		tr.nome,
		tr.medida,
		p.idPeca AS idPeca,
        p.nome AS nomePeca
	FROM chamado AS c
	JOIN registro AS r ON c.fkRegistro = r.idRegistro
	JOIN maquinario AS maq ON r.fkMaquina = maq.idMaquinario
	JOIN modelo AS m ON maq.fkModelo = m.idModelo
	JOIN empresa AS e ON maq.fkHospital = e.idEmpresa
	JOIN tipo AS t ON m.fkTipo = t.idTipo
	JOIN peca AS p ON r.fkPeca = p.idPeca
	JOIN tipoRegistro AS tr ON p.fkTipoRegistro = tr.idTipoRegistro;

-- Criação da função subtrai_data
CREATE FUNCTION subtrai_data(@data1 DATETIME, @data2 DATETIME)
RETURNS INT
AS
BEGIN
    DECLARE @dataFinal INT;
    DECLARE @minutos INT;
    SET @dataFinal = DATEDIFF(SECOND, @data1, @data2);
    SET @minutos = @dataFinal / 60;
    RETURN @minutos;
END;

-- Criação do trigger tr_abre_ordem
CREATE TRIGGER tr_abre_ordem
ON maquinario
AFTER INSERT
AS 
BEGIN 
	INSERT INTO ordemManutencao(estado, dataInicioFunc, fkMaquina, qtdFalhas) VALUES ('funcionando', GETDATE(), INSERTED.idMaquinario, 0);
END;

-- Criação do trigger tr_atualiza_ordem
CREATE TRIGGER tr_atualiza_ordem
ON chamado
AFTER INSERT
AS 
BEGIN 
    DECLARE @nivel VARCHAR(45), @fkMaquina INT, @fkRegistro INT;
    SELECT @nivel = INSERTED.nivel, @fkRegistro = INSERTED.fkRegistro;
    SELECT @fkMaquina = fkMaquina FROM registro WHERE idRegistro = @fkRegistro;

    IF @nivel = 'Alto' 
    BEGIN
        UPDATE ordemManutencao SET estado = 'parado',
            dataAbertura = GETDATE(),
            qtdFalhas = qtdFalhas + 1,
            somaFuncionamento = dbo.subtrai_data(GETDATE(), dataInicioFunc),
            fkChamado = INSERTED.idChamado
        WHERE fkMaquina = @fkMaquina;
    END
    ELSE
    BEGIN
        UPDATE ordemManutencao SET estado = 'funcionando'
        WHERE fkMaquina = @fkMaquina;
    END;
END;

-- Criação do trigger tr_fechamento_chamado
CREATE TRIGGER tr_fechamento_chamado
ON chamado
AFTER UPDATE
AS
BEGIN
	UPDATE ordemManutencao SET dataFechamento = GETDATE(),
								estado = 'funcionando',
                                somaManutencao = dbo.subtrai_data(dataFechamento, dataAbertura)
	WHERE fkMaquina = (SELECT fkMaquina
						FROM registro
						WHERE idRegistro = INSERTED.fkRegistro);
END;

-- Criação da stored procedure inserir_registros
CREATE PROCEDURE inserir_registros
AS
BEGIN
    DECLARE @i INT = 1, @dataHora DATETIME, @valor FLOAT, @fkPeca INT, @fkMaquina INT;

    WHILE @i <= 300
    BEGIN
        SET @dataHora = DATEADD(DAY, FLOOR(RAND() * 365), '2023-01-01');
        SET @valor = 85 + (RAND() * 15);
        SET @fkPeca = FLOOR(RAND() * 13) + 1;
        SET @fkMaquina = FLOOR(RAND() * 216) + 1;

        INSERT INTO registro (dataHora, valor, fkMaquina, fkPeca)
        VALUES (@dataHora, @valor, @fkMaquina, @fkPeca);

        SET @i = @i + 1;
    END;
END;

-- Criação da stored procedure inserir_registros_temperatura
CREATE PROCEDURE inserir_registros_temperatura
AS
BEGIN
    DECLARE @i INT = 1, @dataHora DATETIME, @valor FLOAT, @fkPeca INT, @fkMaquina INT;

    WHILE @i <= 300
    BEGIN
        SET @dataHora = DATEADD(DAY, FLOOR(RAND() * 365), '2023-01-01');
        SET @valor = 85 + (RAND() * 15);
        SET @fkPeca = FLOOR(RAND() * 13) + 1;

        INSERT INTO registro (dataHora, valor, fkMaquina, fkPeca)
        VALUES (@dataHora, @valor, 5, @fkPeca);

        SET @i = @i + 1;
    END;
END;

-- Criação da stored procedure fechar_chamados
CREATE PROCEDURE fechar_chamados
AS
BEGIN
    DECLARE
        @i INT,
        @quantidade INT,
        @idFechado INT;

    SET @i = 0;
    SET @quantidade = FLOOR(RAND() * (SELECT COUNT(*) FROM chamado WHERE estado = 'Aberto'));

    WHILE @i <= @quantidade
    BEGIN
        SET @idFechado = RAND() * @quantidade;
        UPDATE chamado SET estado = 'fechado' WHERE idChamado = FLOOR(@idFechado);
        SET @i = @i + 1;
    END
END;

-- Criação da stored procedure inserir_Registros2
CREATE PROCEDURE inserir_Registros2
AS
BEGIN
    DECLARE @i INT = 1, @dataHora DATETIME, @valor FLOAT, @fkTipoRegistro INT, @fkMaquina INT, @counter INT, @counter2 INT;

    WHILE @i <= 216
    BEGIN
        SET @dataHora = DATEADD(DAY, FLOOR(RAND() * 365), '2023-01-01');
        SET @valor = 85 + (RAND() * 15);
        SET @fkTipoRegistro = FLOOR(RAND() * 3) + 1;
        SET @fkMaquina = FLOOR(RAND() * 216) + 1;
        SET @counter = 1;

        WHILE @counter <= 50
        BEGIN
            SET @counter2 = 1;

            WHILE @counter2 <= 3
            BEGIN
                INSERT INTO registro (dataHora, valor, fkMaquina, fkTipoRegistro)
                VALUES (DATEADD(SECOND, FLOOR(RAND() * 31536000), '2023-12-08 00:00:00'), FLOOR(RAND() * 100), @i, @counter2);
                SET @counter2 = @counter2 + 1;
            END;

            SET @counter = @counter + 1;
        END;

        INSERT INTO registro (dataHora, valor, fkMaquina, fkTipoRegistro)
        VALUES (@dataHora, @valor, @fkMaquina, @fkTipoRegistro);

        SET @i = @i + 1;
    END;
END;