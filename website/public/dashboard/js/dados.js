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
            Foto_perfil = document.getElementById("foto_perfil")
            Perfil = document.getElementById("foto_perfil")
            if(infos.foto == null){
              Foto.src = `../assets/usuario.png`
              Foto_perfil.src = `../assets/usuario.png                  `
            }else{
              Foto.src = `../assets/${infos.foto}`

            }
            Perfil.src = `../assets/${infos.foto}`;

          }
        )
      }
    })
    .catch(err => {
      console.log("ERRO" + err)
    })
  }