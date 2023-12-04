const { resolve } = require("path");

function chamarComponenteComMaisAlertasDaSemana() {
    return new Promise((resolve, reject) => {
        var fkHospital = sessionStorage.FK_HOSPITAL;
        fetch(`/sofhiaRoute/buscarComponenteDaSemana/${fkHospital}`, { cache: 'no-store' })
            .then(response => {
                if (response.ok) {
                    response.json().then(resposta => {
                        resposta.reverse();
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                        componenteComMaisAlertas.innerHTML = resposta[0].Nome_da_Peca;
                        tituloKPI1.innerHTML = 'Componente com + alertas (da semana)'

                        componenteSemana.style.backgroundColor = "#d3d3d3"
                        componenteMes.style.backgroundColor = ""
                        componenteAno.style.backgroundColor = ""

                        resolve(resposta[0].Nome_da_Peca);
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                    reject('Erro na API');
                }
            })
            .catch(error => {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
                reject(error.message);
            });
            if(componenteComMaisAlertas.value == undefined){
                tituloKPI1.innerHTML = 'Componente com + alertas (da semana)'
                componenteComMaisAlertas.innerHTML = 'Nenhum componente em alerta!'
                    
                componenteSemana.style.backgroundColor = "#d3d3d3"
                componenteMes.style.backgroundColor = ""
                componenteAno.style.backgroundColor = ""
            }
    });
}

function chamarComponenteComMaisAlertasDoMes() {
    return new Promise((resolve, reject) => {
        
        var fkHospital = sessionStorage.FK_HOSPITAL
        fetch(`/sofhiaRoute/buscarComponenteDoMes/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    resposta.reverse();
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    componenteComMaisAlertas.innerHTML = resposta[0].Nome_da_Peca
                    
                    tituloKPI1.innerHTML = 'Componente com + alertas (dos últimos 30 dias)'
                    
                    componenteSemana.style.backgroundColor = ""
                    componenteMes.style.backgroundColor = "#d3d3d3"
                    componenteAno.style.backgroundColor = ""

                    resolve(resposta[0].Nome_da_Peca);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(componenteComMaisAlertas.value == undefined){
            tituloKPI1.innerHTML = 'Componente com + alertas (dos últimos 30 dias)'
            componenteComMaisAlertas.innerHTML = 'Nenhum componente em alerta!'
            
            componenteSemana.style.backgroundColor = ""
            componenteMes.style.backgroundColor = "#d3d3d3"
            componenteAno.style.backgroundColor = ""
        }
    })  
}

function chamarComponenteComMaisAlertasDoAno() {
    return new Promise((resolve, reject) => {
        
        var fkHospital = sessionStorage.FK_HOSPITAL
        fetch(`/sofhiaRoute/buscarComponenteDoAno/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                componenteComMaisAlertas.innerHTML = resposta[0].Nome_da_Peca
                
                tituloKPI1.innerHTML = 'Componente com + alertas (dos últimos 365 dias)'

                    componenteSemana.style.backgroundColor = ""
                    componenteMes.style.backgroundColor = ""
                    componenteAno.style.backgroundColor = "#d3d3d3"

                    resolve(resposta[0].Nome_da_Peca);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
    if(componenteComMaisAlertas.value == undefined){
            tituloKPI1.innerHTML = 'Componente com + alertas (dos últimos 365 dias)'
            componenteComMaisAlertas.innerHTML = 'Nenhum componente em alerta!'
            
            componenteSemana.style.backgroundColor = ""
            componenteMes.style.backgroundColor = ""
            componenteAno.style.backgroundColor = "#d3d3d3"
        }
    })
}

function chamarTipoComMaisAlertasDaSemana() {
    return new Promise((resolve, reject) => {

        var fkHospital = sessionStorage.FK_HOSPITAL
        fetch(`/sofhiaRoute/buscarTipoDaSemana/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    resposta.reverse();
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    
                    tipoComMaisAlertas.innerHTML = resposta[0].tipo;
                    
                    tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (da semana)'
                    
                    tipoSemana.style.backgroundColor = "#d3d3d3"
                    tipoMes.style.backgroundColor = ""
                    tipoAno.style.backgroundColor = ""

                    resolve(resposta[0].tipo);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(tipoComMaisAlertas.value == undefined){
            tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (da semana)'
            tipoComMaisAlertas.innerHTML = 'Nenhum tipo de máquina em alerta!'
            
            tipoSemana.style.backgroundColor = "#d3d3d3"
            tipoMes.style.backgroundColor = ""
            tipoAno.style.backgroundColor = ""
            
        }
    })
}

function chamarTipoComMaisAlertasDoMes() {
    return new Promise((resolve, reject) => {
        
        var fkHospital = sessionStorage.FK_HOSPITAL
        fetch(`/sofhiaRoute/buscarTipoDoMes/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                    tipoComMaisAlertas.innerHTML = resposta[0].tipo;
                    
                    tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (dos últimos 30 dias)'
                    
                    tipoSemana.style.backgroundColor = ""
                    tipoMes.style.backgroundColor = "#d3d3d3"
                    tipoAno.style.backgroundColor = ""

                    resolve(resposta[0].tipo);
                });
            } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(tipoComMaisAlertas.value == undefined){
            tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (dos últimos 30 dias)'
            tipoComMaisAlertas.innerHTML = 'Nenhum tipo de máquina em alerta!'
            
            tipoSemana.style.backgroundColor = ""
            tipoMes.style.backgroundColor = "#d3d3d3"
            tipoAno.style.backgroundColor = ""
        }
    })
}

function chamarTipoComMaisAlertasDoAno() {
    return new Promise((resolve, reject) => {
        
        var fkHospital = sessionStorage.FK_HOSPITAL
        fetch(`/sofhiaRoute/buscarTipoDoAno/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                tipoComMaisAlertas.innerHTML = resposta[0].tipo;

                tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (dos últimos 365 dias)'

                tipoSemana.style.backgroundColor = ""
                tipoMes.style.backgroundColor = ""
                tipoAno.style.backgroundColor = "#d3d3d3"

                resolve(resposta[0].tipo);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(tipoComMaisAlertas.value == undefined){
            tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (dos últimos 365 dias)'
            tipoComMaisAlertas.innerHTML = 'Nenhum tipo de máquina em alerta!'
            
            tipoSemana.style.backgroundColor = ""
            tipoMes.style.backgroundColor = ""
            tipoAno.style.backgroundColor = "#d3d3d3"
        }
    })
}

function chamarModeloComMaisAlertasDaSemana() {
    return new Promise((resolve, reject) => {
        
        var fkHospital = sessionStorage.FK_HOSPITAL
        fetch(`/sofhiaRoute/buscarModeloDaSemana/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                modeloComMaisAlertas.innerHTML = resposta[0].modelo;
                
                tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (da semana)'
                
                modeloSemana.style.backgroundColor = "#d3d3d3"
                modeloMes.style.backgroundColor = ""
                modeloAno.style.backgroundColor = ""
                
                resolve(resposta[0].modelo);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
    if(modeloComMaisAlertas.value == undefined){
            tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (da semana)'
            modeloComMaisAlertas.innerHTML = 'Nenhum modelo de máquina em alerta!'
            
            modeloSemana.style.backgroundColor = "#d3d3d3"
            modeloMes.style.backgroundColor = ""
            modeloAno.style.backgroundColor = ""
        }
    })
}

function chamarModeloComMaisAlertasDoMes() {
    return new Promise((resolve, reject) => {
        
        var fkHospital = sessionStorage.FK_HOSPITAL
        fetch(`/sofhiaRoute/buscarModeloDoMes/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                modeloComMaisAlertas.innerHTML = resposta[0].modelo;
                
                tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (dos últimos 30 dias)'
                
                modeloSemana.style.backgroundColor = ""
                modeloMes.style.backgroundColor = "#d3d3d3"
                modeloAno.style.backgroundColor = ""
                
                resolve(resposta[0].modelo);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
    if(modeloComMaisAlertas.value == undefined){
            tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (do mês)'
            modeloComMaisAlertas.innerHTML = 'Nenhum modelo de máquina em alerta!'
            
            modeloSemana.style.backgroundColor = ""
            modeloMes.style.backgroundColor = "#d3d3d3"
            modeloAno.style.backgroundColor = ""
        }
    })
}

function chamarModeloComMaisAlertasDoAno() {
    return new Promise((resolve, reject) => {
        
        var fkHospital = sessionStorage.FK_HOSPITAL
        fetch(`/sofhiaRoute/buscarModeloDoAno/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                modeloComMaisAlertas.innerHTML = resposta[0].modelo;

                tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (dos últimos 365 dias)'
                
                modeloSemana.style.backgroundColor = ""
                modeloMes.style.backgroundColor = ""
                modeloAno.style.backgroundColor = "#d3d3d3"

                resolve(resposta[0].modelo);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
    if(modeloComMaisAlertas.value == undefined){
            tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (do ano)'
            modeloComMaisAlertas.innerHTML = 'Nenhum modelo de máquina em alerta!'
            
            modeloSemana.style.backgroundColor = ""
            modeloMes.style.backgroundColor = ""
            modeloAno.style.backgroundColor = "#d3d3d3"
        }
    })
}
    

if(sessionStorage.FK_HOSPITAL == undefined){
    sessionStorage.FK_HOSPITAL = null
  }
  if(sessionStorage.NOME_HOSPITAL == 'null'){
    sessionStorage.NOME_HOSPITAL = 'Todos Hospitais'
  }
  dropdown_menu.innerHTML = `<option class="dropdown-item"  value = "0" >${sessionStorage.NOME_HOSPITAL}</option>`; 

function listarHospitais(){
    fetch(`/sofhiaRoute/listarHospitais`)
    .then(  
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(

                    function(resposta){
                        console.log(resposta)
                        dropdown_menu.innerHTML = ""
                        dropdown_menu.innerHTML = `<option class="dropdown-item" value = "null;null">-----------</option>`; 
                        dropdown_menu.innerHTML += `<option class="dropdown-item" value = "${dropdown_menu.value}">Todos Hospitais</option>`;
                  
                        for (let i = 0; i < resposta.length; i++) {
                            let nome = resposta[i].nomeFantasia
                            let id = resposta[i].idEmpresa
                            dropdown_menu.innerHTML += `<option class="dropdown-item" value = "${id};${nome}" >${nome}</option>` 
                        }
                    }
                   
                )
            }
        }
    )
    .catch(
        err => {
            console.log("ERRO" + err)
        }
    )
}

function trocarHospital(){  
    let teste = dropdown_menu.value.split(';')
    let id = teste[0]
    let nome = teste[1]
    if(nome == 'null'){
        nome = 'Todos Hospitais'
    }
    console.log(teste, id, nome)
    sessionStorage.FK_HOSPITAL = id
    sessionStorage.NOME_HOSPITAL = nome

    location.reload()
}




function gerarRelatorio() {
    Promise.all([
        chamarComponenteComMaisAlertasDaSemana(),
        chamarComponenteComMaisAlertasDoMes(),
        chamarComponenteComMaisAlertasDoAno(),
        chamarTipoComMaisAlertasDaSemana(),
        chamarTipoComMaisAlertasDoMes(),
        chamarTipoComMaisAlertasDoAno(),
        chamarModeloComMaisAlertasDaSemana(),
        chamarModeloComMaisAlertasDoMes(),
        chamarModeloComMaisAlertasDoAno()
    ])
        .then(resultados => {
            const [componenteSemana, componenteMes, componenteAno, tipoSemana, tipoMes, tipoAno, modeloSemana, modeloMes, modeloAno] = resultados;


            const conteudo = 
            "RELATÓRIO DE ALERTAS (KPIs)\n\n" +

            "Componente com mais alertas: "  + "\n" + 
            "Da semana- " + componenteSemana + "\n" + 
            "Dos últimos 30 dias- " + componenteMes + "\n" + 
            "Dos últimos 365 dias- " + componenteAno + "\n\n" + 

            "Tipo de máquina com mais alertas: " + "\n" +
            "Da semana- " + tipoSemana + "\n" + 
            "Dos últimos 30 dias- " + tipoMes + "\n" + 
            "Dos últimos 365 dias- " + tipoAno + "\n\n" + 

            "Modelo de máquina com mais alertas: " + "\n" +
            "Da semana- " + modeloSemana + "\n" +
            "Dos últimos 30 dias- " + modeloMes + "\n" +
            "Dos últimos 365 dias- " + modeloAno;


            const blob = new Blob([conteudo], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "relatorio.txt";

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        })
        .catch(error => {
            console.error(`Erro ao gerar relatório: ${error}`);
        });
}

  // Função para gerar e baixar o arquivo TXT
//  function gerarRelatorio() {
//     // Conteúdo do arquivo TXT
//     const conteudo = "Componente com mais alertas da semana:" + chamarComponenteComMaisAlertasDaSemana();


//     // Cria um objeto Blob com o conteúdo do arquivo
//     const blob = new Blob([conteudo], { type: "text/plain" });

//     // Cria um link para download do arquivo
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);

//     // Define o nome do arquivo
//     link.download = "relatorio.txt";

//     // Adiciona o link à página e simula um clique para iniciar o download
//     document.body.appendChild(link);
//     link.click();

//     // Remove o link da página
//     document.body.removeChild(link);
//   }

