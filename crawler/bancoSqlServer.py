import pyodbc
import csv


dados_conexao = (
    "Driver={SQL Server};"
    "Server=localhost;"
    "Database=hts;"
    "UID=sa;"
    "PWD=urubu100;"
    "TrustServerCertificate=yes;"
)

conexao = pyodbc.connect(dados_conexao)

cursor = conexao.cursor()

def dados(estado, data, precipitacao, pressao_max, pressao_min, temperatura_max, temperatura_min):
    try:
       # Substitua a vírgula pelo ponto
        precipitacao = precipitacao.replace(',', '.')
        pressao_max = pressao_max.replace(',', '.')
        pressao_min = pressao_min.replace(',', '.')
        temperatura_max = temperatura_max.replace(',', '.')
        temperatura_min = temperatura_min.replace(',', '.')

        cursor.execute("INSERT INTO dadosTemperatura (estado,dataTemperatura, precipitacao, pressaoMax, pressaoMin, temperaturaMax, temperaturaMin) VALUES (%s, %s, %s, %s, %s, %s, %s);", (estado, data, precipitacao, pressao_max, pressao_min, temperatura_max, temperatura_min)) 
        cursor.commit()
    except:
        print('Não tem todos os dados')   

def registros(estado):
    try:
        cursor.execute("INSERT INTO registroTemperatura (fkDadosTemperatura, fkHospital) SELECT idDadosTemperatura, idEmpresa FROM endereco JOIN empresa ON idEndereco = fkEndereco JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado WHERE endereco.estado = %s;", (estado,))
        cursor.commit()
    except:
        print('Não tem todos os dados')  



