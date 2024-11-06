import logo from './logo.svg';
import './App.css';
import Axios from "axios";
import React, { useState } from 'react';


function App() {
  const [mensagem, setMensagem] = useState("");
  Axios.get("http://localhost:3001/api/data", {
  }).then((response) => {
    console.log(response);
    setMensagem(response.data.message); //mensagem recebe o conteúdo da requisição response.data na chave message
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {mensagem}
        </p>
      </header>
    </div>
  );
}

export default App;
