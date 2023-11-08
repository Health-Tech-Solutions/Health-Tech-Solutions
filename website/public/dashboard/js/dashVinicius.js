var fkHospital = sessionStorage.getItem("FK_HOSPITAL");
    
    fetch(`/viniciusRoutes/pegarDadosMaquinas/${fkHospital}`)
        .then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json().then(function (resposta) {
                    resposta.reverse();
                    console.log(`Dados recebidos: ${JSON.stringify(resposta[0])}`);
                    console.log(componenteComMaisAlertas)
                    componenteComMaisAlertas.innerHTML = resposta[0].total
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })



// Grafico de barras
const ctx = document.getElementById('desempenhoModelo');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Monitor de S.V', 'Monitor C.', 'Monitor F.', 'Desfibriladores', 'Cardioversores', 'Ultrassom', 'Máquina de A.', 'Máquinas ECG'],
        datasets: [{
            label: 'Desenpenho dos modelos',
            data: [12, 19, 3, 5, 2, 3, 7, 4],
            backgroundColor: 'rgba(220, 0, 0, 0.60)',
            borderWidth: 1
        }]
    },
    options: {

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Grafico de Pie

// Dados de estados das máquinas
var estados = ["Em Manutenção", "Operando"];
var quantidades = [15, 85]; // Valores fictícios representando a quantidade de máquinas em cada estado

// Configuração do gráfico de pizza
var ctx2 = document.getElementById('estadoDasMaquinas').getContext('2d');
var chart = new Chart(ctx2, {
    type: 'pie',
    data: {
        datasets: [{
            data: quantidades,
            backgroundColor: ['#e74a3b', '#4CAF50'],
        }]
    },
    options: {
        // Insira opções adicionais aqui, se necessário
    }
});

