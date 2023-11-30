
let fkTipo = 0;

function Ultrasson() {
    fkTipo = 1;
    console.log(fkTipo);
    buscarModelos();
}

function Cardioversores() {
    fkTipo = 2;
    console.log(fkTipo);
    buscarModelos();
}

function Desfibriladores() {
    fkTipo = 3;
    console.log(fkTipo);
    buscarModelos();
}

function MonitorC() {
    fkTipo = 4;
    console.log(fkTipo);
    buscarModelos();
}

function Anestesia() {
    fkTipo = 5;
    console.log(fkTipo);
    buscarModelos();
}

function ECG() {
    fkTipo = 6;
    console.log(fkTipo);
    buscarModelos();
}

function Fetal() {
    fkTipo = 7;
    console.log(fkTipo);
    buscarModelos();
}

function MonitorSV() {
    fkTipo = 8;
    buscarModelos();
    console.log(fkTipo);
}

function buscarModelos() {
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
    console.log("Na função", fkTipo)

        // Verifique se a resposta é um array e não está vazio
        if (!Array.isArray(resposta) || !resposta.length) {
            console.error("Resposta da API não é um array ou está vazio");
            return;
        }

    for (let i = 0; i < resposta.length; i++){
        alert("sdds alert")
    }
}