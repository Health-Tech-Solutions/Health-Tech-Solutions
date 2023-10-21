

// Gráfico de pizza, gravidade dos chamados por modelo de máquina
const configPie = document.getElementById('chartPie');

var dadosPizza = {
    labels: ['Perigo', 'BLÉU', 'Saudável'],
    datasets: [{
        label: '',
        data: [],
        backgroundColor: [
            '#e74a3b',
            '#f6c23e',
            '#1cc88a'
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
 
    fetch(`/chamados/buscarGravidade`)
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
    let labels = ['IHUUUUUU','SHUAAA','poooow']
    dadosPizza.labels = labels
    dadosPizza.datasets[0].data = []
    for (let i = 0; i <= 2; i++) {
        let element = resposta[i].qtdNivel;
        console.log(element)
    
        dadosPizza.datasets[0].data.push(element)
    }

    graficoPizza.update()
    
}
