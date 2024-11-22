CREATE TABLE IF NOT EXISTS tipos_lixo (
 	id SERIAL PRIMARY KEY,
 	tipo VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS lixeiras (
	id SERIAL PRIMARY KEY,
	tipo_lixo_id INT NOT NULL,
	localizacao VARCHAR(255),
	FOREIGN KEY (tipo_lixo_id) REFERENCES tipos_lixo(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS usuarios (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	cpf VARCHAR(14) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	senha VARCHAR(255) NOT NULL,
	perfil VARCHAR(20) CHECK (perfil IN ('cidadão', 'admin', 'moderador')) DEFAULT 'cidadão',
	data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bonus (
	id SERIAL PRIMARY KEY,
	descricao VARCHAR(255) NOT NULL,
	valor_bonus DECIMAL(10,2) NOT NULL DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS usuarios_bonus (
	id SERIAL PRIMARY KEY,
	usuario_id INT NOT NULL,
	bonus_id INT NOT NULL,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (bonus_id) REFERENCES bonus(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT uniq_usuario_bonus UNIQUE (usuario_id, bonus_id)
);

CREATE TABLE IF NOT EXISTS coletas (
	id SERIAL PRIMARY KEY,
	lixeira_id INT NOT NULL,
	usuario_id INT NOT NULL,
	data_coleta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (lixeira_id) REFERENCES lixeiras(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS pontuacao (
	id SERIAL PRIMARY KEY,
	usuario_id INT NOT NULL,
	pontos INT NOT NULL,
	data_pontuacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS metas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    objetivo INT NOT NULL,
	bonus_id INT,
    FOREIGN KEY (bonus_id) REFERENCES bonus(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS pontos_coleta (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    tipo_lixo_id INT NOT NULL,
    FOREIGN KEY (tipo_lixo_id) REFERENCES tipos_lixo(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS leituras (
	id SERIAL PRIMARY KEY,
	id_usuario INT NOT NULL,
	id_lixeira INT NOT NULL,
	data_leitura TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (id_lixeira) REFERENCES lixeiras(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE INDEX idx_lixeiras_tipo_lixo_id ON lixeiras(tipo_lixo_id);
CREATE INDEX idx_usuarios_nome ON usuarios(nome);
CREATE INDEX idx_usuarios_bonus_usuario_id ON usuarios_bonus(usuario_id);
CREATE INDEX idx_usuarios_bonus_bonus_id ON usuarios_bonus(bonus_id);
CREATE INDEX idx_coletas_lixeira_id ON coletas(lixeira_id);
CREATE INDEX idx_coletas_usuario_id ON coletas(usuario_id);
CREATE INDEX idx_pontuacao_usuario_id ON pontuacao(usuario_id);
CREATE INDEX idx_metas_nome ON metas(nome);
CREATE INDEX idx_metas_bonus_id ON metas(bonus_id);
CREATE INDEX idx_pontos_coleta_nome ON pontos_coleta(nome);
CREATE INDEX idx_pontos_coleta_bairro ON pontos_coleta(bairro);
CREATE INDEX idx_pontos_coleta_tipo_lixo_id ON pontos_coleta(tipo_lixo_id)
CREATE INDEX idx_leituras_usuario_id ON leituras(id_usuario);
CREATE INDEX idx_leituras_lixeira_id ON leituras(id_lixeira);
CREATE INDEX idx_leituras_data_leitura ON leituras(data_leitura);

CREATE OR REPLACE FUNCTION limitar_coletas()
RETURNS TRIGGER AS $$
DECLARE
    coleta_count INT;
BEGIN
    SELECT COUNT(*)
    INTO coleta_count
    FROM coletas
    WHERE usuario_id = NEW.usuario_id
      AND lixeira_id = NEW.lixeira_id
      AND data_coleta >= DATE_TRUNC('day', NEW.data_coleta)
      AND data_coleta < DATE_TRUNC('day', NEW.data_coleta) + INTERVAL '1 day';

    IF coleta_count >= 2 THEN
        RAISE EXCEPTION 'Limite de coletas diárias atingido para esta lixeira.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_limitar_coletas
BEFORE INSERT ON coletas
FOR EACH ROW
EXECUTE FUNCTION limitar_coletas();


-- INSERTS PARA EXEMPLO

BEGIN;

INSERT INTO tipos_lixo (tipo) VALUES
	('Orgânico'),
	('Reciclável'),
	('Perigoso'),
	('Eletrônico'),
	('Construção');

INSERT INTO lixeiras (tipo_lixo_id, localizacao) VALUES
	(1, 'Praça Central'),
	(2, 'Rua A, nº 10'),
	(3, 'Escola Municipal'),
	(4, 'Parque da Cidade'),
	(5, 'Avenida Principal, nº 100');

INSERT INTO usuarios (nome, cpf, email, senha, perfil) VALUES
	('João Silva', '123.456.789-00', 'joao.silva@email.com', 'senha123', 'cidadão'),
	('Maria Oliveira', '987.654.321-00', 'maria.oliveira@email.com', 'senha456', 'admin'),
	('Carlos Santos', '111.222.333-44', 'carlos.santos@email.com', 'senha789', 'moderador');

INSERT INTO bonus (descricao, valor_bonus) VALUES
	('Participação em eventos', 50.00),
	('Reciclagem de materiais', 30.00),
    ('Atividades comunitárias', 20.00);

INSERT INTO usuarios_bonus (usuario_id, bonus_id) VALUES
	(1, 1),
	(1, 2),
	(2, 1),
	(3, 3);

INSERT INTO coletas (lixeira_id, usuario_id, data_coleta) VALUES
	(1, 1, CURRENT_TIMESTAMP),
	(2, 2, CURRENT_TIMESTAMP),
	(3, 3, CURRENT_TIMESTAMP);

INSERT INTO pontuacao (usuario_id, pontos) VALUES
	(1, 10),
	(2, 20),
	(3, 15);

INSERT INTO metas (nome, descricao, objetivo, bonus_id) VALUES
	('Reciclagem de Materiais', 'Meta para reciclar 100kg de materiais até o final do ano.', 100, 2),
	('Participação em Eventos', 'Participar de pelo menos 5 eventos comunitários.', 5, 1),
	('Redução do Consumo de Plástico', 'Reduzir o uso de plástico em 50%', 50, NULL);

INSERT INTO pontos_coleta (nome, endereco, bairro, tipo_lixo_id) VALUES
    ('Ponto Central', 'Rua Principal, 123', 'Centro', 1),
    ('Estação de Reciclagem Sul', 'Av. Reciclagem, 456', 'Sul', 2),
    ('Coleta Perigosa Norte', 'Rua das Indústrias, 789', 'Norte', 3),
    ('Tecnologia Verde', 'Av. Digital, 1011', 'Tecnologia', 4),
    ('Coleta de Entulho Leste', 'Rua Construção, 2020', 'Leste', 5);

INSERT INTO leituras (id_usuario, id_lixeira, data_leitura) VALUES
    (1, 1, CURRENT_TIMESTAMP - INTERVAL '1 day'),
    (2, 2, CURRENT_TIMESTAMP - INTERVAL '2 days'),
    (3, 3, CURRENT_TIMESTAMP - INTERVAL '3 days'),
    (1, 2, CURRENT_TIMESTAMP - INTERVAL '1 hour'),
    (2, 3, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
    (3, 1, CURRENT_TIMESTAMP - INTERVAL '30 minutes');

-- COMMIT;