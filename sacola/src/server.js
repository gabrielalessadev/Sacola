const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3001;

const connection = mysql.createConnection({
  host: 'localhost', // substitua pelo seu host
  user: 'root', // substitua pelo seu usuário
  password: 'password', // substitua pela sua senha
  database: 'sacola' // substitua pelo nome do seu banco
});

app.use(cors()); // habilita cors
app.use(express.json()); //habilita json como padrão

// CRUD produto
app.post('/api/produto', (req, res) => {
  const produto = req.body
  const query = `INSERT INTO produto (nome, codigo, preco, quantidade_disponivel) 
values ('${produto.nome}', '${produto.codigo}', ${produto.preco}, ${produto.quantidade_disponivel})`

  connection.execute(query, [], (err, results) => {
    if (err) {
      console.error('Erro ao inserir o registro:', err);
      res.status(500).send(`Erro ao inserir o registro. ${err}`);
      return;
    }

    res.json({ itens : results});
  });
});

app.get('/api/produto', (req, res) => {
  const query = "SELECT * FROM produto"

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).send('Erro ao buscar os registros.');
      return;
    }

    res.json({ itens: results });
  });
});

app.get('/api/produto/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM produto where id = ${id}`

  connection.execute(query, [], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).send('Erro ao buscar o registro.');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Registro não encontrado.');
    } else {
      res.json({itens: results});
    }
  });
});

app.patch('/api/produto/:id', (req, res) => {
  const id = req.params.id
  const produto = req.body
  const query = `UPDATE produto SET nome =  '${produto.nome}', codigo = '${produto.codigo}', preco = ${produto.preco}, quantidade_disponivel = ${produto.quantidade_disponivel} WHERE id = ${id}`

  connection.execute(query, [], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).send(`Erro ao atualizar o registro. ${err}`);
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Registro não encontrado.');
    } else {
      res.json({itens: results});
    }
  });
});

app.delete('/api/produto/:id', (req, res) => {
  const id = req.params.id
  const query = `DELETE FROM produto WHERE id = ${id}`

  connection.execute(query, [], (err, results) => {
    if (err) {
      console.error('Erro ao deletar o registro:', err);
      res.status(500).send('Erro ao deletar o registro.');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Registro não encontrado.');
    } else {
      res.send('Registro deletado com sucesso.');
    }
  });

});

// CRUD Cliente
app.post('/api/cliente', (req, res) => {
  const cliente = req.body
  const query = `INSERT INTO cliente (nome, endereco, email, telefone, cpf) 
values ('${cliente.nome}', '${cliente.endereco}', '${cliente.email}', '${cliente.telefone}', '${cliente.cpf}')`

  connection.execute(query, [], (err, results) => {
    if (err) {
      console.error('Erro ao inserir o registro:', err);
      res.status(500).send(`Erro ao inserir o registro. ${err}`);
      return;
    }

    res.json({ itens : results});
  });
});

app.get('/api/cliente', (req, res) => {
  const query = "SELECT * FROM cliente"

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).send('Erro ao buscar os registros.');
      return;
    }

    res.json({ itens: results });
  });
});

app.get('/api/cliente/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM cliente where id = ${id}`

  connection.execute(query, [], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).send('Erro ao buscar o registro.');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Registro não encontrado.');
    } else {
      res.json({itens: results});
    }
  });
});

app.patch('/api/cliente/:id', (req, res) => {
  const id = req.params.id
  const cliente = req.body
  const query = `UPDATE cliente SET nome =  '${cliente.nome}', endereco = '${cliente.endereco}', email = '${cliente.email}', telefone = '${cliente.telefone}', cpf = '${cliente.cpf}' WHERE id = ${id}`

  connection.execute(query, [], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).send(`Erro ao atualizar o registro. ${err}`);
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Registro não encontrado.');
    } else {
      res.json({itens: results});
    }
  });
});

app.delete('/api/cliente/:id', (req, res) => {
  const id = req.params.id
  const query = `DELETE FROM cliente WHERE id = ${id}`

  connection.execute(query, [], (err, results) => {
    if (err) {
      console.error('Erro ao deletar o registro:', err);
      res.status(500).send('Erro ao deletar o registro.');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Registro não encontrado.');
    } else {
      res.send('Registro deletado com sucesso.');
    }
  });

});


// Inicializa o servidor backend
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});