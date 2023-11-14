var dadosWord = [
    {"x": "Mandarin chinese", "value": 1090000000, category: "Sino-Tibetan"},
    {"x": "English", "value": 983000000, category: "Indo-European"},
    {"x": "Hindustani", "value": 544000000, category: "Indo-European"},
    {"x": "Spanish", "value": 527000000, category: "Indo-European"},
    {"x": "Arabic", "value": 422000000, category: "Afro-Asiatic"},
    {"x": "Malay", "value": 281000000, category: "Austronesian"},
    {"x": "Russian", "value": 267000000, category: "Indo-European"},
    {"x": "Bengali", "value": 261000000, category: "Indo-European"},
    {"x": "Portuguese", "value": 229000000, category: "Indo-European"},
    {"x": "French", "value": 229000000, category: "Indo-European"},
    {"x": "Hausa", "value": 150000000, category: "Afro-Asiatic"},
    {"x": "Punjabi", "value": 148000000, category: "Indo-European"},
    {"x": "Japanese", "value": 129000000, category: "Japonic"},
    {"x": "German", "value": 129000000, category: "Indo-European"},
    {"x": "Persian", "value": 121000000, category: "Indo-European"}
  ];

fetch("/henrique/pegarModelos", { cache: 'no-store'})
    .then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {
            resposta.reverse();
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`,"AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
           
            for (let i = 0; i < resposta.length; i++) {
                const element = resposta[i];
                dadosWord[i].x = element.modelo
                dadosWord[i].value = element.numeroChamados
                dadosWord[i].category = element.tipo
            }
            word()
            // modeloComMaisAlertas.innerHTML = resposta[0].tipo;
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });



    
function word(){
    anychart.onDocumentReady(function() {

  // create a tag (word) cloud chart
   var chart = anychart.tagCloud(dadosWord);
 
    // set a chart title
   chart.title('Modelos com mais alertas')
   // set an array of angles at which the words will be laid out
   chart.angles([0])
   // enable a color range
   chart.colorRange(true);
   // set the color range length
   chart.colorRange().length('80%');
 
   // display the word cloud chart
   chart.container("container");
   chart.draw();
   var formatter = "{%value}{scale:(1)(1000)(1000)(1000)|( chamados)( thousand)( million)( billion)}";
   var tooltip = chart.tooltip();
   tooltip.format(formatter);
 chart.angles([0, -45, 90, 73, -90])
 
 chart.listen("pointClick", function(e){
   var url = "https://en.wikipedia.org/wiki/" + e.point.get("x");
   window.open(url, "_blank");
 });
 });
 
}