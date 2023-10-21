

// Gráfico de pizza, gravidade dos chamados por modelo de máquina
const configPie = document.getElementById('chartPie');

var dadosPizza = {
    labels: [],
    datasets: [{
        label: '',
        data: [],
        backgroundColor: [
            '#1cc88a',
            '#f6c23e',
            '#e74a3b'
            
            
                   
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
        }
    }
});

function buscarGravidade(){
    var idTipo = sessionStorage.POSICAO_EQUIPAMENTO
    alert("Chamou")
    fetch(`/chamados/buscarGravidade/${idTipo}`)
    .then(
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(
                    function (resposta){
                        console.log(resposta)
                        plotarGraficoPizza(resposta)
                    }
                )
            }
        }
    )
    .catch(err =>{
        console.log("ERRO " + err)
    })
}

function plotarGraficoPizza(resposta){
    let labels = []
    dadosPizza.labels = labels
    dadosPizza.datasets[0].data = []
    for (let i = 0; i <= 2; i++) {
        let element = resposta[i];
        dadosPizza.labels.push(element.nivel)
        dadosPizza.datasets[0].data.push(element.qtdNivel)
    }

    graficoPizza.update()
    
}
var posicao = 0
function mudarEquipamento(numero){
    if((posicao == 0 && numero == -1) || (posicao == 8 && numero == 1)){
        numero = 0 
    }
    posicao += numero
    sessionStorage.POSICAO_EQUIPAMENTO = posicao
    buscarGravidade()   
}