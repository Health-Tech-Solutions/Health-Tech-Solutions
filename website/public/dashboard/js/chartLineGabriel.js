var dataDados = []
var desempenho = []
 function graficoLinha(){

     var fkHospital = sessionStorage.FK_HOSPITAL
     fetch(`/gabrielRoutes/graficoLinha/${fkHospital}`)
     .then(
         function(resposta){
             if(resposta.ok){
                 resposta.json()
                 .then(
                     function(resposta){
                        console.log("CHARTTTTTTlINHAAAAAAAAAAAAAAAAAAAAAAAA")
                         console.log(resposta) 
                         

                         
                            for (let i = 0; i < resposta.length; i++) {
                                dataDados.push(resposta[i].temperaturaMedia)
                            }
                         
                            for (let index = 0; index < resposta.length; index++) {
                                desempenho.push(resposta[index].valor)
                            }

                            criarGraficoLinha()

                            //lineChart.update()
                     }
                 )
             }
         }
     )
     .catch(
         err => {
             console.log("ERRO " + err)
         }
     )
 }
 




 function calcularRegressaoLinear() {
    dataDados = dataDados.map(function (valor) {
        return parseFloat(valor); 
    });

    desempenho = desempenho.map(function (valor1) {
        return parseFloat(valor1); 
    });
    
    // Calcular a média de x e y
    var xSum = 0;
    var ySum = 0;
    for (var i = 0; i < dataDados.length; i++) {
        xSum += dataDados[i];
        ySum += desempenho[i];
    }
    console.log(xSum,ySum)
    var xMean = xSum / dataDados.length;
    var yMean = ySum / dataDados.length;
    console.log(xMean,ySum)
    
    // Calcular os coeficientes da regressão
    var numerator = 0;
    var denominator = 0;
    for (var i = 0; i < dataDados.length; i++) {
        numerator += (dataDados[i] - xMean) * (desempenho[i] - yMean);
        denominator += (dataDados[i] - xMean) * (dataDados[i] - xMean);
        console.log(numerator,denominator)
    }
    var a = numerator / denominator;
    var b = yMean - a * xMean;

    console.log(a, b);
    return { a, b };
}


function criarGraficoLinha() {
    // Calcula os coeficientes da regressão linear
    var coeficientes = calcularRegressaoLinear();
    var a = coeficientes.a;
    var b = coeficientes.b;

    // Pega o valor de a e b do calcularRegressaoLinear e faz o calculo
    //com base no x (dados do dataDados)
    var labels = dataDados;
    var valoresRegressao = dataDados.map(function (x) {
        return a * x + b;
    });

    
    var ctx = document.getElementById('chartLinha').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Desempenho Original',
                    data: desempenho,
                    borderColor: 'blue',
                    fill: false,
                },
                {
                    label: 'Regressão Linear',
                    data: valoresRegressao,
                    borderColor: 'red',
                    fill: false,
                },
            ],
        },
    });
}




//GRÁFICO ANTIGO

// const ctx = document.getElementById('chartLinha');
// labels = dataDados
// // 12, 19, 3, 5, 2, 3, 4, 7, 1, 2, 4, 7
// var dados = {
//     labels: dataDados,
//     datasets: [{
//         label: '',
//         data: desempenho,
//         borderWidth: 1,
//         backgroundColor: '#030050',
//         borderColor: '#030050'
//     }]
// }

// var lineChart = new Chart(ctx, {
//     type: 'line',
//     data: dados,
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false
//             }
//         }
//     }
// });
