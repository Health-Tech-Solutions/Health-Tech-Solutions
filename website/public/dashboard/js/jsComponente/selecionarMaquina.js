var nome;
var idMaquinario;
var fkTipoRegistro;

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
                                let element = resposta[i];
                                var id = element.idPeca;
                                var nomePeca = element.nome;
                                var descricao = element.descricao;
                                var modelo = element.modelo;
                                var limite = element.valor;    
                                var idInput = "inputLimite" + id;
                                
                                let tabela = document.getElementById('tabela');

                                let tituloTabela = document.getElementById('tituloTabela');

                                tituloTabela.innerHTML = `Componentes cadastrados, ${idMaquinario}`

                                tabela.innerHTML += `
                                <td id="Id">${id}</td>
                                <td id="Nome">${nomePeca}</td>
                                <td id="Descrição">${descricao}</td>
                                <td id="Modelo">${modelo}</td>
                                <td id="limite">${limite}</td>
                                <td id="AlterarLimiteInput"><input id="${idInput}" type="number"></td>
                                <td id="AlterarLimiteButton"><button onclick="enviarLimite(${id})">Enviar</button></td>
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


function enviarLimite(id) {
    let valor = document.getElementById("inputLimite"+id).value
    let fkPeca = id
   
    
    fetch(`/cadastroComponentes/updateLimite/${fkPeca}/${valor}`)      
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    
                    
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error('Erro na chamada de API:', error);
        });

        window.location.reload();

}

function selecionarOpcao(valor) {
    fkTipoRegistro = valor;
    console.log(fkTipoRegistro);
    // Ou então, você pode fazer algo com base no valor selecionado
    // Por exemplo, enviar para algum lugar, atualizar variáveis, etc.
}


function cadastrarPeca() {
    fetch (`/cadastroComponentes/cadastrarPeca`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: document.getElementById("nome").value,
            descricao: document.getElementById("descricao").value,
            modelo: document.getElementById("modelo").value,
            fkTipoRegistro: fkTipoRegistro,
            fkMaquinario: sessionStorage.FK_MAQUINA,
            valor: document.getElementById("valor").value
        })
        
    })
    alert("Cadastrado com sucesso!")
}

