var express = require("express");
var router = express.Router();

var pontuacaoController = require("../controllers/pontuacaoController");

router.get("/obterDados/:idUsuario", function (req, res) {
    pontuacaoController.obterDados(req, res);
});

router.get("/vidasSobras/:idUsuario", function(req, res){
    pontuacaoController.vidasSobras(req, res);
});

router.post("/cadastrarPontuacao", function (req, res) {
    pontuacaoController.cadastrarPontuacao(req, res);
})

router.get("/rank", function (req, res) {
    pontuacaoController.rank(req, res);
})

module.exports = router;