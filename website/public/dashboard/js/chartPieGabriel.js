
// Gráfico de pizza, gravidade dos chamados por modelo de máquina


if (sessionStorage.FK_HOSPITAL == undefined) {
    sessionStorage.FK_HOSPITAL = null
}
if (sessionStorage.NOME_HOSPITAL == 'null') {
    sessionStorage.NOME_HOSPITAL = 'Todos'
}

if (sessionStorage.tipo == undefined) {
    sessionStorage.tipo = 'Todos'
}
if (sessionStorage.nomeMes == undefined) {
    sessionStorage.nomeMes = 'Todos'
}




const configPie = document.getElementById('chartPie');

var dadosPizza = {
    labels: [],
    datasets: [{
        label: '',
        data: [],
        backgroundColor: [
            '#1cc88a',
            '#f6c23e',
            '#e74a3b'              
        ],
        borderWidth: 1
    }]
}
var graficoPizza = new Chart(configPie, {
    type: 'pie',
    data: dadosPizza,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                display: false

            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
console.log("PIIZZZZZAAAAAAAAAAAAAAAA")
function graficoPizza1(){
    var fkHospital = sessionStorage.FK_HOSPITAL
    var idMes = sessionStorage.mes 
    console.log(fkHospital)
    console.log(idMes)
    fetch(`/gabrielRoutes/graficoPizza/${idMes}/${fkHospital}`)
    .then(
        resposta => {
            if(resposta.ok){
                // console.log(resposta)
                resposta.json()
                .then(
                    resposta => {
                        console.log("PIIZZZZZAAAAAAAAAAAAAAAA222222222222222")
                        console.log(resposta)
                        plotarGraficoPizza(resposta)
                    }
                )
            }
        }
    )
    .catch(err =>{
        console.log("ERRO " + err)
    })
}

// function plotarGraficoPizza(resposta){
//     let labels = []
//     let cores = []
//     dadosPizza.labels = labels
//     dadosPizza.datasets[0].data = []
//     for (let i = 0; i <= 5; i++) {
//         let element = resposta[i];
//         if(element.nivel == 'Baixo'){
//             cores.push('#1cc88a')
//         } else if(element.nivel == 'Médio'){
//             cores.push('#f6c23e')
//         } else {
//             cores.push('#e74a3b')
//         }
//         dadosPizza.labels.push(element.nivel)
//         dadosPizza.datasets[0].data.push(element.qtdChamado)
//     }

//     dadosPizza.datasets[0].backgroundColor = cores
//     graficoPizza.update()
    
// }


function plotarGraficoPizza(resposta) {
    let labels = [];
    let cores = [];
    dadosPizza.labels = labels;
    dadosPizza.datasets[0].data = [];
    for (let i = 0; i < resposta.length; i++) {
        let element = resposta[i];
        let nivel = element.nivel || 'Desconhecido'; // Usar 'Desconhecido' se a propriedade 'nivel' não existir
        console.log(nivel)
        if (nivel === 'Baixo') {
            cores.push('#1cc88a');
        } else if (nivel === 'Médio') {
            cores.push('#f6c23e');
        } else {
            cores.push('#e74a3b');
        }
        dadosPizza.labels.push(nivel);
        dadosPizza.datasets[0].data.push(element.qntChamado);
    }
    dadosPizza.datasets[0].backgroundColor = cores;
    graficoPizza.update();
    console.log("NÃO SEIIIIIIIIIIIIIIIIIIIIIIII")
}








// var posicao = 0
// var equipamentos = []
// var tipos = []
// function listarEquipamentos(numero){
//     equipamentos = []
//     tipos = []
//     var fkHospital = sessionStorage.FK_HOSPITAL
//     fetch(`/chamados/listarModelos/${fkHospital}`)
//         .then(
//             resposta => {
//                 if(resposta.ok){
//                     resposta.json()
//                     .then(
//                         resposta => {
//                             console.log(resposta)
//                             for (let i = 0; i < resposta.length; i++) {
//                                 const element = resposta[i];
//                                 console.log(element)
//                                 equipamentos.push(element.tipo) 
//                                 tipos.push(element.idTipo)
//                             }   
//                             mudarEquipamento(numero, equipamentos, tipos)    
               
//                         }
//                     )
//                 }
//             }
//         )
//         .catch(
//             err =>{
//                 console.log("ERRO " + err)
//             }
//         )  

       
// }

// function mudarEquipamento(numero, equipamentos, tipos){
//     if((posicao == 0 && numero == -1) || (posicao == equipamentos.length && numero == 1)){
//         numero = 0 
//     }
//     posicao += numero 
//     sessionStorage.POSICAO_EQUIPAMENTO = posicao
//     if(posicao == 0){
//         posicao = 1
//     }
//     nome_equipamento.innerHTML = equipamentos[posicao - 1]
//     buscarGravidade(tipos[posicao -1])
// }