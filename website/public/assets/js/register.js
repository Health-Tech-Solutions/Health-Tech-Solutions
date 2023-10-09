var fkEndereco;
var fkEmpresa;
var planoEscolhido;
document.getElementById("primeiroCadastro").style.display = "block";

//DEBUG
primeiroCadastro.style.display = "none"
segundoCadastro.style.display = "block"
//FIM DEBUG

// Adicionando mascara nos inputs
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

InputCEP.addEventListener('keypress', () => {
    let inputLength = InputCEP.value.length

    if (inputLength === 5) {
        InputCEP.value += '-'
    }
})

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
    var nomeVar = InputNome.value;
    var emailVar = InputEmail.value;
    var senhaVar = InputSenha.value;
    var confSenhaVar = InputConfirmacaoSenha.value;

    var mensagensErro = []; // Array para armazenar mensagens de erro

    function adicionarErro(inputElement) {
        inputElement.style.borderColor = '#9a0801'; // Define a borda da input como vermelha
        inputElement.classList.add('erro-input'); // Adiciona uma classe CSS para estilizar a input com vermelho
    }

    function removerErro(inputElement) {
        inputElement.style.borderColor = ''; // Remove a cor vermelha da borda da input
        inputElement.classList.remove('erro-input'); // Remove a classe CSS de erro
    }

    if (nomeVar == '') {
        mensagensErro.push('Favor, inserir o nome do usuário.');
        adicionarErro(InputNome);
        erro = true;
    } else {
        removerErro(InputNome);
    }
    if (emailVar == '') {
        mensagensErro.push('Não esqueça de fornecer um email.');
        adicionarErro(InputEmail);
        erro = true;
    } else {
        removerErro(InputEmail);
    }
    if (confSenhaVar != senhaVar) {
        mensagensErro.push('As senhas não correspondem.');
        adicionarErro(InputConfirmacaoSenha);
        erro = true;
    } else {
        removerErro(InputConfirmacaoSenha);
    }
    if (emailVar.indexOf("@") == -1) {
        mensagensErro.push('Insira um email válido.');
        adicionarErro(InputEmail);
        erro = true;
    } else {
        removerErro(InputEmail);
    }
    if (senhaVar == '' || confSenhaVar == '') {
        mensagensErro.push('Forneça uma senha.');
        adicionarErro(InputSenha);
        adicionarErro(InputConfirmacaoSenha);
        erro = true;
    } else {
        removerErro(InputSenha);
        removerErro(InputConfirmacaoSenha);
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

    // Exibir todas as mensagens de erro de uma vez
    if (mensagensErro.length > 0) {
        Swal.fire({
            position: 'top',
            title: 'Atenção!',
            html: mensagensErro.join('<br>'), // Juntar mensagens com quebras de linha
            confirmButtonColor: '#9a0801'
        });
    }
}
function viaCepAPI(){
    var numeroCep = document.getElementById("InputCEP");
    const json = fetch(`https://viacep.com.br/ws/${numeroCep.value}/json/`)
  .then(resposta => resposta.json())
json.then(dados=>{
  console.log(`---Endereço---\nCEP:${dados.cep}\nLogradouro:${dados.logradouro}\nBairro:${dados.bairro}\nCidade:${dados.localidade}`)
InputLogradouro.value = dados.logradouro
InputCidade.value = dados.localidade
InputBairro.value = dados.bairro
})
.catch(error =>{console.log("CEP NAO ENCONTRADO")})
}

function cadastrarEndereco() {
    // tratamento do input - Eliminando caracteres especiais
    var cepEspecial = InputCEP.value;
    var cepVar = cepEspecial.replace(/[^0-9]/g, "");
    var erro = false;
    var numeroVar = InputNumero.value;
    var complementoVar = InputComplemento.value;
    var logradouroVar = InputLogradouro.value;
    var cidadeVar = InputCidade.value;
    var bairroVar = InputBairro.value;
   
    var mensagensErro = [];

    function adicionarErro(inputElement) {
        inputElement.style.borderColor = '#9a0801'; 
        inputElement.classList.add('erro-input'); 
    }

    function removerErro(inputElement) {
        inputElement.style.borderColor = ''; 
        inputElement.classList.remove('erro-input'); 
    }

    if (cepVar == undefined) {
        mensagensErro.push('Favor, inserir o CEP.');
        adicionarErro(InputCEP);
        erro = true;
    } else {
        removerErro(InputCEP);
    }
    if (numeroVar == undefined) {
        mensagensErro.push('Não esqueça de inserir o número.');
        adicionarErro(InputNumero);
        erro = true;
    } else {
        removerErro(InputNumero);
    }
    if (complementoVar == undefined) {
        mensagensErro.push('Insira um complemento.');
        adicionarErro(InputComplemento);
        erro = true;
    } else {
        removerErro(InputComplemento);
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
                complementoServer: complementoVar,
                logradouroServer: logradouroVar, 
                cidadeServer: cidadeVar, 
                bairroServer: bairroVar
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

    if (mensagensErro.length > 0) {
        Swal.fire({
            position: 'top',
            title: 'Atenção!',
            html: mensagensErro.join('<br>'), 
            confirmButtonColor: '#9a0801'
        });
    }

}

function buscaFkEndereco() {
    var erro = false;
    var cepEspecial = InputCEP.value;
    var cepVar = cepEspecial.replace(/[^0-9]/g, "");
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
                            fkEndereco = json[0].idEndereco;
                            cadastrarEmpresa();
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
function cnpjWsAPI(){
    var cnpjDestratado = document.getElementById("InputCNPJ").value;
    var numeroCNPJ = cnpjDestratado.replace(/[^0-9]/g, "");
    console.log(numeroCNPJ)
    const json = fetch(`https://publica.cnpj.ws/cnpj/${numeroCNPJ.value}`)
json.then(dados=>{
  console.log(`${dados}`)
})
.catch(error =>{console.log("CEP NAO ENCONTRADO")})
}
 

function verifCNPJ() {
    var erro = false;
    var cnpjVar = InputCNPJ.value;
    console.log(InputCNPJ)

    var mensagensErro = [];

    function adicionarErro(inputElement) {
        inputElement.style.borderColor = '#9a0801'; 
        inputElement.classList.add('erro-input'); 
    }

    function removerErro(inputElement) {
        inputElement.style.borderColor = ''; 
        inputElement.classList.remove('erro-input'); 
    }

    if (cnpjVar == undefined || cnpjVar == '') {
        mensagensErro.push('CNPJ inválido');
        adicionarErro(InputCNPJ);
        erro = true;
    } else {
        removerErro(InputCNPJ);
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

    if (mensagensErro.length > 0) {
        Swal.fire({
            position: 'top',
            title: 'Atenção!',
            html: mensagensErro.join('<br>'), 
            confirmButtonColor: '#9a0801'
        });
    }
}

function cadastrarEmpresa() {
    //tratamento da variável - Eliminando caracteres especiais
    var cnpjEspecial = InputCNPJ.value;
    var cnpjVar = cnpjEspecial.replace(/[^0-9]/g, "");
    var telefoneEspecial = InputTelefone.value;
    var telefoneVar = telefoneEspecial.replace(/[^0-9]/g, "")
    var erro = false;
    var nomeFantasiaVar = InputNomeFantasia.value;
    var fkEnderecoVar = fkEndereco;

    var mensagensErro = [];

    function adicionarErro(inputElement) {
        inputElement.style.borderColor = '#9a0801'; 
        inputElement.classList.add('erro-input'); 
    }

    function removerErro(inputElement) {
        inputElement.style.borderColor = ''; 
        inputElement.classList.remove('erro-input'); 
    }

    if (nomeFantasiaVar == undefined) {
        mensagensErro.push('Nome fantasia indefinido');
        adicionarErro(InputNomeFantasia);
        erro = true;
    } else {
        removerErro(InputNomeFantasia);
    }
    if (telefoneVar == undefined) {
        mensagensErro.push('Colocar um número válido');
        adicionarErro(InputTelefone);
        erro = true;
    } else {
        removerErro(InputTelefone);
    }
    if (cnpjVar == undefined) {
        mensagensErro.push('CNPJ inválido');
        adicionarErro(InputCNPJ);
        erro = true;
    } else {
        removerErro(InputCNPJ);
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
    if (mensagensErro.length > 0) {
        Swal.fire({
            position: 'top',
            title: 'Atenção!',
            html: mensagensErro.join('<br>'), 
            confirmButtonColor: '#9a0801'
        });
    }
}

function buscarFkEmpresa() {
    var erro = false;
    var nomeFantasiaVar = InputNomeFantasia.value;
    var cnpjEspecial = InputCNPJ.value;
    var cnpjVar = cnpjEspecial.replace(/[^0-9]/g, "");
    var telefoneEspecial = InputTelefone.value;
    var telefoneVar = telefoneEspecial.replace(/[^0-9]/g, "")
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
                            fkEmpresa = json[0].idEmpresa;
                            cadastrarFuncionario();
                        }
                        else {
                            console.log("Não foi possível encontrar a fk de empresa")
                        }
                    })
                } else {
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

    var mensagensErro = [];

    function adicionarErro(inputElement) {
        inputElement.style.borderColor = '#9a0801'; 
        inputElement.classList.add('erro-input'); 
    }

    function removerErro(inputElement) {
        inputElement.style.borderColor = ''; 
        inputElement.classList.remove('erro-input'); 
    }

    if (nomeVar == undefined) {
        mensagensErro.push('Coloque um nome válido.');
        adicionarErro(InputNome);
        erro = true;
    } else {
        removerErro(InputNome);
    }
    if (emailVar == undefined) {
        mensagensErro.push('Insira um email válido.');
        adicionarErro(InputEmail);
        erro = true;
    } else {
        removerErro(InputEmail);
    }
    if (senhaVar == undefined) {
        mensagensErro.push('Insira a sua senha.');
        adicionarErro(InputSenha);
        erro = true;
    } else {
        removerErro(InputSenha);
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
                    console.log("Cadastro de Funcionario realizado")
                    InputComplemento.value = '';
                    InputNumero.value = '';
                    InputCEP.value = '';
                    // cadastrarPlano();
                    window.location.href = "login.html";
                } else {
                    throw "Houve um erro ao tentar cadastrar funcionario";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }
    if (mensagensErro.length > 0) {
        Swal.fire({
            position: 'top',
            title: 'Atenção!',
            html: mensagensErro.join('<br>'), 
            confirmButtonColor: '#9a0801'
        });
    }
}

// function cadastrarPlano() {
//     var erro = false;
//     var planoEscolhidoVar = planoEscolhido;
//     var fkEmpresaVar = fkEmpresa;

//     if (planoEscolhido == undefined) {
//         alert("O plano escolhido está undefined");
//         erro = true;
//     }
//     if (erro == false) {
//         fetch("/usuarios/cadastrarPlano", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 planoEscolhidoServer: planoEscolhidoVar,
//                 fkEmpresaServer: fkEmpresaVar
//             }),
//         })
//             .then(function (resposta) {
//                 console.log("resposta: ", resposta);

//                 if (resposta.ok) {
//                     console.log("Cadastro de plano realizado")
//                     window.location.href = "login.html";
//                 } else {
//                     throw "Houve um erro ao tentar cadastrar plano";
//                 }
//             })
//             .catch(function (resposta) {
//                 console.log(`#ERRO: ${resposta}`);

//             });

//         return false;
//     }
// }
