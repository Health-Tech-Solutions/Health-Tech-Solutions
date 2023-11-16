let totalMaquinas
let maquinasOK
let TotalChamados
let totalChamadosModelo 
let totalChamadosMaquina
let nomeTipo
let maquinasParadas
let maquinasFuncionando
let fkTipo
var dadosAlterados = {}
let nomeTipo2
let idTipo
let totalChamadosTipo = []


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

    fetch(`/viniciusRoutes/totalChamadosPorTipo/${fkHospital}`)
    .then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                
                plotarDadosBarChamadosTipo(resposta)
                
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })

    console.log('total: '+ totalChamadosTipo)

// Grafico de barras
const ctx = document.getElementById('desempenhoModelo');
var labels = []
var labels2 = []
var dataTipo = []
var myChart
document.addEventListener('DOMContentLoaded', function() {
    // Dados iniciais
    var dadosBar = {
      labels: labels,
      datasets: [{
        label: 'Dados Iniciais',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: dataTipo
      }]
    };

    // Configurações iniciais do gráfico
  var ctx = document.getElementById('myChart').getContext('2d');
   myChart = new Chart(ctx, {
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
        console.log(elements)
        console.log("Evento onClick disparado");
        // Verifica se algum elemento foi clicado'
        if (elements.length > 0) {
          var clickedIndex = elements[0].index;
          if(clickedIndex == 0){
            labels2 = []
            console.log(clickedIndex)
            fkTipo = 1
          dadosAlterados = {
            labels: labels2,
            datasets: [{
              label: 'Dados Alterados',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: [10,22,41,21,16,18,32,12]
            }]
          }} else if (clickedIndex == 1){
            labels2 = []
            console.log(clickedIndex)
            fkTipo = 2
            dadosAlterados = {
                labels: labels2,
                datasets: [{
                    label: 'Dados Alterados',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    data: [10,22,41,21,16,18,32,12]
                }]
            }
            } else if (clickedIndex == 2){
                labels2 = []
                console.log(clickedIndex)
                fkTipo = 3
                dadosAlterados = {
                    labels: labels2,
                    datasets: [{
                        label: 'Dados Alterados',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        data: [10,22,41,21,16,18,32,12]
                    }]
                }
                } else if (clickedIndex == 3){
                    labels2 = []
                    console.log(clickedIndex)
                    fkTipo = 4
                    dadosAlterados = {
                        labels: labels2,
                        datasets: [{
                            label: 'Dados Alterados',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            data: [10,22,41,21,16,18,32,12]
                        }]
                    }
                    } else if (clickedIndex == 4){
                        labels2 = []
                        console.log(clickedIndex)
                        fkTipo = 5
                        dadosAlterados = {
                            labels: labels2,
                            datasets: [{
                                label: 'Dados Alterados',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                                data: [10,22,41,21,16,18,32,12]
                            }]
                        }
                        } else if (clickedIndex == 5){
                            labels2 = []
                            console.log(clickedIndex)
                            fkTipo = 6
                            dadosAlterados = {
                                labels: labels2,
                                datasets: [{
                                    label: 'Dados Alterados',
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                    data: [10,22,41,21,16,18,32,12]
                                }]
                            }
                            } else if (clickedIndex == 6){
                                labels2 = []
                                console.log(clickedIndex)
                                fkTipo = 7
                                dadosAlterados = {
                                    labels: labels2,
                                    datasets: [{
                                        label: 'Dados Alterados',
                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                        borderColor: 'rgba(255, 99, 132, 1)',
                                        borderWidth: 1,
                                        data: [10,22,41,21,16,18,32,12]
                                    }]
                                }
                                } else if (clickedIndex == 7){
                                    labels2 = []
                                    console.log(clickedIndex)
                                    fkTipo = 8
                                    dadosAlterados = {
                                        labels: labels2,
                                        datasets: [{
                                            label: 'Dados Alterados',
                                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                            borderColor: 'rgba(255, 99, 132, 1)',
                                            borderWidth: 1,
                                            data: [10,22,41,21,16,18,32,12]
                                        }]
                                    }}

                                            
        fetch(`/viniciusRoutes/modelosDeMaquinasCadastradas/${fkTipo}/${fkHospital}`)
        .then(function (response) {
            console.log(response)
            console.log(fkTipo, fkHospital)
            if (response.ok) {
                response.json().then(function (resposta) {
                    resposta.reverse();
                    plotarDadosBar2(resposta)
    
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })

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

function plotarDadosBar(resposta) {

    for (let i = 0; i < resposta.length; i++) {
        const element = resposta[i];
        labels.push(element.nome)
    }

    myChart.update()
}

function plotarDadosBar2(resposta) {

    for (let i = 0; i < resposta.length; i++) {
        const element = resposta[i];
        labels2.push(element.modelo)
    }

    myChart.data = dadosAlterados;
    myChart.update();

}

function plotarDadosBarChamadosTipo(resposta) {

    for (let i = 0; i < resposta.length; i++) {
        const element = resposta[i].totalChamadosTipo;
        console.log(element)
        dataTipo.push(element)
    }

    myChart.update();

}

