var chartBarra = null;
var chartDonut = null;
var chartFases = null; 

function carregarDash() {
   
    var nome = sessionStorage.NOME_USUARIO;
    if (nome) {
        document.getElementById("nome_logado").innerHTML = nome;
    }

    vidasSobras();
    obterDados(); 
    rank();       
}


function rank() {
    fetch('/pontuacoes/rank')
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(resposta) {
                    console.log("Dados do Rank:", resposta);
                  
                    plotarGraficoBarra(resposta);
                });
            } else {
                console.error("Erro ao buscar rank");
            }
        })
        .catch(function(erro) {
            console.error("Erro na requisição do rank:", erro);
        });
}

function plotarGraficoBarra(dados) {
    var canvas = document.getElementById('barra');

    if (!canvas) return;

    var ctx = canvas.getContext('2d');

    if (chartBarra) {
        chartBarra.destroy();
    }

    
    var nomes = [];
    var partidas = [];

    for (var i = 0; i < dados.length; i++) {
        nomes.push(dados[i].nome);
        partidas.push(dados[i].total_partidas || dados[i].pontos);
    }

    chartBarra = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nomes,
            datasets: [{
                label: 'Total Partidas',
                data: partidas,
                backgroundColor: ['#E52521', '#306732', '#115d7b'],
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}



function obterDados() {
    var idUsuario = sessionStorage.ID_USUARIO;
    if (!idUsuario) return;

    fetch(`/pontuacoes/obterDados/${idUsuario}`)
        .then(r => r.json())
        .then(data => {
            console.log("Dados Usuário:", data);

            let total = (data.fase1_pontos + data.fase2_pontos + data.fase3_pontos);
            
            if(document.getElementById("pontuacao_total")) 
                document.getElementById("pontuacao_total").innerHTML = total;
            
            if(document.getElementById("pontuacao_fase1"))
                document.getElementById("pontuacao_fase1").innerHTML = data.fase1_pontos;
            
            if(document.getElementById("pontuacao_fase2"))
                document.getElementById("pontuacao_fase2").innerHTML = data.fase2_pontos;
            
            if(document.getElementById("pontuacao_fase3"))
                document.getElementById("pontuacao_fase3").innerHTML = data.fase3_pontos;
            
            if(document.getElementById("rank") && data.rank)
                document.getElementById("rank").innerHTML = data.rank + "º";

            plotarGraficoDonut(data.acertos, data.erros);
        })
        .catch(err => console.log(err));
}

function plotarGraficoDonut(acertos, erros) {
    var canvas = document.getElementById('rosca');

    if (!canvas) return;

    var ctx = canvas.getContext('2d');

    if (chartDonut) {
        chartDonut.destroy();
    }

    chartDonut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                label: 'Desempenho',
                data: [acertos, erros],
                backgroundColor: ['#43B047', '#E52521'],
                borderColor: '#000000',
                borderWidth: 2
            }]
        }
    });
}

function vidasSobras() {
    var idUsuario = sessionStorage.ID_USUARIO;
    if (!idUsuario) return;

    fetch(`/pontuacoes/vidasSobras/${idUsuario}`)
        .then(r => r.json())
        .then(data => {
            var elementoVida = document.getElementById("vidas_sobrando");
            if (elementoVida) {
                elementoVida.innerHTML = data.vidas_restantes;
            }
        })
        .catch(err => console.log(err));
}