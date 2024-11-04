CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_disponivel INT NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    cpf VARCHAR(11) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    administrador BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255),
    email VARCHAR(255),
    telefone VARCHAR(20),
    cpf VARCHAR(11) UNIQUE NOT NULL
);



INSERT INTO produtos (nome, codigo, preco, quantidade_disponivel) 
VALUES ('Produto A', 'P001', 10.50, 100);

INSERT INTO cliente (nome, endereco, telefone, cpf, email) 
VALUES ('João Silva', 'Rua Exemplo, 123', '11987654321', '12345678900', 'mail@mail.com');

INSERT INTO usuarios (nome, endereco, telefone, cpf, senha, administrador) 
VALUES ('João Silva', 'Rua Exemplo, 123', '11987654321', '12345678900', 'senha123', 0);