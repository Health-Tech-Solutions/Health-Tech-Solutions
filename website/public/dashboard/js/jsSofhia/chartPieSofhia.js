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

function buscarAlertasDosComponentes(fkHospital) {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarAlertaComponente/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoPizza(resposta)

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
    let labels = []
    dadosPizza.labels = labels
    dadosPizza.datasets[0].data = []

    for (let index = 0; index < resposta.length; index++) {
        let cpu = resposta[index].Total_de_Chamados_CPU;
        let ram = resposta[index].Total_de_Chamados_RAM;
        let disco = resposta[index].Total_de_Chamados_Disco;

        dadosPizza.datasets[0].data.push(cpu)
        dadosPizza.datasets[0].data.push(ram)
        dadosPizza.datasets[0].data.push(disco)
    }
    graficoPizza.update()
}

