import React, { Component } from 'react';
import web3 from "./eth/web3";
import mqttsc from "./eth/mqttsc";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      message: ""
    }
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    // const clientCount = await mqttsc.methods.getClientsCount().call();
    const Clients = await mqttsc.methods.getClients().call({ from: accounts[0] });
    const temp = [];
    for (let index = 0; index < Clients[0].length; index++) {
      temp.push([Clients[0][index], Clients[1][index]])
    }
    this.setState({ clients: temp })
    console.log(this.state.clients)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>DAPP CRUD</h3>
        </header>
        <div className="main">
          main
        </div>
        <footer>
          Footer Content
        </footer>
      </div>
    );
  }
}

export default App;
