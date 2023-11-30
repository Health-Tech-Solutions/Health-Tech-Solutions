			-- Active: 1683809701982@@127.0.0.1@3306@amigospet
	drop database if exists hts;
	create database hts;
	USE hts;

	-- Criação do usuario padrão se ele ainda não existe
	-- CREATE USER IF NOT EXISTS 'hts'@'localHost' IDENTIFIED BY 'urubu100';
	-- GRANT ALL PRIVILEGES ON *.* TO 'hts'@'localhost';
	-- FLUSH PRIVILEGES;

	-- Criação das tabelas
	create table endereco(
		idEndereco int primary key auto_increment,
		cep char(9),
		numero varchar(10),
		complemento varchar(40),
		logradouro VARCHAR(45),
		bairro VARCHAR(45),
		cidade VARCHAR(45),
		estado VARCHAR(45)
	);

	create table empresa(
		idEmpresa int primary key auto_increment,
		nomeFantasia varchar(45),
		cnpj char(14),
		telefone char(13),
		fkEndereco int,
		filial INT,
		Foreign Key (filial) REFERENCES empresa(idEmpresa),
		foreign key (fkEndereco) references endereco(idEndereco)
	);
	-- Av. Brasil, 1085 - Jardim America, São Paulo - SP, 01431-000

	create table funcionario(
		idFuncionario int primary key auto_increment,
		nome varchar(45),
		email varchar(60),
		senha varchar(45),
		funcao varchar(45),
		tipo CHAR(1),
		CPF CHAR(11),
		foto VARCHAR(300),
		fkIndustria int,
		foreign key (fkIndustria) references empresa(idEmpresa),
		fkRepresentante int,
		foreign key (fkRepresentante) references funcionario(idFuncionario)
	);

	create table tipo(
		idTipo int primary key auto_increment,
		nome varchar(45)
	);

	create table modelo(
		idModelo int primary key auto_increment,
		modelo varchar(45),
		descricao varchar(255),
		fkTipo int,
		foreign key (fkTipo) references tipo(idTipo)
	);
		
	create table maquinario(
		idMaquinario int,
		dataCadastramento DATETIME,
		fkHospital int,
		macAdress VARCHAR(45),
		foreign key (fkHospital) references empresa(idEmpresa),
		fkModelo int,
		foreign key (fkModelo) references modelo(idModelo),
		primary key(idMaquinario, fkModelo)
	);

	create table tipoRegistro(
		idTipoRegistro int primary key auto_increment,
		nome varchar(45),
		medida varchar(45)
	);

	create table peca(
		idPeca int primary key auto_increment,
		nome varchar(45),
		descricao varchar(45),
        modelo varchar(100),
		fkTipoRegistro INT,
		fkMaquinario INT,
		Foreign Key (fkTipoRegistro) REFERENCES tipoRegistro(idTipoRegistro),
		FOREIGN KEY (fkMaquinario) REFERENCES maquinario(idMaquinario)
	);

	create table registro(
		idRegistro int primary key auto_increment,
		dataHora datetime,
		valor decimal(7,2),
		fkMaquina int,
		fkPeca INT,
		Foreign Key (fkPeca) REFERENCES peca(idPeca)
	);
		
	create table chamado(
		idChamado int primary key auto_increment,
		nivel varchar(45),
		estado varchar(45),
		sla varchar(45),
		descricao varchar(45),
		dataHora DATETIME,
		fkRegistro int,
		foreign key(fkRegistro) references registro(idRegistro)
	);

	CREATE TABLE ordemManutencao (
		idOrdem INT PRIMARY KEY AUTO_INCREMENT,
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

	create table limite(
		idLimite int primary key auto_increment,
		valor decimal(5,2),
		fkPeca int,
		fkModelo int,
		foreign key (fkModelo) references modelo(idModelo),
		foreign key (fkPeca) references peca(idPeca)
	);

	CREATE TABLE dadosTemperatura (
		idDadosTemperatura INT PRIMARY KEY AUTO_INCREMENT,
		estado VARCHAR(25),
		dataTemperatura DATE,
		precipitacao DECIMAL(8,2),
		pressaoMax DECIMAL(8,2),
		pressaoMin DECIMAL(8,2),
		temperaturaMax DECIMAL(8,2),
		temperaturaMin DECIMAL(8,2)
	);

	CREATE TABLE registroTemperatura(
		fkDadosTemperatura int,
		fkHospital int,
		FOREIGN KEY (fkDadosTemperatura) REFERENCES dadosTemperatura(idDadosTemperatura),
		FOREIGN KEY (fkHospital) REFERENCES empresa(idEmpresa)
	);


	CREATE OR REPLACE VIEW vw_chamados
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
		JOIN registro AS r
		JOIN maquinario AS maq
		JOIN modelo AS m
		JOIN empresa AS e
		JOIN tipoRegistro AS tr
		JOIN tipo AS t
		JOIN peca AS p
		WHERE fkMaquina = idMaquinario 
		AND m.fkTipo = t.idTipo
		AND fkRegistro = idRegistro
		AND maq.fkModelo = m.idModelo
		AND maq.fkHospital = e.idEmpresa;
		
		
	DELIMITER $
		CREATE FUNCTION subtrai_data(data1 DATETIME, data2 DATETIME)
		RETURNS INT
		DETERMINISTIC
		BEGIN
		DECLARE dataFinal INT;
		DECLARE minutos INT;
			SET dataFinal = TIME_TO_SEC(TIMEDIFF(data1,data2));
			SET minutos = datafinal / 60;
		RETURN minutos;
		END
	$

	DELIMITER $

	CREATE TRIGGER tr_abre_ordem
	AFTER INSERT ON maquinario
	FOR EACH ROW
	BEGIN 
		INSERT INTO ordemManutencao(estado,dataInicioFunc,fkMaquina,qtdFalhas) VALUES ('funcionando',now(),new.idMaquinario, 0);
	end
	$


	DELIMITER $
	CREATE TRIGGER tr_atualiza_ordem
	AFTER INSERT ON chamado
	FOR EACH ROW
	BEGIN 
		CASE WHEN 
				NEW.nivel = 'Alto' 
			THEN 
				UPDATE ordemManutencao SET estado = 'parado' ,
											dataAbertura = now(),
											qtdFalhas = qtdFalhas + 1,
											somaFuncionamento = subtrai_data(NOW(),dataInicioFunc),
											fkChamado = NEW.idChamado
												WHERE fkMaquina = (SELECT 
														fkMaquina 
												FROM registro 
												WHERE idRegistro = NEW.fkRegistro) ;
			else 
			UPDATE ordemManutencao SET estado = 'funcionando'
								   WHERE fkMaquina = (SELECT 
														fkMaquina 
													  FROM registro 
													  WHERE idRegistro = NEW.fkRegistro) ;
		END CASE;
			
	END

	$

	DELIMITER $
	CREATE TRIGGER tr_fechamento_chamado
	AFTER UPDATE ON chamado
	FOR EACH ROW
	BEGIN
		UPDATE ordemManutencao SET dataFechamento = now(),
									estado = 'funcionando',
									somaManutencao = subtrai_data(dataFechamento, dataAbertura)
									WHERE fkMaquina = (SELECT 
														  fkMaquina
													   FROM registro
													   WHERE idRegistro = NEW.fkRegistro);
	END
	$

	DELIMITER $$

	DROP PROCEDURE IF EXISTS inserir_registros$$

	CREATE PROCEDURE inserir_registros()
	BEGIN
	DECLARE i INT;
	DECLARE dataHora DATETIME;
	DECLARE valor FLOAT;
	DECLARE fkPeca INT;
	DECLARE fkMaquina INT;

	SET i = 1;

	WHILE i <= 300 DO
		SET dataHora = DATE_ADD('2023-01-01', INTERVAL FLOOR(RAND() * 365) DAY);

		SET valor = 85 + (RAND() * 15);

		SET fkPeca = FLOOR(RAND() * 13) + 1;

		SET fkMaquina = FLOOR(RAND() * 216) + 1;

		INSERT INTO registro (dataHora, valor, fkMaquina, fkPeca)
		VALUES (dataHora, valor, fkMaquina, fkPeca);

		SET i = i + 1;
	END WHILE;
	END$$

	DELIMITER ;
	select * from peca;
	delimiter $$
	DROP PROCEDURE IF EXISTS inserir_registros_temperatura$$

	CREATE PROCEDURE inserir_registros_temperatura()
	BEGIN
	DECLARE i INT;
	DECLARE dataHora DATETIME;
	DECLARE valor FLOAT;
	DECLARE fkPeca INT;
	DECLARE fkMaquina INT;

	SET i = 1;

	WHILE i <= 300 DO
		SET dataHora = DATE_ADD('2023-01-01', INTERVAL FLOOR(RAND() * 365) DAY);

		SET valor = 85 + (RAND() * 15);

		SET fkPeca = FLOOR(RAND() * 13) + 1;

		INSERT INTO registro (dataHora, valor, fkMaquina, fkPeca)
		VALUES (dataHora, valor, 5, fkPeca);

		SET i = i + 1;
	END WHILE;
	END$$

	DELIMITER ;

	DELIMITER $$

	DROP PROCEDURE IF EXISTS fechar_chamados$$

	CREATE PROCEDURE fechar_chamados()
	BEGIN 
		DECLARE i INT;
		DECLARE quantidade FLOAT;
		DECLARE idFechado FLOAT;
		
		SET i = 0;
		SET quantidade = FLOOR(RAND() * (SELECT COUNT(*) FROM chamado WHERE estado = 'Aberto'));
		WHILE i <= quantidade DO
			SET idFechado = RAND() * quantidade;
			UPDATE chamado SET estado = 'fechado' WHERE idChamado = FLOOR(idFechado);
			SET i = i + 1;
		END WHILE;
	END$$
			
	DELIMITER ;

	DELIMITER $$

	DROP PROCEDURE IF EXISTS inserir_registros2$$

	CREATE PROCEDURE inserir_Registros2()
	BEGIN
	DECLARE i INT;
	DECLARE dataHora DATETIME;
	DECLARE valor FLOAT;
	DECLARE fkTipoRegistro INT;
	DECLARE fkMaquina INT;
	DECLARE counter INT;
	DECLARE counter2 int;

	SET i = 1;

	WHILE i <= 216 DO
		SET dataHora = DATE_ADD('2023-01-01', INTERVAL FLOOR(RAND() * 365) DAY);
		SET valor = 85 + (RAND() * 15);
		SET fkTipoRegistro = FLOOR(RAND() * 3) + 1;
		SET fkMaquina = FLOOR(RAND() * 216) + 1;
		
		SET counter = 1;
		WHILE counter <= 50 DO
			set counter2 = 1;
			WHILE counter2 <= 3 do
		INSERT INTO `registro` (`idRegistro`, `dataHora`, `valor`, `fkMaquina`, `fkTipoRegistro`, `fkModelo`) 
		VALUES (null, FROM_UNIXTIME(UNIX_TIMESTAMP('2023-12-08 00:00:00') + FLOOR(RAND() * 31536000)), FLOOR(RAND() * 100), i, counter2, NULL);
		SET counter = counter + 1;
		end while;
		END WHILE;
		
		INSERT INTO registro (dataHora, valor, fkMaquina, fkTipoRegistro)
		VALUES (dataHora, valor, fkMaquina, fkTipoRegistro);
		
		SET i = i + 1;
	END WHILE;
	END$$
	DELIMITER ;

	insert into endereco values	(NULL, '04571011', 1747,'Avenida Luis Carlos Berrini',	'Itaim Bibi', 'São Paulo','','SP'),
								(NULL, '01310000',200,'Avenida Paulista', 'Bela Vista','São Paulo','','SP'),
								(NULL,'01431000', 953,'Avenida Brasil', 'Jardim América','São Paulo','','SP'),
								(NULL,'09910720', 605, 'Rua Manoel da Nóbrega', 'Centro','Diadema', '','SP'),
								(NULL,'22630010 ', 802, '', '','barra da tijuca', '','RJ');

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
		(idEmpresa, nomeFantasia, cnpj,fkEndereco)
	values
		(NULL, 'Hospital Santa Catarina', '60922168000186',2),
		(NULL, 'Hospital Albert Einsten', '60765823000130',3),
		(NULL, 'Hospital Santa Helena', '34128330000189',4),
		(NULL, 'Hospital Rio de Janeiro', '23928730000185',5);

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
		
		
	INSERT INTO maquinario(idMaquinario, masAdress, dataCadastramento, fkHospital, fkModelo) VALUES
    (1, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 3, 1),
    (2, '2K-5S-H8-AJ-1L-4G', '2023-03-05 09:00:00', 3, 2),
    (3, '9P-2F-L6-R7-8Y-3X', '2023-03-05 09:00:00', 3, 3),
    (4, '5M-3G-2A-Y0-1T-9R', '2023-03-05 09:00:00', 3, 4),
    (5, 'Q4-6U-8E-2F-TL-1Y', '2023-03-05 09:00:00', 3, 5),
    (6, '7H-2K-J1-G9-A8-X6', '2023-03-05 09:00:00', 3, 6),
    (7, '8F-3J-N4-1S-5R-Y0', '2023-03-05 09:00:00', 3, 7),
    (8, '6X-0B-8U-H9-KA-7L', '2023-03-05 09:00:00', 3, 8),
    (9, '4N-K7-3W-Y1-5L-TJ', '2023-03-05 09:00:00', 3, 9),
    (10, '8T-J4-2H-U3-NK-5L', '2023-03-05 09:00:00', 3, 10),
    (11, '9P-QT-5X-8Y-KA-6H', '2023-03-05 09:00:00', 3, 11),
    (12, '2G-3J-YR-H7-NL-1X', '2023-03-05 09:00:00', 3, 12),
    (13, '7E-HS-3G-5N-1Y-A4', '2023-03-05 09:00:00', 3, 1),
    (14, '6L-2Y-3P-A9-8T-F7', '2023-03-05 09:00:00', 3, 2),
    (15, '8U-7R-LT-5A-WY-2F', '2023-03-05 09:00:00', 3, 3),
    (16, '9F-X6-MG-1J-NV-4E', '2023-03-05 09:00:00', 3, 4),
    (17, '5K-2L-Y3-0U-SB-7N', '2023-03-05 09:00:00', 3, 5),
    (18, '3S-4F-R6-HV-J9-1W', '2023-03-05 09:00:00', 3, 6),
    (19, '8B-MP-4X-9C-1E-L7', '2023-03-05 09:00:00', 3, 7),
    (20, '8L-6G-W3-TJ-U5-YH', '2023-03-05 09:00:00', 3, 8),
    (21, '9U-7K-1S-FN-W3-AJ', '2023-03-05 09:00:00', 3, 9),
    (22, '3Y-KX-R4-L0-9S-8P', '2023-03-05 09:00:00', 3, 10),
    (23, '9H-V7-X8-AJ-4T-2F', '2023-03-05 09:00:00', 3, 11),
    (24, '5Q-2C-H8-7P-1U-9R', '2023-03-05 09:00:00', 3, 12),
    (25, '8U-3L-9Y-2N-RW-6A', '2023-03-05 09:00:00', 3, 1),
    (26, '2S-G5-3Y-QN-9F-7R', '2023-03-05 09:00:00', 3, 2),
    (27, '1J-XN-4R-7P-6H-8W', '2023-03-05 09:00:00', 3, 3),
    (28, '5A-2H-K6-8T-3P-F7', '2023-03-05 09:00:00', 3, 4),
    (29, '9U-3B-S8-FN-2E-WH', '2023-03-05 09:00:00', 3, 5),
    (30, '5L-7Y-R0-KX-2V-3H', '2023-03-05 09:00:00', 3, 6),
    (31, '8A-3R-W0-9C-2Y-6F', '2023-03-05 09:00:00', 3, 7),
    (32, '2G-4U-9Y-KA-8S-1N', '2023-03-05 09:00:00', 3, 8),
    (33, '4H-Q2-7A-NL-1Y-9K', '2023-03-05 09:00:00', 3, 9),
    (34, '8R-4N-3E-7S-L6-A0', '2023-03-05 09:00:00', 3, 10),
    (35, '6J-8X-2C-HS-RV-1K', '2023-03-05 09:00:00', 3, 11),
    (36, '9F-7R-8M-X4-2E-6U', '2023-03-05 09:00:00', 3, 12),
    (37, '3F-5L-9N-6C-J0-U8', '2023-03-05 09:00:00', 3, 1),
    (38, '1S-9E-3Y-N7-MV-R4', '2023-03-05 09:00:00', 3, 2),
    (39, '4U-A5-2N-3Y-T8-6F', '2023-03-05 09:00:00', 3, 3),
    (40, '9H-4A-JK-2Y-1N-7M', '2023-03-05 09:00:00', 3, 4),
    (41, '2L-XF-H6-9T-8N-WP', '2023-03-05 09:00:00', 3, 5),
    (42, '4K-Y7-S8-6R-HN-3E', '2023-03-05 09:00:00', 3, 6),
    (43, '1J-K7-X0-4R-2U-8T', '2023-03-05 09:00:00', 3, 7),
    (44, '9Y-WL-R8-HM-7C-3G', '2023-03-05 09:00:00', 3, 8),
    (45, '5G-8S-1W-N6-YV-4J', '2023-03-05 09:00:00', 3, 9),
    (46, '7K-9A-FN-2M-3C-J0', '2023-03-05 09:00:00', 3, 10),
    (47, '8P-2Y-HS-6U-AJ-1W', '2023-03-05 09:00:00', 3, 11),
    (48, '3X-4R-9N-K6-2S-7C', '2023-03-05 09:00:00', 3, 12),
    (49, '6U-1J-3A-K8-WY-9H', '2023-03-05 09:00:00', 3, 1),
    (50, '7H-9Y-4F-MV-K3-NR', '2023-03-05 09:00:00', 3, 2),
    (51, '8K-3T-7E-JN-Y0-6C', '2023-03-05 09:00:00', 3, 3),
    (52, '4P-W2-6X-8A-1R-9S', '2023-03-05 09:00:00', 3, 4),
    (53, '9M-1S-2N-8U-H7-Q4', '2023-03-05 09:00:00', 3, 5),
    (54, '6G-H3-9K-M5-4L-1A', '2023-03-05 09:00:00', 3, 6),
    (55, '8V-2R-A4-3P-5L-W9', '2023-03-05 09:00:00', 3, 7),
    (56, '9S-6J-0H-KA-1E-Q2', '2023-03-05 09:00:00', 3, 8),
    (57, '3F-5N-2T-Q8-HR-7W', '2023-03-05 09:00:00', 3, 9),
    (58, '8L-X6-N3-WP-7F-2R', '2023-03-05 09:00:00', 3, 10),
    (59, '4E-3W-6A-9Y-J0-KG', '2023-03-05 09:00:00', 3, 11),
    (60, '2M-SR-7C-K8-3W-A1', '2023-03-05 09:00:00', 3, 12),
    (61, '1T-3W-KY-2C-H4-9N', '2023-03-05 09:00:00', 3, 1),
    (62, '8U-7R-WJ-1L-6S-0K', '2023-03-05 09:00:00', 3, 2),
    (63, 'H2-9L-3A-5K-JR-6S', '2023-03-05 09:00:00', 2, 11),
    (64, 'A6-X3-9B-H4-T8-2Y', '2023-03-05 09:00:00', 2, 3),
    (65, 'J7-1P-2G-4T-8W-R5', '2023-03-05 09:00:00', 2, 14),
    (66, 'H2-9L-3A-5K-JR-6S', '2023-03-05 09:00:00', 2, 23),
    (67, 'A6-X3-9B-H4-T8-2Y', '2023-03-05 09:00:00', 2, 10),
    (68, 'J7-1P-2G-4T-8W-R5', '2023-03-05 09:00:00', 2, 7),
    (69, 'T4-6L-A9-X8-3P-2H', '2023-03-05 09:00:00', 2, 2),
    (70, 'K6-T7-G2-W5-9R-7A', '2023-03-05 09:00:00', 2, 22),
    (71, 'S3-2B-K8-U4-5H-J5', '2023-03-05 09:00:00', 2, 4),
    (72, 'M9-Y4-R8-6W-B2-K9', '2023-03-05 09:00:00', 2, 9),
    (73, 'L3-A6-1Y-7G-8K-S4', '2023-03-05 09:00:00', 2, 15),
    (74, 'G7-3T-B5-S9-K6-1P', '2023-03-05 09:00:00', 2, 12),
    (75, 'N2-Y6-3X-J8-7A-H4', '2023-03-05 09:00:00', 2, 1),
    (76, 'X4-2K-9E-P8-4G-W3', '2023-03-05 09:00:00', 2, 20),
    (77, 'H1-9R-2F-G3-T5-X7', '2023-03-05 09:00:00', 2, 19),
    (78, 'B6-5W-H8-9U-2M-T4', '2023-03-05 09:00:00', 2, 5),
    (79, 'J4-8P-3T-M6-S9-R2', '2023-03-05 09:00:00', 2, 8),
    (80, 'A9-2U-4W-S8-3P-J6', '2023-03-05 09:00:00', 2, 13),
    (81, 'U7-3X-5E-Q2-9A-W8', '2023-03-05 09:00:00', 2, 21),
    (82, 'T9-7G-W2-S4-5R-1K', '2023-03-05 09:00:00', 2, 17),
    (83, 'H3-4U-K6-9L-X7-B8', '2023-03-05 09:00:00', 2, 24),
    (84, 'A6-8U-Y3-H5-6S-K2', '2023-03-05 09:00:00', 2, 16),
    (85, 'H2-9L-3A-5K-JR-6S', '2023-03-05 09:00:00', 2, 6),
    (86, 'A6-X3-9B-H4-T8-2Y', '2023-03-05 09:00:00', 2, 18),
    (87, 'J7-1P-2G-4T-8W-R5', '2023-03-05 09:00:00', 2, 25),
    (88, 'H2-9L-3A-5K-JR-6S', '2023-03-05 09:00:00', 3, 11),
    (89, 'A6-X3-9B-H4-T8-2Y', '2023-03-05 09:00:00', 3, 3),
    (90, 'J7-1P-2G-4T-8W-R5', '2023-03-05 09:00:00', 3, 14),
    (91, 'H2-9L-3A-5K-JR-6S', '2023-03-05 09:00:00', 3, 23),
    (92, 'A6-X3-9B-H4-T8-2Y', '2023-03-05 09:00:00', 3, 10),
    (93, 'J7-1P-2G-4T-8W-R5', '2023-03-05 09:00:00', 3, 7),
    (94, 'T4-6L-A9-X8-3P-2H', '2023-03-05 09:00:00', 3, 2),
    (95, 'K6-T7-G2-W5-9R-7A', '2023-03-05 09:00:00', 3, 22),
    (96, 'S3-2B-K8-U4-5H-J5', '2023-03-05 09:00:00', 3, 4),
    (97, 'M9-Y4-R8-6W-B2-K9', '2023-03-05 09:00:00', 3, 9),
    (98, 'L3-A6-1Y-7G-8K-S4', '2023-03-05 09:00:00', 3, 15),
    (99, 'G7-3T-B5-S9-K6-1P', '2023-03-05 09:00:00', 3, 12),
    (100, 'N2-Y6-3X-J8-7A-H4', '2023-03-05 09:00:00', 3, 1),
    (101, 'X4-2K-9E-P8-4G-W3', '2023-03-05 09:00:00', 3, 20),
    (102, 'H1-9R-2F-G3-T5-X7', '2023-03-05 09:00:00', 3, 19),
    (103, 'B6-5W-H8-9U-2M-T4', '2023-03-05 09:00:00', 3, 5),
    (104, 'J4-8P-3T-M6-S9-R2', '2023-03-05 09:00:00', 3, 8),
    (105, 'A9-2U-4W-S8-3P-J6', '2023-03-05 09:00:00', 3, 13),
    (106, 'U7-3X-5E-Q2-9A-W8', '2023-03-05 09:00:00', 3, 21),
    (107, 'T9-7G-W2-S4-5R-1K', '2023-03-05 09:00:00', 3, 17),
    (108, 'H3-4U-K6-9L-X7-B8', '2023-03-05 09:00:00', 3, 24),
    (109, 'A6-8U-Y3-H5-6S-K2', '2023-03-05 09:00:00', 3, 16),
    (110, 'H2-9L-3A-5K-JR-6S', '2023-03-05 09:00:00', 3, 6),
    (111, 'A6-X3-9B-H4-T8-2Y', '2023-03-05 09:00:00', 3, 18),
    (112, 'J7-1P-2G-4T-8W-R5', '2023-03-05 09:00:00', 3, 25),
    (113, 'H2-9L-3A-5K-JR-6S', '2023-03-05 09:00:00', 4, 11),
    (114, 'A6-X3-9B-H4-T8-2Y', '2023-03-05 09:00:00', 4, 3),
    (115, 'J7-1P-2G-4T-8W-R5', '2023-03-05 09:00:00', 4, 14),
    (116, 'H2-9L-3A-5K-JR-6S', '2023-03-05 09:00:00', 4, 23),
    (117, 'A6-X3-9B-H4-T8-2Y', '2023-03-05 09:00:00', 4, 10),
    (118, 'J7-1P-2G-4T-8W-R5', '2023-03-05 09:00:00', 4, 7),
    (119, 'T4-6L-A9-X8-3P-2H', '2023-03-05 09:00:00', 4, 2),
    (120, 'K6-T7-G2-W5-9R-7A', '2023-03-05 09:00:00', 4, 22),
    (121, 'S3-2B-K8-U4-5H-J5', '2023-03-05 09:00:00', 4, 4),
    (122, 'M9-Y4-R8-6W-B2-K9', '2023-03-05 09:00:00', 4, 9),
    (123, 'L3-A6-1Y-7G-8K-S4', '2023-03-05 09:00:00', 4, 15),
    (124, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 18),
    (125, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 5),
    (126, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 8),
    (127, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 13),
    (128, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 21),
    (129, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 17),
    (130, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 24),
    (131, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 16),
    (132, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 6),
    (133, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 18),
    (134, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 11),
    (135, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 3),
    (136, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 14),
    (137, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 23),
    (138, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 10),
    (139, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 7),
    (140, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 2),
    (141, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 22),
    (142, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 4),
    (143, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 9),
    (144, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 15),
    (145, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 12),
    (146, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 1),
    (147, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 20),
    (148, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 19),
    (149, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 5),
    (150, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 8),
    (151, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 13),
    (152, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 21),
    (153, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 17),
    (154, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 24),
    (155, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 16),
    (156, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 6),
    (157, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 18),
    (158, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 11),
    (159, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 3),
    (160, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 14),
    (161, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 23),
    (162, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 10),
    (163, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 7),
    (164, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 2),
    (165, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 22),
    (166, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 4),
    (167, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 9),
    (168, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 15),
    (169, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 12),
    (170, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 1),
    (171, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 20),
    (172, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 19),
    (173, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 5),
    (174, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 8),
    (175, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 13),
    (176, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 21),
    (177, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 17),
    (178, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 24),
    (179, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 16),
    (180, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 6),
    (181, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 18),
    (182, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 11),
    (183, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 3),
    (184, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 14),
    (185, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 23),
    (186, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 10),
    (187, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 7),
    (188, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 2),
    (189, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 2, 22),
    (190, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 2, 4),
    (191, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 2, 9),
    (192, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 2, 15),
    (193, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 2, 12),
    (194, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 2, 1),
    (195, '3F-5N-2T-Q8-HR-7W', '2023-03-05 09:00:00', 3, 9),
    (196, '8L-X6-N3-WP-7F-2R', '2023-03-05 09:00:00', 3, 10),
    (197, '4E-3W-6A-9Y-J0-KG', '2023-03-05 09:00:00', 3, 11),
    (198, '2M-SR-7C-KJ-4V-8H', '2023-03-05 09:00:00', 3, 12),
    (199, '9J-1G-5K-W7-8R-2S', '2023-03-05 09:00:00', 3, 1),
    (200, '6E-4Y-0U-K3-9H-N7', '2023-03-05 09:00:00', 3, 2),
    (201, '8U-Q4-9N-2M-5L-7R', '2023-03-05 09:00:00', 3, 3),
    (202, '3C-1W-2X-4J-9A-GP', '2023-03-05 09:00:00', 3, 4),
    (203, '7T-K9-8S-4V-N0-3E', '2023-03-05 09:00:00', 3, 5),
    (204, '1Y-2E-WH-3F-9M-6R', '2023-03-05 09:00:00', 3, 6),
    (205, '6J-8C-X0-S5-HN-4A', '2023-03-05 09:00:00', 3, 7),
    (206, '4G-7T-9N-2U-1W-3P', '2023-03-05 09:00:00', 3, 8),
    (207, '5H-A8-6K-WM-1N-4R', '2023-03-05 09:00:00', 3, 9),
    (208, '9A-Q0-K5-8U-F2-3X', '2023-03-05 09:00:00', 3, 10),
    (209, '3E-7L-JP-4Y-1W-9S', '2023-03-05 09:00:00', 3, 11),
    (210, '2N-5V-8F-KA-3J-7R', '2023-03-05 09:00:00', 3, 12),
    (211, '6C-RM-1P-8S-3T-5H', '2023-03-05 09:00:00', 3, 1),
    (212, '9Y-2U-G3-K5-7R-H4', '2023-03-05 09:00:00', 3, 2),
    (213, '4A-8X-9N-6H-2T-3J', '2023-03-05 09:00:00', 3, 3),
    (214, '7K-3C-W9-4L-6V-8F', '2023-03-05 09:00:00', 3, 4),
    (215, '1W-5E-9M-HS-3V-8P', '2023-03-05 09:00:00', 3, 5),
    (216, '8T-4U-G3-9J-2C-Y1', '2023-03-05 09:00:00', 3, 6),
    (217, '6W-0S-1Y-8X-3J-A4', '2023-03-05 09:00:00', 3, 7),
    (218, '9U-3N-K5-1C-7A-Q2', '2023-03-05 09:00:00', 3, 8),
    (219, '2F-8R-9K-6E-3M-XL', '2023-03-05 09:00:00', 3, 9),
    (220, '7G-4A-K5-8N-W2-3V', '2023-03-05 09:00:00', 3, 10),
    (221, '9M-6X-H3-7F-2K-WL', '2023-03-05 09:00:00', 3, 11),
    (222, '3H-4S-9U-J5-6T-2Y', '2023-03-05 09:00:00', 3, 12),
    (223, '8C-1R-N5-YW-9M-3P', '2023-03-05 09:00:00', 3, 1),
    (224, '2E-6U-7V-HS-NY-8G', '2023-03-05 09:00:00', 3, 2),
    (225, '5A-3L-9M-2S-H4-6R', '2023-03-05 09:00:00', 3, 3),
    (226, '8K-1Y-4F-7J-H2-9U', '2023-03-05 09:00:00', 3, 4),
    (227, '3W-2C-X9-6N-8H-5T', '2023-03-05 09:00:00', 3, 5),
    (228, '9J-HN-R4-1L-YW-8G', '2023-03-05 09:00:00', 3, 6),
    (229, '4V-6E-W0-8P-2N-9S', '2023-03-05 09:00:00', 3, 7),
    (230, '1S-K2-3A-8W-9C-XJ', '2023-03-05 09:00:00', 3, 8),
    (231, '5C-J3-M9-4R-8L-WY', '2023-03-05 09:00:00', 3, 9),
    (232, '8N-9U-G3-6F-K5-WA', '2023-03-05 09:00:00', 3, 10),
    (233, '7X-2Y-A9-MW-6V-1R', '2023-03-05 09:00:00', 3, 11),
    (234, '3T-5P-K2-7C-8E-Q4', '2023-03-05 09:00:00', 3, 12),
    (235, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 4, 3),
    (236, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 4, 14),
    (237, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 4, 23),
    (238, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 4, 10),
    (239, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 4, 7),
    (240, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 4, 2),
    (241, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 4, 18),
    (242, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 4, 5),
    (243, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 4, 8),
    (244, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 4, 13),
    (245, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 4, 21),
    (246, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 4, 17),
    (247, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 4, 24),
    (248, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 4, 16),
    (249, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 4, 6),
    (250, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 4, 18),
    (251, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 4, 11),
    (252, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 4, 3),
    (253, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 4, 14),
    (254, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 4, 23),
    (255, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 4, 10),
    (256, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 4, 7),
    (257, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 4, 2),
    (258, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 4, 22),
    (259, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 4, 20),
    (260, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 4, 15),
    (261, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 4, 9),
    (262, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 4, 4),
    (263, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 4, 19),
    (264, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 4, 1),
    (265, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 4, 12),
    (266, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 4, 3),
    (267, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 4, 14),
    (268, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 4, 23),
    (269, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 4, 10),
    (270, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 4, 7),
    (271, '6A-7H-KA-9K-S9-AL', '2023-03-05 09:00:00', 4, 2),
    (272, '3R-2W-QS-X8-T5-M1', '2023-03-05 09:00:00', 4, 18),
    (273, '1P-9V-4E-ZA-6L-FD', '2023-03-05 09:00:00', 4, 5),
    (274, '7B-6J-L3-2K-AZ-XR', '2023-03-05 09:00:00', 4, 8),
    (275, '8T-Y4-NF-9D-7Q-W2', '2023-03-05 09:00:00', 4, 13),
    (276, 'KC-1G-4Z-XV-3F-9R', '2023-03-05 09:00:00', 4, 21);

  






	insert into 
		tipoRegistro(nome, medida)
	values
		('Percentual de uso', '%'),
        ('Quantidade disponivel', '%'),
        ('Frequencia', 'MHz');
		
	insert into 
		peca(nome, modelo, fkTipoRegistro, fkMaquinario)
	values 
		('CPU','i9 9900f',1,200),
		('CPU', 'i7 13500k',1,200),
		('CPU','i3 10900',1,200),
		('CPU','i7 6900f',1,200),
		('CPU','i9 5900f',1,200),
		('CPU','i5 11900f',1,200),
		('CPU','i3 5900f',1,200),
		('RAM','8gb fury Kingston',1,200),
		('RAM','12gb ram crucial',1,200),
		('RAM','16gb Corsair',1,200),
		('Disco','1tb hd seagate',1,200),
		('Disco','500gb ssd samsung',1,200),
		('Disco','450gb hd Adata',1,200);

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

	CALL inserir_registros();

	INSERT INTO chamado (nivel, estado, sla, dataHora, descricao, fkRegistro) 
	VALUES 
	('Alto', 'Aberto', '2 horas', '2023-01-15 12:00:00', 'O disco está cheio', 11),
	('Médio', 'Aberto', '6 horas', '2023-02-20 14:30:00', 'O disco está cheio', 22),
	('Baixo', 'Aberto', '10 horas', '2023-03-10 09:15:00', 'CPU esta passando dos limites', 33),
	('Alto', 'Aberto', '2 horas', '2023-04-05 16:45:00', 'CPU esta passando dos limites', 44),
	('Médio', 'Aberto', '6 horas', '2023-05-30 08:00:00', 'CPU esta passando dos limites', 55),
	('Baixo', 'Aberto', '10 horas', '2023-06-10 14:00:00', 'CPU esta passando dos limites', 11),
	('Alto', 'Aberto', '2 horas', '2023-07-15 09:30:00', 'CPU esta passando dos limites', 22),
	('Médio', 'Aberto', '6 horas', '2023-08-22 17:15:00', 'CPU esta passando dos limites', 33),
	('Baixo', 'Aberto', '10 horas', '2023-09-05 13:45:00', 'RAM esta passando dos limites', 44),
	('Alto', 'Aberto', '2 horas', '2023-10-18 11:30:00', 'RAM esta passando dos limites', 55),
	('Médio', 'Aberto', '6 horas', '2023-11-25 10:20:00', 'RAM esta passando dos limites', 11),
	('Baixo', 'Aberto', '10 horas', '2023-12-29 15:00:00', 'RAM esta passando dos limites', 22),
	('Alto', 'Aberto', '2 horas', '2024-01-07 12:45:00', 'RAM esta passando dos limites', 33),
	('Médio', 'Aberto', '6 horas', '2024-02-09 09:10:00', 'RAM esta passando dos limites', 44),
	('Baixo', 'Aberto', '10 horas', '2024-03-14 14:30:00', 'RAM esta passando dos limites', 55),
	('Alto', 'Aberto', '2 horas', '2024-04-22 10:00:00', 'RAM esta passando dos limites', 11),
	('Médio', 'Aberto', '6 horas', '2024-05-28 15:20:00', 'RAM esta passando dos limites', 22),
	('Baixo', 'Aberto', '10 horas', '2024-06-05 09:45:00', 'RAM esta passando dos limites', 33),
	('Alto', 'Aberto', '2 horas', '2024-07-11 16:30:00', 'RAM esta passando dos limites', 44),
	('Médio', 'Aberto', '6 horas', '2024-08-20 12:10:00', 'RAM esta passando dos limites', 55),
	('Baixo', 'Aberto', '10 horas', '2024-09-27 14:15:00', 'RAM esta passando dos limites', 11),
	('Alto', 'Aberto', '2 horas', '2024-10-30 11:30:00', 'RAM esta passando dos limites', 22),
	('Médio', 'Aberto', '6 horas', '2024-11-05 10:25:00', 'RAM esta passando dos limites', 33),
	('Baixo', 'Aberto', '10 horas', '2024-12-15 15:40:00', 'RAM esta passando dos limites', 44),
	('Alto', 'Aberto', '2 horas', '2025-01-18 13:00:00', 'RAM esta passando dos limites', 55),
	('Médio', 'Aberto', '6 horas', '2025-02-20 08:45:00', 'RAM esta passando dos limites', 11),
	('Baixo', 'Aberto', '10 horas', '2025-03-25 14:15:00', 'RAM esta passando dos limites', 22),
	('Alto', 'Aberto', '2 horas', '2025-04-02 10:30:00', 'RAM esta passando dos limites', 33),
	('Médio', 'Aberto', '6 horas', '2025-05-12 15:10:00', 'RAM esta passando dos limites', 44),
	('Baixo', 'Aberto', '10 horas', '2025-06-15 11:30:00', 'RAM esta passando dos limites', 55),
	('Alto', 'Aberto', '2 horas', '2025-07-19 09:45:00', 'O disco está cheio', 11),
	('Médio', 'Aberto', '6 horas', '2025-08-28 14:30:00', 'O disco está cheio', 22),
	('Baixo', 'Aberto', '10 horas', '2025-09-02 10:15:00', 'O disco está cheio', 33),
	('Alto', 'Aberto', '2 horas', '2025-10-10 15:20:00', 'O disco está cheio', 44),
	('Médio', 'Aberto', '6 horas', '2025-11-12 11:10:00', 'O disco está cheio', 55),
	('Baixo', 'Aberto', '10 horas', '2025-12-25 12:00:00', 'O disco está cheio', 11),
	('Alto', 'Aberto', '2 horas', '2026-01-04 13:30:00', 'O disco está cheio', 22),
	('Médio', 'Aberto', '6 horas', '2026-02-06 14:15:00', 'O disco está cheio', 33),
	('Baixo', 'Aberto', '10 horas', '2026-03-08 16:45:00', 'O disco está cheio', 44),
	('Alto', 'Aberto', '2 horas', '2026-04-10 10:30:00', 'O disco está cheio', 55),
	('Médio', 'Aberto', '6 horas', '2026-05-12 09:20:00', 'O disco está cheio', 11),
	('Baixo', 'Aberto', '10 horas', '2026-06-18 14:00:00', 'O disco está cheio', 22),
	('Alto', 'Aberto', '2 horas', '2026-07-20 15:45:00', 'O disco está cheio', 33),
	('Médio', 'Aberto', '6 horas', '2026-08-22 11:30:00', 'O disco está cheio', 44),
	('Baixo', 'Aberto', '10 horas', '2026-09-25 10:15:00', 'O disco está cheio', 55);


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
		dataHora,
		'' descricao,
		r.idRegistro
	from registro AS r where r.valor > 85;


	CALL fechar_chamados();	
	-- gatilhos

	-- view VINICIUS
	CREATE OR REPLACE VIEW vw_vinicius
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
			m.idModelo,
			tr.nome,
			tr.medida,
			p.idPeca AS idPeca,
			t.nome as nomeTipo,
			p.nome as nomePeca
		FROM chamado AS c
		JOIN registro AS r
		JOIN maquinario AS maq
		JOIN modelo AS m
		JOIN empresa AS e
		JOIN tipoRegistro AS tr
		JOIN tipo AS t
		JOIN peca AS p
		WHERE fkMaquina = idMaquinario 
		AND m.fkTipo = t.idTipo
		AND fkRegistro = idRegistro
		AND maq.fkModelo = m.idModelo
		AND maq.fkHospital = e.idEmpresa;

	

	call fechar_chamados();

