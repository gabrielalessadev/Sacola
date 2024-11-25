import { useState, useEffect } from 'react';
import '../style/Produto.css';
import Axios from "axios";

function Produto() {
    const [values, setValues] = useState({ codigo: '', nome: '', id: null });
    const [image, setImage] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [botaoText, setBotaoText] = useState("Cadastrar Produto");
    const fileNameDisplay = document.getElementById('file-name');
    const productImageInput = document.getElementById('product-image');

    console.log(values);

    const changeValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    };

    const changeImagem = () => {
        setImage(productImageInput.files[0]);
        const fileName = productImageInput.files[0]?.name || 'Nenhum arquivo selecionado';
        fileNameDisplay.textContent = fileName;
    }

    const uploadBtnClick = () => {
        productImageInput.click();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!!!values.id){
            try {
                await Axios.get('http://localhost:3001/api/produto', {
                    params: { codigo: values.codigo }
                }).then(response => {
                    if (response.data.itens.length > 0) {
                        alert('O Produto já existe no nosso banco de dados.');
                        return;
                    } else {
                        Axios.post("http://localhost:3001/api/produto", {
                            nome:values.nome,
                            codigo:values.codigo,
                            preco: 20,
                            quantidade_disponivel: 10
                        }).then(response => {
                            window.location.reload();
            
                        }).catch(error => {
                        console.error('Erro ao verificar produto', error);
                        });
                    }
                }).catch(error => {
                    console.error('Erro ao verificar produto', error);
                });
            } catch (error) {
                console.error('Erro no cadastro de produto:', error);
            }
        } else {
            Axios.patch(`http://localhost:3001/api/produto/${values.id}`, {
                nome:values.nome,
                codigo:values.codigo,
                preco: 20,
                quantidade_disponivel: 10
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error('Houve um erro ao atualizar o produto', error);
                alert('Erro ao atualizar produto.');
                return;
            });
        }
        window.location.reload();

    }

    const handleDelete = (id) => {
        Axios.delete(`http://localhost:3001/api/produto/${id}`).then((response) => {
            console.log(response);
            alert('Produto excluido com sucesso.');
        }).catch((error) => {
            console.error('Erro ao excluir o produto:', error);
            alert('Erro ao excluir o produto.');
        });
        window.location.reload();
    }

    const imageUrl = (url) => {
        return "http://localhost:3001/images/" + url;
    }

    const handleEdit = (id) => {
        const client = produtos.find(obj => obj.id === id)
        
        setValues({ codigo: client.codigo, nome: client.nome, id: client.id })
        document.getElementById('product-name').value = client.nome
        document.getElementById('product-code').value = client.codigo
        setBotaoText("Editar Produto")
        console.log(values)
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/api/produto', {timeout: 5000})
            .then(response => {
                setProdutos(response.data.itens);
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
                    <a href="/" >Cliente</a>
                    <span>|</span>
                    <a href="/produto" class="active">Produto</a>
                </div>

                <h2>Cadastro de Produto</h2>
                <form id="product-form" onSubmit={handleSubmit}>
                    <label for="product-name">Nome do Produto</label>
                    <input
                        type="text"
                        id="product-name"
                        name="nome"
                        onChange={changeValues}
                        required />

                    <label for="product-code">Código do Produto</label>
                    <input
                        type="text"
                        id="product-code"
                        name="codigo"
                        onChange={changeValues}
                        required />
                    <button type="submit" style={{marginBottom: '20px'}}>{botaoText}</button>
                    {values.id && <button onClick={() => window.location.reload()} class="delete-btn">Cancelar</button>}
                </form>
            </div>

            <div class="product-list-container">
                <h3>Produtos Cadastrados</h3>
                <ul id="product-list" class="product-list">
                    {produtos.map(item => (
                        <li key={item.id} class="product-item">
                            <div class="product-info">
                                <strong>Nome: </strong>
                                {item.nome}
                                <br />
                                <strong>Codigo: </strong>
                                {item.codigo}
                            </div>
                            <button onClick={() => handleEdit(item.id)} class="edit-btn">Editar</button>
                            <button onClick={() => handleDelete(item.id)} class="delete-btn">Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Produto;