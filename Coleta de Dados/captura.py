import psutil
import time
import mysql.connector
import json


try:
    inicioWhile = True
    contador = 0
    conexao = mysql.connector.connect(host='localhost',database='teste', port='3306', user ='root', password='lucas-00123969130980362')  

    nucleosLogicos = psutil.cpu_count()
    nucleos = psutil.cpu_count(logical=False)
    totalMemory = psutil.virtual_memory()[0] / (1024 ** 3)
    totalRam = (psutil.virtual_memory().total / 1024**3)
    discoTotal = (psutil.disk_usage('/')[0]) / (1024**3)
    print("Quantidad de núcleos: ")
    print(nucleos)     
    print("Quantidad de núcleos lógicos: ")
    print(nucleosLogicos)

    print()
    tempo = int(input("De quanto em quanto tempo a máquina deve capturar os dados?"))
    limiteMed = int(input("Quanstas captura são necessárias para calculas as médias?"))
    token = input("Insira o token da máquina: ")

    fkMaquina, fkTipoMaquina = token.split("#")
    fkMaquina = int(fkMaquina)
    fkTipoMaquina = int(fkTipoMaquina)
    

    somaCpuPorcent = 0
    somaCpuTemp = 0
    somaCpuFreq = 0
    somavirtualMemory =0
    somaRamPorcent = 0


    while inicioWhile == True :
        time.sleep(tempo)
        contador+=1

        cpuPorcent = psutil.cpu_percent()
        cpuTemp = psutil.sensors_temperatures()['acpitz'][0][1]
        cpuFreq = (psutil.cpu_freq()[0]) / 1000
        discoDisponivel = (psutil.disk_usage('/')[2]) / (1024**3)
        ramPorcent = ((psutil.virtual_memory().used / 1024**3) / totalRam) * 100
        virtualMemory = psutil.virtual_memory()[1] / (1024 ** 3)
        virtualMemoryPercent = (virtualMemory / totalMemory) * 100

        # print("Capturei os dados")
        # print(contador)
        # print(limiteMed)
        
        somaCpuPorcent += cpuPorcent
        somaCpuTemp += cpuTemp
        somaCpuFreq += cpuFreq
        somaRamPorcent += ramPorcent
        somavirtualMemory += virtualMemoryPercent

        if contador == limiteMed :
            contador = 0

            mediaCpuPorcent = somaCpuPorcent / tempo
            mediaCpuTemp = somaCpuTemp / tempo
            mediaCpuFreq = somaCpuFreq / tempo
            mediaVirtualMemory = somavirtualMemory / tempo
            mediaRamPorcent = somaRamPorcent / tempo
            
            discoUtilizado = discoTotal - discoDisponivel
            discoPorcent = discoUtilizado/discoTotal * 100

            def inserir(dadoDaVez, fkTipoRegistro) : 
                cursor = conexao.cursor()
                cursor.execute("INSERT INTO registro (dataHora, valor, fkMaquina, fkTipoMaquina, fkTipoRegistro) VALUES"
               f"(NOW(), {format(dadoDaVez, '.2f')}, {fkMaquina}, {fkTipoMaquina}, {fkTipoRegistro});")
                conexao.commit()

            inserir(mediaCpuPorcent, 1)
            inserir(mediaCpuTemp, 2)
            inserir(mediaCpuFreq, 3)
            inserir(mediaVirtualMemory, 4)
            inserir(mediaRamPorcent, 5)
            inserir(discoPorcent, 6)


         
except:
    print("Falha na conexão")   

