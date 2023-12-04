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


        # Função para verificar se o Python 3 está instalado / instalar
        check_python() {
            if command -v python3 &>/dev/null; then
                echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Python 3 já está instalado."
            else
                echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Python 3 não está instalado. Começando instalação..."
                sudo apt install python3 -y
                if [ $? -eq 0 ]; then
                    echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Python 3 foi instalado com sucesso."
                else
                    echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Falha na instalação do Python."
                fi
            fi

            # Verifica se o pip está instalado
                    if command -v pip &>/dev/null; then

            # Instala as bibliotecas Python
                        echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Instalando bibliotecas Python..."
                        python.exe -m pip install --upgrade pip
                        pip install psutil
                        pip install mysql-connector-python
                        pip install tk            
                        pip install requests
                        pip install requests
                        pip install schedule  
                        echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Todas as bibliotecas foram instaladas com sucesso."
                    else
                        echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) O pip não está instalado. Instalando o PIP e as bibliotecas."
                        sudo apt install python3-pip -y
                            
                        if [ $? -eq 0 ]; then
                            echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) O pip foi instalado com sucesso."
                            echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Instalando bibliotecas Python..."
                            python.exe -m pip install --upgrade pip
                            pip install psutil
                            pip install mysql-connector-python
                            pip install tk            
                            pip install requests
                            pip install requests
                            pip install schedule  
        
                            echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Todas as bibliotecas foram instaladas com sucesso."
                        else
                            echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Falha na instalação do pip."
                        fi
                    fi 
        }

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

        # Verifica se o Python e o java estão instalados
        check_python
        check_java

        echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) a API de captura instalada com sucesso."

    else
        echo "$(tput setaf 10)[HTS Assistente]:$(tput setaf 7) Você optou por não instalar a API de captura."
    fi

fi
