
function buscarSomaFuncionamento() {
    var fkModelo = 'null'

    fetch(`/henrique/buscarSomaFuncionamento/${fkModelo}`)
        .then(
            function (resposta) {
                if (resposta.ok) {
                    resposta.json()
                        .then(
                            function (resposta) {

                                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`, "AAAA");
                                calcularConfiabilidade(resposta)

                            });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

fetch(`/henrique/quantidadeChamados`)
    .then(function(resposta) {
        if(resposta.ok){
            resposta.json()
                .then(function(resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`, "AAAABBBBBBBBBBBBBBBBBBBBBBBB");
                    
                    qtd_chamados.innerHTML = resposta[0].qtdChamados
                })
        }  
    })
    .catch(function(err) {
        console.log(`Erro na obtenção dos dados ${err.message}`)
    })

function calcularConfiabilidade(resposta) {

    let tempoFuncionamento = resposta[0].tempoFuncionamento
    let tempoManutencao = resposta[0].tempoManutencao
    let qtdFalhas = resposta[0].qtdFalhas
    let mtbf = Math.ceil(tratarTempo(tempoFuncionamento / qtdFalhas))
    let taxaFalhas = 1 / mtbf
    let confiabilidade = (2.71 ** (-taxaFalhas * 2)) * 100
    let mttr = Math.ceil(Number(tratarTempo(tempoManutencao) / qtdFalhas))

    mtbf_id.innerHTML = `${mtbf} Horas`
    mttr_id.innerHTML = `${mttr} Horas`

    confiabilidade_id.innerHTML = confiabilidade.toFixed(2), "%";
    barraConfiabilidade.style.width = `${(confiabilidade)}%`
}

function tratarTempo(tempo) {
    return (tempo / 60).toFixed(2)
}