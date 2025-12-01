var database = require("../database/config");

function obterDados(idUsuario) {

    var query = `
        SELECT 
            pa.fase1_pontos AS fase1,
            pa.fase2_pontos AS fase2,
            pa.fase3_pontos AS fase3,
            d.total_acertos AS acertos,
            d.total_erros AS erros,
            d.pontuacao_total AS total,
            d.rank_jogo AS rank
        FROM partidas pa
        JOIN desempenho d ON d.fkPartidas = pa.idPartidas
        WHERE pa.fkUsuario = ${idUsuario}
        ORDER BY pa.idPartidas DESC
        LIMIT 1;
    `;

    return database.executar(query);
}

module.exports = { obterDados };
