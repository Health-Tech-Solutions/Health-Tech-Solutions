import mysql.connector
from mysql.connector import errorcode
import csv


conexao = mysql.connector.connect(
    host= "localhost",
    user= "hts",
    password= "urubu100",
    port= 3306,
    database="hts"
)

comando = conexao.cursor()

def dados(estado, data, precipitacao, pressao_max, pressao_min, temperatura_max, temperatura_min):
    try:
       # Substitua a vírgula pelo ponto
        precipitacao = precipitacao.replace(',', '.')
        pressao_max = pressao_max.replace(',', '.')
        pressao_min = pressao_min.replace(',', '.')
        temperatura_max = temperatura_max.replace(',', '.')
        temperatura_min = temperatura_min.replace(',', '.')

        comando.execute("INSERT INTO dadosTemperatura (estado,dataTemperatura, precipitacao, pressaoMax, pressaoMin, temperaturaMax, temperaturaMin) VALUES (%s, %s, %s, %s, %s, %s, %s);", (estado, data, precipitacao, pressao_max, pressao_min, temperatura_max, temperatura_min)) 
        conexao.commit()
    except mysql.connector.Error as Erro:
        print('Não tem todos os dados', Erro)   

def registros(estado):
    try:
        comando.execute("INSERT INTO registroTemperatura (fkDadosTemperatura, fkHospital) SELECT idDadosTemperatura, idEmpresa FROM endereco JOIN empresa ON idEndereco = fkEndereco JOIN dadosTemperatura ON endereco.estado = dadosTemperatura.estado WHERE endereco.estado = %s;", (estado,))
        conexao.commit()
    except mysql.connector.Error as Erro:
        print('Não tem todos os dados', Erro)  
