CREATE DATABASE Mario_BD;
use Mario_BD;

create table usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (45),
email VARCHAR(45),
senha VARCHAR (45)
);

SELECT * FROM usuario;

CREATE TABLE perfil (
    idPerfil INT PRIMARY KEY AUTO_INCREMENT,
    avatar VARCHAR(45),
    fkUsuario INT,
    CONSTRAINT PerfilUsuario
    FOREIGN KEY (fkUsuario)
    REFERENCES usuario(id)
);
CREATE TABLE partidas (
    idPartidas INT PRIMARY KEY AUTO_INCREMENT,
    fase1_pontos INT,
    fase2_pontos INT,
    fase3_pontos INT,
    fkUsuario INT,
    CONSTRAINT PartidasUsuario
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE desempenho (
    idDesempenho INT PRIMARY KEY AUTO_INCREMENT,
    vidas_restantes INT,
    total_acertos INT,
    total_erros INT,
    pontuacao_total INT,
    rank_jogo CHAR(1),
    fkPartidas INT,
    CONSTRAINT DesempenhoPartida
    FOREIGN KEY (fkPartidas) REFERENCES partidas(idPartidas)
);

INSERT INTO usuario (nome, email, senha) VALUES
('Mario da Silva', 'mario@gmail.com', '123'),
('Luigi Pereira', 'luigi@gmail.com', '123'),
('Peach Andrade', 'peach@gmail.com', '123');

INSERT INTO perfil (avatar, fkUsuario) VALUES
('mario.png', 1),
('luigi.png', 2),
('peach.png', 3);

