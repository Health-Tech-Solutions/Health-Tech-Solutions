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
	modelo varchar(45),
	fkTipoRegistro INT,
	Foreign Key (fkTipoRegistro) REFERENCES tipoRegistro(idTipoRegistro)
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

DELIMITER $$

call fechar_chamados();
