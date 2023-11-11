var dataDados = []
var desempenho = []
var dadosDataTemperatura = []
var juntarTempDATA = []

 function trocarTempoDoGrifco(){
// Obtenha a referência ao elemento checkbox
const checkbox = document.getElementById("exampleRadios1");

// Adicione um listener ao evento "change" do checkbox
checkbox.addEventListener("change", function() {
  // Verifique se o checkbox está marcado
  if (checkbox.checked) {
    // Pegue o valor do checkbox
    const value = checkbox.value;
    sessionStorage.tempGraficoLinha = value

    // Faça algo com o valor do checkbox
    console.log("O valor da checkBox é:", value);
  }
});
 }

 function trocarTempoAnual(){
    // Obtenha a referência ao elemento checkbox
    const checkbox = document.getElementById("exampleRadios2");
    
    // Adicione um listener ao evento "change" do checkbox
    checkbox.addEventListener("change", function() {
      // Verifique se o checkbox está marcado
      if (checkbox.checked) {
        // Pegue o valor do checkbox
        const value = checkbox.value;
        sessionStorage.tempGraficoLinha = value
    
        // Faça algo com o valor do checkbox
        console.log("O valor da checkBox é:", value);
      }
    });
     }


 function graficoLinha(){

     trocarTempoDoGrifco()
    var tempGraficoLinha = sessionStorage.tempGraficoLinha

     var fkHospital = sessionStorage.FK_HOSPITAL
    
     fetch(`/gabrielRoutes/graficoLinha/${fkHospital}/${tempGraficoLinha}`)
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

                            for (let index = 0; index < resposta.length; index++) {
                                var apenasData = (resposta[index].dataTemperatura).split("T",1)
                                dadosDataTemperatura.push(apenasData)
                            }
                            console.log(dataDados)
                            for (let index = 0; index < dataDados.length; index++) {
                                let temp = dataDados[index]
                                let data = dadosDataTemperatura[index]
                        
                                juntarTempDATA.push(`${temp}°C ${data}`)
                        
                                
                            }

                            criarGraficoLinha()

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
    
    // Calcular os coeficientes da regressão:
    // O numerador é a soma dos produtos dos desvios de X em relação à média de X e dos desvios de Y em relação à média de Y 
    // para cada par de dados (X - X̄) * (Y - Ȳ)
    // A variável denominator é usada para calcular a soma dos quadrados dos desvios de x em relação à sua média.
    // X (X - X̄)^2
    //CALCULAR A INCLINAÇÃO a = Σ((X - X̄)(Y - Ȳ)) / Σ((X - X̄))

    var numerator = 0;
    var denominator = 0;
    for (var i = 0; i < dataDados.length; i++) {
        numerator += (dataDados[i] - xMean) * (desempenho[i] - yMean);
        denominator += (dataDados[i] - xMean) * (dataDados[i] - xMean)^2;
        console.log(numerator,denominator)
    }
    //Inclinação (Beta)
     var a = numerator / denominator;
    //var a = 0.04
    //Interceptação (Alfa)
    var b = yMean - a * xMean;
    //var b = 91.7

    console.log(a, b);

    var r = RSquared(yMean,a,b);
    var Rsq = r.Rsq
    console.log("R")
    console.log(Rsq)


    return { a, b, Rsq };



}


function criarGraficoLinha() {
    // Calcula os coeficientes da regressão linear
    var coeficientes = calcularRegressaoLinear();
    var a = coeficientes.a;
    var b = coeficientes.b;
    var Rsq = coeficientes.Rsq
    

    // Pega o valor de a e b do calcularRegressaoLinear e faz o calculo
    //com base no x (dados do dataDados)
    // filtrar por máquina e no filtro mostrar o tipo dela
    var labels = dataDados;
    var valoresRegressao = dataDados.map(function (x) {
    // alfa + beta * x formula da regressão linear
    // b + x * a seguindo as variaveis da função calcularRegressaoLinear
        return b + x * a;
    });

   
    
    var ctx = document.getElementById('chartLinha').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: juntarTempDATA,
            datasets: [
                {
                    label: 'Desempenho Original',
                    data: desempenho,
                    backgroundColor: 'blue',
                    borderColor: 'transparent',
                    fill: false,
                },
                {
                    label: 'Regressão Linear',
                    data: valoresRegressao,
                    borderColor: 'red',
                    pointRadius: 0,
                    fill: false,
                },
            ],
        },
    });

    regressaoLinear.innerHTML = `${Rsq.toFixed(5)}`
}

function RSquared(yMean,a,b) {



  // Calcular a soma dos quadrados totais (SSTO)
  var SSTO = 0;
  for (var i = 0; i < dataDados.length; i++) {
      SSTO += Math.pow((desempenho[i] - yMean), 2);
  }
  
  // Calcular a soma dos quadrados dos erros (SSE)
  var SSE = 0;
  for (var i = 0; i < dataDados.length; i++) {
      SSE += Math.pow((desempenho[i] - (a * dataDados[i] + b)), 2);
  }

  // Calcular o R-quadrado múltiplo
  var Rsq = 1 - (SSE / SSTO);

  return {Rsq}


}

