drop database if exists hts;
create database hts;

use hts;

create table endereco(
	idEndereco int primary key auto_increment,
    cep char(9),
    numero varchar(10),
    complemento varchar(10)
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

create table empresa(
	idEmpresa int primary key auto_increment,
    nomeFantasia varchar(45),
    cnpj char(18),
    telefone char(14),
    fkEndereco int,
    foreign key (fkEndereco) references endereco(idEndereco)
);

insert into
	empresa(nomeFantasia, cnpj, telefone, fkEndereco)
values
	("Da Vinci","56.158.491/5012-61","(11)95102-1401",1),
	("Lean machine","95.144.803/2012-62","(11)90422-2101",2),
	("Croquer","77.921.121/0102-19","(15)99291-4021",3),
	("alrHosp","45.123.952/4122-14","(11)94100-0405",4),
    ("Paulistano","11.910.753/1105-85","(11)91361-5055",5),
    ("Oswaldo Cruz","09.521.857/0411-21","(11)99020-1100",6),
    ("São Camilo - ipiranga","70.111.556/1244-78","(11)9071-1322",7),
    ("Albert Eistean","31.403.125/0012-01","(11)92445-8622",8);

create table funcionario(
	idFuncionario int primary key auto_increment,
    nome varchar(45),
    email varchar(60),
    senha varchar(45),
    funcao varchar(45),
    fkIndustria int,
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
	("Helena Sarah Porto","helena_porto@kimmay.com.br","le7y7mi7oh","admin", 2),
	("Bryan Luan Gomes","bryan-gomes83@uolinc.com","gLD7XFQj5y","funcionario", 2),
	("Anderson Manuel Galvão","anderson.manuel.galvao@systemsadvisers.com","Y48nEZ5qey","funcionario", 2),
	("Stefany Bárbara Alessandra Melo","stefany_melo@icloub.com","MSRwLa8e9K","admin", 3),  
	("Diogo Enrico Nelson Gonçalves","diogo_goncalves@edbrasil.net","M1SM0aBq3r","funcionario", 3),
	("Lívia Letícia Carolina Dias","livia.leticia.dias@ritmolog.com.br","diH6Brmkli","funcionario", 3),
	("Aline Esther Bruna Cardoso","aline_cardoso@graffiti.net","ejYPZK6680","admin", 4),    
	("Elza Allana Rita Moraes","elzaallanamoraes@verdana.com.br","DUrP3YwNX3","funcionario", 4),  
	("Gael Murilo dos Santos","gael_murilo_dossantos@rebecacometerra.com.br","fSik4S6Hnk","funcionario", 4),
	("Isabelly Sara Luciana da Rocha","isabelly_darocha@directnet.com","yjkapiMCxz","admin", 5),
	("Rosa Emilly Valentina Viana","rosa_viana@pierproj.com.br","xYFG7H7ikq","funcionario", 5),   
	("Clarice Louise Laura Araújo","clarice_araujo@yahoo.com.ar","RNoeEDd7yb","funcionario", 5);

create table plano(
	idPlano int primary key auto_increment, 
    nome varchar(45),
    valor decimal(8,2),
    descricao varchar(45)
);

insert into 
	plano(nome, valor, descricao)
values
	("Silve", 10, "Plano prata"),
	("Gold", 20, "Plano gold"),
	("Rubi", 30,"Plano rubi");

create table assinatura(
	fkIndustria int,
    foreign key (fkIndustria) references empresa(idEmpresa),
    fkPlano int,
    foreign key (fkPlano) references plano(idPlano),
    dataContrato date,
    estado varchar(45),
    primary key(fkIndustria, dataContrato)
);

insert into
	assinatura(fkIndustria, fkPlano, dataContrato, estado)
values
	(1, 3, "2023-06-11", "Pago"),
	(1, 3, "2023-07-13", "Pago"),
	(1, 3, "2023-08-12", "Pago"),
	(1, 3, "2023-09-11", "Pendente"),
	(2, 2, "2023-08-03", "Pago"),
	(2, 2, "2023-09-04", "Pago"),
	(3, 1, "2023-08-12", "Pago"),
	(3, 2, "2023-09-12", "Pago");

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
	(68,3,6,1),
	(64,3,6,1),
	(37,1,4,1),
	(89,1,6,1),
	(33,1,6,1),
	(82,1,6,2),
	(68,2,5,2),
	(71,2,8,2),
	(38,2,4,2),
	(13,1,4,2),
	(93,2,6,3),
	(6,1,4,3),
	(98,3,5,3),
	(22,1,7,3),
	(7,2,7,4),
	(93,1,5,4),
	(63,3,4,4),
	(19,3,5,4),
	(9,2,6,5),
	(12,3,8,6),
	(21,3,8,7),
	(61,2,4,7),
	(25,2,7,8),
	(88,3,7,8),
	(63,1,4,8),
	(93,2,8,9),
	(77,2,6,10),
	(12,1,4,11),
	(71,1,7,12),
	(39,1,7,12),
	(38,3,7,13),
	(71,2,8,13),
	(2,3,7,13),
	(50,3,7,14),
	(41,1,4,14),
	(88,3,4,14),
	(41,2,5,15),
	(22,3,4,15),
	(64,1,7,15),
	(61,3,4,15),
	(3,1,5,15),
	(17,2,8,16),
	(35,1,4,16),
	(21,2,6,16),
	(85,1,5,17),
	(38,2,8,18),
	(39,2,7,18),
	(98,3,5,18),
	(60,3,7,19),
	(43,3,7,19),
	(74,2,4,19),
	(13,3,8,20),
	(37,3,5,20),
	(7,1,6,20),
	(30,3,8,21),
	(93,3,4,22),
	(89,3,8,23),
	(18,3,8,23),
	(18,2,6,24),
	(57,1,8,24);

create table tipoRegistro(
	idTipoRegistro int primary key auto_increment,
    nome varchar(45),
    medida varchar(45)
);

insert into 
	tipoRegistro(nome, medida)
values
	('Uso de CPU', '%'),
	('Temperatura de CPU', 'ºC'),
	('Frequência de CPU', 'GHz'),
	('Uso de memória virtual', '%'),
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

select * from maquinario;

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
    descricao varchar(45),
	fkRegistro int,
    foreign key(fkRegistro) references registro(idRegistro)
);

insert into
	chamado (nivel, estado, sla, descricao, fkRegistro)
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
	"" descriacao,
	r.idRegistro
from registro r where r.valor > 85;
    
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

create table faleConosco(
    idFaleConosco int primary key auto_increment,
    email varchar(45),
    telefone char(14),
    mensagem varchar(255)
);

insert into 
	faleConosco(email, telefone, mensagem)
values
	("Andreylrodrigues@hotmail.com", "(11)94100-0405","Qual o melhor plano para uma empresa grande"),
    ("Julia-fernandes@gmail.com","(15)95116-0122","Bom dia, quais os beneficios do plano rubi?"),
    ("Henrique.trenolitos@bol.com.br","(11)91133-6122","Como funciona a dashboard do hospital?");
    
    
select * from registro join tipoRegistro on fkTipoRegistro = idTipoRegistro order by dataHora desc;    