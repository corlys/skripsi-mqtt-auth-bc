import React, { Component, Fragment } from 'react';
import web3 from "../eth/web3";
import mqttsc from "../eth/mqttsc";

import ChangeTopic from "./ChangeTopic.component";

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { TextField, Button, CircularProgress } from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
// import DeleteIcon from "@material-ui/icons/DeleteIcon";
import { AddCircle } from "@material-ui/icons";

class ClientRow extends Component {
    // topic jangan jadi state
    constructor(props) {
        super(props);
        this.state = {
            topic: [],
            delete: false,
            open: false,
            add: false,
            edit: false,
            value: "",
            loading: false,
            accounts: []
        }
    }

    async componentDidMount() {
        const { id } = this.props;
        const accounts = await web3.eth.getAccounts();
        const topic = await mqttsc.methods.getTopic(id).call({ from: accounts[0] });
        this.setState({ topic: topic });
        this.setState({ accounts });
        console.log(this.state.topic)
    }

    handleDelete = async () => {
        const { id } = this.props;
        try {
            this.setState(_prevState => ({ delete: !_prevState.delete }))
            await mqttsc.methods.deleteClient(id).send({ from: this.state.accounts[0] })
            this.setState(_prevState => ({ delete: !_prevState.delete }))
            window.location.reload();
        } catch (error) {

        }
    }

    toggleCollapse = () => {
        // console.log(this.state.open)
        this.setState(_prevState => ({ open: !_prevState.open }))
        // const open = !this.state.open;
        // this.setState({ open: open });
    }

    turnEdit = () => {
        this.setState(_prevState => ({ edit: !_prevState.edit }))
    }

    toggleAdd = () => {
        this.setState(_prevState => ({ add: !_prevState.add }))
    }


    addTopic = async () => {
        const { id } = this.props
        try {
            this.setState(_prevState => ({ loading: !_prevState.loading }))
            await mqttsc.methods.addTopic(id, this.state.value).send({ from: this.state.accounts[0] })
            this.setState(_prevState => ({ loading: !_prevState.loading }))
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { id, username } = this.props
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={this.toggleCollapse}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        <IconButton aria-label="delete" onClick={this.handleDelete} disabled={this.state.delete}>
                            {this.state.delete ? <CircularProgress /> : <DeleteIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {id}
                    </TableCell>
                    <TableCell align="right">{username}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div" className="collapse-header">
                                    Topics <AddCircle color="primary" onClick={this.toggleAdd} />
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Topic</TableCell>
                                            <TableCell align="right">Change</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            // row.history.map((historyRow) => (
                                            //     <TableRow key={historyRow.date}>
                                            //         <TableCell component="th" scope="row">
                                            //             {historyRow.date}
                                            //         </TableCell>
                                            //         <TableCell>{historyRow.customerId}</TableCell>
                                            //         <TableCell align="right">{historyRow.amount}</TableCell>
                                            //         <TableCell align="right">
                                            //             {Math.round(historyRow.amount * row.price * 100) / 100}
                                            //         </TableCell>
                                            //     </TableRow>
                                            // ))

                                            this.state.topic.map((_topic, index) => {
                                                // if (_topic != null) {
                                                //     return (
                                                // <TableRow key={_topic}>
                                                //     <TableCell component="th" scope="row">{_topic}</TableCell>
                                                //     <TableCell align="right">Button</TableCell>
                                                // </TableRow>
                                                //     );
                                                // }
                                                // return;
                                                return (
                                                    <TableRow key={index}>
                                                        {/* <TableCell component="th" scope="row">{_topic}</TableCell>
                                                        <TableCell align="right">
                                                            {this.state.edit ? <Input placeholder="Edit Disini" /> : null}
                                                            <Button variant="contained" color="primary" onClick={this.turnEdit}>Edit</Button>
                                                        </TableCell> */}
                                                        <ChangeTopic id={id} topic={_topic} />
                                                    </TableRow>
                                                );
                                            })
                                        }
                                        {
                                            this.state.add ?
                                                <Fragment>
                                                    <TextField value={this.state.value} onChange={event => this.setState({ value: event.target.value })} placeholder="new topic here" />
                                                    <Button onClick={this.addTopic} >{this.state.loading ? <CircularProgress /> : "Add"}</Button>
                                                </Fragment>
                                                : null
                                        }
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}

export default ClientRow
