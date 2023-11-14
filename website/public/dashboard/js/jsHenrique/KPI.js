

fetch("/henrique/buscarSomaFuncionamento", { cache: 'no-store'})
    .then(function (resposta) {
        if (resposta.ok) {
        resposta.json()
        .then(function (resposta) {
            resposta.reverse();
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`,"AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
   
            // for (let i = 0; i < resposta.length; i++) {
            //     const element = resposta[i];
            //     dadosWord[i].x = element.modelo
            //     dadosWord[i].value = element.numeroChamados
            //     dadosWord[i].category = element.tipo
            // }
            // word()
            // modeloComMaisAlertas.innerHTML = resposta[0].tipo;
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
