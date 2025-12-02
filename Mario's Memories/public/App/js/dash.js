// DASHBOARD - Gráficos

var graficoBarra;
var graficoDonut;

function carregarDash() {
    obterDados();
    obterDadosDonut();

    var nome = sessionStorage.NOME_USUARIO;

    var divNome = document.getElementById("nome_logado");
    divNome.innerHTML = nome
}

function obterDados() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/pontuacoes/obterDados/${idUsuario}`)
        .then(r => r.json())
        .then(data => {
            console.log("Dados recebidos:", data);

  
            var dados = [
                { pontos1: data.fase1 },
                { pontos2: data.fase2 },
                { pontos3: data.fase3 }
            ];

            plotarGraficoBarra(dados);

            let total = (data.fase1_pontos + data.fase2_pontos + data.fase3_pontos)

      
            document.getElementById("pontuacao_total").innerHTML = total;
            document.getElementById("pontuacao_fase1").innerHTML = data.fase1_pontos;
            document.getElementById("pontuacao_fase2").innerHTML = data.fase2_pontos;
            document.getElementById("pontuacao_fase3").innerHTML = data.fase3_pontos;
        })
        .catch(err => console.log(err));
}

function vidasSobras() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/pontuacoes/vidasSobras/${idUsuario}`)
        .then(r => r.json())
        .then(data => {
            console.log("Dados recebidos:", data);

            var dados = [
                { pontos1: data.fase1 },
                { pontos2: data.fase2 },
                { pontos3: data.fase3 }
            ];

            plotarGraficoBarra(dados);

            let total = (data.fase1_pontos + data.fase2_pontos + data.fase3_pontos)
            
            document.getElementById("pontuacao_total").innerHTML = total;
            document.getElementById("pontuacao_fase1").innerHTML = data.fase1_pontos;
            document.getElementById("pontuacao_fase2").innerHTML = data.fase2_pontos;
            document.getElementById("pontuacao_fase3").innerHTML = data.fase3_pontos;
        })
        .catch(err => console.log(err));
}




function plotarGraficoBarra(dados) {

    var pontos = [];
    var fase = [];

    for (var i = 0; i < dados.length; i++) {
        pontos.push(dados[i].pontos);
        fase.push(dados[i].fase);
    }

   
    var ctx = document.getElementById('barra').getContext('2d');
    
    var myChart = new Chart(ctx, {
        type: 'bar', 
        data: { 
            labels: fase, 
            datasets: [{
                label: 'Pontos', 
                data: pontos, 
                backgroundColor: [
                    '#E52521',
                ],
                borderColor: [
                    '#000000', 
                ],
                borderWidth: 1
            }]
        },
    });
}

function obterDadosDonut() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/pontuacoes/obterDados/${idUsuario}`)
        .then(r => r.json())
        .then(data => {
            plotarGraficoDonut(data.acertos, data.erros);
            document.getElementById("rank").innerHTML = data.rank;
        })
        .catch(e => console.log(e));
}

function plotarGraficoDonut(acertos, erros) {
    var pizza = document.getElementById('rosca').getContext('2d');


    window.myChartDonut = new Chart(pizza, {
        type: 'doughnut', 
        data: {
            labels: ['Acertos', 'Erros'], 
            datasets: [{
                label: 'Desempenho Geral',
                data: [acertos, erros],
                backgroundColor: [
                    '#43B047', 
                    '#E52521'  
                ],
                borderColor: '#000000', 
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'black',
                        font: {
                            family: "'Press Start 2P', cursive",
                            size: 14
                        }
                    }
                }
            }
        }
    });
}