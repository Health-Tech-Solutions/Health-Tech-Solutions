function obterDadosSemanal(){

    var fkHospital = sessionStorage.FK_HOSPITAL;
    fetch(`/sofhiaRoute/buscarSemanal/${fkHospital}`)
    .then(
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(
                    function(resposta){
                        console.log(resposta)
                        
                        plotarGraficoSemanal(resposta)

                        tituloGraficoLinhas.innerHTML = 'Quantidade de alertas (do último mês)'
                        

                        graficoLinhaMes.style.backgroundColor = "#d3d3d3"
                        graficoLinhaAno.style.backgroundColor = ""
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

function obterDadosMensais(){
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarMensal/${fkHospital}`)
    .then(
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(
                    function(resposta){
                        console.log(resposta) 
                        plotarGrafico(resposta)

                        tituloGraficoLinhas.innerHTML = 'Quantidade de alertas (do ano)'

                        graficoLinhaMes.style.backgroundColor = ""
                        graficoLinhaAno.style.backgroundColor = "#d3d3d3"
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
    
    var mes = dataAtual.getMonth() 
    
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

    labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov']
    dados.datasets[0].data = []
    
    for (let i = 0; i < resposta.length; i++) {
        let registro = resposta[i];
        // console.log(registro.mes)
        dados.datasets[0].data[registro.mes - 1] = (registro.quantidade)
    }
    dados.labels = labels
    lineChart.update()
}

data = [0,0,0,0,0,0,0,0,0,0,0,0]
const constante = document.getElementById('chartLinha');
labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov']
// 12, 19, 3, 5, 2, 3, 4, 7, 1, 2, 4, 7
var dados = {
    labels: labels,
    datasets: [{
        label: '',
        data: data,
        borderWidth: 1,
        backgroundColor: '#f41743',
        borderColor: '#f41743'
    }]
}

var lineChart = new Chart(constante, {
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


