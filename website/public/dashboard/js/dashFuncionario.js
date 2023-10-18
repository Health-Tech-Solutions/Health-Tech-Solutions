var fkHospital = null
    const ctx = document.getElementById('chartBar');

    var myBarChart = new Chart(ctx, {
        type: 'bar',
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
    var labels = []
    var dados = {
            labels: labels,
            datasets:
                [{
                    label: "NomeHospital",
                    backgroundColor: "red",
                    borderColor: "rgba(78, 115, 223, 1)",
                    data: []
    
                }]
        };
    
    const configPie = document.getElementById('chartPie');
    
    var dadosPie = {
            labels: ['Aberto', 'Fechados'],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [
                    '#e74a3b',
                    '#1cc88a'
                ],
                borderWidth: 1
            }]
        }

    var chartPie = new Chart(configPie, {
        type: 'pie',
        data: dadosPie,
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

    function plotarDadosPie(resposta){
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
        fetch(`/chamados/buscarModelo`, { cache: 'no-store'}).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    resposta.reverse();
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    modeloComMaisAlertas.innerHTML = resposta[0].Modelo;
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }

    function obterDadosEstado(){
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