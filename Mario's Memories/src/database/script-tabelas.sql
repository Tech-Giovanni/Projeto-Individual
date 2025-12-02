CREATE DATABASE Mario_BD;
DROP DATABASE Mario_BD;
use Mario_BD;

create table usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (45),
email VARCHAR(45),
senha VARCHAR (45)
);

SELECT * FROM usuario;

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
    fkUsuario INT,
    CONSTRAINT UsuarioPartida
    FOREIGN KEY (fkUsuario)
    REFERENCES usuario(idusuario)
);

INSERT INTO usuario (nome, email, senha) VALUES
('Mario da Silva', 'mario@gmail.com', '123'),
('Luigi Pereira', 'luigi@gmail.com', '123'),
('Peach Andrade', 'peach@gmail.com', '123');

INSERT INTO partidas (fase1_pontos, fase2_pontos, fase3_pontos, fkUsuario) VALUES
(100, 200, 300, 1),
(100, 200, 300, 2),
(100, 200, 300, 1),
(100, 200, 300, 3);

INSERT INTO desempenho (vidas_restantes, total_acertos, total_erros, pontuacao_total, fkPartidas) VALUES
(2, 3, 0, 300, 1),
(1, 2, 0, 200, 2),
(2, 1, 2, 300, 3),
(0, 3, 1, 180, 4);

SELECT u.nome, d.pontuacao_total
FROM usuario u
JOIN partidas pa ON pa.fkUsuario = u.id
JOIN desempenho d ON d.fkPartidas = pa.idPartidas;

truncate table usuario;