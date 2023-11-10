let totalMaquinas
let maquinasOperando

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

    fetch(`/viniciusRoutes/taxaMaquinasOperando/${fkHospital}`)
    .then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                totalMaquinas = resposta[0].totalMaquinas
                maquinasOperando = resposta[0].maquinasOperando

                console.log(totalMaquinas,maquinasOperando)

                let porcentagemExibição = `${((maquinasOperando/totalMaquinas)*100).toFixed(2)}%`
                
                if(totalMaquinas == 0){
                    porcentagemExibição = '0%'
                }

                if(porcentagemExibição > 100){
                    porcentagemExibição = '100%'
                } 
                porcentagemMaquinasOperando.innerHTML = porcentagemExibição

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

if (sessionStorage.FK_HOSPITAL == undefined) {
    sessionStorage.FK_HOSPITAL = null
}
if (sessionStorage.NOME_HOSPITAL == 'null') {
    sessionStorage.NOME_HOSPITAL = 'Todos'
}
dropdown_menu.innerHTML = `<option class="dropdown-item"  value = "0" >${sessionStorage.NOME_HOSPITAL}</option>`;
getTotalMaquinas()
maquinasInstaveis()
// listarHospitais()
var qtdTotalMaquinas;

function listarHospitais() {
    fetch(`/hospitais/listarHospitais`)
        .then(
            function (resposta) {
                if (resposta.ok) {
                    resposta.json()
                        .then(

                            function (resposta) {
                                console.log(resposta)
                                dropdown_menu.innerHTML = `<option class="dropdown-item"  value = "null;null"></option>`;
                                dropdown_menu.innerHTML += `<option class="dropdown-item"  value = "${dropdown_menu.value}" >Todos</option>`;
                                for (let i = 0; i < resposta.length; i++) {
                                    let nome = resposta[i].nomeFantasia
                                    let id = resposta[i].idEmpresa
                                    dropdown_menu.innerHTML += `<option class="dropdown-item"  value = "${id};${nome}" >${nome}</option>`
                                }

                            }
                        )
                }
            }
        )
        .catch(
            err => {
                console.log("ERRO" + err)
            }
        )
}

function trocarHospital() {

    let teste = dropdown_menu.value.split(';')
    let id = teste[0]
    let nome = teste[1]
    if (nome == 'null') {
        nome = 'Todos'
    }
    console.log(teste, id, nome)
    sessionStorage.FK_HOSPITAL = id
    sessionStorage.NOME_HOSPITAL = nome
    location.reload()
}


function obterChamadosEmAberto() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/chamados/quantidadeChamadosAberto/${fkHospital}`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json()
                    .then(
                        resposta => {
                            console.log(resposta)
                            qtd_chamados.innerHTML = resposta[0].quantidade
                        }
                    )
            }
        }).catch(erro => {
            console.log("ERRO " + erro)
        }
        )
}