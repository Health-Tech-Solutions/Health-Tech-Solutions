#!/bin/bash

PURPLE='0;35'
NC='\033[0m' 
VERSAO=11

echo  "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Olá Aluno, serei seu assistente para instalação da API de monitoramento!;"
echo  "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Gostaria de instalar a API de captura? [s/n];" 
read get

if [ -d "API-" ]; then
    echo  "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) O repositório já existe. Você gostaria de atualizá-lo? [s/n];" 
    read update

    if [ "$update" == "s" ]; then
        echo  "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Atualizando o repositório...;"
        cd API-
        git pull
        cd ..
    else
        echo  "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Você optou por não atualizar o repositório;"
    fi

else

    if [ "$get" == "s" ]; then

        # Clona o repositório do GitHub
        echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Clonando o repositório do GitHub..."
        git clone https://github.com/Health-Tech-Solutions/API-.git
        mv "Coleta de Dados" ../API
        cd ..
        cd API
        sudo apt-get install python3-mysql.connector

        check_java() {
            if command -v java &>/dev/null; then
                echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Java já está instalado."
            else
                echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Java não está instalado. Começando instalação..."
                sudo apt install openjdk-11-jdk -y
                if [ $? -eq 0 ]; then
                    echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Java foi instalado com sucesso."
                else
                    echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Falha na instalação do Java."
                fi
            fi
        }

        # Verifica se o java está instalado
        check_java

        echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) a API de captura instalada com sucesso."

    else
        echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Você optou por não instalar a API de captura."
    fi

fi
