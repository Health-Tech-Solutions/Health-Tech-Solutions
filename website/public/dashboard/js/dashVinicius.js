var fkHospital = null

// Area dos gráficos da dashboard

// Grafico de barras
const ctx = document.getElementById('desempenhoModelo');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Monitor de S.V', 'Monitor C.', 'Monitor F.', 'Desfibriladores', 'Cardioversores', 'Ultrassom', 'Máquina de A.', 'Máquinas ECG'],
        datasets: [{
            label: '# of Votes',
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



function plotarDadosPie(resposta) {
    for (let index = 0; index < resposta.length; index++) {
        let abertos = resposta[index].Abertos;
        let fechados = resposta[index].Fechados;

        dadosPie.datasets[0].data.push(abertos)
        dadosPie.datasets[0].data.push(fechados)
        totalChamados.innerHTML = abertos
    }

    chartPie.update()

}


function obterDadosGrafico() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/chamados/buscarHospitais/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function plotarGrafico(resposta) {


    for (let i = 0; i < resposta.length; i++) {
        let chamado = resposta[i].chamados
        let hospital = resposta[i].hospital
        console.log(dados.datasets[0].data)
        labels.push(hospital)
        dados.datasets[0].data.push(chamado)
    }


    myBarChart['data'] = dados;
    myBarChart.update()
};

function chamarComponenteComMaisAlertas() {
    fetch(`/chamados/buscarComponente`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                componenteComMaisAlertas.innerHTML = resposta[0].TipoRegistro
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function chamarModeloComMaisAlertas() {

    fetch(`/chamados/buscarModelo`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                modeloComMaisAlertas.innerHTML = resposta[0].tipo;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function obterDadosEstado() {

    var fkHospital = sessionStorage.FK_HOSPITAL;
    fetch(`/chamados/buscarEstado/${fkHospital}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                plotarDadosPie(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}
