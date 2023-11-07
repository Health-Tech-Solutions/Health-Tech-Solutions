const configPie = document.getElementById('chartPie');

var dadosPizza = {
    labels: [],
    datasets: [{
        label: '',
        data: [],
        backgroundColor: [
            '#1cc88a',
            '#f6c23e',
            '#e74a3b'              
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
        }
    }
});

function buscarAlertasDosComponentes(fkHospital) {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarAlertaComponente/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

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
    for (let index = 0; index < resposta.length; index++) {
        let cpu = resposta[index].CPU;
        let ram = resposta[index].RAM;
        let disco = resposta[index].DISCO;

        dadosPie.datasets[0].data.push(cpu)
        dadosPie.datasets[0].data.push(ram)
        dadosPie.datasets[0].data.push(disco)
    }

    chartPie.update()
    
}

