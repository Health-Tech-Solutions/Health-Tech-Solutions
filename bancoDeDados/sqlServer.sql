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

INSERT INTO endereco (
    cep,
    numero,
	complemento,
    logradouro,
    bairro,
    cidade,
    estado
)
VALUES
(
    '04571-011',
    1747,
    'Avenida Luis Carlos Berrini',
    'Itaim Bibi',
    'São Paulo',
    '',
    'SP'
),
(
    '01310-000',
    200,
    'Avenida Paulista',
    'Bela Vista',
    'São Paulo',
    '',
    'SP'
),
(
    '01431-000',
    953,
    'Avenida Brasil',
    'Jardim América',
    'São Paulo',
    '',
    'SP'
),
(
    '09910-720',
    605,
    'Rua Manoel da Nóbrega',
    'Centro',
    'Diadema',
    '',
    'SP'
),
(
    '22630-010',
    802,
    '',
    '',
    'Barra da Tijuca',
    '',
    'RJ'
);

insert into 
	endereco(cep, numero, complemento) 
values 
	('41200-104','12u','A'),
	('41200-104','12u','C'),
	('60144-132','15', null),
	('12345-678','358', null),
	('01321-001','741', null),
	('01323-903','331', null),
	('04263-200','150', null),
	('05652-900','701', null);

    insert into
	empresa
	(nomeFantasia, cnpj,fkEndereco)
values
	('Hospital Santa Catarina', '60922168000186',2),
	('Hospital Albert Einsten', '60765823000130',3),
	('Hospital Santa Helena', '34128330000189',4),
	('Hospital Rio de Janeiro', '23928730000185',5);

    insert into
	funcionario(nome, email, senha,funcao,tipo, fkIndustria)
values		
	('Isabela Mariana Olivia da Rosa','isabelamarianadarosa@imeio.com','123456','admin','0', 1),
	('Antonio Breno Augusto Moura','antonio_breno_moura@br.festo.com','123456','funcionario','1', 1),
	('Miguel Cauê Pereira','miguel-pereira93@superigi.com.br','123456','funcionario','1', 1),     
	('Helena Sarah Porto','helena_porto@kimmay.com.br','123456','admin','0', 1),
	('Bryan Luan Gomes','bryan-gomes83@uolinc.com','123456','funcionario','1', 1),
	('Anderson Manuel Galvão','anderson.manuel.galvao@systemsadvisers.com','123456','funcionario','1', 1),
	('Stefany Bárbara Alessandra Melo','stefany_melo@icloub.com','123456','admin','0', 1),  
	('Diogo Enrico Nelson Gonçalves','diogo_goncalves@edbrasil.net','123456','funcionario','1', 1),
	('Lívia Letícia Carolina Dias','livia.leticia.dias@ritmolog.com.br','123456','funcionario','1', 1),
	('Aline Esther Bruna Cardoso','aline_cardoso@graffiti.net','123456','admin','0', 1),    
	('Elza Allana Rita Moraes','elzaallanamoraes@verdana.com.br','123456','funcionario','1', 1),  
	('Gael Murilo dos Santos','gael_murilo_dossantos@rebecacometerra.com.br','123456','funcionario','1', 1),
	('Isabelly Sara Luciana da Rocha','isabelly_darocha@directnet.com','123456','admin','0',1),
	('Rosa Emilly Valentina Viana','rosa_viana@pierproj.com.br','123456','funcionario','1', 1),   
	('Clarice Louise Laura Araújo','clarice_araujo@yahoo.com.ar','123456','funcionario','1', 1),
	('Henrique Bechis Santana Coelho', 'henrique@gmail.com','123456', 'admin','0', 1),
	('Gabriel Michelon', 'gabriel@gmail.com', '123456', 'admin','0', 1),
	('Vinicius Bazan Cirello', 'vinicius@gmail.com', '123456', 'admin','0', 1),
	('Gilberto Campos', 'gilberto@gmail.com', '123456', 'admin','0', 1),
	('Sofhia Utaka', 'sofhia@gmail.com', '123456', 'admin','0', 1);

    insert into
	tipo(nome)
values
	('Ultrassom'),
	('Cardioversores'),
	('Desfibriladores'),
	('Monitor Cardíaco'),
	('Máquina de Anestesia'),
	('Máquina de ECG'),
	('Monitor Fetal'),
	('Monitor de sinais vitais');
    	
insert into
	modelo(modelo, descricao, fkTipo)
values
	('U1000', '', 1),
	('U2000', '', 1),
	('U2100', '', 1),
	('C100', '', 2),
	('C200', '', 2),
	('C300', '', 2),
	('DD01', '', 3),
	('DD05', '', 3),
	('DD15', '', 3),
	('Cardiaco-100', '', 4),
	('Cardiaco-150', '', 4),
	('Cardiaco-200', '', 4),
	('ANES-d100', '', 5),
	('ANES-d200', '', 5),
	('ANES-d170', '', 5),
	('MaqE', '', 6),
	('MaqE', '', 6),
	('MaqE', '', 6),
	('Fetal-Mon', '', 7),
	('Fetal-Son', '', 7),
	('Fetal-Dad', '', 7),
	('Vital1', '', 8),
	('Vital2', '', 8),
	('Vital3', '', 8);

    INSERT INTO maquinario(idMaquinario,dataCadastramento, fkHospital, fkModelo)
VALUES
	(1,'2023-03-05 09:00:00', 3, 1),
	(2,'2023-03-05 09:00:00', 3, 2),
	(3,'2023-03-05 09:00:00', 3, 3),
	(4,'2023-03-05 09:00:00', 3, 4),
	(5,'2023-03-05 09:00:00', 3, 5),
	(6,'2023-03-05 09:00:00', 3, 6),
	(7,'2023-03-05 09:00:00', 3, 7),
	(8,'2023-03-05 09:00:00', 3, 8),
	(9,'2023-03-05 09:00:00', 3, 9),
	(10,'2023-03-05 09:00:00', 3, 10),
	(11,'2023-03-05 09:00:00', 3, 11),
	(12,'2023-03-05 09:00:00', 3, 12),
	(13,'2023-03-05 09:00:00', 3, 1),
	(14,'2023-03-05 09:00:00', 3, 2),
	(15,'2023-03-05 09:00:00', 3, 3),
	(16,'2023-03-05 09:00:00', 3, 4),
	(17,'2023-03-05 09:00:00', 3, 5),
	(18,'2023-03-05 09:00:00', 3, 6),
	(19,'2023-03-05 09:00:00', 3, 7),
	(20,'2023-03-05 09:00:00', 3, 8),
	(21,'2023-03-05 09:00:00', 3, 9),
	(22,'2023-03-05 09:00:00', 3, 10),
	(23,'2023-03-05 09:00:00', 3, 11),
	(24,'2023-03-05 09:00:00', 3, 12),
	(25,'2023-03-05 09:00:00', 3, 1),
	(26,'2023-03-05 09:00:00', 3, 2),
	(27,'2023-03-05 09:00:00', 3, 3),
	(28,'2023-03-05 09:00:00', 3, 4),
	(29,'2023-03-05 09:00:00', 3, 5),
	(30,'2023-03-05 09:00:00', 3, 6),
	(31,'2023-03-05 09:00:00', 3, 7),
	(32,'2023-03-05 09:00:00', 3, 8),
	(33,'2023-03-05 09:00:00', 3, 9),
	(34,'2023-03-05 09:00:00', 3, 10),
	(35,'2023-03-05 09:00:00', 3, 11),
	(36,'2023-03-05 09:00:00', 3, 12),
	(37,'2023-03-05 09:00:00', 3, 1),
	(38,'2023-03-05 09:00:00', 3, 2),
	(39,'2023-03-05 09:00:00', 3, 3),
	(40,'2023-03-05 09:00:00', 3, 4),
	(41,'2023-03-05 09:00:00', 3, 5),
	(42,'2023-03-05 09:00:00', 3, 6),
	(43,'2023-03-05 09:00:00', 3, 7),
	(44,'2023-03-05 09:00:00', 3, 8),
	(45,'2023-03-05 09:00:00', 3, 9),
	(46,'2023-03-05 09:00:00', 3, 10),
	(47,'2023-03-05 09:00:00', 3, 11),
	(48,'2023-03-05 09:00:00', 3, 12),
	(49,'2023-03-05 09:00:00', 3, 1),
	(50,'2023-03-05 09:00:00', 3, 2),
	(51,'2023-03-05 09:00:00', 3, 3),
	(52,'2023-03-05 09:00:00', 3, 4),
	(53,'2023-03-05 09:00:00', 3, 5),
	(54,'2023-03-05 09:00:00', 3, 6),
	(55,'2023-03-05 09:00:00', 3, 7),
	(56,'2023-03-05 09:00:00', 3, 8),
	(57,'2023-03-05 09:00:00', 3, 9),
	(58,'2023-03-05 09:00:00', 3, 10),
	(59,'2023-03-05 09:00:00', 3, 11),
	(60,'2023-03-05 09:00:00', 3, 12),
	(61,'2023-03-05 09:00:00',2, 6),
	(62,'2023-03-05 09:00:00',2, 18),
	(63,'2023-03-05 09:00:00',2, 11),
	(64,'2023-03-05 09:00:00',2, 3),
	(65,'2023-03-05 09:00:00',2, 14),
	(66,'2023-03-05 09:00:00',2, 23),
	(67,'2023-03-05 09:00:00',2, 10),
	(68,'2023-03-05 09:00:00',2, 7),
	(69,'2023-03-05 09:00:00',2, 2),
	(70,'2023-03-05 09:00:00',2, 22),
	(71,'2023-03-05 09:00:00',2, 4),
	(72,'2023-03-05 09:00:00',2, 9),
	(73,'2023-03-05 09:00:00',2, 15),
	(74,'2023-03-05 09:00:00',2, 12),
	(75,'2023-03-05 09:00:00',2, 1),
	(76,'2023-03-05 09:00:00',2, 20),
	(77,'2023-03-05 09:00:00',2, 19),
	(78,'2023-03-05 09:00:00',2, 5),
	(79,'2023-03-05 09:00:00',2, 8),
	(80,'2023-03-05 09:00:00',2, 13),
	(81,'2023-03-05 09:00:00',2, 21),
	(82,'2023-03-05 09:00:00',2, 17),
	(83,'2023-03-05 09:00:00',2, 24),
	(84,'2023-03-05 09:00:00',2, 16),
	(85,'2023-03-05 09:00:00',2, 6),
	(86,'2023-03-05 09:00:00',2, 18),
	(87,'2023-03-05 09:00:00',2, 11),
	(88,'2023-03-05 09:00:00',2, 3),
	(89,'2023-03-05 09:00:00',2, 14),
	(90,'2023-03-05 09:00:00',2, 23),
	(91,'2023-03-05 09:00:00',2, 10),
	(92,'2023-03-05 09:00:00',2, 7),
	(93,'2023-03-05 09:00:00',2, 2),
	(94,'2023-03-05 09:00:00',2, 22),
	(95,'2023-03-05 09:00:00',2, 4),
	(96,'2023-03-05 09:00:00',2, 9),
	(97,'2023-03-05 09:00:00',2, 15),
	(98,'2023-03-05 09:00:00',2, 12),
	(99,'2023-03-05 09:00:00',2, 1),
	(100,'2023-03-05 09:00:00',2, 20),
	(101,'2023-03-05 09:00:00',2, 19),
	(102,'2023-03-05 09:00:00',2, 5),
	(103,'2023-03-05 09:00:00',2, 8),
	(104,'2023-03-05 09:00:00',2, 13),
	(105,'2023-03-05 09:00:00',2, 21),
	(106,'2023-03-05 09:00:00',2, 17),
	(107,'2023-03-05 09:00:00',2, 24),
	(108,'2023-03-05 09:00:00',2, 16),
	(109,'2023-03-05 09:00:00',2, 6),
	(110,'2023-03-05 09:00:00',2, 18),
	(111,'2023-03-05 09:00:00',2, 11),
	(112,'2023-03-05 09:00:00',2, 3),
	(113,'2023-03-05 09:00:00',2, 14),
	(114,'2023-03-05 09:00:00',2, 23),
	(115,'2023-03-05 09:00:00',2, 10),
	(116,'2023-03-05 09:00:00',2, 7),
	(117,'2023-03-05 09:00:00',2, 2),
	(118,'2023-03-05 09:00:00',2, 22),
	(119,'2023-03-05 09:00:00',2, 4),
	(120,'2023-03-05 09:00:00',2, 9),
	(121,'2023-03-05 09:00:00',2, 15),
	(122,'2023-03-05 09:00:00',2, 12),
	(123,'2023-03-05 09:00:00',2, 1),
	(124,'2023-03-05 09:00:00',2, 20),
	(125,'2023-03-05 09:00:00',2, 19),
	(126,'2023-03-05 09:00:00',2, 5),
	(127,'2023-03-05 09:00:00',2, 8),
	(128,'2023-03-05 09:00:00',2, 13),
	(129,'2023-03-05 09:00:00',2, 21),
	(130,'2023-03-05 09:00:00',2, 17),
	(131,'2023-03-05 09:00:00',2, 24),
	(132,'2023-03-05 09:00:00',2, 16),
	(133,'2023-03-05 09:00:00',2, 6),
	(134,'2023-03-05 09:00:00',2, 18),
	(135,'2023-03-05 09:00:00',2, 11),
	(136,'2023-03-05 09:00:00',2, 3),
	(137,'2023-03-05 09:00:00',2, 14),
	(138,'2023-03-05 09:00:00',2, 23),
	(139,'2023-03-05 09:00:00',2, 10),
	(140,'2023-03-05 09:00:00',2, 7),
	(141,'2023-03-05 09:00:00',2, 2),
	(142,'2023-03-05 09:00:00',2, 22),
	(143,'2023-03-05 09:00:00',2, 4),
	(144,'2023-03-05 09:00:00',2, 9),
	(145,'2023-03-05 09:00:00',2, 15),
	(146,'2023-03-05 09:00:00',2, 12),
	(147,'2023-03-05 09:00:00',2, 1),
	(148,'2023-03-05 09:00:00',2, 20),
	(149,'2023-03-05 09:00:00',2, 19),
	(150,'2023-03-05 09:00:00',2, 5),
	(151,'2023-03-05 09:00:00',2, 8),
	(152,'2023-03-05 09:00:00',2, 13),
	(153,'2023-03-05 09:00:00',2, 21),
	(154,'2023-03-05 09:00:00',2, 17),
	(155,'2023-03-05 09:00:00',2, 24),
	(156,'2023-03-05 09:00:00',2, 16),
	(157,'2023-03-05 09:00:00',2, 6),
	(158,'2023-03-05 09:00:00',2, 18),
	(159,'2023-03-05 09:00:00',2, 11),
	(160,'2023-03-05 09:00:00',2, 3),
	(161,'2023-03-05 09:00:00',2, 14),
	(162,'2023-03-05 09:00:00',2, 23),
	(163,'2023-03-05 09:00:00',2, 10),
	(164,'2023-03-05 09:00:00',2, 7),
	(165,'2023-03-05 09:00:00',2, 2),
	(166,'2023-03-05 09:00:00',2, 22),
	(167,'2023-03-05 09:00:00',2, 4),
	(168,'2023-03-05 09:00:00',2, 9),
	(169,'2023-03-05 09:00:00', 1, 12),
	(170,'2023-03-05 09:00:00', 1, 1),
	(171,'2023-03-05 09:00:00', 1, 2),
	(172,'2023-03-05 09:00:00', 1, 11),
	(173,'2023-03-05 09:00:00', 1, 3),
	(174,'2023-03-05 09:00:00', 1, 5),
	(175,'2023-03-05 09:00:00', 1, 4),
	(176,'2023-03-05 09:00:00', 1, 6),
	(177,'2023-03-05 09:00:00', 1, 24),
	(178,'2023-03-05 09:00:00', 1, 13),
	(179,'2023-03-05 09:00:00', 1, 15),
	(180,'2023-03-05 09:00:00', 1, 14),
	(181,'2023-03-05 09:00:00', 1, 22),
	(182,'2023-03-05 09:00:00', 1, 10),
	(183,'2023-03-05 09:00:00', 1, 23),
	(184,'2023-03-05 09:00:00', 1, 21),
	(185,'2023-03-05 09:00:00', 1, 12),
	(186,'2023-03-05 09:00:00', 1, 6),
	(187,'2023-03-05 09:00:00', 1, 4),
	(188,'2023-03-05 09:00:00', 1, 1),
	(189,'2023-03-05 09:00:00', 1, 3),
	(190,'2023-03-05 09:00:00', 1, 2),
	(191,'2023-03-05 09:00:00', 1, 5),
	(192,'2023-03-05 09:00:00', 1, 10),
	(193,'2023-03-05 09:00:00', 1, 11),
	(194,'2023-03-05 09:00:00', 1, 13),
	(195,'2023-03-05 09:00:00', 1, 15),
	(196,'2023-03-05 09:00:00', 1, 14),
	(197,'2023-03-05 09:00:00', 1, 22),
	(198,'2023-03-05 09:00:00', 1, 23),
	(199,'2023-03-05 09:00:00', 1, 24),
	(200,'2023-03-05 09:00:00', 1, 21),
	(201,'2023-03-05 09:00:00', 1, 18),
	(202,'2023-03-05 09:00:00', 1, 17),
	(203,'2023-03-05 09:00:00', 1, 19),
	(204,'2023-03-05 09:00:00', 1, 8),
	(205,'2023-03-05 09:00:00', 1, 9),
	(206,'2023-03-05 09:00:00', 1, 16),
	(207,'2023-03-05 09:00:00', 1, 7),
	(208,'2023-03-05 09:00:00', 1, 12),
	(209,'2023-03-05 09:00:00', 1, 6),
	(210,'2023-03-05 09:00:00', 1, 4),
	(211,'2023-03-05 09:00:00', 1, 1),
	(212,'2023-03-05 09:00:00', 1, 3),
	(213,'2023-03-05 09:00:00', 1, 2),
	(214,'2023-03-05 09:00:00', 1, 5),
	(215,'2023-03-05 09:00:00', 1, 10),
	(216,'2023-03-05 09:00:00', 1, 11),
    (217,'2023-03-05 09:00:00', 4, 1),
	(218,'2023-03-05 09:00:00', 4, 2),
	(219,'2023-03-05 09:00:00', 4, 3),
	(220,'2023-03-05 09:00:00', 4, 4),
	(221,'2023-03-05 09:00:00', 4, 5),
	(222,'2023-03-05 09:00:00', 4, 6),
	(223,'2023-03-05 09:00:00', 4, 7),
	(224,'2023-03-05 09:00:00', 4, 8),
	(225,'2023-03-05 09:00:00', 4, 9),
	(226,'2023-03-05 09:00:00', 4, 10),
	(227,'2023-03-05 09:00:00', 4, 11),
	(228,'2023-03-05 09:00:00', 4, 12),
	(229,'2023-03-05 09:00:00', 4, 1),
	(230,'2023-03-05 09:00:00', 4, 2),
	(231,'2023-03-05 09:00:00', 4, 3),
	(232,'2023-03-05 09:00:00', 4, 4),
	(233,'2023-03-05 09:00:00', 4, 5),
	(234,'2023-03-05 09:00:00', 4, 6),
	(235,'2023-03-05 09:00:00', 4, 7),
	(236,'2023-03-05 09:00:00', 4, 8),
	(237,'2023-03-05 09:00:00', 4, 9),
	(238,'2023-03-05 09:00:00', 4, 10),
	(239,'2023-03-05 09:00:00', 4, 11),
	(240,'2023-03-05 09:00:00', 4, 12),
	(241,'2023-03-05 09:00:00', 4, 1),
	(242,'2023-03-05 09:00:00', 4, 2),
	(243,'2023-03-05 09:00:00', 4, 3),
	(244,'2023-03-05 09:00:00', 4, 4),
	(245,'2023-03-05 09:00:00', 4, 5),
	(246,'2023-03-05 09:00:00', 4, 6),
	(247,'2023-03-05 09:00:00', 4, 7),
	(248,'2023-03-05 09:00:00', 4, 8),
	(249,'2023-03-05 09:00:00', 4, 9),
	(250,'2023-03-05 09:00:00', 4, 10),
	(251,'2023-03-05 09:00:00', 4, 11),
	(252,'2023-03-05 09:00:00', 4, 12),
	(253,'2023-03-05 09:00:00', 4, 1),
	(254,'2023-03-05 09:00:00', 4, 2),
	(255,'2023-03-05 09:00:00', 4, 3),
	(256,'2023-03-05 09:00:00', 4, 4),
	(257,'2023-03-05 09:00:00', 4, 5),
	(258,'2023-03-05 09:00:00', 4, 6),
	(259,'2023-03-05 09:00:00', 4, 7),
	(260,'2023-03-05 09:00:00', 4, 8),
	(261,'2023-03-05 09:00:00', 4, 9),
	(262,'2023-03-05 09:00:00', 4, 10),
	(263,'2023-03-05 09:00:00', 4, 11),
	(264,'2023-03-05 09:00:00', 4, 12),
	(265,'2023-03-05 09:00:00', 4, 1),
	(266,'2023-03-05 09:00:00', 4, 2),
	(267,'2023-03-05 09:00:00', 4, 3),
	(268,'2023-03-05 09:00:00', 4, 4),
	(269,'2023-03-05 09:00:00', 4, 5),
	(270,'2023-03-05 09:00:00', 4, 6),
	(271,'2023-03-05 09:00:00', 4, 7),
	(272,'2023-03-05 09:00:00', 4, 8),
	(273,'2023-03-05 09:00:00', 4, 9),
	(274,'2023-03-05 09:00:00', 4, 10),
	(275,'2023-03-05 09:00:00', 4, 11),
	(276,'2023-03-05 09:00:00', 4, 12);



insert into 
	tipoRegistro(nome, medida)
values
	('Percentual de uso', '%');
	
insert into 
	peca(nome, modelo, fkTipoRegistro)
values 
	('CPU','i9 9900f',1),
	('CPU', 'i7 13500k',1),
	('CPU','i3 10900',1),
	('CPU','i7 6900f',1),
	('CPU','i9 5900f',1),
	('CPU','i5 11900f',1),
	('CPU','i3 5900f',1),
	('RAM','8gb fury Kingston',1),
	('RAM','12gb ram crucial',1),
	('RAM','16gb Corsair',1),
	('Disco','1tb hd seagate',1),
	('Disco','500gb ssd samsung',1),
	('Disco','450gb hd Adata',1);

insert into 
	limite(fkPeca, fkModelo, valor)
values
	(1,15, 85),
	(1,15, 85),
	(8,15, 85),
	(13,15, 85),
	(2,12, 85),
	(10,12, 85),
	(11,12, 85),
	(3,15, 85),
	(9,15, 85),
	(12,15, 85);