var fkHospital = null
const ctx = document.getElementById('chartBar');
var labelsBarra = []

var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: dadosBarra,
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

var dadosBarra = {
    labels: labelsBarra,
    datasets:
        [{
            label: "Qtde. de alertas",
            backgroundColor: "red",
            borderColor: "rgba(78, 115, 223, 1)",
            data: []
        }]
};

function obterDadosGraficoBarraDaSemana() {
    var fkHospital = sessionStorage.FK_HOSPITAL

    fetch(`/sofhiaRoute/buscarHospitaisDaSemana`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                limparGraficoBarra()
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                if(fkHospital != "null") {
                    graficoDeBarras.style.display = "none"
                } else {
                    graficoDeBarras.style.display = "block"
                    plotarGraficoBarra(resposta);
                }
                
                tituloGraficoBarras.innerHTML = 'Quantidade de alertas de cada hospital (da semana)'

                // graficoBarrasDia.style.backgroundColor = ""
                graficoBarrasSemana.style.backgroundColor = "#d3d3d3"
                graficoBarrasMes.style.backgroundColor = ""
                graficoBarrasAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterDadosGraficoBarraDoMes() {
    var fkHospital = sessionStorage.FK_HOSPITAL

    fetch(`/sofhiaRoute/buscarHospitaisDoMes`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                limparGraficoBarra()
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                if(fkHospital != "null") {
                    graficoDeBarras.style.display = "none"
                } else {
                    graficoDeBarras.style.display = "block"
                    plotarGraficoBarra(resposta);
                }

                tituloGraficoBarras.innerHTML = 'Quantidade de alertas de cada hospital (dos últimos 30 dias)'

                // graficoBarrasDia.style.backgroundColor = ""
                graficoBarrasSemana.style.backgroundColor = ""
                graficoBarrasMes.style.backgroundColor = "#d3d3d3"
                graficoBarrasAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterDadosGraficoBarraDoAno() {
    var fkHospital = sessionStorage.FK_HOSPITAL

    fetch(`/sofhiaRoute/buscarHospitaisDoAno`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                limparGraficoBarra()
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                if(fkHospital != "null") {
                    graficoDeBarras.style.display = "none"
                } else {
                    graficoDeBarras.style.display = "block"
                    plotarGraficoBarra(resposta);
                }

                tituloGraficoBarras.innerHTML = 'Quantidade de alertas de cada hospital (dos últimos 365 dias)'

                // graficoBarrasDia.style.backgroundColor = ""
                graficoBarrasSemana.style.backgroundColor = ""
                graficoBarrasMes.style.backgroundColor = ""
                graficoBarrasAno.style.backgroundColor = "#d3d3d3"
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
        
}

function limparGraficoBarra() {
    labelsBarra.length = 0;
    dadosBarra.datasets[0].data.length = 0;
}

function plotarGraficoBarra(resposta) {    
    for (let i = 0; i < resposta.length; i++) {
        let chamado = resposta[i].chamados
        let hospital = resposta[i].hospital
        labelsBarra.push(hospital)
        dadosBarra.datasets[0].data.push(chamado)
    }


    myBarChart['data'] = dadosBarra;
    myBarChart.update()
};