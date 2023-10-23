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
    cidade VARCHAR(45)
);
insert into endereco values	(NULL, '04571011', 1747,'Avenida Luis Carlos Berrini',	'Itaim Bibi', 'São Paulo',''),
							(NULL, '01310000',200,'Avenida Paulista', 'Bela Vista','São Paulo',''),
							(NULL,'01431000', 953,'Avenida Brasil', 'Jardim América','São Paulo',''),
                            (NULL,'09910720', 605, 'Rua Manoel da Nóbrega', 'Centro','Diadema', '');

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
	filial INT,
	Foreign Key (filial) REFERENCES empresa(idEmpresa),
    foreign key (fkEndereco) references endereco(idEndereco)
);
-- Av. Brasil, 1085 - Jardim America, São Paulo - SP, 01431-000
insert into
	empresa
    (idEmpresa, nomeFantasia, cnpj,fkEndereco)
values
    (NULL, 'Hospital Santa Catarina', '60922168000186',2),
   	(NULL, 'Hospital Albert Einsten', '60765823000130',3),
    (NULL, 'Hospital Santa Helena', '34128330000189',4);

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

create table tipo(
	idTipo int primary key auto_increment,
    nome varchar(45)
);

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
    
    
create table maquinario(
	idMaquinario int,
    fkHospital int,
    foreign key (fkHospital) references empresa(idEmpresa),
	fkModelo int,
    foreign key (fkModelo) references modelo(idModelo),
    primary key(idMaquinario, fkModelo)
);
     
INSERT INTO maquinario(idMaquinario, fkHospital, fkModelo)
VALUES
    (1, 3, 1),
    (2, 3, 2),
    (3, 3, 3),
    (4, 3, 4),
    (5, 3, 5),
    (6, 3, 6),
    (7, 3, 7),
    (8, 3, 8),
    (9, 3, 9),
    (10, 3, 10),
    (11, 3, 11),
    (12, 3, 12),
    (13, 3, 1),
    (14, 3, 2),
    (15, 3, 3),
    (16, 3, 4),
    (17, 3, 5),
    (18, 3, 6),
    (19, 3, 7),
    (20, 3, 8),
    (21, 3, 9),
    (22, 3, 10),
    (23, 3, 11),
    (24, 3, 12),
    (25, 3, 1),
    (26, 3, 2),
    (27, 3, 3),
    (28, 3, 4),
    (29, 3, 5),
    (30, 3, 6),
    (31, 3, 7),
    (32, 3, 8),
    (33, 3, 9),
    (34, 3, 10),
    (35, 3, 11),
    (36, 3, 12),
    (37, 3, 1),
    (38, 3, 2),
    (39, 3, 3),
    (40, 3, 4),
    (41, 3, 5),
    (42, 3, 6),
    (43, 3, 7),
    (44, 3, 8),
    (45, 3, 9),
    (46, 3, 10),
    (47, 3, 11),
    (48, 3, 12),
    (49, 3, 1),
    (50, 3, 2),
    (51, 3, 3),
    (52, 3, 4),
    (53, 3, 5),
    (54, 3, 6),
    (55, 3, 7),
    (56, 3, 8),
    (57, 3, 9),
    (58, 3, 10),
    (59, 3, 11),
    (60, 3, 12),
    (61, 2, 6),
    (62, 2, 18),
    (63, 2, 11),
    (64, 2, 3),
    (65, 2, 14),
    (66, 2, 23),
    (67, 2, 10),
    (68, 2, 7),
    (69, 2, 2),
    (70, 2, 22),
    (71, 2, 4),
    (72, 2, 9),
    (73, 2, 15),
    (74, 2, 12),
    (75, 2, 1),
    (76, 2, 20),
    (77, 2, 19),
    (78, 2, 5),
    (79, 2, 8),
    (80, 2, 13),
    (81, 2, 21),
    (82, 2, 17),
    (83, 2, 24),
    (84, 2, 16),
    (85, 2, 6),
    (86, 2, 18),
    (87, 2, 11),
    (88, 2, 3),
    (89, 2, 14),
    (90, 2, 23),
    (91, 2, 10),
    (92, 2, 7),
    (93, 2, 2),
    (94, 2, 22),
    (95, 2, 4),
    (96, 2, 9),
    (97, 2, 15),
    (98, 2, 12),
    (99, 2, 1),
    (100, 2, 20),
    (101, 2, 19),
    (102, 2, 5),
    (103, 2, 8),
    (104, 2, 13),
    (105, 2, 21),
    (106, 2, 17),
    (107, 2, 24),
    (108, 2, 16),
    (109, 2, 6),
    (110, 2, 18),
    (111, 2, 11),
    (112, 2, 3),
    (113, 2, 14),
    (114, 2, 23),
    (115, 2, 10),
    (116, 2, 7),
    (117, 2, 2),
    (118, 2, 22),
    (119, 2, 4),
    (120, 2, 9),
    (121, 2, 15),
    (122, 2, 12),
    (123, 2, 1),
    (124, 2, 20),
    (125, 2, 19),
    (126, 2, 5),
    (127, 2, 8),
    (128, 2, 13),
    (129, 2, 21),
    (130, 2, 17),
    (131, 2, 24),
    (132, 2, 16),
    (133, 2, 6),
    (134, 2, 18),
    (135, 2, 11),
    (136, 2, 3),
    (137, 2, 14),
    (138, 2, 23),
    (139, 2, 10),
    (140, 2, 7),
    (141, 2, 2),
    (142, 2, 22),
    (143, 2, 4),
    (144, 2, 9),
    (145, 2, 15),
    (146, 2, 12),
    (147, 2, 1),
    (148, 2, 20),
    (149, 2, 19),
    (150, 2, 5),
    (151, 2, 8),
    (152, 2, 13),
    (153, 2, 21),
    (154, 2, 17),
    (155, 2, 24),
    (156, 2, 16),
    (157, 2, 6),
    (158, 2, 18),
    (159, 2, 11),
    (160, 2, 3),
    (161, 2, 14),
    (162, 2, 23),
    (163, 2, 10),
    (164, 2, 7),
    (165, 2, 2),
    (166, 2, 22),
    (167, 2, 4),
    (168, 2, 9),
    (169, 1, 12),
    (170, 1, 1),
    (171, 1, 2),
    (172, 1, 11),
    (173, 1, 3),
    (174, 1, 5),
    (175, 1, 4),
    (176, 1, 6),
    (177, 1, 24),
    (178, 1, 13),
    (179, 1, 15),
    (180, 1, 14),
    (181, 1, 22),
    (182, 1, 10),
    (183, 1, 23),
    (184, 1, 21),
    (185, 1, 12),
    (186, 1, 6),
    (187, 1, 4),
    (188, 1, 1),
    (189, 1, 3),
    (190, 1, 2),
    (191, 1, 5),
    (192, 1, 10),
    (193, 1, 11),
    (194, 1, 13),
    (195, 1, 15),
    (196, 1, 14),
    (197, 1, 22),
    (198, 1, 23),
    (199, 1, 24),
    (200, 1, 21),
    (201, 1, 18),
    (202, 1, 17),
    (203, 1, 19),
    (204, 1, 8),
    (205, 1, 9),
    (206, 1, 16),
    (207, 1, 7),
    (208, 1, 12),
    (209, 1, 6),
    (210, 1, 4),
    (211, 1, 1),
    (212, 1, 3),
    (213, 1, 2),
    (214, 1, 5),
    (215, 1, 10),
    (216, 1, 11);

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
    fkTipoRegistro int,
    fkModelo int,
    foreign key (fkMaquina) references maquinario(idMaquinario),
    foreign key (fkModelo) references maquinario(fkModelo),
    foreign key (fkTipoRegistro) references tipoRegistro(idTipoRegistro) 
);

	
insert into 
	registro(dataHora, valor, fkMaquina,  fkTipoRegistro)
values
	(now(),89, 2 ,2),
	(now(),82, 2 ,1),
	(now(),45, 2 ,2),
	(now(),91, 2 ,1),
	(now(),33, 2 ,2),
	(now(),2, 3 ,2),
	(now(),94, 3 ,1),
	(now(),27, 3 ,2),
	(now(),3, 3 ,1),
	(now(),93, 3 ,2),
	(now(),44, 6 ,2),
	(now(),69, 6 ,1),
	(now(),47, 6 ,2),
	(now(),23, 6 ,1),
	(now(),44, 6 ,2),
	(now(),89, 2 ,2),
	(now(),82, 2 ,1),
	(now(),45, 2 ,2),
	(now(),91, 2 ,1),
	(now(),33, 2 ,2),
	(now(),2, 3 ,2),
	(now(),94, 3 ,1),
	(now(),27, 3 ,2),
	(now(),3, 3 ,1),
	(now(),93, 3 ,2),
	(now(),44, 6 ,2),
	(now(),69, 6 ,1),
	(now(),47, 6 ,2),
	(now(),23, 6 ,1),
	(now(),89, 2 ,2),
	(now(),82, 2 ,1),
	(now(),45, 2 ,2),
	(now(),91, 2 ,1),
	(now(),33, 2 ,2),
	(now(),2, 3 ,2),
	(now(),94, 3 ,1),
	(now(),27, 3 ,2),
	(now(),3, 3 ,1),
	(now(),93, 3 ,2),
	(now(),44, 6 ,2),
	(now(),69, 6 ,1),
	(now(),47, 6 ,2),
	(now(),23, 6 ,1),
	(now(),89, 2 ,2),
	(now(),82, 2 ,1),
	(now(),45, 2 ,2),
	(now(),91, 2 ,1),
	(now(),33, 2 ,2),
	(now(),2, 3 ,2),
	(now(),94, 3 ,1),
	(now(),27, 3 ,2),
	(now(),3, 3 ,1),
	(now(),93, 3 ,2),
	(now(),44, 6 ,2),
	(now(),69, 6 ,1),
	(now(),47, 6 ,2),
	(now(),23, 6 ,1),
	(now(),89, 2 ,2),
	(now(),82, 2 ,1),
	(now(),45, 2 ,2),
	(now(),91, 2 ,1),
	(now(),33, 2 ,2),
	(now(),2, 3 ,2),
	(now(),94, 3 ,1),
	(now(),27, 3 ,2),
	(now(),3, 3 ,1),
	(now(),93, 3 ,2),
	(now(),44, 6 ,2),
	(now(),69, 6 ,1),
	(now(),47, 6 ,2),
	(now(),23, 6 ,1);

	
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
  


create table peca(
	idPeca int primary key auto_increment,
    nome varchar(45)
);

insert into 
	peca(nome)
values 
	('i9 9900f'),
    ('i7 13500k'),
    ('i3 10900'),
    ('i7 6900f'),
    ('i9 5900f'),
    ('i5 11900f'),
    ('i3 5900f'),
    ('8gb fury Kingston'),
    ('12gb ram crucial'),
    ('16gb Corsair'),
    ('1tb hd seagate'),
    ('500gb ssd samsung'),
    ('450gb hd Adata');

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
    t.nome AS tipo,
    t.idTipo,	
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
    JOIN tipo AS t
    WHERE fkMaquina = idMaquinario 
    AND m.fkTipo = t.idTipo
    AND r.fkTipoRegistro = tr.idTipoRegistro
    AND fkRegistro = idRegistro
    AND maq.fkModelo = m.idModelo
    AND maq.fkHospital = e.idEmpresa;

DELIMITER $$

DROP PROCEDURE IF EXISTS inserir_registros$$

CREATE PROCEDURE inserir_registros()
BEGIN
  DECLARE i INT;
  DECLARE dataHora DATETIME;
  DECLARE valor FLOAT;
  DECLARE fkTipoRegistro INT;
  DECLARE fkMaquina INT;

  SET i = 1;

  WHILE i <= 300 DO
    SET dataHora = DATE_ADD('2023-01-01', INTERVAL FLOOR(RAND() * 365) DAY);

    SET valor = 85 + (RAND() * 15);

    SET fkTipoRegistro = FLOOR(RAND() * 3) + 1;

    SET fkMaquina = FLOOR(RAND() * 216) + 1;

    INSERT INTO registro (dataHora, valor, fkMaquina, fkTipoRegistro)
    VALUES (dataHora, valor, fkMaquina, fkTipoRegistro);

    SET i = i + 1;
  END WHILE;
END$$

DELIMITER ;
use hts;

CALL inserir_registros();


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
from registro r where r.valor > 85;

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
CALL fechar_chamados();	

DELIMITER $$
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

    
-- call inserir_Registros2();
use hts;



SELECT COUNT(*)FROM CHAMADO;
select * from vw_chamados;
 SELECT 
        idMaquina AS quantidade, 
        tipo FROM 
        vw_chamados group by quantidade, tipo;


INSERT INTO `registro` (`idRegistro`, `dataHora`, `valor`, `fkMaquina`, `fkTipoRegistro`, `fkModelo`) 
VALUES (null, FROM_UNIXTIME(UNIX_TIMESTAMP('2023-12-08 00:00:00') + FLOOR(RAND() * 31536000)), FLOOR(RAND() * 100), 170, 2




, NULL);


























