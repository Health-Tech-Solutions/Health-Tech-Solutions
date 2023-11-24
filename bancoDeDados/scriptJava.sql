DROP DATABASE IF EXISTS htsJava;
CREATE DATABASE htsJava;
USE htsJava;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
senha VARCHAR(30),
empresa VARCHAR(45),
cargo VARCHAR(45)
);

CREATE TABLE maquina (
idMaquina INT PRIMARY KEY AUTO_INCREMENT,
tipo VARCHAR(45),
modelo VARCHAR(45),
numeroSerie VARCHAR(45)
) AUTO_INCREMENT = 2000;

INSERT INTO maquina VALUES(NULL,'ultrassom','u1000','0022');

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
	nome VARCHAR(45),
    descricao VARCHAR(45),
    fkTipoRegistro INT,
    fkMaquinario INT,
    FOREIGN KEY (fkTipoRegistro) REFERENCES tipoRegistro(idTipoRegistro),
    FOREIGN KEY (fkMaquinario) REFERENCES maquina(idMaquina)

);

INSERT INTO peca (nome,fkTipoRegistro,fkMaquinario) VALUES ('Memória',1,2000),
							   ('CPU',1,2000),
							   ('Disco',1,2000);
						

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

SELECT * FROM maquina;
SELECT * FROM registro;

