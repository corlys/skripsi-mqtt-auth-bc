import React, { Component, Fragment } from 'react'
import web3 from "../eth/web3";
import mqttsc from "../eth/mqttsc";

import { TableCell, Input, Button, CircularProgress } from "@material-ui/core";

class ChangeTopic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            value: "",
            loading: false,
            accounts: []
        }
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        this.setState({ accounts })
    }

    turnEdit = () => {
        this.setState(_prevState => ({ edit: !_prevState.edit }))
    }

    editTopic = async () => {
        const { id, topic } = this.props
        try {
            this.setState(_prevState => ({ loading: !_prevState.loading }))
            const result = await mqttsc.methods.updateTopic(id, topic, this.state.value).send({ from: this.state.accounts[0] })
            console.log(result)
            this.setState(_prevState => ({ loading: !_prevState.loading }))
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <Fragment>
                <TableCell component="th" scope="row">{this.props.topic}</TableCell>
                <TableCell align="right">
                    {
                        this.state.edit ?
                            <Fragment>
                                <Input placeholder="Edit Disini" value={this.state.value} onChange={event => this.setState({ value: event.target.value })} />
                                <Button variant="contained" color="primary" onClick={this.editTopic}>{this.state.loading ? <CircularProgress color="secondary" /> : "Input"}</Button>
                            </Fragment>
                            : null
                    }
                    <Button variant="contained" color="primary" onClick={this.turnEdit} >Toggle</Button>
                </TableCell>
            </Fragment>
        );
    }
}

export default ChangeTopic;