import '../style/Produto.css';
import React, { useState, useEffect } from 'react';
import Axios from "axios";

function Cliente() {
    const [values, setValues] = useState({ username: '', email: '' });
    const [clientes, setClientes] = useState([]);

    console.log(values);

    const changeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    };

    const handleClickButton = async (e) => {
        e.preventDefault();

        await Axios.get('http://localhost:3001/api/cliente', {
            params: { email: values.email }
        }).then(response => {
            if (response.data.itens.length > 0) {
                alert('O Usuário já existe no nosso banco de dados.');
                return;
            } else {
                Axios.post("http://localhost:3001/api/cliente", {
                    nome: values.username,
                    email: values.email,
                    endereco: '',
                    telefone: '',
                    cpf: ''
                }).then((response) => {
                    console.log(response);
                    alert('O Usuario foi cadastrado com sucesso.');
                }).catch((error) => {
                    console.error('Houve um erro ao cadastra o usuário', error);
                    alert('Erro ao efetuar o cadastro de usuario.');
                    return;
                });
            }
        }).catch(error => {
            console.error('Erro ao verificar usuário', error);
            return;
        });
        window.location.reload();
    }

    const handleDelete = (id) => {
        Axios.delete(`http://localhost:3001/api/cliente/${id}`).then((response) => {
            console.log(response);
            alert('Cliente excluido com sucesso.');
        }).catch((error) => {
            console.error('Erro ao excluir o cliente:', error);
            alert('Erro ao excluir o cliente.');
        });
        window.location.reload();
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/api/cliente')
            .then(response => {
                setClientes(response.data.itens);
            })
            .catch(error => {
                alert('API não está disponível')
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    return (
        <div class="container">
            <div class="form-container">
            <div class="nav-bar">
                    <a href="/" class="active">Cliente</a>
                    <span>|</span>
                    <a href="/produto">Produto</a>
                </div>

                <h2>Cadastro de Cliente</h2>
                <form id="product-form" onSubmit={handleClickButton}>
                    <label for="username">Nome</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={changeValues}
                        required />

                    <label for="email">Email</label>
                    <input
                        type="text"
                        id="email" 
                        name="email"
                        onChange={changeValues}
                        required />
                    <button type="submit">Cadastrar Produto</button>
                </form>
            </div>

            <div class="product-list-container">
                <h3>Clientes Cadastrados</h3>
                <ul id="product-list" class="product-list">
                    {clientes.map(item => (
                        <li class="product-item">
                            <div class="product-info">
                                <strong>Nome: </strong>
                                {item.nome}
                                <br />
                                <strong>Email: </strong>
                                {item.email}
                            </div>
                            <button onClick={() => handleDelete(item.id)} class="delete-btn">Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Cliente;
