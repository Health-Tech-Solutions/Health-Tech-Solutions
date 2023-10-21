

// Gráfico de pizza, gravidade dos chamados por modelo de máquina
const configPie = document.getElementById('chartPie');

new Chart(configPie, {
    type: 'pie',
    data: {
        labels: ['Perigo', 'BLÉU', 'Saudável'],
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

function buscarGravidade(){
    fetch(`/chamados/buscarGravidade`)
    .then(
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(
                    function (resposta){
                        console.log(resposta)
                    
                    }
                )
            }
        }
    )
    .catch(err =>{
        console.log("ERRO " + err)
    })
}
