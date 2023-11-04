var dataDados = []
var desempenho = []
 function graficoLinha(){

     var fkHospital = sessionStorage.FK_HOSPITAL
     fetch(`/gabrielRoutes/graficoLinha/${fkHospital}`)
     .then(
         function(resposta){
             if(resposta.ok){
                 resposta.json()
                 .then(
                     function(resposta){
                        console.log("CHARTTTTTTlINHAAAAAAAAAAAAAAAAAAAAAAAA")
                         console.log(resposta) 
                         

                         
                            for (let i = 0; i < resposta.length; i++) {
                                dataDados.push(resposta[i].dataTemperatura)
                            }
                         
                            for (let index = 0; index < resposta.length; index++) {
                                desempenho.push(resposta[index].valor)
                            }

                            lineChart.update()
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

    labels = dataDados
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
const ctx = document.getElementById('chartLinha');
labels = dataDados
// 12, 19, 3, 5, 2, 3, 4, 7, 1, 2, 4, 7
var dados = {
    labels: dataDados,
    datasets: [{
        label: '',
        data: desempenho,
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


