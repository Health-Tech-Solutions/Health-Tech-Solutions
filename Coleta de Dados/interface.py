import psutil
import time
import tkinter as tk
from tkinter import *
import mysql.connector
import json


try:
    conexao = mysql.connector.connect(
        host='localhost',database='hts',
        port='3306',
        user ='root',
        password='lucas-00123969130980362'
    )  
    def inserir_media(cursor, fkMaquina, fkTipoMaquina, valor, fkTipoRegistro):
        cursor.execute(
            "INSERT INTO registro (dataHora, valor, fkMaquina, fkModelo, fkTipoRegistro) VALUES "
            "(NOW(), %s, %s, %s, %s)",
            (valor, fkMaquina, fkTipoMaquina, fkTipoRegistro)
    )
        
    token = input("Insira o token da máquina: ")

    fkMaquina, fkTipoMaquina = map(int, token.split("#"))
    
    nucleosLogicos = psutil.cpu_count()
    nucleos = psutil.cpu_count(logical=False)
    totalMemory = psutil.virtual_memory()[0] / (1024 ** 3)
    totalRam = (psutil.virtual_memory().total / 1024**3)
    discoTotal = (psutil.disk_usage('/')[0]) / (1024**3)
    print("Quantidad de núcleos: ")
    print(nucleos)     
    print("Quantidad de núcleos lógicos: ")
    print(nucleosLogicos)
    print("Quantidade de memória RAM total:", totalRam)
    print("Espaço em disco total:", discoTotal)


    reset = False

    def dados(tempo):
        somaCpuPorcent = 0
        somaCpuTemp = 0
        somaCpuFreq = 0
        somavirtualMemory =0
        somaRamPorcent = 0

        for x in range (tempo): 
            time.sleep(1)

            texto_dados['text'] = ''
            cpuPorcent = psutil.cpu_percent()
            cpuTemp = psutil.sensors_temperatures()['acpitz'][0][1]
            cpuFreq = (psutil.cpu_freq()[0]) / 1000
            discoDisponivel = (psutil.disk_usage('/')[2]) / (1024**3)
            ramPorcent = ((psutil.virtual_memory().used / 1024**3) / totalRam) * 100
            virtualMemory = psutil.virtual_memory()[1] / (1024 ** 3)
            virtualMemoryPercent = (virtualMemory / totalMemory) * 100

            somaCpuPorcent += cpuPorcent
            somaCpuTemp += cpuTemp
            somaCpuFreq += cpuFreq
            somaRamPorcent += ramPorcent
            somavirtualMemory += virtualMemoryPercent
            
            

            texto_dados["text"] += "Capturas: \n"

            texto_dados["text"] += "\n \n----- Percentual de CPU (%) -----  \n"
            texto_dados["text"] += format(cpuPorcent, ".2f")
        
            #   Não funciona no Windows:
            texto_dados["text"] += "\n ----- Temperatura (°C) ----- \n"
            texto_dados["text"] += format(cpuTemp, ".2f")
            #
        
            texto_dados["text"] += "\n ----- Frequência de CPU GHz----- \n" ## alterado
            texto_dados["text"] += format(cpuFreq, ".2f")

            texto_dados["text"] += "\n ----- Percentual de uso de memoria virtual (%) ----- \n"
            texto_dados["text"] += format(virtualMemoryPercent, ".2f")

            texto_dados["text"] += "\n ----- Percentual de uso de ram (%) ----- \n"
            texto_dados["text"] += format(ramPorcent, ".2f")

            texto_dados["text"] += "\n ----- Uso de DISCO (GB) ----- \n"
            texto_dados["text"] += "Disponível: {}gb de {}gb ({}gb utilizados)".format(format(discoDisponivel, ".2f"), format(discoTotal, ".2f"), format(discoTotal-discoDisponivel, ".2f"))


            janela.update() 

            if x == tempo - 1 : 
                texto_dados['text'] = ''
                mediaCpuPorcent = somaCpuPorcent / tempo
                mediaCpuTemp = somaCpuTemp / tempo
                mediaCpuFreq = somaCpuFreq / tempo
                mediaVirtualMemory = somavirtualMemory / tempo
                mediaRamPorcent = somaRamPorcent / tempo

                discoUtilizado = discoTotal - discoDisponivel
                discoPorcent = discoUtilizado/discoTotal * 100

                texto_dados["text"] += "Médias: \n"

                texto_dados["text"] += "\n \n----- Percentual de CPU (%) -----  \n"
                texto_dados["text"] += format(mediaCpuPorcent, ".2f")
            
                #   Não funciona no Windows:
                texto_dados["text"] += "\n ----- Temperatura (°C) ----- \n"
                texto_dados["text"] += format(mediaCpuTemp, ".2f")
                #
        
                texto_dados["text"] += "\n ----- Frequência de CPU GHz----- \n"
                texto_dados["text"] += format(mediaCpuFreq, ".2f")

                texto_dados["text"] += "\n ----- Percentual de memoria virtual (%) ----- \n"
                texto_dados["text"] += format(mediaVirtualMemory, ".2f")
                texto_dados["text"] += "\n ----- Percentual de uso de ram (%)----- \n"
                texto_dados["text"] += format(mediaRamPorcent, ".2f")

                texto_dados["text"] += "\n ----- Percentual de uso de disco (%)----- \n"
                texto_dados["text"] += format(discoPorcent, ".2f")


                


                janela.update() 
                cursor = conexao.cursor()

                inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaCpuPorcent, 1)
                inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaCpuTemp, 2)
                inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaCpuFreq, 3)
                inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaVirtualMemory, 4)
                inserir_media(cursor, fkMaquina, fkTipoMaquina, mediaRamPorcent, 5)
                inserir_media(cursor, fkMaquina, fkTipoMaquina, discoPorcent, 6)

                conexao.commit()
                    

    def indefinido() : 
        dados(10)
    def sair():
         exit()

    def definir_tempo():

        def confirmar_tempo():
            tempo = int(input_tempo.get())
            janela_tempo.destroy()
            dados(tempo) 

        janela_tempo = Toplevel()
        janela_tempo.title("Definir tempo de coleta")

        texto_orientacao = Label(janela_tempo, text = "Digite o tempo desejado para coleta de dados",font=("Arial",13))
        texto_orientacao.grid(column = 0, row = 0,padx = 10,pady=10)

        input_tempo = Entry(janela_tempo, width=10)
        input_tempo.grid(column=0,row=1)

        botao_confirmar = Button(janela_tempo, text="Cancelar",command=janela_tempo.destroy, height= 1, width = 10,font=("Arial",12),foreground="#030050")
        botao_confirmar.grid(column=0,row=2)

        botao_cancelar = Button(janela_tempo,text="Confirmar", command=confirmar_tempo, height= 1, width = 10, font=("Arial",12), background="#030050",foreground="white")
        botao_cancelar.grid(column=0,row=3)

        janela_tempo.mainloop()


    janela = Tk() 

    janela.title("Health Tech Solutions")

    apresentacaoHardware = Label(janela, text = "Especificações da máquina",font=("Arial",14))
    apresentacaoHardware.grid(column = 0, row = 0,padx = 10,pady=10)
    
    infoNucleosFisicos = Label(janela, text = "Núcleos físicos: ",font=("Arial",12))
    infoNucleosFisicos.grid(column = 0, row = 1,padx = 10,pady=5)
    infoNucleosFisicos["text"] += str(nucleos)

    infoNucleosLogicos = Label(janela, text = "Núcleos lógicos: ",font=("Arial",12))
    infoNucleosLogicos.grid(column = 0, row = 2,padx = 10,pady=5)
    infoNucleosLogicos["text"] += str(nucleosLogicos)

    infoRam = Label(janela, text = "Memória RAM total (GB): ",font=("Arial",12))
    infoRam.grid(column = 0, row = 3,padx = 10,pady=5)
    infoRam["text"] += str(format(totalRam, ".2f"))

    infoDiscoTotal = Label(janela, text = "Disco total (GB): ",font=("Arial",12))
    infoDiscoTotal.grid(column = 0, row = 4,padx = 10,pady=5)
    infoDiscoTotal["text"] += str(format(discoTotal, ".2f"))


    texto_orientacao = Label(janela, text = "Que tipo de captura deseja realizar?",font=("Arial",14))
    texto_orientacao.grid(column = 0, row = 5,padx = 10,pady=30)

    botao = Button(janela, text = "Padrão (10 segundos)", command = indefinido, height= 2, width = 18,font=("Arial",12))
    botao.grid(column=0,row=6)

    botao = Button(janela, text = "Definir Intervalo", command = definir_tempo, height= 2, width = 18,font=("Arial",12))
    botao.grid(column=0,row=7)

    espaco = Label(janela,text="",height= 1)
    espaco.grid(column=0,row=8)

    botao_sair = Button(janela,text="Sair", command=sair, height= 2, width = 18, font=("Arial",12), background="#030050",foreground="white")
    botao_sair.grid(column=0,row=9)

    texto_dados = Label(janela,text="",padx = 10,pady=10,font=("Arial",12))
    texto_dados.grid(column=0,row=10)


    janela.mainloop()


        

except:
    print("Falha na conexão")   
