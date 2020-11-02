import React, { Component } from 'react';
import web3 from "../eth/web3";
import mqttsc from "../eth/mqttsc";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


class ClientRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: [],
            open: false
        }
    }

    async componentDidMount() {
        const { id } = this.props;
        const accounts = await web3.eth.getAccounts();
        const topic = await mqttsc.methods.getTopic(id).call({ from: accounts[0] });
        this.setState({ topic: topic });
    }

    toggleCollapse = () => {
        // console.log(this.state.open)
        this.setState(_prevState => ({ open: !_prevState.open }))
        // const open = !this.state.open;
        // this.setState({ open: open });
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
                                <Typography variant="h6" gutterBottom component="div">
                                    Topics
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Topic</TableCell>
                                            <TableCell align="right">Edit</TableCell>
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

                                            this.state.topic.map((_topic) => {
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
                                                    <TableRow key={_topic}>
                                                        <TableCell component="th" scope="row">{_topic}</TableCell>
                                                        <TableCell align="right">Button</TableCell>
                                                    </TableRow>
                                                );
                                            })
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
