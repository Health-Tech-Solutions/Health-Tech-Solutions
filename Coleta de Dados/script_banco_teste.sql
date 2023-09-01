drop database teste;
create database teste;
use teste;

create table registro (
idRegistro int auto_increment primary key,
dataHora dateTime,
valor decimal (7,2),
fkTipoRegistro int,
fkMaquina int,
fkTipoMaquina int
);
create table tipoRegistro (
idTipoRegistro int primary key auto_increment,
nome varchar(45),
medida varchar(45)
);

INSERT INTO tipoRegistro (nome, medida) VALUES ('Uso de CPU', '%'),
							('Temperatura de CPU', 'ºC'),
                            ('Frequência de CPU', 'GHz'),
                            ('Uso de memória virtual', 'GHz'),
                            ('Uso de RAM', '%'),
                            ('Uso de disco', '%');
select * from tipoRegistro;
Select * from registro;	
