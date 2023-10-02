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
    var cpf = cpfEspecial.replace(/[^0-9]/g, "")
    

    var nome = InputNome.value
    var email = InputEmail.value
    var senha = InputSenha.value
    var confirmacaoSenha = InputConfirmacaoSenha.value

    if(!nome || !email || !senha || !confirmacaoSenha){
        alert("Preencha todos os campos para efetuar o cadastro")
    }
    else if(senha != confirmacaoSenha){
        alert("As senhas não correspondem")
    }
    else{
        fetch("/funcionario/cadastrar",{
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                senha,
                cpf,
                fkEmpresa: sessionStorage.FK_EMPRESA,
                fkRepresentante: sessionStorage.ID_USUARIO
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