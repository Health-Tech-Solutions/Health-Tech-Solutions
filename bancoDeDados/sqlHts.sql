create database hts;

use hts;

create table endereco(
	idEndereco int primary key auto_increment,
    cep char(9),
    numero varchar(10),
    complmento varchar(10)
);

create table empresa(
	idEmpresa int primary key auto_increment,
    nomeFantasia varchar(45),
    cnpj char(18),
    telefone char(14),
    fkEndereco int,
    foreign key (fkEndereco) references endereco(idEndereco)
);

create table funcionario(
	idFuncionario int primary key auto_increment,
    nome varchar(45),
    email varchar(60),
    senha varchar(45),
    fkIndustria int,
    foreign key (fkIndustria) references empresa(idEmpresa),
    fkRepresentante int,
    foreign key (fkRepresentante) references funcionario(idFuncionario)
);

create table  tipoMaquinario(
	idTipoMaquinario int primary key auto_increment,
    modelo varchar(45),
    descricao varchar(255)
);

create table maquinario(
	idMaquinario int,
    fkIndustria int,
    foreign key (fkIndustria) references empresa(idEmpresa),
    fkHospital int,
    foreign key (fkHospital) references empresa(idEmpresa),
	fkTipoMaquina int,
    foreign key (fkTipoMaquina) references tipoMaquinario(idTipoMaquinario),
    primary key(idMaquinario, fkTipoMaquina)
);

create table tipoRegistro(
	idTipoRegistro int primary key auto_increment,
    nome varchar(45),
    medida varchar(45)
);

create table Registro(
	idRegistro int primary key auto_increment,
    dataHora date,
    valor decimal(7,2),
    fkMaquina int,
    foreign key (fkMaquina) references maquinario(idMaquinario),
    fkTipoMaquina int,
    foreign key (fkTipoMaquina) references maquinario(fkTipoMaquina),
    fkTipoRegistro int,
    foreign key (fkTipoRegistro) references tipoRegistro(idTipoRegistro) 
);

create table plano(
	idPlano int primary key auto_increment, 
    nome varchar(45),
    valor decimal(8,2),
    descricao varchar(45)
);

create table assinatura(
	fkIndustria int,
    foreign key (fkIndustria) references empresa(idEmpresa),
    fkPlano int,
    foreign key (fkPlano) references plano(idPlano),
    dataContrato date,
    estado varchar(45),
    primary key(fkIndustria, dataContrato)
);