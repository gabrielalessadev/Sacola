
import './App.css';
import Cliente from "./components/Register"
import Produto from './components/Produto';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cliente />}></Route>
        <Route path="/produto" element={<Produto />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
