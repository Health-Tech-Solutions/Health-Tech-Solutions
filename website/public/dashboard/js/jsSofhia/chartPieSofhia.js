const configPie = document.getElementById('chartPie');

var dadosPizza = {
    labels: [],
    datasets: [{
        label: '',
        data: [],
        backgroundColor: [
            '#DC143C',   
            '#8B0000',   
            '#C71585'   
        ],
        borderWidth: 1
    }]
}
var graficoPizza = new Chart(configPie, {
    type: 'pie',
    data: dadosPizza,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                display: false

            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        hover: false
    }
});

function buscarAlertasDosComponentesDoDia() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarAlertaComponenteDoDia/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoPizza(resposta)
                tituloGraficoPizza.innerHTML = 'Alertas de cada componente (de hoje)'

                graficoPizzaDia.style.backgroundColor = "#d3d3d3"
                graficoPizzaSemana.style.backgroundColor = ""
                graficoPizzaMes.style.backgroundColor = ""
                graficoPizzaAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        
    
}

function buscarAlertasDosComponentesDaSemana() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarAlertaComponenteDaSemana/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoPizza(resposta)
                tituloGraficoPizza.innerHTML = 'Alertas de cada componente (da semana)'

                graficoPizzaDia.style.backgroundColor = ""
                graficoPizzaSemana.style.backgroundColor = "#d3d3d3"
                graficoPizzaMes.style.backgroundColor = ""
                graficoPizzaAno.style.backgroundColor = ""
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        
    
}

function buscarAlertasDosComponentesDoMes() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarAlertaComponenteDoMes/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoPizza(resposta)

                tituloGraficoPizza.innerHTML = 'Alertas de cada componente (dos últimos 30 dias)'

                graficoPizzaDia.style.backgroundColor = ""
                graficoPizzaSemana.style.backgroundColor = ""
                graficoPizzaMes.style.backgroundColor = "#d3d3d3"
                graficoPizzaAno.style.backgroundColor = ""

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        
}

function buscarAlertasDosComponentesDoAno() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarAlertaComponenteDoAno/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoPizza(resposta)

                tituloGraficoPizza.innerHTML = 'Alertas de cada componente (dos últimos 365 dias)'

                graficoPizzaDia.style.backgroundColor = ""
                graficoPizzaSemana.style.backgroundColor = ""
                graficoPizzaMes.style.backgroundColor = ""
                graficoPizzaAno.style.backgroundColor = "#d3d3d3"
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
        
}

function plotarGraficoPizza(resposta){
    let labelsPie = []
    
    dadosPizza.datasets[0].data = []

    for (let index = 0; index < resposta.length; index++) {
        let qtdComponente = resposta[index].quantidade;
        let nomePeca = resposta[index].nomePeca;

        labelsPie.push(nomePeca)
        dadosPizza.datasets[0].data.push(qtdComponente)
       
    }
    dadosPizza.labels = labelsPie
    graficoPizza.update()
}

