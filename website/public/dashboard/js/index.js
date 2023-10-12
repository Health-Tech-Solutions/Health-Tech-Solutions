function listarHospitais(){

    fetch(`/hospitais/listarHospitais`)
    .then(
        function(resposta){
            if(resposta.ok){
                resposta.json()
                .then(
                    function(resposta){
                        console.log(resposta)
                        for (let i = 0; i < resposta.length; i++) {
                            let nome = resposta[i].nomeFantasia
                            dropdown_menu.innerHTML += `<a class="dropdown-item" href="#">${nome}</a>` 
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