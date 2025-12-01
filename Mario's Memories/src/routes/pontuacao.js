var express = require("express");
var router = express.Router();

var pontuacaoController = require("../controllers/pontuacaoController");

router.get("/obterDados/:idUsuario", function (req, res) {
    pontuacaoController.obterDados(req, res);
});

module.exports = router;