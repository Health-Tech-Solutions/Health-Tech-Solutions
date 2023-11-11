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



function obterDadosGraficoBarra() {
  
    // var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarHospitais`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGraficoBarra(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoBarra(resposta) {
    
    for (let i = 0; i < resposta.length; i++) {
        let chamado = resposta[i].chamados
        let hospital = resposta[i].hospital
        console.log(dadosBarra.datasets[0].data + 'PLAAAAAAAAAAAAAAAU')
        labelsBarra.push(hospital)
        dadosBarra.datasets[0].data.push(chamado)
    }


    myBarChart['data'] = dadosBarra;
    myBarChart.update()
};