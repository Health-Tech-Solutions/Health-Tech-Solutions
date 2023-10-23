

function enviarFoto() {

    const formData = new FormData();
    console.log(ipt_foto.files[0], formData)
    formData.append('foto', ipt_foto.files[0])

    // idUsuario = sessionStorage.ID_USUARIO
    var idFuncionario = sessionStorage.ID_USUARIO
    fetch(`/funcionario/enviarFoto/${idFuncionario}`, {
      method: "POST",
      body: formData
    })
      .then(res => {
        console.warn("Ta entrando3")
        console.log(res)
        window.location = "./perfilFuncionario.html"
      })
      .catch(err => {
        console.log(err);
      })
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
             var email = resposta[0].email
             var funcao = resposta[0].funcao
             var senha = resposta[0].senha
             usuario_nome.innerHTML = nome
             console.log("Dados recebidos: ", JSON.stringify(resposta));
             ipt_emailFuncionario.value = `${email}`
             ipt_nomeFuncionario.value = `${nome}`
             ipt_funcao.value = `${funcao}`
             ipt_senha.value = `${senha}`
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
            infos = resposta[0].foto;
            console.log(infos)
            Foto = document.getElementById("usuario_foto")
            Foto_perfil = document.getElementById("Foto_usuario")
            
            
            if(infos == null){
              Foto.src = `../assets/usuario.png`
              Foto_perfil.src `../assets/usuario.png`
            } else {
              
              Foto.src = `../assets/${infos}`
              
              Foto_perfil.src = `../assets/${infos}`
            }

          }
        )
      }
    })
    .catch(err => {
      console.log("ERRO" + err)
    })



  }