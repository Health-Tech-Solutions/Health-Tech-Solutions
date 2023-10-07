function enviarFoto() {
    alert("Ta entrando1")
    const formData = new FormData();
    console.log(ipt_foto.files[0], formData)
    formData.append('foto', ipt_foto.files[0])
    alert("Ta entrando2")
    // idUsuario = sessionStorage.ID_USUARIO
    var idFuncionario = sessionStorage.ID_FUNCIONARIO
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