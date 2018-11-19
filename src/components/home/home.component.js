import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navigation from '../../components/navigation';
import { contactActions } from "../../actions";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
    SearchState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';


import IntegrationAutosuggest from './IntegrationAutosuggest';
import DatePickers from './DatePickers';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },

    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },

    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },

    'appBar-left': {
        marginLeft: drawerWidth,
    },

    'appBar-right': {
        marginRight: drawerWidth,
    },

    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },

    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});


const columns = ["Firstname", "Lastname"];





class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'firstName', title: 'Firstname' },
                { name: 'lastName', title: 'Lastname' }
            ],
            open: false,
            value: 0,
            searchValue: '',
        };
    }

    changeSearchValue = value => this.setState({ searchValue: value });


    componentDidMount() {

        this.props.fetchData();
    }


    render() {
        const { classes } = this.props;
        const { rows, columns,value,searchValue  } = this.state;
        return (

            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <Navigation/>
                </div>


                    <Paper>
                        <Grid
                            rows= {this.props.contacts}
                            columns={columns}
                        >
                            <SearchState
                                value={searchValue}
                                onValueChange={this.changeSearchValue}
                            />
                            <IntegratedFiltering />
                            <Table />
                            <TableHeaderRow />
                            <Toolbar />
                            <SearchPanel />
                        </Grid>
                    </Paper>

            </div>
    );
    }
}

Home.propTypes = {
    fetchData: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(contactActions.getContacts())
    };
};


const connectedHomePage = withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home)));

export { connectedHomePage as Home };