import csv
import requests
import gzip
import zipfile
import io
import banco

CSV_URL="https://portal.inmet.gov.br/uploads/dadoshistoricos/2023.zip"

with requests.Session() as s:
    download = s.get(CSV_URL)
    with open('2023.zip', 'wb') as f:
        f.write(download.content)


# Abrindo o arquivo ZIP
with zipfile.ZipFile('2023.zip', 'r') as zip:

# Pegando o nome do arquivo CSV
    filename = 'INMET_SE_SP_A771_SAO PAULO - INTERLAGOS_01-01-2023_A_30-09-2023.CSV'
    

    # Abrindo o arquivo CSV dentro do arquivo ZIP
    with zip.open(filename) as f:

        # Lendo o conteúdo do arquivo CSV
        data = f.read()

# Convertendo o conteúdo do arquivo CSV para uma lista de strings
        data_str = data.decode('latin-1')

# Criando um objeto StringIO para simular um arquivo de texto
data_io = io.StringIO(data_str)

        

contador = 0
cr = csv.reader(data_io, delimiter=';')
my_list = list(cr)


 

for row in my_list:
     contador = contador + 1

     print(contador)
     if (contador == 2):
        print(row[1])
        estado = row[1]
     if (contador == 2000):
         break
     if len(row) >= 11:  #Verificando se tem 11 elementos na linha
         data = row[0]
         precipitacao = row[2]
         pressao_max = row[4]
         pressao_min = row[5]
         temperatura_max = row[9]
         temperatura_min = row[10]
        
         print(f" Estado {estado}\nData: {row[0]}\nPrecipitação: {row[2]}\nPressão Max: {row[4]}\nPressão Min: {row[5]}\nTemperatura Max: {row[9]}\nTemperatura Min: {row[10]}")
         banco.dados(estado, data, precipitacao, pressao_max, pressao_min, temperatura_max, temperatura_min)
     else:
         print("0")
     print("\n")


    

