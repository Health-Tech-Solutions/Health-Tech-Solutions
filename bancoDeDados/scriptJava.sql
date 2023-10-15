CREATE DATABASE htsJava;
USE htsJava;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
senha VARCHAR(30),
empresa VARCHAR(45),
cargo VARCHAR(45)
);

SELECT * FROM usuario;

CREATE TABLE maquina (
idMaquina INT PRIMARY KEY AUTO_INCREMENT,
tipo VARCHAR(45),
modelo VARCHAR(45),
numeroSerie VARCHAR(45)
) AUTO_INCREMENT = 2000;

SELECT * FROM maquina;

CREATE TABLE tipoRegistro (
idTipoRegistro INT PRIMARY KEY AUTO_INCREMENT,
tipo VARCHAR(45)
);
INSERT INTO tipoRegistro (tipo) VALUES ('Em uso'),
									   ('Disponível'),
									   ('Total'),
                                       ('Frequência');


CREATE TABLE medidaRegistro (
idMedidaRegistro INT PRIMARY KEY AUTO_INCREMENT,
medida VARCHAR(10)
);
INSERT INTO medidaRegistro (medida) VALUES ('GiB'),
										   ('GHz'),
										   ('%'),
										   ('GB');
									

CREATE TABLE peca (
idPeca INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45)
);

INSERT INTO peca (nome) VALUES ('Memória'),
							   ('CPU'),
							   ('Disco');
  							


CREATE TABLE registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dataHora DATETIME,
fkMaquina INT,
FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina),
fkPeca INT,
FOREIGN KEY (fkPeca) REFERENCES Peca(idPeca),
fkTipoRegistro INT,
FOREIGN KEY (fkTipoRegistro) REFERENCES tipoRegistro(idtipoRegistro),
valor DECIMAL(7,2),
fkMedidaRegistro INT,
FOREIGN KEY (fkMedidaRegistro) REFERENCES medidaRegistro(idMedidaRegistro)
);
SELECT * FROM registro;


SELECT 
    r.dataHora,
    m.tipo AS 'Máquina',
    p.nome AS 'Peça',
    tr.tipo AS TipoRegistro,
    r.valor,
    mr.medida AS MedidaRegistro
FROM registro AS r
JOIN maquina AS m ON r.fkMaquina = m.idMaquina
JOIN peca AS p ON r.fkPeca = p.idPeca
JOIN tipoRegistro AS tr ON r.fkTipoRegistro = tr.idTipoRegistro
JOIN medidaRegistro AS mr ON r.fkMedidaRegistro = mr.idMedidaRegistro;


