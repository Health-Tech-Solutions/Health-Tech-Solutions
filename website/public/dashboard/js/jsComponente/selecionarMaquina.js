var nome;
var idMaquinario;

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
        nome = element.macAdress;
        idMaquinario = element.idMaquinario;
        
        console.log(nome);
        console.log(element);

        let divListaMaquinas = document.getElementById('divListaMaquinas');

        divListaMaquinas.innerHTML += `
        <div id="containerCheio" onclick="obterMaquina(${idMaquinario})">

        <div id="containerFoto">
            <img id="imagemPC" src="../assets/PC branco.png"alt="">
        </div>
        <div id="containerSpan">
            <span>
                ${idMaquinario}
            </span>
        </div>
    </div>
        `

    }

}

function obterMaquina(idMaquinario) {
    console.log("entrei")
    sessionStorage.FK_MAQUINA = idMaquinario;
    window.location = `./cadastrarComponente.html`;
}

function listasPecas() {
    // alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    var idMaquinario = sessionStorage.FK_MAQUINA;
    fetch(`/cadastroComponentes/obterDadosPeca/${idMaquinario}`)
    .then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json()
                    .then(
                        function (resposta) {
                            console.log(resposta)


                            for (let i = 0; i < resposta.length; i++) {
                                const element = resposta[i];
                                var id = element.idPeca;
                                var nomePeca = element.nome;
                                var descricao = element.descricao;
                                var modelo = element.modelo;
                                var limite = element.limite;
                              

                                let tabela = document.getElementById('tabela');

                                let tituloTabela = document.getElementById('tituloTabela');

                                tituloTabela.innerHTML = `Componentes cadastrados, ${idMaquinario}`

                                tabela.innerHTML += `
                                <td id="Id">${id}</td>
                                <td id="Nome">${nomePeca}</td>
                                <td id="Descrição">${descricao}</td>
                                <td id="Modelo">${modelo}</td>
                                <td id="limite">${limite}</td>
                                <td id="AlterarLimiteInput"><input id="inputLimite" type="number"></td>
                                <td id="AlterarLimiteButton"><button onclick="enviarLimite()">Enviar</button></td>
                                `
                            }

                        }
                    )
            } else{
                console.error("Nenhum dado encontrado ou erro na API")
            
            }
        }
    )
    .catch(
        err => {
            console.log("ERRO" + err)
        }
    )
}

