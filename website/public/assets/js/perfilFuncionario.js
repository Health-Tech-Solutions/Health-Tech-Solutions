

function enviarFoto() {
    alert("Ta entrando1")
    const formData = new FormData();
    console.log(ipt_foto.files[0], formData)
    formData.append('foto', ipt_foto.files[0])
    alert("Ta entrando2")
    // idUsuario = sessionStorage.ID_USUARIO
    var idFuncionario = sessionStorage.ID_USUARIO
    fetch(`/funcionario/enviarFoto/${idFuncionario}`, {
      method: "POST",
      body: formData
    })
      .then(res => {
        console.warn("Ta entrando3")
        //window.location = "./perfil.html"
      })
      .catch(err => {
        console.log(err);
      })
  }

  function mostrarFoto(){
    var idFuncionario = sessionStorage.ID_USUARIO;
    fetch(`/funcionario/mostrarFoto/${idFuncionario}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(

          function(resposta){
            infos = resposta[0];
            console.log(infos)
            Foto = document.getElementById("usuario_foto")
            Perfil = document.getElementById("foto_perfil")
            Foto.src = `../assets/${infos.foto}`
            Perfil.src = `../assets/${infos.foto}`;

          }
        )
      }
    })
    .catch(err => {
      console.log("ERRO" + err)
    })
  }

  function pegarInformacoes(){
    
  }

  function atualizarDados(){
     var idFuncionario = sessionStorage.ID_USUARIO;
     fetch(`/funcionario/pegarInformacoes/${idFuncionario}`)
     .then(function (resposta){
       if(resposta.ok){
         resposta.json()
         .then(

           function(resposta){
             var nome = resposta[0].nome
             console.log("Dados recebidos: ", JSON.stringify(resposta));
             usuario_nome.innerHTML = `${nome}`
           }
         )
       }
     })
     .catch(err => {
       console.log("ERRO" + err)
     })

    var idFuncionario = sessionStorage.ID_USUARIO;
    fetch(`/funcionario/mostrarFoto/${idFuncionario}`)
    .then(function (resposta){
      if(resposta.ok){
        resposta.json()
        .then(

          function(resposta){
            infos = resposta[0];
            console.log(infos)
            Foto = document.getElementById("usuario_foto")
            Perfil = document.getElementById("foto_perfil")
            Foto.src = `../assets/${infos.foto}`
            Perfil.src = `../assets/${infos.foto}`;

          }
        )
      }
    })
    .catch(err => {
      console.log("ERRO" + err)
    })



  }