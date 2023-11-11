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
                    function(resposta){
                        console.log(resposta)
                        plotarGraficoSemanal(resposta)
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

function plotarGraficoSemanal(resposta){
    
    labels = []
    data = []
    var dataAtual = new Date()
    
    var mes = dataAtual.getMonth() + 1
    
    for (let i = 0; i < resposta.length; i++) {

        let ocorrencia = resposta[i];

        labels.push(ocorrencia.dia + '/' + mes)
        data.push(ocorrencia.quantidade)
    }

    dados.labels = labels
    dados.datasets[0].data = data
  
    lineChart.update()
}

function plotarGrafico(resposta){

    labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    dados.datasets[0].data = []
    
    for (let i = 0; i < resposta.length; i++) {
        let registro = resposta[i];
        dados.datasets[0].data[registro.mes - 1] = (registro.quantidade)
    }

    dados.labels = labels
    lineChart.update()
}

data = [0,0,0,0,0,0,0,0,0,0,0,0]
const ctx = document.getElementById('chartLinha');
labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
var dados = {
    labels: labels,
    datasets: [{
        label: '',
        data: data,
        borderWidth: 2,
        backgroundColor: '#030050',
        borderColor: '#030050',
        trendlineLinear: {
            colorMin: "red",
            colorMax: "red",
            lineStyle: "solid",
            width: 1
        }
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

// 16 - 2
function predicao(){
    var dadosReais = dados.datasets[0].data
    var vetorAux = []
    for(let i = 0; i < dadosReais.length; i++){
        // let formula = dadosReais[i] - 16.6  + 2 * i
        let formula = diferenca(dadosReais[i],689) + 1.4 * i
        vetorAux.push(formula)
}
dados.datasets[0].data = vetorAux
lineChart.update()

}

function diferenca(num1, num2){
    return num1 + (num1 - num2)
}