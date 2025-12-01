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
                { fase: 'Fase 1', pontos: data.fase1 },
                { fase: 'Fase 2', pontos: data.fase2 },
                { fase: 'Fase 3', pontos: data.fase3 }
            ];

            plotarGraficoBarra(dados);

      
            document.getElementById("pontuação_total").innerHTML = data.total;
            document.getElementById("pontuação_fase1").innerHTML = data.fase1;
            document.getElementById("pontuação_fase2").innerHTML = data.fase2;
            document.getElementById("pontuação_fase3").innerHTML = data.fase3;
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