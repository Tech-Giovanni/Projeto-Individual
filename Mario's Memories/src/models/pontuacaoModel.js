var database = require("../database/config");

function obterDados(idUsuario) {

    var query = `
       select p.fase1_pontos,p.fase2_pontos,p.fase3_pontos 
from usuario as u join partidas as p 
on u.id_usuario = p.fk_usuario 
where u.id_usuario = ${idUsuario} 
order by p.id_partidas desc 
limit 1;
    `;

    return database.executar(query);
}

function vidasSobras(idUsuario){

    var query = ` 
    select d.vidas_restantes from usuario as u
    join desempenho as d on u.id_usuario = d.fk_usuario    
    where u.id_usuario = ${idUsuario}  order by id_desempenho limit 1;
    `;

    return database.executar(query);
}
function cadastrarPontuacao(fase1, fase2, fase3, fk_usuario) {
   
    console.log("ACESSEI O PONTUACAO MODEL \n \n\t\t >> function cadastrarPontuacao():", fase1, fase2, fase3, fk_usuario);
    
    var instrucaoSql = `
        INSERT INTO partidas (fase1_pontos, fase2_pontos, fase3_pontos, fk_usuario) 
        VALUES ('${fase1}', '${fase2}', '${fase3}', '${fk_usuario}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function rank(){

    var query = `
        select u.nome, count(p.id_partidas) as total_partidas
        from usuario as u join partidas as p
        on u.id_usuario = p.fk_usuario
        group by u.nome
        order by total_partidas desc
        limit 3;
    `
    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}


module.exports = { obterDados, vidasSobras, cadastrarPontuacao, rank };