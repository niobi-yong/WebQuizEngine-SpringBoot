import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService'

const AuthenticatedRoute = (props) => {

    if (AuthenticationService.isUserLoggedIn()) {
        return <Route {...props} />
    }

    return <Redirect to="/login" />
}

export default AuthenticatedRoute;
