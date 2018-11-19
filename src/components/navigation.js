import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { userActions } from '../actions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const drawerWidth = 0;

const styles = theme => ({
    root: {
        flexGrow: 1,
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

class Navigation extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };



    logout = event =>{
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    handleChange = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;


        return (
            <AppBar position="static" color="default" className={classes.appBar}>
                <Toolbar>
                    <Button component='a' href="/home">Home </Button>
                    <Button>Vehicles</Button>
                    <Button>DLC</Button>
                    <Button>Jobs</Button>
                    <Button>Mocks</Button>
                    <Button>Monitoring</Button>

                        <div>
                            <Button
                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                MQTT
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Monitoring</MenuItem>
                                <MenuItem onClick={this.handleClose}>Publisher</MenuItem>
                            </Menu>
                        </div>
                    <Button>Environment Status</Button>




                    <Button color="primary" variant="outlined" onClick={(event)=>{this.logout()}}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>{
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Navigation));