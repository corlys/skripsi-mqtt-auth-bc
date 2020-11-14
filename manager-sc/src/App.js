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
import { Input, Button, CircularProgress } from "@material-ui/core";

import { AddCircle } from "@material-ui/icons";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      add: false,
      username: '',
      password: "",
      loading: false,
      accounts: []
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
    this.setState({ clients: temp, accounts })
    console.log(this.state.clients)
  }

  toggleAdd = () => {
    this.setState(_prevState => ({ add: !_prevState.add }))
  }

  handleAddClient = async () => {
    try {
      if (this.state.username !== "" && this.state.password !== "") {
        this.setState(_prevState => ({ loading: !_prevState.loading }))
        await mqttsc.methods.addClient(this.state.username, this.state.password).send({ from: this.state.accounts[0] })
        this.setState(_prevState => ({ loading: !_prevState.loading }))
      }
    } catch (error) {
      console.log(error)
    }
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
          <div className="mqtt-container">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell><AddCircle color="primary" onClick={this.toggleAdd} /></TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.renderRow()}
                  {this.state.add ? <TableRow><TableCell><Input value={this.state.username} placeholder="username" type="text" onChange={event => this.setState({ username: event.target.value })} /><Input value={this.state.password} placeholder="password" type="password" onChange={event => this.setState({ password: event.target.value })} /><Button variant="contained" color="primary" onClick={this.handleAddClient} >{this.state.loading ? <CircularProgress color="secondary" /> : "Add"}</Button></TableCell></TableRow> : null}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <footer className="App-footer">
          Footer Content
        </footer>
      </div>
    );
  }
}

export default App;
