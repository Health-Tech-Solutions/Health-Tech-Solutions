
function obterDadosMensais(){
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/chamados/buscarMensal/${fkHospital}`)
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

function obterDadosSemanal(){
    var fkHospital = sessionStorage.FK_HOSPITAL;
    fetch(`/chamados/buscarSemanal/${fkHospital}`)
    .then(
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(
                    console.log(resposta)

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
        // console.log(registro.mes)
        dados.datasets[0].data[registro.mes - 1] = (registro.quantidade)
    }
    lineChart.update()
}
data = [0,0,0,0,0,0,0,0,0,0,0,0]
const ctx = document.getElementById('chartLinha');
labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
// 12, 19, 3, 5, 2, 3, 4, 7, 1, 2, 4, 7
var dados = {
    labels: labels,
    datasets: [{
        label: '',
        data: data,
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