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

function vidasSobras(req, res) {
    var idUsuario = req.params.idUsuario;

    pontuacaoModel.vidasSobras(idUsuario)
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



function cadastrarPontuacao(req, res) {

    var fase1 = req.body.fase1Server;
    var fase2 = req.body.fase2Server;
    var fase3 = req.body.fase3Server;
    var fk_usuario = req.body.fk_usuarioServer

  
        pontuacaoModel.cadastrarPontuacao(fase1, fase2, fase3, fk_usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    function rank(req, res) {



        pontuacaoModel.rank()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

module.exports = { obterDados, vidasSobras ,cadastrarPontuacao, rank};

