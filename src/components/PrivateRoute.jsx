import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* In PrivateRoute.jsx file, we created a new component called PrivateRoute to check if auth has been set. We will be redirected to '/' if the auth is not set. */

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />

    )} />
)