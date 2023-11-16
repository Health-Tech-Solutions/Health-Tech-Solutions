function chamarComponenteComMaisAlertasDoDia() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarComponenteDoDia/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        
                        componenteComMaisAlertas.innerHTML = resposta[0].Nome_da_Peca
                 

                    tituloKPI1.innerHTML = 'Componente com + alertas (de hoje)'

                    componenteDia.style.backgroundColor = "#d3d3d3"
                    componenteSemana.style.backgroundColor = ""
                    componenteMes.style.backgroundColor = ""
                    componenteAno.style.backgroundColor = ""
                

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(componenteComMaisAlertas.value == undefined){
            componenteComMaisAlertas.innerHTML = 'Nenhum componente em alerta!'
        }
       
}

function chamarComponenteComMaisAlertasDaSemana() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarComponenteDaSemana/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    componenteComMaisAlertas.innerHTML = resposta[0].Nome_da_Peca

                    tituloKPI1.innerHTML = 'Componente com + alertas (da semana)'

                    componenteDia.style.backgroundColor = ""
                    componenteSemana.style.backgroundColor = "#d3d3d3"
                    componenteMes.style.backgroundColor = ""
                    componenteAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(componenteComMaisAlertas.value == undefined){
            componenteComMaisAlertas.innerHTML = 'Nenhum componente em alerta!'
        }
}

function chamarComponenteComMaisAlertasDoMes() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarComponenteDoMes/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    componenteComMaisAlertas.innerHTML = resposta[0].Nome_da_Peca

                    tituloKPI1.innerHTML = 'Componente com + alertas (dos últimos 30 dias)'

                    componenteDia.style.backgroundColor = ""
                    componenteSemana.style.backgroundColor = ""
                    componenteMes.style.backgroundColor = "#d3d3d3"
                    componenteAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(componenteComMaisAlertas.value == undefined){
            componenteComMaisAlertas.innerHTML = 'Nenhum componente em alerta!'
        }
    
}

function chamarComponenteComMaisAlertasDoAno() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarComponenteDoAno/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    componenteComMaisAlertas.innerHTML = resposta[0].Nome_da_Peca

                    tituloKPI1.innerHTML = 'Componente com + alertas (dos últimos 365 dias)'

                    componenteDia.style.backgroundColor = ""
                    componenteSemana.style.backgroundColor = ""
                    componenteMes.style.backgroundColor = ""
                    componenteAno.style.backgroundColor = "#d3d3d3"
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(componenteComMaisAlertas.value == undefined){
            componenteComMaisAlertas.innerHTML = 'Nenhum componente em alerta!'
        }
}

function chamarTipoComMaisAlertasDoDia() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarTipoDoDia/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                    tipoComMaisAlertas.innerHTML = resposta[0].tipo;

                    tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (de hoje)'

                    tipoDia.style.backgroundColor = "#d3d3d3"
                    tipoSemana.style.backgroundColor = ""
                    tipoMes.style.backgroundColor = ""
                    tipoAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(tipoComMaisAlertas.value == undefined){
            tipoComMaisAlertas.innerHTML = 'Nenhum tipo de máquina em alerta!'
        }
}

function chamarTipoComMaisAlertasDaSemana() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarTipoDaSemana/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                    tipoComMaisAlertas.innerHTML = resposta[0].tipo;

                    tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (da semana)'

                    tipoDia.style.backgroundColor = ""
                    tipoSemana.style.backgroundColor = "#d3d3d3"
                    tipoMes.style.backgroundColor = ""
                    tipoAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(tipoComMaisAlertas.value == undefined){
            tipoComMaisAlertas.innerHTML = 'Nenhum tipo de máquina em alerta!'
        }
}

function chamarTipoComMaisAlertasDoMes() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarTipoDoMes/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                    tipoComMaisAlertas.innerHTML = resposta[0].tipo;

                    tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (dos últimos 30 dias)'

                    tipoDia.style.backgroundColor = ""
                    tipoSemana.style.backgroundColor = ""
                    tipoMes.style.backgroundColor = "#d3d3d3"
                    tipoAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(tipoComMaisAlertas.value == undefined){
            tipoComMaisAlertas.innerHTML = 'Nenhum tipo de máquina em alerta!'
        }
}

function chamarTipoComMaisAlertasDoAno() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarTipoDoAno/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                    tipoComMaisAlertas.innerHTML = resposta[0].tipo;

                    tituloKPI2.innerHTML = 'Tipo de máquina com + alertas (dos últimos 365 dias)'

                    tipoDia.style.backgroundColor = ""
                    tipoSemana.style.backgroundColor = ""
                    tipoMes.style.backgroundColor = ""
                    tipoAno.style.backgroundColor = "#d3d3d3"
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(tipoComMaisAlertas.value == undefined){
            tipoComMaisAlertas.innerHTML = 'Nenhum tipo de máquina em alerta!'
        }
}

function chamarModeloComMaisAlertasDoDia() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarModeloDoDia/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                modeloComMaisAlertas.innerHTML = resposta[0].modelo;
                
                tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (de hoje)'

                modeloDia.style.backgroundColor = "#d3d3d3"
                modeloSemana.style.backgroundColor = ""
                modeloMes.style.backgroundColor = ""
                modeloAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(modeloComMaisAlertas.value == undefined){
            modeloComMaisAlertas.innerHTML = 'Nenhum modelo de máquina em alerta!'
        }
}

function chamarModeloComMaisAlertasDaSemana() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarModeloDaSemana/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                modeloComMaisAlertas.innerHTML = resposta[0].modelo;

                tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (da semana)'

                modeloDia.style.backgroundColor = ""
                modeloSemana.style.backgroundColor = "#d3d3d3"
                modeloMes.style.backgroundColor = ""
                modeloAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(modeloComMaisAlertas.value == undefined){
            modeloComMaisAlertas.innerHTML = 'Nenhum modelo de máquina em alerta!'
        }
}

function chamarModeloComMaisAlertasDoMes() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarModeloDoMes/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                modeloComMaisAlertas.innerHTML = resposta[0].modelo;

                tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (do mês)'

                modeloDia.style.backgroundColor = ""
                modeloSemana.style.backgroundColor = ""
                modeloMes.style.backgroundColor = "#d3d3d3"
                modeloAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(modeloComMaisAlertas.value == undefined){
            modeloComMaisAlertas.innerHTML = 'Nenhum modelo de máquina em alerta!'
        }
}

function chamarModeloComMaisAlertasDoAno() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarModeloDoAno/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                modeloComMaisAlertas.innerHTML = resposta[0].modelo;

                tituloKPI3.innerHTML = 'Modelo de máquina com + alertas (do ano)'

                modeloDia.style.backgroundColor = ""
                modeloSemana.style.backgroundColor = ""
                modeloMes.style.backgroundColor = ""
                modeloAno.style.backgroundColor = "#d3d3d3"
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        if(modeloComMaisAlertas.value == undefined){
            modeloComMaisAlertas.innerHTML = 'Nenhum modelo de máquina em alerta!'
        }
}

// function mudarTituloGraficoBarras(fkHospital) {
//     var fkHospital = sessionStorage.FK_HOSPITAL
//     if (fkHospital == 'null') {
//         tituloGraficoBarras.innerHTML = 'Quantidade de alertas de cada hospital'
//     } else {
//         tituloGraficoBarras.innerHTML = 'Quantidade de alertas de cada componente'
//     }
// }


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
                        // dropdown_menu.innerHTML = `<option class="dropdown-item" value = "${dropdown_menu.value}">Todos</option>`; 
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