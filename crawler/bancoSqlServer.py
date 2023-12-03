import pyodbc
import csv


dados_conexao = (
    "Driver={SQL Server};"
    "Server=;"
    "Database=hts;"
    "UID=sa;"
    "PWD=urubu100;"
    "TrustServerCertificate=yes;"
)

conexao = pyodbc.connect(dados_conexao)

cursor = conexao.cursor()

def excluirRegistroTemperatura():
    try:
        cursor.execute("drop table registroTemperatura;")
        cursor.commit()
    except pyodbc.Error as e:
        print(e)

def excluirDadosTemperatura():
    try:
        cursor.execute("TRUNCATE TABLE dadosTemperatura;")
        cursor.commit()
    except pyodbc.Error as e:
        print(e)
def criandoTabela():
    try:
        cursor.execute("CREATE TABLE registroTemperatura( fkDadosTemperatura INT, fkHospital INT, FOREIGN KEY (fkDadosTemperatura) REFERENCES dadosTemperatura(idDadosTemperatura),FOREIGN KEY (fkHospital) REFERENCES empresa(idEmpresa));")
        cursor.commit()
    except pyodbc.Error as e:
        print(e)

def dados(estado, data, precipitacao, pressao_max, pressao_min, temperatura_max, temperatura_min):
    try:
       # Substitua a vírgula pelo ponto
        precipitacao = precipitacao.replace(',', '.')
        pressao_max = pressao_max.replace(',', '.')
        pressao_min = pressao_min.replace(',', '.')
        temperatura_max = temperatura_max.replace(',', '.')
        temperatura_min = temperatura_min.replace(',', '.')
        data = data.replace('/','-')

        valores = (estado, data, precipitacao, pressao_max, pressao_min, temperatura_max, temperatura_min)
       
        cursor.execute("INSERT INTO dadosTemperatura (estado, dataTemperatura, precipitacao, pressaoMax, pressaoMin, temperaturaMax, temperaturaMin) VALUES (?, CONVERT(date, ?), ?, ?, ?, ?, ?);", valores) 
        cursor.commit()
    except pyodbc.Error as e:
        print(e)  

def registros(estado):
    try:

        valor = (estado)
        cursor.execute("INSERT INTO registroTemperatura (fkDadosTemperatura, fkHospital) SELECT idDadosTemperatura, idEmpresa FROM endereco JOIN empresa ON idEndereco = fkEndereco JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado WHERE endereco.estado = ?;", valor)
        cursor.commit()
    except pyodbc.Error as e2:
        print(e2)  
