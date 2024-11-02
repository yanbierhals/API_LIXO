
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
 descricao VARCHAR(255) NOT NULL
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

CREATE INDEX idx_lixeiras_tipo_lixo_id ON lixeiras(tipo_lixo_id);
CREATE INDEX idx_usuarios_nome ON usuarios(nome);
CREATE INDEX idx_usuarios_bonus_usuario_id ON usuarios_bonus(usuario_id);
CREATE INDEX idx_usuarios_bonus_bonus_id ON usuarios_bonus(bonus_id);
CREATE INDEX idx_coletas_lixeira_id ON coletas(lixeira_id);
CREATE INDEX idx_coletas_usuario_id ON coletas(usuario_id);
CREATE INDEX idx_pontuacao_usuario_id ON pontuacao(usuario_id);