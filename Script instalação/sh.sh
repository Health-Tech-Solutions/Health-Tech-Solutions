#!/bin/bash

PURPLE='0;35'
NC='\033[0m' 
VERSAO=11

echo  "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Olá Aluno, serei seu assistente para instalação da API de monitoramento!;"
echo  "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Gostaria de instalar a API de captura? [s/n];" 
read get

if [ -d "API-" ]; then
    echo  "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) O repositório já existe. Você gostaria de atualizá-lo? [s/n];" 
    read update

    if [ "$update" == "s" ]; then
        echo  "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Atualizando o repositório...;"
        cd API-
        git pull
        cd ..
    else
        echo  "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Você optou por não atualizar o repositório;"
    fi

else

    if [ "$get" == "s" ]; then

        # Clona o repositório do GitHub
        echo "Clonando o repositório do GitHub..."
        git clone https://github.com/Health-Tech-Solutions/API-.git
        mv "Coleta de Dados" ../API
        cd ..
        cd API
        sudo apt-get install python3-mysql.connector


        # Função para verificar se o Python 3 está instalado / instalar
        check_python() {
            if command -v python3 &>/dev/null; then
                echo "Python 3 já está instalado."
            else
                echo "Python 3 não está instalado. Começando instalação..."
                sudo apt install python3 -y
                if [ $? -eq 0 ]; then
                    echo "Python 3 foi instalado com sucesso."
                else
                    echo "Falha na instalação do Python."
                fi
            fi

            # Verifica se o pip está instalado
                    if command -v pip &>/dev/null; then

            # Instala as bibliotecas Python
                        echo "Instalando bibliotecas Python..."
                        sudo pip install psutil
                        sudo pip install mysql-connector-python
                        sudo pip install tk
                        echo "Todas as bibliotecas foram instaladas com sucesso."
                    else
                        echo "O pip não está instalado. Instalando o PIP e as bibliotecas."
                        sudo apt install python3-pip -y
                            
                        if [ $? -eq 0 ]; then
                            echo "O pip foi instalado com sucesso."
                            echo "Instalando bibliotecas Python..."
                            sudo pip install psutil
                            sudo pip install mysql-connector-python
                            sudo pip install tk              
        
                            echo "Todas as bibliotecas foram instaladas com sucesso."
                        else
                            echo "Falha na instalação do pip."
                        fi
                    fi 
        }

        # Verifica se o Python 3 está instalado
        check_python

        echo "a API de captura instalada com sucesso."

    else
        echo "Você optou por não instalar a API de captura."
    fi

fi
