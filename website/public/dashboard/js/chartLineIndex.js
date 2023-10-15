
function obterDadosMensais(){
    fetch(`/chamados/buscarMensal`)
    .then(
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(
                    function(resposta){
                        console.log(resposta) 
                        plotarGrafico(resposta)
                    }
                )
            }
        }
    )
    .catch(
        err => {
            console.log("ERRO " + err)
        }
    )
}

function plotarGrafico(resposta){
    for (let i = 0; i < resposta.length; i++) {
        let registro = resposta[i];
        dados.datasets[0].data.push(registro.quantidade)
    }
    lineChart.update()
}

const ctx = document.getElementById('chartLinha');
labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
// 12, 19, 3, 5, 2, 3, 4, 7, 1, 2, 4, 7
var dados = {
    labels: labels,
    datasets: [{
        label: '',
        data: [],
        borderWidth: 1,
        backgroundColor: '#030050',
        borderColor: '#030050'
    }]
}

var lineChart = new Chart(ctx, {
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


const configPie = document.getElementById('chartPie');

new Chart(configPie, {
    type: 'pie',
    data: {
        labels: ['Perigo', 'Em risco', 'Saudável'],
        datasets: [{
            label: '',
            data: [2, 9, 30],
            backgroundColor: [
                '#e74a3b',
                '#f6c23e',
                '#1cc88a'
            ],
            borderWidth: 1
        }]
    },
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