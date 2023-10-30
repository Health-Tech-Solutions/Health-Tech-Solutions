#!/bin/bash

echo "Gostaria de instalar o projeto? [s/n]" 
read get

if [ "$get" == "s" ]; then

    # Clona o repositório do GitHub
    echo "Clonando o repositório do GitHub..."
    git clone https://github.com/Health-Tech-Solutions/Health-Tech-Solutions.git
    npm i

    # Função para verificar se o Java está instalado / instalar
    check_java() {
        if java -version &>/dev/null; then
            echo "Java já está instalado."
        else
            echo "Java não está instalado. Começando instalação..."
            sudo apt install openjdk-17-jre -y
            if [ $? -eq 0 ]; then
                echo "Java foi instalado com sucesso."
            else
                echo "Falha na instalação do Java."
            fi
        fi
    }

    # Função para verificar se o MySQL Client está instalado / instalar
    check_mysql_client() {
        if command -v mysql &>/dev/null; then
            echo "MySQL Client já está instalado."
        else
            echo "MySQL Client não está instalado. Começando instalação..."
            sudo apt install mysql-client -y
            if [ $? -eq 0 ]; then
                echo "MySQL Client foi instalado com sucesso."
            else
                echo "Falha na instalação do MySQL Client."
            fi
        fi
    }

    # Função para verificar se o Python 3 está instalado / instalar
    check_python() {
        if command -v python3 &>/dev/null; then
            echo "Python 3 já está instalado."
        else
            echo "Python 3 não está instalado. Começando instalação..."
            sudo apt install python3 -y
            if [ $? -eq 0 ]; then
                echo "Python 3 foi instalado com sucesso."
                
                # Verifica se o pip está instalado
                if command -v pip &>/dev/null; then
                    # Instala as bibliotecas Python
                    echo "Instalando bibliotecas Python..."
                    pip install psutil
                    pip install mysql-connector-python
                    pip install tk
                    pip install json
                    echo "Todas as bibliotecas foram instaladas com sucesso."
                else
                    echo "O pip não está instalado. Instale manualmente as bibliotecas Python."
                fi

            else
                echo "Falha na instalação do Python."
            fi
        fi
    }

    # Verifica se o Java está instalado
    check_java

    # Verifica se o MySQL Client está instalado
    check_mysql_client

    # Verifica se o Python 3 está instalado
    check_python

    echo "Projeto instalado com sucesso."

else
    echo "Você optou por não instalar o projeto."
fi
