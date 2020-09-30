import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../services/authService';


const PublicRoute = ({component: Component, ...rest}: any) => {
    return (
        <Route 
            {...rest}
            render={props => {
                if (AuthService.getAuthStatus()) {
                    return <Redirect to={
                        {
                            pathname: '/',
                            state: {
                                from: props.location
                            }
                        }
                    } />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
}