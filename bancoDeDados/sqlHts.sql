-- Active: 1696856128647@@localhost@3306@stage
-- drop database if exists hts;
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
    logradouro VARCHAR(45),
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    complemento varchar(40)
);
insert into endereco values	(NULL, '04571011', 1747,'Avenida Luis Carlos Berrini',	'Itaim Bibi', 'São Paulo',''),
							(NULL, '01310000',200,'Avenida Paulista', 'Bela Vista','São Paulo',''),
							(NULL,'01431000', 953,'Avenida Brasil', 'Jardim América','São Paulo',''),
                            (NULL,'09910720', 605, 'Rua Manoel da Nóbrega', 'Centro','Diadema', '');

select * from endereco;
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

create table empresa(
	idEmpresa int primary key auto_increment,
    nomeFantasia varchar(45),
    cnpj char(14),
    telefone char(13),
    fkEndereco int,
    foreign key (fkEndereco) references endereco(idEndereco)
);
-- Av. Brasil, 1085 - Jardim America, São Paulo - SP, 01431-000
insert into
	empresa
    (idEmpresa, nomeFantasia, cnpj,fkEndereco)
values
	(NULL, 'MinDray','5511984563218', 1),
    (NULL, 'Hospital Santa Catarina', '60922168000186',2),
    (NULL, 'Hospital Albert Einsten', '60765823000130',3),
    (NULL, 'Hospital Santa Helena', '34128330000189',4);

select * from empresa;
    use hts;

create table funcionario(
	idFuncionario int primary key auto_increment,
    nome varchar(45),
    email varchar(60),
    senha varchar(45),
    funcao varchar(45),
    tipo CHAR(1),
    CPF CHAR(11),
    fkIndustria int,
    foto VARCHAR(300),
    foreign key (fkIndustria) references empresa(idEmpresa),
    fkRepresentante int,
    foreign key (fkRepresentante) references funcionario(idFuncionario)
);


insert into
	funcionario(nome, email, senha,funcao, fkIndustria)
values		
	("Isabela Mariana Olivia da Rosa","isabelamarianadarosa@imeio.com","8sPiKN8z48","admin", 1),
	("Antonio Breno Augusto Moura","antonio_breno_moura@br.festo.com","LMgH7kFB6I","funcionario", 1),
	("Miguel Cauê Pereira","miguel-pereira93@superigi.com.br","P2JIrkFdnF","funcionario", 1),     
	("Helena Sarah Porto","helena_porto@kimmay.com.br","le7y7mi7oh","admin", 1),
	("Bryan Luan Gomes","bryan-gomes83@uolinc.com","gLD7XFQj5y","funcionario", 1),
	("Anderson Manuel Galvão","anderson.manuel.galvao@systemsadvisers.com","Y48nEZ5qey","funcionario", 1),
	("Stefany Bárbara Alessandra Melo","stefany_melo@icloub.com","MSRwLa8e9K","admin", 1),  
	("Diogo Enrico Nelson Gonçalves","diogo_goncalves@edbrasil.net","M1SM0aBq3r","funcionario", 1),
	("Lívia Letícia Carolina Dias","livia.leticia.dias@ritmolog.com.br","diH6Brmkli","funcionario", 1),
	("Aline Esther Bruna Cardoso","aline_cardoso@graffiti.net","ejYPZK6680","admin", 1),    
	("Elza Allana Rita Moraes","elzaallanamoraes@verdana.com.br","DUrP3YwNX3","funcionario", 1),  
	("Gael Murilo dos Santos","gael_murilo_dossantos@rebecacometerra.com.br","fSik4S6Hnk","funcionario", 1),
	("Isabelly Sara Luciana da Rocha","isabelly_darocha@directnet.com","yjkapiMCxz","admin", 1),
	("Rosa Emilly Valentina Viana","rosa_viana@pierproj.com.br","xYFG7H7ikq","funcionario", 1),   
	("Clarice Louise Laura Araújo","clarice_araujo@yahoo.com.ar","RNoeEDd7yb","funcionario", 1),
    ("Henrique Bechis Santana Coelho", "henrique@gmail.com",'123456', 'admin', 1),
    ('Gabriel Michelon', 'gabriel@gmail.com', '123456', 'admin', 1),
    ('Vinicius Bazan Cirello', 'vinicius@gmail.com', '123456', 'admin', 1),
    ('Gilberto Campos', 'gilberto@gmail.com', '123456', 'admin', 1),
    ('Sofhia Utaka', 'sofhia@gmail.com', '123456', 'admin', 1);

UPDATE funcionario SET tipo = 0 WHERE funcao = 'admin';
UPDATE funcionario SET tipo = 1 WHERE funcao <> 'admin';

create table tipo(
	idTipo int primary key auto_increment,
    nome varchar(45)
);

insert into
	tipo(nome)
values
	("Ultrassom"),
    ("Cardioversores"),
    ("Desfibriladores"),
    ("Monitor Cardíaco"),
    ("Máquina de Anestesia"),
    ("Máquina de ECG"),
    ("Monitor Fetal"),
    ("Monitor de sinais vitais");

create table modelo(
	idModelo int primary key auto_increment,
    modelo varchar(45),
    descricao varchar(255),
    fkTipo int,
	foreign key (fkTipo) references tipo(idTipo)
);
	
insert into
	modelo(modelo, descricao, fkTipo)
values
	("U1000", "", 1),
	("U2000", "", 1),
	("U2100", "", 1),
	("C100", "", 2),
	("C200", "", 2),
	("C300", "", 2),
	("DD01", "", 3),
	("DD05", "", 3),
	("DD15", "", 3),
	("Cardiaco-100", "", 4),
	("Cardiaco-150", "", 4),
	("Cardiaco-200", "", 4),
	("ANES-d100", "", 5),
	("ANES-d200", "", 5),
	("ANES-d170", "", 5),
	("MaqE", "", 6),
	("MaqE", "", 6),
	("MaqE", "", 6),
	("Fetal-Mon", "", 7),
	("Fetal-Son", "", 7),
	("Fetal-Dad", "", 7),
	("Vital1", "", 8),
	("Vital2", "", 8),
	("Vital3", "", 8);
    
    
create table maquinario(
	idMaquinario int,
    fkIndustria int,
    foreign key (fkIndustria) references empresa(idEmpresa),
    fkHospital int,
    foreign key (fkHospital) references empresa(idEmpresa),
	fkModelo int,
    foreign key (fkModelo) references modelo(idModelo),
    primary key(idMaquinario, fkModelo)
);

insert into
	maquinario(idMaquinario, fkIndustria, fkHospital, fkModelo)
values
	(68,1,1,1),
	(64,1,1,1),
	(37,1,1,1),
	(89,1,1,1),
	(33,1,1,1),
	(82,1,1,2),
	(68,1,1,2),
	(71,1,1,2),
	(38,1,1,2),
	(13,1,1,2),
	(93,1,1,3),
	(6,1,1,3),
	(98,1,1,3),
	(22,1,1,3),
	(7,1,1,4),
	(93,1,1,4),
	(63,1,1,4),
	(19,1,1,4),
	(9,1,1,5),
	(12,1,1,6),
	(21,1,1,7),
	(61,1,1,7),
	(25,1,1,8),
	(88,1,1,8),
	(63,1,1,8),
	(93,1,1,9),
	(77,1,1,10),
	(12,1,1,11),
	(71,1,1,12),
	(39,1,1,12),
	(38,1,1,13),
	(71,1,1,13),
	(2,1,1,13),
	(50,1,1,14),
	(41,1,1,14),
	(88,1,1,14),
	(41,1,1,15),
	(22,1,1,15),
	(64,1,1,15),
	(61,1,1,15),
	(3,1,1,15),
	(17,1,1,16),
	(35,1,1,16),
	(21,1,1,16),
	(85,1,1,17),
	(38,1,1,18),
	(39,1,1,18),
	(98,1,1,18),
	(60,1,1,19),
	(43,1,1,19),
	(74,1,1,19),
	(13,1,1,20),
	(37,1,1,20),
	(7,1,1,20),
	(30,1,1,21),
	(93,1,1,22),
	(89,1,1,23),
	(18,1,1,23),
	(18,1,1,24),
	(57,1,1,24);
insert into
	maquinario(idMaquinario, fkIndustria, fkHospital, fkModelo)
VALUES
	(11,1,3,1),
	(22,1,2,1),
	(333,1,1,1),
	(44,1,4,1),
	(55,1,4,1);
    
create table tipoRegistro(
	idTipoRegistro int primary key auto_increment,
    nome varchar(45),
    medida varchar(45)
);

insert into 
	tipoRegistro(nome, medida)
values
	('Uso de CPU', '%'),
	('Uso de RAM', '%'),
	('Uso de disco', '%');

create table registro(
	idRegistro int primary key auto_increment,
    dataHora datetime,
    valor decimal(7,2),
    fkMaquina int,
    foreign key (fkMaquina) references maquinario(idMaquinario),
    fkModelo int,
    foreign key (fkModelo) references maquinario(fkModelo),
    fkTipoRegistro int,
    foreign key (fkTipoRegistro) references tipoRegistro(idTipoRegistro) 
);

insert into 
	registro(dataHora, valor, fkMaquina, fkModelo, fkTipoRegistro)
values
	(now(),89, 2 , 13,2),
	(now(),82, 2 , 13,1),
	(now(),45, 2 , 13,2),
	(now(),91, 2 , 13,1),
	(now(),33, 2 , 13,2),
	(now(),2, 3 , 15,2),
	(now(),94, 3 , 15,1),
	(now(),27, 3 , 15,2),
	(now(),3, 3 , 15,1),
	(now(),93, 3 , 15,2),
	(now(),44, 6 , 3,2),
	(now(),69, 6 , 3,1),
	(now(),47, 6 , 3,2),
	(now(),23, 6 , 3,1),
	(now(),44, 6 , 3,2);

create table chamado(
	idChamado int primary key auto_increment,
    nivel varchar(45),
    estado varchar(45),
    sla varchar(45),
    dataHora DATETIME,
    descricao varchar(45),
	fkRegistro int,
    foreign key(fkRegistro) references registro(idRegistro)
);

INSERT INTO chamado (nivel, estado, sla, dataHora, descricao, fkRegistro) 
VALUES ('valor_nivel', 'Aberto', 'valor_sla', NOW(), 'Foi',
  (SELECT idRegistro 
   FROM registro 
   WHERE TIME_FORMAT(registro.dataHora, '%H:%i') = TIME_FORMAT(NOW(), '%H:%i')
   LIMIT 1)
);
select * from registro;
INSERT INTO chamado (nivel, estado, sla, dataHora, descricao, fkRegistro) 
VALUES 
  ('Alto', 'Aberto', '2 horas', '2023-01-15 12:00:00', 'Foi', 11),
  ('Médio', 'Aberto', '6 horas', '2023-02-20 14:30:00', 'Foi', 22),
  ('Baixo', 'Aberto', '10 horas', '2023-03-10 09:15:00', 'Foi', 33),
  ('Alto', 'Aberto', '2 horas', '2023-04-05 16:45:00', 'Foi', 44),
  ('Médio', 'Aberto', '6 horas', '2023-05-30 08:00:00', 'Foi', 55),
  ('Baixo', 'Aberto', '10 horas', '2023-06-10 14:00:00', 'Foi', 11),
  ('Alto', 'Aberto', '2 horas', '2023-07-15 09:30:00', 'Foi', 22),
  ('Médio', 'Aberto', '6 horas', '2023-08-22 17:15:00', 'Foi', 33),
  ('Baixo', 'Aberto', '10 horas', '2023-09-05 13:45:00', 'Foi', 44),
  ('Alto', 'Aberto', '2 horas', '2023-10-18 11:30:00', 'Foi', 55),
  ('Médio', 'Aberto', '6 horas', '2023-11-25 10:20:00', 'Foi', 11),
  ('Baixo', 'Aberto', '10 horas', '2023-12-29 15:00:00', 'Foi', 22),
  ('Alto', 'Aberto', '2 horas', '2024-01-07 12:45:00', 'Foi', 33),
  ('Médio', 'Aberto', '6 horas', '2024-02-09 09:10:00', 'Foi', 44),
  ('Baixo', 'Aberto', '10 horas', '2024-03-14 14:30:00', 'Foi', 55),
  ('Alto', 'Aberto', '2 horas', '2024-04-22 10:00:00', 'Foi', 11),
  ('Médio', 'Aberto', '6 horas', '2024-05-28 15:20:00', 'Foi', 22),
  ('Baixo', 'Aberto', '10 horas', '2024-06-05 09:45:00', 'Foi', 33),
  ('Alto', 'Aberto', '2 horas', '2024-07-11 16:30:00', 'Foi', 44),
  ('Médio', 'Aberto', '6 horas', '2024-08-20 12:10:00', 'Foi', 55),
  ('Baixo', 'Aberto', '10 horas', '2024-09-27 14:15:00', 'Foi', 11),
  ('Alto', 'Aberto', '2 horas', '2024-10-30 11:30:00', 'Foi', 22),
  ('Médio', 'Aberto', '6 horas', '2024-11-05 10:25:00', 'Foi', 33),
  ('Baixo', 'Aberto', '10 horas', '2024-12-15 15:40:00', 'Foi', 44),
  ('Alto', 'Aberto', '2 horas', '2025-01-18 13:00:00', 'Foi', 55),
  ('Médio', 'Aberto', '6 horas', '2025-02-20 08:45:00', 'Foi', 11),
  ('Baixo', 'Aberto', '10 horas', '2025-03-25 14:15:00', 'Foi', 22),
  ('Alto', 'Aberto', '2 horas', '2025-04-02 10:30:00', 'Foi', 33),
  ('Médio', 'Aberto', '6 horas', '2025-05-12 15:10:00', 'Foi', 44),
  ('Baixo', 'Aberto', '10 horas', '2025-06-15 11:30:00', 'Foi', 55),
  ('Alto', 'Aberto', '2 horas', '2025-07-19 09:45:00', 'Foi', 11),
  ('Médio', 'Aberto', '6 horas', '2025-08-28 14:30:00', 'Foi', 22),
  ('Baixo', 'Aberto', '10 horas', '2025-09-02 10:15:00', 'Foi', 33),
  ('Alto', 'Aberto', '2 horas', '2025-10-10 15:20:00', 'Foi', 44),
  ('Médio', 'Aberto', '6 horas', '2025-11-12 11:10:00', 'Foi', 55),
  ('Baixo', 'Aberto', '10 horas', '2025-12-25 12:00:00', 'Foi', 11),
  ('Alto', 'Aberto', '2 horas', '2026-01-04 13:30:00', 'Foi', 22),
  ('Médio', 'Aberto', '6 horas', '2026-02-06 14:15:00', 'Foi', 33),
  ('Baixo', 'Aberto', '10 horas', '2026-03-08 16:45:00', 'Foi', 44),
  ('Alto', 'Aberto', '2 horas', '2026-04-10 10:30:00', 'Foi', 55),
  ('Médio', 'Aberto', '6 horas', '2026-05-12 09:20:00', 'Foi', 11),
  ('Baixo', 'Aberto', '10 horas', '2026-06-18 14:00:00', 'Foi', 22),
  ('Alto', 'Aberto', '2 horas', '2026-07-20 15:45:00', 'Foi', 33),
  ('Médio', 'Aberto', '6 horas', '2026-08-22 11:30:00', 'Foi', 44),
  ('Baixo', 'Aberto', '10 horas', '2026-09-25 10:15:00', 'Foi', 55);
  
  
  
  
  


insert into
	chamado (nivel, estado, sla,dataHora, descricao, fkRegistro)
select 
	case when r.valor > 95
		then "Alto"
		else case when r.valor > 90
			then "Médio"
			else "Baixo"
		end
	end nivel,
	"Aberto" estado,
	case when r.valor > 95
		then "2 horas"
		else case when r.valor > 90
			then "6 horas"
			else "10 horas"
		end
	end sla,
    '2023-05-14 20:36:16' dataHora,
	"" descricao,
	r.idRegistro
from registro r where r.valor > 85;
SELECT * FROM registro;
SELECT * FROM chamado;
create table peca(
	idPeca int primary key auto_increment,
    nome varchar(45)
);

insert into 
	peca(nome)
values 
	("i9 9900f"),
    ("i7 13500k"),
    ("i3 10900"),
    ("i7 6900f"),
    ("i9 5900f"),
    ("i5 11900f"),
    ("i3 5900f"),
    ("8gb fury Kingston"),
    ("12gb ram crucial"),
    ("16gb Corsair"),
    ("1tb hd seagate"),
    ("500gb ssd samsung"),
    ("450gb hd Adata");

create table limite(
	idLimite int primary key auto_increment,
    fkPeca int,
    foreign key (fkPeca) references peca(idPeca),
    fkModelo int,
    foreign key (fkModelo) references modelo(idModelo),
    fkTipoRegistro int,
    foreign key (fkTipoRegistro) references tipoRegistro(idTipoRegistro),
    valor decimal(5,2)
);

insert into 
	limite(fkPeca, fkModelo, fkTipoRegistro, valor)
values
	(1,15,1, 85),
	(1,15,2, 85),
	(8,15,1, 85),
	(13,15,1, 85),
	(2,12,1, 85),
	(10,12,1, 85),
	(11,12,1, 85),
	(3,15,1, 85),
	(9,15,1, 85),
	(12,15,1, 85);

CREATE OR REPLACE VIEW vw_maquina
AS 
	select 
		r.dataHora,
        MAX(CASE WHEN fkTipoRegistro = 1 THEN r.valor END) AS CPU,
        MAX(CASE WHEN fkTipoRegistro = 2 THEN r.valor END) AS RAM,
        MAX(CASE WHEN fkTipoRegistro = 3 THEN r.valor END) AS DISCO
    from registro AS r GROUP BY r.dataHora;
    
    
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
    CASE WHEN tr.nome = 'Uso de CPU' THEN 'CPU'
		 WHEN tr.nome = 'Uso de RAM' THEN 'RAM'
		 WHEN tr.nome = 'Uso de Disco' THEN 'Disco'
         ELSE tr.nome
    END AS tipoRegistro,
    m.modelo
	FROM chamado AS c
    JOIN registro AS r
    JOIN maquinario AS maq
    JOIN modelo AS m
    JOIN empresa AS e
    JOIN tipoRegistro AS tr
    WHERE fkMaquina = idMaquinario 
    AND r.fkTipoRegistro = tr.idTipoRegistro
    AND fkRegistro = idRegistro
    AND maq.fkModelo = m.idModelo
    AND maq.fkHospital = e.idEmpresa;

SELECT COUNT(idChamado) AS chamados,
	   tipoRegistro,
       hospital FROM vw_chamados
       WHERE idHospital = 1
       GROUP BY hospital, tipoRegistro;


SELECT tipoRegistro,
	   COUNT(idChamado) AS numeroDeChamados
       FROM vw_chamados
       GROUP BY tipoRegistro
       ORDER BY numeroDeChamados
       DESC LIMIT 1;

SELECT
            CASE
                WHEN tr.nome = 'Uso de CPU' THEN 'CPU'
                WHEN tr.nome = 'Uso de RAM' THEN 'RAM'
                WHEN tr.nome = 'Uso de disco' THEN 'Disco'
                ELSE tr.nome
            END AS TipoRegistro,
            COUNT(c.idChamado) AS NumeroDeChamados
        FROM tipoRegistro AS tr
        LEFT JOIN registro AS r ON tr.idTipoRegistro = r.fkTipoRegistro
        LEFT JOIN chamado AS c ON r.idRegistro = c.fkRegistro
        GROUP BY TipoRegistro
        ORDER BY NumeroDeChamados DESC
        LIMIT 1;

SELECT 
	CASE WHEN tipoRegistro = 'Uso de CPU' THEN 'CPU'
		 WHEN tipoRegistro = 'Uso de RAM' THEN 'RAM'
		 WHEN tipoRegistro = 'Uso de Disco' THEN 'Disco'
         ELSE tipoRegistro
    END AS 'tipoRegistro'

    FROM vw_chamados
     ;

SELECT hospital,
            COUNT(*) AS 'chamados'
        FROM vw_chamados
        GROUP BY hospital;
        select * from chamado;
        UPDATE chamado
SET estado = "Fechado"
WHERE dataHora >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);