import psutil
from tkinter import *
import mysql.connector

try:
    conexao = mysql.connector.connect(host='localhost',database='teste', port='3306', user ='root', password='lucas-00123969130980362')  

    print("Número de núcleos")
    nucleos = psutil.cpu_count()
    print(nucleos)    

    def dados():
      
        
        texto_dados['text'] = ''
       
        texto_dados["text"] += "\n \n----- Porcentagem CPU ------------  \n"
        cpuPorcent = psutil.cpu_percent()
        texto_dados["text"] += str(cpuPorcent) 

        # print("----- Temperaturas ------------")
        # print(psutil.sensors_temperatures()) #NÃO FUNCIONA PARA WINDOWS
        
        texto_dados["text"] += "\n ----- Temperaturas ------------ \n"
        cpuTemp = psutil.sensors_temperatures()['acpitz'][0][1]
        texto_dados["text"] += str(cpuTemp)
        
        texto_dados["text"] += "\n ----- Frequencia CPU ------------ \n"
        cpuFreq = psutil.cpu_freq()[0]
        texto_dados["text"] += str(cpuFreq)

        texto_dados["text"] += "\n ----- Porcentagem memoria virtual ------------ \n"
        vitualMemory = psutil.virtual_memory()[2]
        texto_dados["text"] += str(vitualMemory)

        # # print("----- Porcentagem memoria SWAP ------------")
        # # print(psutil.swap_memory()[3])

        texto_dados["text"] += "\n ----- Porcentagem DISCO------------ \n"
        disco = psutil.disk_usage('/')[3]
        texto_dados["text"] += str(disco)

        texto_dados["text"] += "\n ----- Porcentagem Bateria------------ \n"
        bateria = psutil.sensors_battery()[0]
        texto_dados["text"] += str(bateria)
        
        cursor = conexao.cursor()
        cursor.execute("Insert into testeDados (idMaquina , valorCpu, valorFrequencia, percentMemoriaVirtual, percentDisco,percentBateria, tempCPU) values "
                       f"('89','{cpuPorcent}','{cpuFreq}','{vitualMemory}','{disco}','{bateria}', '{cpuTemp}');")
        conexao.commit()

    def sair():
         conexao.close()
         exit()

    janela = Tk() #cria uma janela 
    janela.title("Health Tech Solutions") #da o título dessa janela


    texto_orientacao = Label(janela, text = "Clique no botão para começar a coleta de dados",font=("Georgia",12))
    texto_orientacao.grid(column = 0, row = 0,padx = 10,pady=30)

    botao = Button(janela, text = "Iníciar captura", command = dados, height= 2, width = 13,font=("Georgia",12),foreground="#030050")
    botao.grid(column=0,row=1)

    espaco = Label(janela,text="",height= 1)
    espaco.grid(column=0,row=2)

    botao_sair = Button(janela,text="Sair", command=sair, height= 2, width = 13, font=("Georgia",12), background="#da4931",foreground="white")
    botao_sair.grid(column=0,row=3)

    texto_dados = Label(janela,text="",padx = 10,pady=10,font=("Georgia",12))
    texto_dados.grid(column=0,row=4)

    janela.mainloop()

except:
    print("Falha na conexão")   

