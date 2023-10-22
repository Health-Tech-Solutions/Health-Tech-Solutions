

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
        //window.location = "./perfil.html"
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