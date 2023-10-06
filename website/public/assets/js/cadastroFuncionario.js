InputCPF.addEventListener('keypress', () =>{
    let inputLength = InputCPF.value.length
    
    if(inputLength === 3 || inputLength === 7){
        InputCPF.value += "."
    } else if(inputLength === 11){
        InputCPF.value += "-"
    }
})  

function cadastrar(){
    var cpfEspecial = InputCPF.value
    var cpfVar = cpfEspecial.replace(/[^0-9]/g, "")
    var nomeVar = InputNome.value;
    var emailVar = InputEmail.value;
    var senhaVar = InputSenha.value;
    var confirmacaoSenhaVar = InputConfirmacaoSenha.value;
    var fkEmpresa = sessionStorage.FK_EMPRESA;
    var fkRepresentante = sessionStorage.ID_USUARIO;

    if(!nomeVar || !emailVar || !senhaVar || !confirmacaoSenhaVar){
        alert("Preencha todos os campos para efetuar o cadastro")
    }
    else if(senhaVar != confirmacaoSenhaVar){
        alert("As senhas não correspondem")
    }
    else{
        fetch("/funcionario/cadastrar",{
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                cpfServer: cpfVar,
                fkEmpresaServer: fkEmpresa,
                fkRepresentanteServer: fkRepresentante
            })
        })
        .then(res => {
            if(res.status == 200){
                res.json().then(res => {
                    InputNome.value = ""
                    InputEmail.value = ""
                    InputSenha.value = ""
                    listarFuncionarios()
                })
                    InputConfirmacaoSenha.value = ""
            } else if(res.status == 400){
                alert("Email já cadastrado")
            }
        })
        .catch(res => {
            console.log("ERRO#" + res.status)
        })
    }
}

function listarFuncionarios(){
    fetch(`/funcionario/listar/${sessionStorage.FK_EMPRESA}`)
        .then(res => res.json())
        .then(res => {
            funcionarios.innerHTML = ""
            if(res.funcionarios.length > 0){
                res.funcionarios.map(i => {
                    funcionarios.innerHTML += `
                        <div class="card-body row row-cols-3 justify-content-between">
                            <p>${i.nome}</p>
                            <p>${i.email}</p>
                            <p>${i.funcao}</p>
                        </div>
                    `
                 })
            }
            else{
                funcionario.innerHMTL += `
                    <div class="card-body">
                        Não há nenhum funcionário cadastrado no momento
                    </div>
                `   
            }
        })
}   
listarFuncionarios()