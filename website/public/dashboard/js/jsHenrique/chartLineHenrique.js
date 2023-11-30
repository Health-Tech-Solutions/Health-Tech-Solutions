    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/henrique/buscarMensal/${fkHospital}`)
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


function obterDadosSemanal(){

    var fkHospital = sessionStorage.FK_HOSPITAL;
    fetch(`/henrique/buscarSemanal/${fkHospital}`)
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

var dataRegressao = []
function plotarGrafico(resposta){



    labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    dados.datasets[0].data = []
    
    for (let i = 0; i < resposta.length; i++) {
        let registro = resposta[i];
        dados.datasets[0].data[registro.mes - 1] = (registro.quantidade)
    }   
    
    var mediaDados = dados.datasets[0].data.reduce((acc, val) => acc = val,0) /dados.length
    media.innerHTML = mediaDados

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

function predicao(){
    var dadosReais = dados.datasets[0].data
    var vetorAux = []
    var coeficientes = calcularCoeficientes(dadosReais)
    var angular = coeficientes[0].toFixed(0)
    var linear = coeficientes[1].toFixed(0)
  
    for(let i = 0; i < dadosReais.length; i++){
        let formula = diferenca(dadosReais[i],linear) + angular * i
        vetorAux.push(formula)
    }

    var mediaAux = vetorAux.reduce((acc,val) => acc + val, 0)/vetorAux.length
    media.innerHTML = mediaAux
    dados.datasets[0].data = vetorAux
    lineChart.update()
}

function calcularCoeficientes(dataset){
    const mediaY = dataset.reduce((acc, val) => acc + val, 0) / dataset.length;

   const valoresX = Array.from({ length: dataset.length }, (_, index) => index + 1);
   
    const mediaX = calcularMedia(valoresX);

   let numeradorM = 0;
   let denominadorM = 0;
   
   for (let i = 0; i < valoresX.length; i++) {
     numeradorM += (valoresX[i] - mediaX) * (dataset[i] - mediaY);
     denominadorM += Math.pow(valoresX[i] - mediaX, 2);
   }

   const angular = numeradorM / denominadorM;
   

   const linear = mediaY - angular * mediaX;
   return [angular,linear]
}

function calcularMedia(dados) {
    return dados.reduce((acc, val) => acc + val, 0) / dados.length;
}

function diferenca(num1, num2){
    
    return (num1 + (num1 - num2)) 
}