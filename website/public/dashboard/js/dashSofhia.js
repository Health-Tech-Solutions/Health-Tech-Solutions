var fkHospital = null
const ctx = document.getElementById('chartBar');

var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: dados,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
var labels = []
var dados = {
    labels: labels,
    datasets:
        [{
            label: "Qtde. de alertas",
            backgroundColor: "red",
            borderColor: "rgba(78, 115, 223, 1)",
            data: []

        }]
};


function obterDadosGrafico() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarHospitais/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGrafico(resposta) {
    for (let i = 0; i < resposta.length; i++) {
        let chamado = resposta[i].chamados
        let hospital = resposta[i].hospital
        console.log(dados.datasets[0].data)
        labels.push(hospital)
        dados.datasets[0].data.push(chamado)
    }


    myBarChart['data'] = dados;
    myBarChart.update()
};

function chamarComponenteComMaisAlertas() {
    fetch(`/sofhiaRoute/buscarComponente`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                componenteComMaisAlertas.innerHTML = resposta[0].TipoRegistro
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function chamarTipoComMaisAlertas() {
    fetch(`/sofhiaRoute/buscarTipo`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                tipoComMaisAlertas.innerHTML = resposta[0].tipo;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function chamarModeloComMaisAlertas() {
    fetch(`/sofhiaRoute/buscarModelo`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                modeloComMaisAlertas.innerHTML = resposta[0].modelo;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}


function mudarTituloGraficoBarras() {
    var fkHospital = sessionStorage.FK_HOSPITAL

    if (fkHospital != 'null') {
        tituloGraficoBarras.innerHTML = 'Quantidade de alertas de cada componente'
    } else {
        tituloGraficoBarras.innerHTML = 'Quantidade de alertas de cada hospital'
    }
}

const constante = document.getElementById('chartLinha');

var myLineChart = new Chart(constante, {
    type: 'line',
    data: dados,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
var labels = []
var dados = {
    labels: labels,
    datasets:
        [{
            label: "Qtde. de alertas",
            backgroundColor: "red",
            borderColor: "rgba(78, 115, 223, 1)",
            data: []

        }]
};


function obterDadosGraficoLinha() {
    fetch(`/sofhiaRoute/buscarAlertas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoLinha(resposta) {
    for (let i = 0; i < resposta.length; i++) {
        let chamado = resposta[i].chamados
        console.log(dados.datasets[0].data)
        dados.datasets[0].data.push(chamado)
    }


    myLineChart['data'] = dados;
    myLineChart.update()
};

if(sessionStorage.FK_HOSPITAL == undefined){
    sessionStorage.FK_HOSPITAL = null
  }
  if(sessionStorage.NOME_HOSPITAL == 'null'){
    sessionStorage.NOME_HOSPITAL = 'Todos'
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
                        dropdown_menu.innerHTML = `<option class="dropdown-item" value = "null;null"></option>`; 
                        dropdown_menu.innerHTML += `<option class="dropdown-item" value = "${dropdown_menu.value}">Todos</option>`; 
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
        nome = 'Todos'
    }
    console.log(teste, id, nome)
    sessionStorage.FK_HOSPITAL = id
    sessionStorage.NOME_HOSPITAL = nome
    location.reload()
}