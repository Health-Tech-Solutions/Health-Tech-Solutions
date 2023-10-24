
function listarChamados() {

    let idHospital = sessionStorage.FK_HOSPITAL

    fetch(`/chamados/listarChamados/${idHospital}`)
        .then(
            function (resposta) {
                if (resposta.ok) {
                    resposta.json()
                        .then(
                            function (resposta) {
                                console.log(resposta)

                                for (let i = 0; i < resposta.length; i++) {

                                    let id = resposta[i].idMaquina
                                    let nivel = resposta[i].nivel
                                    let estado = resposta[i].estado
                                    let sla = resposta[i].sla
                                    let dataHora = resposta[i].dataHora
                                    let tipoRegistro = resposta[i].tipoRegistro
                                    let idChamado = resposta[i].idChamado


                                    tabela.innerHTML += `
                        <tr>
                        <td id="ID">${id}</td>
                        <td id="nivel">${nivel}</td>
                        <td id="estado">${estado}</td>
                        <td id="sla">${sla}</td>
                        <td id="dataHora">${dataHora}</td>
                        <td id="desc">${tipoRegistro}</td>
                        <td id="id_botao"><button onclick="fecharChamado(${idChamado})">Fechar</button></td>
                        
                        </tr>
                        `
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
        nome = 'todos'
    }
    console.log(teste, id, nome)
    sessionStorage.FK_HOSPITAL = id
    sessionStorage.NOME_HOSPITAL = nome
    location.reload()
}


// dropdown_menu.innerHTML = `<option class="dropdown-item"  value = "0" >${sessionStorage.NOME_HOSPITAL} BLA</option>`;

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

function fecharChamado(idChamado){
    

    fetch(`/chamados/fecharChamado/${idChamado}`, {
        method: "POST"
    })
    .then(
        resposta =>{
            if(resposta.ok){
                resposta.json()
                .then(
                    resposta =>{
                        alert('Chamado fechado com sucesso')
                       console.log(resposta)
                       
                    }
                )
            }
        }
    )
    .catch(
        err =>{
            console.log("ERRO" + err)
        }
    )
    location.reload()
}