InputCNPJ.addEventListener('keypress', () => {
    let inputLength = InputCNPJ.value.length

    if (inputLength === 2 || inputLength === 6) {
        InputCNPJ.value += '.'
    } else if (inputLength === 10) {
        InputCNPJ.value += '/'
    } else if (inputLength === 15) {
        InputCNPJ.value += '-'
    }
})

InputTelefone.addEventListener('keypress', () => {
    let inputLength = InputTelefone.value.length

    if (inputLength === 0) {
        InputTelefone.value += '(';
    } else if (inputLength === 3) {
        InputTelefone.value += ')'
    } else if (inputLength === 9) {
        InputTelefone.value += '-'
    }
})

InputCEP.addEventListener('keypress', () => {
    let inputLength = InputCEP.value.length

    if (inputLength === 5) {
        InputCEP.value += '-';
    }
})

function cadastrar() {
    var nomeFantasiaVar = InputNomeFantasia.value
    var cnpj = InputCNPJ.value
    var cnpjVar = cnpj.replace(/[^0-9]/g, "")
    var telefone = InputTelefone.value
    var telefoneVar = telefone.replace(/[^0-9]/g, "")

    var cep = InputCEP.value
    var cepVar = cep.replace(/[^0-9]/g, "")
    var numeroVar = InputNumero.value
    var complementoVar = InputComplemento.value
    var logradouroVar = InputLogradouro.value
    var bairroVar = InputBairro.value
    var cidadeVar = InputCidade.value
    var fkEmpresaVar = sessionStorage.FK_EMPRESA
    console.log("CONFIRMAÇÃO")
    console.log(fkEmpresaVar)

    
        fetch("/hospitais/cadastrar", {
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                nomeFantasiaServer: nomeFantasiaVar,
                cnpjServer: cnpjVar,
                telefoneServer: telefoneVar,
                cepServer: cepVar,
                numeroServer: numeroVar,
                complementoServer: complementoVar,
                logradouroServer: logradouroVar,
                bairroServer: bairroVar,
                cidadeServer: cidadeVar,
                fkEmpresaServer: fkEmpresaVar
            })
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(res => {
                        Swal.fire({
                            title: 'Hospital cadastrado com sucesso!',
                            icon: 'success'
                        })
                        InputNomeFantasia.value = ""
                        InputCNPJ.value = ""
                        InputTelefone.value = ""
                        InputCEP.value = ""
                        InputNumero.value = ""
                        InputComplemento.value = ""
                        InputLogradouro.value = ""
                        InputBairro.value = ""
                        InputCidade.value = ""
                       // listarHospitais()
                    })
                } else if (res.status == 400) {
                    alert("Hospital já cadastrado")
                  } 
                //else if (!nomeFantasiaVar || !cnpjVar || !telefoneVar || !cepVar || !numeroVar || !complementoVar || !logradouroVar || !bairroVar || !cidadeVar) {
                //     alert("Preencha todos os campos para efetuar o cadastro")
                // }
            })
            .catch(res => {
                console.log("ERRO#" + res.status)
            })
    }


    function listarHospitais(){

        fetch(`/hospitais/listarHospitais`)
        .then(  
            function(resposta){
                if(resposta.ok){
                    resposta.json()
                    .then(
                        function(resposta){
                            hospitalResposta = resposta
                            console.log(hospitalResposta)

                            hospitais.innerHTML = ""
                            if(hospitalResposta.length > 0){

                                for (let index = 0; index < hospitalResposta.length; index++) {
                                    hospitais.innerHTML += `
                                        <div class="card-body row row-cols-3 justify-content-between">
                                            <p>${hospitalResposta[index].nomeFantasia}</p>
                                            <p>${hospitalResposta[index].cnpj}</p>
                                        </div>
                                    `
                                    
                                }
                            }
                            else{
                                funcionario.innerHMTL += `
                                    <div class="card-body">
                                        Não há nenhum funcionário cadastrado no momento
                                    </div>
                                `   
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



// function listarHospitais() {
//     FK_EMPRESA = sessionStorage.FK_EMPRESA
//     fetch(`/hospitais/listar/${FK_EMPRESA}`)
//         .then(res => res.json())
//         .then(res => {
//             hospitais.innerHTML = ""
//             if (res.hospitais.length > 0) {
//                 res.hospitais.map(i => {
//                     hospitais.innerHTML += `
//                         <div class="card-body row row-cols-3 justify-content-between">
//                             <p>${i.nomeFantasia}</p>
//                             <p>${i.cnpj}</p>
//                             <p>${i.telefone}</p>
//                         </div>
//                     `
//                 })
//             }
//             else {
//                 funcionario.innerHMTL += `
//                     <div class="card-body">
//                         Não há nenhum funcionário cadastrado no momento
//                     </div>
//                 `
//             }
//         })
// }
// listarHospitais()