import mysql.connector
from mysql.connector import errorcode
import csv


conexao = mysql.connector.connect(
    host= "localhost",
    user= "",
    password= "",
    port= 3306,
    database="crawler"
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

        comando.execute("INSERT INTO Dados (estado,dataDecapitura, precipitacao, pressaoMax, pressaoMin, temperaturaMax, temperaturaMin) VALUES (%s, %s, %s, %s, %s, %s, %s);", (estado, data, precipitacao, pressao_max, pressao_min, temperatura_max, temperatura_min)) 
        conexao.commit()
    except mysql.connector.Error as Erro:
        print('Não tem todos os dados', Erro)