import React, { Component } from 'react';
import web3 from "./eth/web3";
import mqttsc from "./eth/mqttsc";
import './App.css';

import ClientRow from "./components/ClietRow.component";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: []
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

  renderRow() {

    return this.state.clients.map((_row) => {
      return <ClientRow key={_row[0]} id={_row[0]} username={_row[1]} />;
    })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>DAPP CRUD</h3>
        </header>
        <div className="main">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderRow()}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <footer className="App-footer">
          Footer Content
        </footer>
      </div>
    );
  }
}

export default App;
