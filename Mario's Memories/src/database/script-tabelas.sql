CREATE DATABASE Mario_BD;
DROP DATABASE Mario_BD;
use Mario_BD;

create table usuario(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (45),
email VARCHAR(45),
senha VARCHAR (45)
);

select * from partidas;


select p.fase1_pontos,p.fase2_pontos,p.fase3_pontos 
from usuario as u join partidas as p 
on u.id_usuario = p.fk_usuario 
where u.id_usuario = 1  
order by p.id_partidas desc 
limit 1;

CREATE TABLE partidas (
    id_partidas INT PRIMARY KEY AUTO_INCREMENT,
    fase1_pontos INT,
    fase2_pontos INT,
    fase3_pontos INT,
    fk_usuario INT,
    CONSTRAINT PartidasUsuario
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);

select d.vidas_restantes from usuario as u
join desempenho as d on u.id_usuario = d.fk_usuario 
where u.id_usuario = 1 order by id_desempenho limit 1;

CREATE TABLE desempenho (
    id_desempenho INT PRIMARY KEY AUTO_INCREMENT,
    vidas_restantes INT,
    total_acertos INT,
    total_erros INT,
    pontuacao_total INT,
    fk_usuario INT,
    CONSTRAINT UsuarioPartida
    FOREIGN KEY (fk_usuario)
    REFERENCES usuario(id_usuario)
);

INSERT INTO usuario (nome, email, senha) VALUES
('Mario da Silva', 'mario@gmail.com', '123'),
('Luigi Pereira', 'luigi@gmail.com', '123'),
('Peach Andrade', 'peach@gmail.com', '123');

select u.nome, count(p.id_partidas) as total_partidas
from usuario as u join partidas as p
on u.id_usuario = p.fk_usuario
group by u.nome
order by total_partidas desc
limit 3;

INSERT INTO partidas (fase1_pontos, fase2_pontos, fase3_pontos, fk_usuario) VALUES
(100, 200, 300, 1),
(100, 200, 300, 2),
(100, 200, 300, 1),
(100, 200, 300, 3),
(100, 100, 100, 1),
(100, 200, 300, 5);

select * from partidas;


INSERT INTO desempenho (vidas_restantes, total_acertos, total_erros, pontuacao_total, fk_usuario) VALUES
(2, 3, 0, 300, 1),
(1, 2, 0, 200, 2),
(2, 1, 2, 300, 3);

SELECT u.nome, d.pontuacao_total
FROM usuario u
JOIN partidas pa ON pa.fkUsuario = u.id
JOIN desempenho d ON d.fkPartidas = pa.idPartidas;

truncate table usuario;


SELECT 
            pa.fase1_pontos AS fase1,
            pa.fase2_pontos AS fase2,
            pa.fase3_pontos AS fase3,
            d.total_acertos AS acertos,
            d.total_erros AS erros,
            d.pontuacao_total AS total
        FROM partidas pa
        JOIN usuario d ON d.fk_usuario = pa.id_partidas
        WHERE pa.fk_usuario = d.id_usuario
        ORDER BY pa.id_partidas DESC
        LIMIT 1;