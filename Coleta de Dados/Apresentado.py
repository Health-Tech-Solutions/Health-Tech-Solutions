from tkinter import *
import psutil

nucleosLogicos = psutil.cpu_count()
nucleos = psutil.cpu_count(logical=False)
totalRam = (psutil.virtual_memory().total / 1024**3)
discoTotal = (psutil.disk_usage('/')[0]) / (1024**3)

janela = Tk() 

janela.title("Health Tech Solutions")

background = PhotoImage(file="background.png")

canvas1 = Canvas(janela, width=400, height=400)
canvas1.pack(fill="both", expand=True)
canvas1.create_image(0,0, image=background, anchor="nw")

backgroundTk = Label(janela, image = background)
backgroundTk.place(x=0, y=0)


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

botao = Button(janela, text = "Padrão (10 segundos)", height= 2, width = 18,font=("Arial",12))
botao.grid(column=0,row=6)

botao = Button(janela, text = "Definir Intervalo", height= 2, width = 18,font=("Arial",12))
botao.grid(column=0,row=7)

espaco = Label(janela,text="",height= 1)
espaco.grid(column=0,row=8)

botao_sair = Button(janela,text="Sair", height= 2, width = 18, font=("Arial",12), background="#c53421",foreground="white")
botao_sair.grid(column=0,row=9)

texto_dados = Label(janela,text="",padx = 10,pady=10,font=("Arial",12))
texto_dados.grid(column=0,row=10)


janela.mainloop()


