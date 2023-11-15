

var fkModelo = 'null'
fetch(`/henrique/buscarSomaFuncionamento/${fkModelo}`, { cache: 'no-store'})
    .then(function (resposta) {
        if (resposta.ok) {
        resposta.json()
        .then(function (resposta) {
            resposta.reverse();
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`,"AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            calcularConfiabilidade(resposta)
            
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });

// var qtdFalhas = [] 
// var somaFuncionamento = []

function calcularConfiabilidade(resposta){
    let tempoFuncionamento = Number(resposta[0].tempoFuncionamento)
    let tempoManutencao = resposta[0].tempoManutencao
    let qtdFalhas = resposta[0].qtdFalhas
    let mtbf = tratarTempo(tempoFuncionamento / qtdFalhas)
    let taxaFalhas = 1 / mtbf
    let confiabilidade = (2.71 ** (-taxaFalhas * 2)) * 100 
   

    mtbf_id.innerHTML = `${mtbf} Horas`
    mttr_id.innerHTML = `${tratarTempo(tempoManutencao) / qtdFalhas} Horas`

    alert(confiabilidade)
}

function tratarTempo(tempo){
    return (tempo / 60).toFixed(0)
}