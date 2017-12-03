import React from 'react';

import './ListView.css';

const ListView = props => {
    const { enderecos, inputCep, onChange, addEnd, delEnd, cep } = props;
    return (
        <div className="container-fluid text-center List-view">
            <div className="center-block bloco-centro">
                <h2>Buscar Endereço</h2>
                <input placeholder="Digite o CEP (somente números)" type="number" className="form-control ipt" name="inputCep"
                       value={inputCep} onChange={onChange}/><br/>
                <button className="btn-primary btns" onClick={addEnd}>Buscar</button>
                <div className="table-striped lista">
                    {enderecos.map((endereco, index) => (<p className="item" key={index}>{endereco.toString()}</p>))}
                </div>
                <button className="btn-danger btns" onClick={delEnd}>Limpar</button>
            </div>
        </div>
    );
};

export default ListView;
