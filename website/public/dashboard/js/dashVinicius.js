let totalMaquinas
let maquinasOperando
let TotalChamados


var fkHospital = sessionStorage.getItem("FK_HOSPITAL");


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

                    for (let index = 0; index < resposta.length; index++) {
                        let maquinasOperando = resposta[index].maquinasOperando;
                        let maquinasParadas = resposta[index].maquinasParadas;
                
                        dadosPie.datasets[0].data.push(maquinasOperando)
                        dadosPie.datasets[0].data.push(maquinasParadas)
                
                        console.log(maquinasOperando, maquinasParadas)
                
                    }
                
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
                maquinasOperando = resposta[0].maquinasOperando

                let porcentagemExibicao = (maquinasOperando / totalMaquinas) * 100

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



// Grafico de barras
const ctx = document.getElementById('desempenhoModelo');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Monitor de S.V', 'Monitor C.', 'Monitor F.', 'Desfibriladores', 'Cardioversores', 'Ultrassom', 'Máquina de A.', 'Máquinas ECG'],
        datasets: [{
            label: 'Desenpenho dos modelos',
            data: [12, 19, 3, 5, 2, 3, 7, 4],
            backgroundColor: 'rgba(220, 0, 0, 0.60)',
            borderWidth: 1
        }]
    },
    options: {

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
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
        label: '',
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
        let maquinasOperando = resposta[index].maquinasOperando;
        let maquinasParadas = resposta[index].maquinasParadas;

        dadosPie.datasets[0].data.push(maquinasOperando)
        dadosPie.datasets[0].data.push(maquinasParadas)

        console.log(maquinasOperando, maquinasParadas)

    }

    chartPie.update()
}
