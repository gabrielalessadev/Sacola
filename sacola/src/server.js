const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors()); // habilita cors
app.use(express.json()); //habilita json como padrão

// Exemplo de rota GET
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express!!!' });
});

// Inicializa o servidor backend
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});