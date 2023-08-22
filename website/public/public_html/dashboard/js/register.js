var fkEndereco;
var fkEmpresa;
var planoEscolhido;
document.getElementById("primeiroCadastro").style.display = "block";

function planoPrata() {
    dropdownMenuButton.innerHTML = 'Prata';
    planoEscolhido = 1;
}
function planoGold() {
    dropdownMenuButton.innerHTML = 'Gold';
    planoEscolhido = 2;
}
function planoRubi() {
    dropdownMenuButton.innerHTML = 'Rubi';
    planoEscolhido = 3;
}
function trocarTela() {
    if (primeiroCadastro.style.display == 'block') {
        document.getElementById("primeiroCadastro").style.display = "none";
        document.getElementById("segundoCadastro").style.display = "block";
        tituloCadastro.innerHTML = 'Cadastre sua corporação';
    } else if (segundoCadastro.style.display == 'block') {
        document.getElementById("segundoCadastro").style.display = "none";
        document.getElementById("terceiroCadastro").style.display = "block";
        tituloCadastro.innerHTML = 'Cadastre seu endereço';
    }
}


function verifEmail() {
    var erro = false;
    var emailVar = InputEmail.value;
    
    if (InputNome.value == '') {
        alert("Favor inserir o nome do usuário");
        erro = true;
    }
    if (emailVar == "") {
        alert("Favor fornecer um email");
        erro = true;
    }
    if (InputConfirmacaoSenha.value != InputSenha.value) {
        alert('As senhas não correspondem');
        erro = true;
    }
    if (emailVar.indexOf("@") == -1) {
        alert('Insira um email válido')
        erro = true;
    }
    if (InputSenha.value == '' || InputConfirmacaoSenha.value == '') {
        alert('Favor fornecer uma senha')
        erro = true;
    }
    if (erro == false) {
        // Enviando o valor da nova input
        fetch("/usuarios/verifEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: emailVar,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(json => {
                        console.log(JSON.stringify(json));
                        if (json[0] != undefined) {
                            alert('Este email já está registrado');
                        }
                        else {
                            console.log('Email validado')
                            trocarTela();
                        }
                    })
                } else {
                    throw "Houve um erro ao tentar validar o email";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }
}

function cadastarEndereco() {
    var erro = false;
    var cepVar = InputCEP.value;
    var numeroVar = InputNumero.value;
    var complementoVar = InputComplemento.value;

    if (cepVar == undefined) {
        alert("Favor inserir o CEP");
        erro = true;
    }
    if (numeroVar == undefined) {
        alert("Favor fornecer um número");
        erro = true;
    }
    if (complementoVar == undefined) {
        alert('Insira um complemento');
        erro = true;
    }
    if (erro == false) {
        fetch("/usuarios/cadastrarEndereco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cepServer: cepVar,
                numeroServer: numeroVar,
                complementoServer: complementoVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    console.log("Cadastro de Endereco realizado, prosseguindo para busca de fk")
                    buscaFkEndereco();

                } else {
                    throw "Houve um erro ao cadastrar endereço";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }

}

function buscaFkEndereco() {
    var erro = false;
    var cepVar = InputCEP.value;
    var numeroVar = InputNumero.value;
    var complementoVar = InputComplemento.value;

    if (cepVar == undefined) {
        alert("Favor inserir o CEP");
        erro = true;
    }
    if (numeroVar == undefined) {
        alert("Favor fornecer um número");
        erro = true;
    }
    if (complementoVar == undefined) {
        alert('Insira um complemento');
        erro = true;
    }
    if (erro == false) {
        fetch("/usuarios/buscarFkEndereco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cepServer: cepVar,
                numeroServer: numeroVar,
                complementoServer: complementoVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(json => {
                        console.log(JSON.stringify(json));
                        if (json[0] != undefined) {
                            fkEndereco= json[0].idEndereco;
                            cadastarEmpresa();
                        }
                        else {
                            console.log("Não foi possível encontrar a fk de endereço")
                        }
                    })
                } else {
                    throw "Houve um erro ao cadastrar endereco";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }
}

function verifCNPJ() {
    var erro = false;
    var cnpjVar = InputCNPJ.value;
    if (cnpjVar == undefined) {
        alert('O complemento esta undefined');
        erro = true;
    }
    if (erro == false) {
        fetch("/usuarios/verifCNPJ", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cnpjServer: cnpjVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(json => {
                        console.log(JSON.stringify(json));
                        if (json[0] != undefined) {
                            alert('Este CNPJ já está registrado');
                            console.log('Este CNPJ já esta registrado')
                        }
                        else {
                            console.log("CNPJ Validado")
                            trocarTela();
                        }
                    })
                } else {
                    throw "Houve um erro ao tentar cadastrar empresa";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }
}

function cadastarEmpresa() {
    var erro = false;
    var nomeFantasiaVar = InputNomeFantasia.value;
    var telefoneVar = InputTelefone.value;
    var cnpjVar = InputCNPJ.value;
    var fkEnderecoVar = fkEndereco;

    if (nomeFantasiaVar == undefined) {
        alert("O nome fantasia esta undefined");
        erro = true;
    }
    if (telefoneVar == undefined) {
        alert("O número esta undefined");
        erro = true;
    }
    if (cnpjVar == undefined) {
        alert('O complemento esta undefined');
        erro = true;
    }
    if (fkEnderecoVar == undefined) {
        alert('O complemento esta undefined');
        erro = true;
    }
    if (erro == false) {
        fetch("/usuarios/cadastrarEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeFantasiaServer: nomeFantasiaVar,
                telefoneServer: telefoneVar,
                cnpjServer: cnpjVar,
                fkEnderecoServer: fkEnderecoVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    console.log("Cadastro de Empresa realizado, prosseguindo para busca de fk de empresa")
                    buscarFkEmpresa();
                } else {
                    throw "Houve um erro ao tentar cadastrar empresa";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }
}

function buscarFkEmpresa() {
    var erro = false;
    var nomeFantasiaVar = InputNomeFantasia.value;
    var telefoneVar = InputTelefone.value;
    var cnpjVar = InputCNPJ.value;
    var fkEnderecoVar = fkEndereco;

    if (nomeFantasiaVar == undefined) {
        alert("O nome fantasia esta undefined");
        erro = true;
    }
    if (telefoneVar == undefined) {
        alert("O número esta undefined");
        erro = true;
    }
    if (cnpjVar == undefined) {
        alert('O complemento esta undefined');
        erro = true;
    }
    if (fkEnderecoVar == undefined) {
        alert('O complemento esta undefined');
        erro = true;
    }
    if (erro == false) {
        fetch("/usuarios/buscarFkEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeFantasiaServer: nomeFantasiaVar,
                telefoneServer: telefoneVar,
                cnpjServer: cnpjVar,
                fkEnderecoServer: fkEnderecoVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(json => {
                        console.log(JSON.stringify(json));
                        if (json[0] != undefined) {
                            fkEmpresa= json[0].idEmpresa;
                            cadastrarFuncionario();
                        }
                        else {
                            console.log("Não foi possível encontrar a fk de empresa")
                        }
                    })} else {
                    throw "Não foi possível localizar fk de Empresa";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }
}

function cadastrarFuncionario() {
    var erro = false;
    var nomeVar = InputNome.value;
    var emailVar = InputEmail.value;
    var senhaVar = InputSenha.value;    
    var fkEmpresaVar = fkEmpresa;

    if (nomeVar == undefined) {
        alert("O nome esta undefined");
        erro = true;
    }
    if (emailVar == undefined) {
        alert("O email esta undefined");
        erro = true;
    }
    if (senhaVar == undefined) {
        alert('A senha esta undefined');
        erro = true;
    }
    if (fkEmpresaVar == undefined) {
        alert('O fk esta undefined');
        erro = true;
    }
    if (erro == false) {
        fetch("/usuarios/cadastrarFuncionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                fkEmpresaServer: fkEmpresaVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    console.log("Cadastro de Funcionario realizado, iniciando cadastro de plano")
                    InputComplemento.value = '';
                    InputNumero.value = '';
                    InputCEP.value = '';
                    cadastrarPlano();

                } else {
                    throw "Houve um erro ao tentar cadastrar funcionario";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }
}

function cadastrarPlano() {
    var erro = false;
    var planoEscolhidoVar = planoEscolhido;
    var fkEmpresaVar = fkEmpresa;

    if (planoEscolhido == undefined) {
        alert("O plano escolhido está undefined");
        erro = true;
    }
    if (erro == false) {
        fetch("/usuarios/cadastrarPlano", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                planoEscolhidoServer: planoEscolhidoVar,
                fkEmpresaServer: fkEmpresaVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    console.log("Cadastro de plano realizado")
                    window.location.href = "login.html";
                } else {
                    throw "Houve um erro ao tentar cadastrar plano";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }
}
