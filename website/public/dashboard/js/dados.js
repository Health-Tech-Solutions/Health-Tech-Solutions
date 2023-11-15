

function mostrarDados(){
  var idUsuario = sessionStorage.ID_USUARIO;
  fetch(`/funcionario/mostrarDados/${idUsuario}`)
  .then(function (resposta){
    if(resposta.ok){
      resposta.json()
      .then(
        function(resposta){
          infos = resposta[0]
          console.log("the resposta é " + infos)
          let foto = document.getElementById("usuario_foto")
          let nome = document.getElementById("usuario_nome")
          nome.innerHTML = infos.nome
          if(infos.foto == null){
            foto.src = `../assets/usuario.png`
          } else {
            foto.src = `../assets/${infos.foto}`
          }
        }
      )
    }
  })
  .catch(
    err => {
      console.error("Deu erro")
    }
  )
}

