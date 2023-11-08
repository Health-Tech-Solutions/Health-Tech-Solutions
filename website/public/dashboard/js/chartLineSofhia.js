var fkHospital = null
const chart = document.getElementById('chartLinha');

var myLineChart = new Chart(chart, {
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


function obterDadosGraficoLinha(fkHospital) {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/obterAlertasDoDia/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
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
        let dia = resposta[i].dia
        let quantidade = resposta[i].quantidade
        console.log(dados.datasets[0].data)
        labels.push(dia)
        dados.datasets[0].data.push(quantidade)
    }


    myLineChart['data'] = dados;
    myLineChart.update()
};