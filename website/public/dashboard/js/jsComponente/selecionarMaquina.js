

function buscarModelos() {
    let fkTipo = sessionStorage.FK_TIPO;
    fetch(`/cadastroComponentes/modelosDeMaquinasCadastradas/${fkTipo}`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    resposta.reverse();
                    listarMaquinas(resposta)
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error('Erro na chamada de API:', error);
        });
}

function listarMaquinas(resposta) {
    for (let i = 0; i < resposta.length; i++) {
        const element = resposta[i];
        console.log(element)
        
    }
}