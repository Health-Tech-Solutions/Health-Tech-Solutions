

fetch("/henrique/buscarSomaFuncionamento", { cache: 'no-store'})
    .then(function (resposta) {
        if (resposta.ok) {
        resposta.json()
        .then(function (resposta) {
            resposta.reverse();
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`,"AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            calcularMTBF(resposta)
            
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });

var qtdFalhas = [] 
var somaManutencao = []
function calcularMTBF(resposta){
   
    resposta.forEach(element => {
        qtdFalhas.push(element.qtdFalhas)
        somaManutencao.push(element.tempoManutencao)
    });
}