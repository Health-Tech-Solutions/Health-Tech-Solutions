let totalMaquinas
let maquinasOK
let TotalChamados
let totalChamadosModelo 
let totalChamadosMaquina
let nomeTipo
let maquinasParadas
let maquinasFuncionando




var fkHospital = sessionStorage.getItem("FK_HOSPITAL");
var tipo = "Monitor de S.V";
var nomeModelo = "IntelliVue MP5SC"


fetch(`/viniciusRoutes/chamadosAbertos/${fkHospital}`)
    .then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                TotalChamados = resposta[0].totalChamados
                totalChamados.innerHTML = TotalChamados
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })

fetch(`/viniciusRoutes/pegarDadosMaquinas/${fkHospital}`)
    .then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta[0])}`);
                console.log(componenteComMaisAlertas)
                componenteComMaisAlertas.innerHTML = resposta[0].total
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })


fetch(`/viniciusRoutes/estadoMaquinas/${fkHospital}`)
    .then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();

                plotarDadosPie(resposta)
                
                    chartPie.update()

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })


fetch(`/viniciusRoutes/taxaMaquinasOperando/${fkHospital}`)
    .then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                totalMaquinas = resposta[0].totalMaquinas
                maquinasOK = resposta[0].maquinasOK

                let porcentagemExibicao = (maquinasOK / totalMaquinas) * 100

                if (totalMaquinas == 0) {
                    porcentagemExibicao = 0
                }

                if (porcentagemExibicao > 100) {
                    porcentagemExibicao = 100
                }

                porcentagemMaquinasOperando.innerHTML = porcentagemExibicao.toFixed(2) + '%'

                let color
                if (porcentagemExibicao < 60) {
                    color = '#e74a3b'
                } else if (porcentagemExibicao < 80) {
                    color = '#FFC107'
                } else {
                    color = '#4CAF50'
                }

                barraProgressao.style = `background: ${color}; width: ${porcentagemExibicao}%;`


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })

    
    fetch(`/viniciusRoutes/tiposDeMaquinasCadastradas/${fkHospital}`)
    .then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log("DADOSSSSS" + resposta)
                plotarDadosBar(resposta)

                // let idTipo = resposta[0].idTipo
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })

    fetch(`/viniciusRoutes/chamadosAbertos/${fkHospital}`)
    .then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                TotalChamados = resposta[0].totalChamados
                totalChamados.innerHTML = TotalChamados
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })

    // fetch(`/viniciusRoutes/dadosQuantidadeChamados/${tipo}/${modelo}/${fkHospital}`)
    // .then(function (response) {
    //     console.log(response)
    //     if (response.ok) {
    //         response.json().then(function (resposta) {
    //             resposta.reverse();
    //             totalChamadosMaquina = resposta[0].chamadosPorMaquina
    //             totalChamadosModelo  = resposta[0].chamadosPorModelo
                
    //             plotarDadosBar2(resposta)

    //         });
    //     } else {
    //         console.error('Nenhum dado encontrado ou erro na API');
    //     }
    // })



// Grafico de barras
const ctx = document.getElementById('desempenhoModelo');
var labels = []
var data = [10,22,41,21,16,18,32,12]
document.addEventListener('DOMContentLoaded', function() {
    // Dados iniciais
    var dadosBar = {
      labels: ['Monitor de S.V', 'Monitor C.', 'Monitor F.', 'Desfibriladores', 'Cardioversores', 'Ultrassom', 'Máquina de A.', 'Máquinas ECG'],
      datasets: [{
        label: 'Dados Iniciais',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: data
      }]
    };

    // Configurações iniciais do gráfico
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: dadosBar,
    options: {
        onHover: function (event, elements) {
            if (elements && elements[0]) {
                document.getElementById('myChart').style.cursor = 'pointer';
            } else {
                document.getElementById('myChart').style.cursor = 'default';
            }
        
    },
      onClick: function(event, elements) {
        // Verifica se algum elemento foi clicado
        if (elements.length > 0) {
          var clickedIndex = elements[0]._index;
          
          // Aqui, você pode alterar os dados conforme necessário
          // Vamos apenas inverter os valores como exemplo
          var dadosAlterados = {
            labels: dadosBar.labels,
            datasets: [{
              label: 'Dados Alterados',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: dadosBar.datasets[0].data.map(function(value) {
                return value * 2;
              })
            }]
          };

          // Atualiza o gráfico com os novos dados
          myChart.data = dadosAlterados;
          myChart.update();
        }
      }
    }
  });



  // Função para restaurar os dados primordiais
  window.restaurarDados = function() {
    myChart.data = dadosBar;
    myChart.update();
  };
});


if (sessionStorage.FK_HOSPITAL == undefined) {
    sessionStorage.FK_HOSPITAL = null
}
if (sessionStorage.NOME_HOSPITAL == 'null') {
    sessionStorage.NOME_HOSPITAL = 'Todos'
}
dropdown_menu.innerHTML = `<option class="dropdown-item"  value = "0" >${sessionStorage.NOME_HOSPITAL}</option>`;



// listarHospitais()
var qtdTotalMaquinas;

function listarHospitais() {
    fetch(`/hospitais/listarHospitais`)
        .then(
            function (resposta) {
                if (resposta.ok) {
                    resposta.json()
                        .then(

                            function (resposta) {
                                console.log(resposta)
                                dropdown_menu.innerHTML = `<option class="dropdown-item"  value = "null;null"></option>`;
                                dropdown_menu.innerHTML += `<option class="dropdown-item"  value = "${dropdown_menu.value}" >Todos</option>`;
                                for (let i = 0; i < resposta.length; i++) {
                                    let nome = resposta[i].nomeFantasia
                                    let id = resposta[i].idEmpresa
                                    dropdown_menu.innerHTML += `<option class="dropdown-item"  value = "${id};${nome}" >${nome}</option>`
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

function trocarHospital() {

    let teste = dropdown_menu.value.split(';')
    let id = teste[0]
    let nome = teste[1]
    if (nome == 'null') {
        nome = 'Todos'
    }
    console.log(teste, id, nome)
    sessionStorage.FK_HOSPITAL = id
    sessionStorage.NOME_HOSPITAL = nome
    location.reload()
}




const configPie = document.getElementById('chartPie');

var dadosPie = {
    datasets: [{
        label: 'Estados das máquinas',
        data: [],
        backgroundColor: [
            '#1cc88a',
            '#e74a3b'
           
        ],
        borderWidth: 1
    }]
}

var chartPie = new Chart(configPie, {
    type: 'pie',
    data: dadosPie,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                display: false

            }
        },
        plugins: {
            legend: {

            }
        }
    }
});

function plotarDadosPie(resposta) {
    for (let index = 0; index < resposta.length; index++) {
        let maquinasFuncionando = resposta[index].maquinasFuncionando;
        let maquinasParadas = resposta[index].maquinasParadas;

        dadosPie.datasets[0].data.push(maquinasFuncionando)
        dadosPie.datasets[0].data.push(maquinasParadas)

    }

    chartPie.update()
}

// function plotarDadosBar(resposta) {

//     for (let i = 0; i < resposta.length; i++) {
//         const element = resposta[i];
//         labels.push(element.nome)
//     }

//     chartPie.update()
// }

// function plotarDadosBar2(resposta) {

//     for (let i = 0; i < resposta.length; i++) {
//         const element = resposta[i];
//         data.push(element.chamadosPorModelo)
//     }

//     chartPie.update()
// }

