if (sessionStorage.FK_HOSPITAL == undefined) {
    sessionStorage.FK_HOSPITAL = null
}
if (sessionStorage.NOME_HOSPITAL == 'null') {
    sessionStorage.NOME_HOSPITAL = 'Todos'
}

dropdown_menu.innerHTML = `<option class="dropdown-item"  value = "0" >${sessionStorage.NOME_HOSPITAL}</option>`;
OpcoesMaquinas.innerHTML = `<option class="dropdown-item1"  value = "${sessionStorage.idTipo}" >${sessionStorage.tipo}</option>`
OpcoesMeses.innerHTML = `<option class="dropdown-item2"  value = "${sessionStorage.mes}" >${sessionStorage.nomeMes}</option>`


function listarHospitais(){

    fetch(`/hospitais/listarHospitais`)
    .then(  
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(

                    function(resposta){
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



function listarTiposMaquinas(){

    fetch(`/gabrielRoutes/listarTiposMaquinas`)
    .then(  
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(

                    function(resposta){
                        var todasASMaquinas = resposta
                        console.log("LISTANDO TODAS AS MÁQUINAS:")
                        console.log(todasASMaquinas)
                        
                         OpcoesMaquinas.innerHTML = `<option class="dropdown-item1"  value = "null;null"></option>`; 
                         OpcoesMaquinas.innerHTML += `<option class="dropdown-item1"  value = "${OpcoesMaquinas.value}" >Todos</option>`; 
                        for (let i = 0; i < resposta.length; i++) {
                            let idTipo = resposta[i].idTipo
                            let tipo = resposta[i].nome
                            OpcoesMaquinas.innerHTML += `<option class="dropdown-item1"  value = "${idTipo};${tipo}" >${tipo}</option>` 
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


function trocarTipoMaquina(){  
    let teste = OpcoesMaquinas.value.split(';')
    let idTipo = teste[0]
    let tipo = teste[1]
    if(tipo == 'null'){
        tipo = 'Todos'
    }
    sessionStorage.idTipo = idTipo
    sessionStorage.tipo = tipo
    
    location.reload()
}




function listarMeses(){

    fetch(`/gabrielRoutes/listarMeses`)
    .then(  
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(

                    function(resposta){
                        var todosOsMeses = resposta
                        console.log("LISTANDO TODOS OS MESES:")
                        console.log(todosOsMeses)
                        
                         OpcoesMeses.innerHTML = `<option class="dropdown-item2"  value = "null;null"></option>`; 
                         OpcoesMeses.innerHTML += `<option class="dropdown-item2"  value = "${OpcoesMeses.value}" >Todos</option>`; 
                        for (let i = 0; i < resposta.length; i++) {
                            let mes = resposta[i].mes
                            let nomeMes;
                            if (mes == 1) {
                                nomeMes = "Janeiro"
                            }else if (mes == 2){
                                nomeMes = "Fevereiro"
                            }else if (mes == 3){
                                nomeMes = "Março"
                            }else if (mes == 4){
                                nomeMes = "Abriu"
                            }else if (mes == 5){
                                nomeMes = "Maio"
                            }else if (mes == 6){
                                nomeMes = "Junho"
                            }else if (mes == 7){
                                nomeMes = "Julho"
                            }else if (mes == 8){
                                nomeMes = "Agosto"
                            }else if (mes == 9){
                                nomeMes = "Setembro"
                            }else if (mes == 10){
                                nomeMes = "Outubro"
                            }else if (mes == 11){
                                nomeMes = "Novembro"
                            }else if (mes == 12){
                                nomeMes = "Dezembro"
                            }
                            OpcoesMeses.innerHTML += `<option class="dropdown-item2"  value = "${mes}" >${nomeMes}</option>` 
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


function trocarMes(){  
    let teste = OpcoesMeses.value.split(';')
    let mes = teste[0]
    let nomeMes;
    if(mes == 'null'){
        mes = 'Todos'
        nomeMes = 'Todos'
    }

    if (mes == 1) {
        nomeMes = "Janeiro"
    }else if (mes == 2){
        nomeMes = "Fevereiro"
    }else if (mes == 3){
        nomeMes = "Março"
    }else if (mes == 4){
        nomeMes = "Abriu"
    }else if (mes == 5){
        nomeMes = "Maio"
    }else if (mes == 6){
        nomeMes = "Junho"
    }else if (mes == 7){
        nomeMes = "Julho"
    }else if (mes == 8){
        nomeMes = "Agosto"
    }else if (mes == 9){
        nomeMes = "Setembro"
    }else if (mes == 10){
        nomeMes = "Outubro"
    }else if (mes == 11){
        nomeMes = "Novembro"
    }else if (mes == 12){
        nomeMes = "Dezembro"
    }

    
    sessionStorage.mes = mes
    sessionStorage.nomeMes = nomeMes
    
    location.reload()
}



var Ultrassom = 0
var Cardioversores = 0
var Desfibriladores = 0
var MonitorCardiaco = 0
var MaquinaAnestesia = 0
var MaquinaECG = 0
var MonitorFetal = 0
var MonitorSinaisVitais = 0
function MaquinasPorTipoChamadoAberto() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    var hospital = "Todos"
    if (fkHospital == 1) {
        hospital = "Hospital Santa Catarina"
    } else if (fkHospital == 2) {
        hospital = "Hospital Albert Einsten"
    } else if (fkHospital == 3) {
        hospital = "Hospital Santa Helena"
    }



    fetch(`/gabrielRoutes/totalMaquinasPorTipoChamadoAberto/${fkHospital}/${hospital}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json()
                    .then(
                        function (resposta) {
                            situacaoMaquinas = resposta;
                            console.log(situacaoMaquinas)
                            console.log("AAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!! ")
                            console.log(situacaoMaquinas)

                            for (let index = 0; index < situacaoMaquinas.length; index++) {

                                if (resposta[index].nome == "Ultrassom") {
                                    Ultrassom++
                                } else if (resposta[index].nome == "Cardioversores") {
                                    Cardioversores++

                                } else if (resposta[index].nome == "Desfibriladores") {
                                    Desfibriladores++
                                } else if (resposta[index].nome == "Monitor Cardíaco") {
                                    MonitorCardiaco++
                                } else if (resposta[index].nome == "Máquina de Anestesia") {
                                    MaquinaAnestesia++
                                } else if (resposta[index].nome == "Máquina de ECG") {
                                    MaquinaECG++
                                } else if (resposta[index].nome == "Monitor Fetal") {
                                    MonitorFetal++
                                } else if (resposta[index].nome == "Monitor de sinais vitais") {
                                    MonitorSinaisVitais++
                                }


                            }

                            console.log(`Quantidade de cada tipo de fkTipo com chamados abertos:`)
                            console.log(Ultrassom, Cardioversores, Desfibriladores, MonitorCardiaco, MaquinaAnestesia, MaquinaECG, MonitorFetal, MonitorSinaisVitais)


                            MaquinasPorTipo()

                        }
                    )
            }
        })
        .catch(err => {
            console.log("ERRO" + err)
        })
}




var qntFktipo1 = 0
var qntFktipo2 = 0
var qntFktipo3 = 0
var qntFktipo4 = 0
var qntFktipo5 = 0
var qntFktipo6 = 0
var qntFktipo7 = 0
var qntFktipo8 = 0
function MaquinasPorTipo() {
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/gabrielRoutes/totalMaquinasPorTipo/${fkHospital}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json()
                    .then(
                        function (resposta) {
                            informacoesMaquinasHospital2 = resposta;
                            console.log(informacoesMaquinasHospital2)

                            for (let index = 0; index < informacoesMaquinasHospital2.length; index++) {
                                if (resposta[index].fkTipo == 1) {
                                    qntFktipo1 = qntFktipo1 + 1
                                } else if (resposta[index].fkTipo == 2) {
                                    qntFktipo2 = qntFktipo2 + 1
                                } else if (resposta[index].fkTipo == 3) {
                                    qntFktipo3 = qntFktipo3 + 1
                                } else if (resposta[index].fkTipo == 4) {
                                    qntFktipo4 = qntFktipo4 + 1
                                } else if (resposta[index].fkTipo == 5) {
                                    qntFktipo5 = qntFktipo5 + 1
                                } else if (resposta[index].fkTipo == 6) {
                                    qntFktipo6 = qntFktipo6 + 1
                                } else if (resposta[index].fkTipo == 7) {
                                    qntFktipo7 = qntFktipo7 + 1
                                } else if (resposta[index].fkTipo == 8) {
                                    qntFktipo8 = qntFktipo8 + 1
                                }
                            }
                            calculoGraficoSituacaoGeral()
                            console.log(`Quantidade de cada tipo de fkTipo:`)
                            console.log(`${qntFktipo1}, ${qntFktipo2}, ${qntFktipo3},${qntFktipo4},${qntFktipo5},${qntFktipo6},${qntFktipo7},${qntFktipo8}`)




                        }
                    )
            }
        })
        .catch(err => {
            console.log("ERRO" + err)
        })
}



var linha1, linha2, linha3, linha4, linha5, linha6, linha7, linha8 = 0

function calculoGraficoSituacaoGeral() {

    linhaCasoDerNull = 0
    linha1 = ((Ultrassom / qntFktipo1) * 100).toFixed(2)
    linha1 = (100 - linha1).toFixed(2)
    //linha1 = 100
    linha2 = ((Cardioversores / qntFktipo2) * 100).toFixed(2)
    linha2 = (100 - linha2).toFixed(2)
    //linha2 = 20
    linha3 = ((Desfibriladores / qntFktipo3) * 100).toFixed(2)
    linha3 = (100 - linha3).toFixed(2)
    //linha3 = 30
    linha4 = ((MonitorCardiaco / qntFktipo4) * 100).toFixed(2)
    linha4 = (100 - linha4).toFixed(2)
    //linha4 = 40
    console.log("Valores Maquina e qntFk:")
    console.log(MaquinaAnestesia, qntFktipo5)
    linha5 = ((MaquinaAnestesia / qntFktipo5) * 100).toFixed(2)
    linha5 = (100 - linha5).toFixed(2)
    //linha5 = 50
    linha6 = ((MaquinaECG / qntFktipo6) * 100).toFixed(2)
    linha6 = (100 - linha6).toFixed(2)
    //linha6 = 60
    linha7 = ((MonitorFetal / qntFktipo7) * 100).toFixed(2)
    linha7 = (100 - linha7).toFixed(2)
    //linha7 = 70
    linha8 = ((MonitorSinaisVitais / qntFktipo8) * 100)
    linha8 = (100 - linha8).toFixed(2)
    //linha8 = 80
    console.log("Calculo:")
    console.log(linha1, linha2, linha3, linha4, linha5, linha6, linha7, linha8)


    // VERIFICAÇÃO ULTRASSOM
    if (linha1 != "NaN" && linha1 != Infinity) {
        UltrassomPorcentagem = document.getElementById("UltrassomGrafico")
        UltrassomPorcentagem.innerHTML = `${linha1}%`

        larguraUltrassom = document.getElementById("larguraUltrassom")
        larguraUltrassom.style.width = `${linha1}%`

        if (linha1 <= 30) {
            larguraUltrassom.style.backgroundColor = 'red'
        } else if (linha1 <= 60) {
            larguraUltrassom.style.backgroundColor = 'orange'
        } else if (linha1 <= 89) {
            larguraUltrassom.style.backgroundColor = 'yellow'
        } else {
            larguraUltrassom.style.backgroundColor = 'green'
        }
    } else {
        UltrassomPorcentagem = document.getElementById("UltrassomGrafico")
        UltrassomPorcentagem.innerHTML = `${linhaCasoDerNull}%`

        larguraUltrassom = document.getElementById("larguraUltrassom")
        larguraUltrassom.style.width = `${linhaCasoDerNull}%`
    }


    // VERIFICAÇÃO CARDIOVERSORES
    if (linha2 != "NaN" && linha2 != Infinity) {

        CardioversoresPorcentagem = document.getElementById("CardioversoresGrafico")
        CardioversoresPorcentagem.innerHTML = `${linha2}%`

        larguraCardioversores = document.getElementById("larguraCardioversores")
        larguraCardioversores.style.width = `${linha2}%`

        if (linha2 <= 30) {
            larguraCardioversores.style.backgroundColor = 'red'
        } else if (linha2 <= 60) {
            larguraCardioversores.style.backgroundColor = 'orange'
        } else if (linha2 <= 89) {
            larguraCardioversores.style.backgroundColor = 'yellow'
        } else {
            larguraCardioversores.style.backgroundColor = 'green'
        }
    } else {
        CardioversoresPorcentagem = document.getElementById("CardioversoresGrafico")
        CardioversoresPorcentagem.innerHTML = `${linhaCasoDerNull}%`

        larguraCardioversores = document.getElementById("larguraCardioversores")
        larguraCardioversores.style.width = `${linhaCasoDerNull}%`
    }


    // VERIFICAÇÃO DESFIBRILADORES
    if (linha3 != "NaN" && linha3 != Infinity) {
        DesfibriladoresPorcentagem = document.getElementById("DesfibriladoresGrafico")
        DesfibriladoresPorcentagem.innerHTML = `${linha3}%`

        larguraDesfibriladores = document.getElementById("larguraDesfibriladores")
        larguraDesfibriladores.style.width = `${linha3}%`

        if (linha3 <= 30) {
            larguraDesfibriladores.style.backgroundColor = 'red'
        } else if (linha3 <= 60) {
            larguraDesfibriladores.style.backgroundColor = 'orange'
        } else if (linha3 <= 89) {
            larguraDesfibriladores.style.backgroundColor = 'yellow'
        } else {
            larguraDesfibriladores.style.backgroundColor = 'green'
        }
    } else {
        DesfibriladoresPorcentagem = document.getElementById("DesfibriladoresGrafico")
        DesfibriladoresPorcentagem.innerHTML = `${linhaCasoDerNull}%`

        larguraDesfibriladores = document.getElementById("larguraDesfibriladores")
        larguraDesfibriladores.style.width = `${linhaCasoDerNull}%`
    }


    //Não tem monitor cardiaco

    // VERIFICAÇÃO MAQUINA ANESTESIA
    if (linha5 != "NaN" && linha5 != Infinity) {
        console.log("TÁ NO IF 5")
        MaquinaAnestesiaPorcentagem = document.getElementById("MaquinaAnestesiaGrafico")
        MaquinaAnestesiaPorcentagem.innerHTML = `${linha5}%`

        larguraMaquinaAnestesia = document.getElementById("larguraMaquinaAnestesia")
        larguraMaquinaAnestesia.style.width = `${linha5}%`

        if (linha5 <= 30) {
            larguraMaquinaAnestesia.style.backgroundColor = 'red'
        } else if (linha5 <= 60) {
            larguraMaquinaAnestesia.style.backgroundColor = 'orange'
        } else if (linha5 <= 89) {
            larguraMaquinaAnestesia.style.backgroundColor = 'yellow'
        } else {
            larguraMaquinaAnestesia.style.backgroundColor = 'green'
        }
    } else {
        MaquinaAnestesiaPorcentagem = document.getElementById("MaquinaAnestesiaGrafico")
        MaquinaAnestesiaPorcentagem.innerHTML = `${linhaCasoDerNull}%`

        larguraMaquinaAnestesia = document.getElementById("larguraMaquinaAnestesia")
        larguraMaquinaAnestesia.style.width = `${linhaCasoDerNull}%`
    }


    // VERIFICAÇÃO MAQUINA ECG
    if (linha6 != "NaN" && linha6 != Infinity) {
        MaquinaECGPorcentagem = document.getElementById("MaquinaECGGrafico")
        MaquinaECGPorcentagem.innerHTML = `${linha6}%`

        larguraMaquinaECG = document.getElementById("larguraMaquinaECG")
        larguraMaquinaECG.style.width = `${linha6}%`

        if (linha6 <= 30) {
            larguraMaquinaECG.style.backgroundColor = 'red'
        } else if (linha6 <= 60) {
            larguraMaquinaECG.style.backgroundColor = 'orange'
        } else if (linha6 <= 89) {
            larguraMaquinaECG.style.backgroundColor = 'yellow'
        } else {
            larguraMaquinaECG.style.backgroundColor = 'green'
        }

    } else {
        MaquinaECGPorcentagem = document.getElementById("MaquinaECGGrafico")
        MaquinaECGPorcentagem.innerHTML = `${linhaCasoDerNull}%`

        larguraMaquinaECG = document.getElementById("larguraMaquinaECG")
        larguraMaquinaECG.style.width = `${linhaCasoDerNull}%`
    }


    // VERIFICAÇÃO MONITOR FETAL
    if (linha7 != "NaN" && linha7 != Infinity) {
        MonitorFetalPorcentagem = document.getElementById("MonitorFetalGrafico")
        MonitorFetalPorcentagem.innerHTML = `${linha7}%`

        larguraMonitorFetal = document.getElementById("larguraMonitorFetal")
        larguraMonitorFetal.style.width = `${linha7}%`

        if (linha7 <= 30) {
            larguraMonitorFetal.style.backgroundColor = 'red'
        } else if (linha7 <= 60) {
            larguraMonitorFetal.style.backgroundColor = 'orange'
        } else if (linha7 <= 89) {
            larguraMonitorFetal.style.backgroundColor = 'yellow'
        } else {
            larguraMonitorFetal.style.backgroundColor = 'green'
        }
    } else {
        MonitorFetalPorcentagem = document.getElementById("MonitorFetalGrafico")
        MonitorFetalPorcentagem.innerHTML = `${linhaCasoDerNull}%`

        larguraMonitorFetal = document.getElementById("larguraMonitorFetal")
        larguraMonitorFetal.style.width = `${linhaCasoDerNull}%`
    }

    //Não tem MonitorSinaisVitais

}


function mediaTemperatura(){
    var idMes = sessionStorage.mes
    var fkHospital = sessionStorage.FK_HOSPITAL
    fetch(`/gabrielRoutes/mediaTemperatura/${idMes}/${fkHospital}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json()
                    .then(
                        function (resposta) {
                            console.log("MEDIAAAAAAAAAAA")
                            console.log(resposta)




                        }
                    )
            }
        })
        .catch(err => {
            console.log("ERRO" + err)
        })
       



}