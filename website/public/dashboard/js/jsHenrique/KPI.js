
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


function calcularConfiabilidade(resposta){
    let tempoFuncionamento = resposta[0].tempoFuncionamento
    let tempoManutencao = resposta[0].tempoManutencao
    let qtdFalhas = resposta[0].qtdFalhas
    let mtbf = tratarTempo(tempoFuncionamento / qtdFalhas)
    let taxaFalhas = 1 / mtbf
    let confiabilidade = (2.71 ** (-taxaFalhas * 2)) * 100 
    let mttr = Number(tratarTempo(tempoManutencao) / qtdFalhas).toFixed(2)

    mtbf_id.innerHTML = `${mtbf} Horas`
    mttr_id.innerHTML = `${mttr} Horas` 

    confiabilidade_id.innerHTML = confiabilidade.toFixed(2),"%";
    barraConfiabilidade.style.width =   `${(confiabilidade)}%`
}

function tratarTempo(tempo){
    return (tempo / 60).toFixed(0)
}