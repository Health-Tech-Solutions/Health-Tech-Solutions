
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
  var MáquinaECG = 0
  var MonitorFetal = 0
  var MonitorSinaisVitais = 0

  function situacaoMaquinasHospital(){
    var fkHospital =  sessionStorage.FK_HOSPITAL
    fetch(`/hospitais/situacaoGeral/${fkHospital}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(
          function(resposta){
            situacaoMaquinas = resposta;
            console.log(informacoes)


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
                MáquinaECG = resposta[index].quantidade
              }else if (resposta[index].tipo == "Monitor Fetal") {
                MonitorFetal = resposta[index].quantidade
              }else if (resposta[index].tipo == "Monitor de sinais vitais") {
                MonitorSinaisVitais = resposta[index].quantidade
              } 
              
            }
            console.log(Ultrassom,Cardioversores,Desfibriladores,MonitorCardiaco,MaquinaAnestesia,MáquinaECG,MonitorFetal,MonitorSinaisVitais)

            
            
            
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

  function situacaoMaquinasHospital2(){
    var fkHospital =  sessionStorage.FK_HOSPITAL
    fetch(`/hospitais/situacaoGeral2/${fkHospital}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(
          function(resposta){
            informacoesMaquinasHospital2 = resposta;
            console.log(informacoesMaquinasHospital2)
            

            var qntFktipo1 = 0
            var qntFktipo2 = 0
            var qntFktipo3 = 0
            var qntFktipo4 = 0
            var qntFktipo5 = 0
            var qntFktipo6 = 0
            var qntFktipo7 = 0
            var qntFktipo8 = 0
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
                console.log(qntFktipo1)
                
            }
            
           console.log(`${qntFktipo1}, ${qntFktipo2}, ${qntFktipo3},${qntFktipo4},${qntFktipo5},${qntFktipo6},${qntFktipo7},${qntFktipo8}`) 
           console.log("OLAAAA")
    

          }
        )
      }
    })
    .catch(err => {
      console.log("ERRO" + err)
    })
  }