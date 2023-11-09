function chamarComponenteComMaisAlertas(fkHospital) {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarComponente/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    componenteComMaisAlertas.innerHTML = resposta[0].Nome_da_Peca
                

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function chamarTipoComMaisAlertas(fkHospital) {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarTipo/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                    tipoComMaisAlertas.innerHTML = resposta[0].tipo;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function chamarModeloComMaisAlertas(fkHospital) {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/sofhiaRoute/buscarModelo/${fkHospital}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                modeloComMaisAlertas.innerHTML = resposta[0].modelo;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}


// function mudarTituloGraficoBarras(fkHospital) {
//     var fkHospital = sessionStorage.FK_HOSPITAL
//     if (fkHospital == 'null') {
//         tituloGraficoBarras.innerHTML = 'Quantidade de alertas de cada hospital'
//     } else {
//         tituloGraficoBarras.innerHTML = 'Quantidade de alertas de cada componente'
//     }
// }


if(sessionStorage.FK_HOSPITAL == undefined){
    sessionStorage.FK_HOSPITAL = null
  }
  if(sessionStorage.NOME_HOSPITAL == 'null'){
    sessionStorage.NOME_HOSPITAL = 'Todos'
  }
  dropdown_menu.innerHTML = `<option class="dropdown-item"  value = "0" >${sessionStorage.NOME_HOSPITAL}</option>`; 

function listarHospitais(){
    fetch(`/sofhiaRoute/listarHospitais`)
    .then(  
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(

                    function(resposta){
                        console.log(resposta)
                        dropdown_menu.innerHTML = ""
                        dropdown_menu.innerHTML = `<option class="dropdown-item" value = "null;null">-----------</option>`; 
                        dropdown_menu.innerHTML += `<option class="dropdown-item" value = "${dropdown_menu.value}">Todos</option>`;
                        // dropdown_menu.innerHTML = `<option class="dropdown-item" value = "${dropdown_menu.value}">Todos</option>`; 
                        for (let i = 0; i < resposta.length; i++) {
                            let nome = resposta[i].nomeFantasia
                            let id = resposta[i].idEmpresa
                            dropdown_menu.innerHTML += `<option class="dropdown-item" value = "${id};${nome}" >${nome}</option>` 
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

function trocarHospital(){  
    let teste = dropdown_menu.value.split(';')
    let id = teste[0]
    let nome = teste[1]
    if(nome == 'null'){
        nome = 'Todos'
    }
    console.log(teste, id, nome)
    sessionStorage.FK_HOSPITAL = id
    sessionStorage.NOME_HOSPITAL = nome
    location.reload()
}