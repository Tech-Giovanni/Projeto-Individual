var pontuacaoModel = require("../models/pontuacaoModel");

function obterDados(req, res) {
    var idUsuario = req.params.idUsuario;

    pontuacaoModel.obterDados(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

module.exports = { obterDados };
