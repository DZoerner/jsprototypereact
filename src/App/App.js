import React, { Component } from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import  { Login } from '../components/login/';
import { Home } from '../components/home/';
import { history } from '../helpers';
import { PrivateRoute } from '../components';

import { connect } from 'react-redux';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <Switch>
                            <PrivateRoute exact path='/home' component={Home} />
                            <Route exact path='/' component={Login} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}


const connectedApp = connect(null)(App);
export  { connectedApp as App };