
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
  function getTotalMaquinas(){
    var fkHospital =  sessionStorage.FK_HOSPITAL
    fetch(`/hospitais/TotalMaquinas/${fkHospital}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(
          function(resposta){
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
            barraMaquinasInstaveis.style.width = `${Math.round(porcentagem)}%`
        
            
          }
        )
      }
    })
    .catch(err => {
      console.log("ERRO" + err)
    })
  }