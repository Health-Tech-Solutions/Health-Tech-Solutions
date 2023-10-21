
dropdown_menu.innerHTML = `<option class="dropdown-item"  value = "0" >${sessionStorage.NOME_HOSPITAL}</option>`; 
getTotalMaquinas()
maquinasInstaveis()
var qtdTotalMaquinas;

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
                            console.log(id)
                           
                            console.log(nome)
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
        nome = 'todos'
    }
    console.log(teste, id, nome)
    sessionStorage.FK_HOSPITAL = id
    sessionStorage.NOME_HOSPITAL = nome
    location.reload()
}


function totalMaquinas(){
    var fkHospital =  sessionStorage.FK_HOSPITAL
    fetch(`/hospitais/TotalMaquinas/${fkHospital}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(
          function(resposta){
            informacoes = resposta[0];
            console.log(informacoes)
            
            maquinas = document.getElementById("totalMaquinas")
            maquinas.innerHTML = informacoes.contagem
            
            
          }
        )
      }
    })
    .catch(err => {
      console.log("ERRO" + err)
    })
  }


  var Ultrassom = 0
  var Cardioversores = 0
  var Desfibriladores = 0
  var MonitorCardiaco = 0
  var MaquinaAnestesia = 0
  var MaquinaECG = 0
  var MonitorFetal = 0
  var MonitorSinaisVitais = 0

  function MaquinasPorTipoChamadoAberto(){
    var fkHospital =  sessionStorage.FK_HOSPITAL
    fetch(`/hospitais/totalMaquinasPorTipoChamadoAberto/${fkHospital}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(
          function(resposta){
            situacaoMaquinas = resposta;
            console.log(situacaoMaquinas)


            for (let index = 0; index < situacaoMaquinas.length; index++) {
        
              if(resposta[index].tipo == "Ultrassom"){
                Ultrassom = resposta[index].quantidade
              }else if (resposta[index].tipo == "Cardioversores") {
                Cardioversores = resposta[index].quantidade
              }else if (resposta[index].tipo == "Desfibriladores") {
                Desfibriladores = resposta[index].quantidade 
              }else if (resposta[index].tipo == "Monitor Cardíaco") {
                MonitorCardiaco = resposta[index].quantidade
              }else if (resposta[index].tipo == "Máquina de Anestesia") {
                MaquinaAnestesia = resposta[index].quantidade
              }else if (resposta[index].tipo == "Máquina de ECG") {
                MaquinaECG = resposta[index].quantidade
              }else if (resposta[index].tipo == "Monitor Fetal") {
                MonitorFetal = resposta[index].quantidade
              }else if (resposta[index].tipo == "Monitor de sinais vitais") {
                MonitorSinaisVitais = resposta[index].quantidade
              } 
              
            }
            
            console.log(`Quantidade de cada tipo de fkTipo com chamados abertos:`)
            console.log(Ultrassom,Cardioversores,Desfibriladores,MonitorCardiaco,MaquinaAnestesia,MaquinaECG,MonitorFetal,MonitorSinaisVitais)

            
            
            
          }
        )
      }
    })
    .catch(err => {
      console.log("ERRO" + err)
    })
  }

  
  function getTotalMaquinas(){
    var fkHospital =  sessionStorage.FK_HOSPITAL
    fetch(`/hospitais/TotalMaquinas/${fkHospital}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(
          function(resposta){
            informacoesMaquinasHospital = resposta;
            console.log(informacoesMaquinasHospital)
            totalModelos = resposta[1]
            console.log(totalModelos)
            var informacoes = Number(resposta[0].contagem);
            console.log("ifno",informacoes)
            qtdTotalMaquinas = informacoes;
          }
        )
      }
    })
    .catch(err => {
      console.log("ERRO" + err)
     
    })
 
     
  }
  
function maquinasInstaveis(){
    var fkHospital =  sessionStorage.FK_HOSPITAL
    fetch(`/hospitais/maquinasInstaveis/${fkHospital}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(
          function(resposta){
            valorMaquinaInstaveis = resposta[0].qtdMaquinaInstaveis;
      
            var porcentagem = (Number(valorMaquinaInstaveis) / Number(qtdTotalMaquinas) )* 100
            
            var kpiMaquinasInstaveis = document.getElementById('maqInstaveis') 
            var barraMaquinasInstaveis = document.getElementById('barraMaquinasInstaveis') 
  
            kpiMaquinasInstaveis.innerHTML = porcentagem.toFixed(2),"%";
            barraMaquinasInstaveis.style.width = `${(porcentagem)}%`
        
            
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
  function MaquinasPorTipo(){
    var fkHospital =  sessionStorage.FK_HOSPITAL
    fetch(`/hospitais/totalMaquinasPorTipo/${fkHospital}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(
          function(resposta){
            informacoesMaquinasHospital2 = resposta;
            console.log(informacoesMaquinasHospital2)
            

            
            for (let index = 0; index < informacoesMaquinasHospital2.length; index++) {
                if(resposta[index].fkTipo == 1){
                    qntFktipo1 = qntFktipo1 + 1
                }else if (resposta[index].fkTipo == 2){
                    qntFktipo2 = qntFktipo2 + 1 
                }else if (resposta[index].fkTipo == 3){
                    qntFktipo3 = qntFktipo3 + 1 
                }else if (resposta[index].fkTipo == 4){
                    qntFktipo4 = qntFktipo4 + 1
                }else if (resposta[index].fkTipo == 5){
                    qntFktipo5 = qntFktipo5 + 1
                }else if (resposta[index].fkTipo == 6){
                    qntFktipo6 = qntFktipo6 + 1 
                }else if (resposta[index].fkTipo == 7){
                    qntFktipo7 = qntFktipo7 + 1 
                }else if (resposta[index].fkTipo == 8){
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


  var linha1,linha2,linha3,linha4,linha5,linha6,linha7,linha8 = 0
    
  function calculoGraficoSituacaoGeral(){ 
    linha1 = ((Ultrassom*100)/qntFktipo1).toFixed(2)
    //linha1 = 100
    linha2 = ((Cardioversores*100)/qntFktipo2).toFixed(2)
    //linha2 = 20
    linha3 = ((Desfibriladores*100)/qntFktipo3).toFixed(2)
    //linha3 = 30
    linha4 = ((MonitorCardiaco*100)/qntFktipo4).toFixed(2)
    //linha4 = 40
    linha5 = ((MaquinaAnestesia*100)/qntFktipo5).toFixed(2)
    //linha5 = 50
    linha6 = ((MaquinaECG*100)/qntFktipo6).toFixed(2)
    //linha6 = 60
    linha7 = ((MonitorFetal*100)/qntFktipo7).toFixed(2)
    //linha7 = 70
    linha8 = ((MonitorSinaisVitais*100)/qntFktipo8).toFixed(2)
    //linha8 = 80
    console.log("Calculo:")
    console.log(linha1,linha2,linha3,linha4,linha5,linha6,linha7,linha8)

    UltrassomPorcentagem = document.getElementById("UltrassomGrafico")
    UltrassomPorcentagem.innerHTML = linha1

    larguraUltrassom = document.getElementById("larguraUltrassom")
    larguraUltrassom.style.width = `${linha1}%`

     if(linha1 <= 30){
       larguraUltrassom.style.backgroundColor = 'red' 
     }else if(linha1 <= 60){
       larguraUltrassom.style.backgroundColor = 'orange' 
     }else if(linha1 <= 89){
       larguraUltrassom.style.backgroundColor = 'yellow' 
     }else {
       larguraUltrassom.style.backgroundColor = 'green' 
     }

    
    CardioversoresPorcentagem = document.getElementById("CardioversoresGrafico")
    CardioversoresPorcentagem.innerHTML = linha2

    larguraCardioversores = document.getElementById("larguraCardioversores")
    larguraCardioversores.style.width = `${linha2}%`

     if(linha2 <= 30){
       larguraCardioversores.style.backgroundColor = 'red' 
     }else if(linha2 <= 60){
       larguraCardioversores.style.backgroundColor = 'orange' 
     }else if(linha2 <= 89){
       larguraCardioversores.style.backgroundColor = 'yellow' 
     }else {
       larguraCardioversores.style.backgroundColor = 'green' 
     }


    DesfibriladoresPorcentagem = document.getElementById("DesfibriladoresGrafico")
    DesfibriladoresPorcentagem.innerHTML = linha3

    larguraDesfibriladores = document.getElementById("larguraDesfibriladores")
     larguraDesfibriladores.style.width = `${linha3}%`

     if(linha3 <= 30){
       larguraDesfibriladores.style.backgroundColor = 'red' 
     }else if(linha3 <= 60){
       larguraDesfibriladores.style.backgroundColor = 'orange' 
     }else if(linha3 <= 89){
       larguraDesfibriladores.style.backgroundColor = 'yellow' 
     }else {
       larguraDesfibriladores.style.backgroundColor = 'green' 
     }

   //Não tem monitor cardiaco

    MaquinaAnestesiaPorcentagem = document.getElementById("MaquinaAnestesiaGrafico")
    MaquinaAnestesiaPorcentagem.innerHTML = linha5

    larguraMaquinaAnestesia = document.getElementById("larguraMaquinaAnestesia")
     larguraMaquinaAnestesia.style.width = `${linha5}%`

     if(linha5 <= 30){
       larguraMaquinaAnestesia.style.backgroundColor = 'red' 
     }else if(linha5 <= 60){
       larguraMaquinaAnestesia.style.backgroundColor = 'orange' 
     }else if(linha5 <= 89){
       larguraMaquinaAnestesia.style.backgroundColor = 'yellow' 
     }else {
       larguraMaquinaAnestesia.style.backgroundColor = 'green' 
     }
    


    MaquinaECGPorcentagem = document.getElementById("MaquinaECGGrafico")
    MaquinaECGPorcentagem.innerHTML = linha6

    larguraMaquinaECG = document.getElementById("larguraMaquinaECG")
     larguraMaquinaECG.style.width = `${linha6}%`

     if(linha6 <= 30){
       larguraMaquinaECG.style.backgroundColor = 'red' 
     }else if(linha6 <= 60){
       larguraMaquinaECG.style.backgroundColor = 'orange' 
     }else if(linha6 <= 89){
       larguraMaquinaECG.style.backgroundColor = 'yellow' 
     }else {
       larguraMaquinaECG.style.backgroundColor = 'green' 
     }



    MonitorFetalPorcentagem = document.getElementById("MonitorFetalGrafico")
    MonitorFetalPorcentagem.innerHTML = linha7

    larguraMonitorFetal = document.getElementById("larguraMonitorFetal")
     larguraMonitorFetal.style.width = `${linha7}%`

     if(linha7 <= 30){
       larguraMonitorFetal.style.backgroundColor = 'red' 
     }else if(linha7 <= 60){
       larguraMonitorFetal.style.backgroundColor = 'orange' 
     }else if(linha7 <= 89){
       larguraMonitorFetal.style.backgroundColor = 'yellow' 
     }else {
       larguraMonitorFetal.style.backgroundColor = 'green' 
     }

    //Não tem MonitorSinaisVitais

  }

  function chamarModeloComMaisAlertas() {

    fetch(`/chamados/buscarModelo`, { cache: 'no-store'}).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                resposta.reverse();
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                modeloComMaisAlertas.innerHTML = resposta[0].tipo;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}
