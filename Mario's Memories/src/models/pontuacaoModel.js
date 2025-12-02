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
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO partidas (fase1_pontos, fase2_pontos, fase3_pontos) VALUES ('${fase1}', '${fase2}', '${fase3}','${fk_usuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { obterDados, vidasSobras, cadastrarPontuacao };

