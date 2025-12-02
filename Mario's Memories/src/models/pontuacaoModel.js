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
    join desempenho as d on u.id_usuario = ${usuario}     
    where u.id_usuario = 1 order by id_desempenho limit 1
    `;

    return database.executar(query);
}

module.exports = { obterDados };
