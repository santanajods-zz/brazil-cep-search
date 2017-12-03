import React, { Component } from 'react';
import Request from 'superagent';
import ListView from '../ListView';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputCep: '',
            enderecos: [],
            cep:'',
            rua: '',
            bairro: '',
            cidade: '',
            uf: '',
        };
    }

    addEnd = ev => {
        ev.preventDefault();
        if ((this.state.inputCep).length != 8) {  
            alert("Digite um CEP correto, contendo 8 dígitos")
        }
        else{
            Request
                .get(`https://viacep.com.br/ws/${this.state.inputCep}/json`)
                .then(response => {
                    const enderecos = this.state.enderecos.slice();
                    const cep = this.state.inputCep;
                    const { logradouro: rua, localidade: cidade, bairro, uf, erro } = response.body;
                    this.setState(Object.assign(this.state, {
                        enderecos: enderecos,
                        inputCep: "",
                        cep: cep,
                        rua,
                        cidade,
                        bairro,
                        uf
                    }));
                    if(erro == true){
                        alert("CEP inválido");
                    }
                    else{
                        enderecos.push([`${cep} - ${rua}, ${bairro}, ${cidade} - ${uf}`]);
                        const stat = Object.assign({}, this.state);
                        this.setState(stat);
                    }
                    
                });
        }
    };

    delEnd = index => this.setState({ enderecos: [] });

    onChange = ev => {
        ev.preventDefault();
       
        const state = Object.assign({}, this.state);
        state[ev.target.name] = ev.target.value;
        this.setState(state);

    };

    render() {
        const { enderecos, inputCep } = this.state;
        return (
            <div>
                <ListView
                    enderecos={enderecos}
                    inputCep={inputCep}
                    onChange={this.onChange}
                    addEnd={this.addEnd}
                    delEnd={this.delEnd}
                />
            </div>
        );
    }
}

export default App;
