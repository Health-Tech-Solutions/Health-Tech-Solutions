import psutil
import time
import mysql.connector

def inserir_media(cursor, fkMaquina, fkTipoMaquina, valor, fkTipoRegistro):
    cursor.execute(
        "INSERT INTO registro (dataHora, valor, fkMaquina, fkModelo, fkTipoRegistro) VALUES "
        "(NOW(), %s, %s, %s, %s)",
        (valor, fkMaquina, fkTipoMaquina, fkTipoRegistro)
    )

try:
    conexao = mysql.connector.connect(
        host='localhost',
        database='hts',
        port='3306',
        user='hts',
        password='urubu100'
    )

    if conexao.is_connected():
        print("Conexão com o banco de dados estabelecida.")

    nucleosLogicos = psutil.cpu_count()
    nucleos = psutil.cpu_count(logical=False)
    totalMemory = psutil.virtual_memory().total / (1024 ** 3)
    totalRam = totalMemory
    discoTotal = psutil.disk_usage('/').total / (1024 ** 3)

    print("Quantidade de núcleos lógicos:", nucleosLogicos)
    print("Quantidade de núcleos físicos:", nucleos)
    print()

    tempo = int(input("De quanto em quanto tempo a máquina deve capturar os dados? "))
    limiteMed = int(input("Quantas capturas são necessárias para calcular as médias? "))
    token = input("Insira o token da máquina: ")

    fkMaquina, fkTipoMaquina = map(int, token.split("#"))

    somaCpuPorcent = 0
    somaCpuTemp = 0
    somaCpuFreq = 0
    somaVirtualMemory = 0
    somaRamPorcent = 0

    contador = 0

    while True:
        contador = contador + 1
        time.sleep(tempo)

        cpuPorcent = psutil.cpu_percent()
        # cpuTemp = psutil.sensors_temperatures()['coretemp'][0].current
        cpuFreq = psutil.cpu_freq().current / 1000
        discoDisponivel = psutil.disk_usage('/').free / (1024 ** 3)
        ramPorcent = (psutil.virtual_memory().used / 1024 ** 3) / totalRam * 100
        virtualMemory = psutil.virtual_memory().available / (1024 ** 3)
        virtualMemoryPercent = (virtualMemory / totalMemory) * 100

        somaCpuPorcent += cpuPorcent
        # somaCpuTemp += cpuTemp
        somaCpuFreq += cpuFreq
        somaRamPorcent += ramPorcent
        somaVirtualMemory += virtualMemoryPercent

        if contador == limiteMed:
            mediaCpuPorcent = somaCpuPorcent / limiteMed
            mediaCpuTemp = somaCpuTemp / limiteMed
            mediaCpuFreq = somaCpuFreq / limiteMed
            mediaVirtualMemory = somaVirtualMemory / limiteMed
            mediaRamPorcent = somaRamPorcent / limiteMed

            discoUtilizado = discoTotal - discoDisponivel
            discoPorcent = (discoUtilizado / discoTotal) * 100
            
            cursor = conexao.cursor()

            inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaCpuPorcent, 1)
            inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaCpuTemp, 2)
            inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaCpuFreq, 3)
            inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaVirtualMemory, 4)
            inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaRamPorcent, 5)
            inserir_media(cursor, fkMaquina, fkTipoMaquina, discoPorcent, 6)

            conexao.commit()

            print("Dados inseridos no banco de dados com sucesso.")

            somaCpuPorcent = 0
            somaCpuTemp = 0
            somaCpuFreq = 0
            somaVirtualMemory = 0
            somaRamPorcent = 0
            contador = 0

except mysql.connector.Error as e:
    print(f"Erro do banco de dados: {e}")
except KeyboardInterrupt:
    print("Encerrando o programa.")
