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
    // var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarHospitais`, { cache: 'no-store' }).then(function (response) {
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