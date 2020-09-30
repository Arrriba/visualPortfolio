import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../services/authService';

export const ProtectedRoute = ({component: Component, ...rest}:any) => {
    return(
        <Route 
            {...rest}
            render={props => {
                if (AuthService.getAuthStatus()) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }}
        />
    );
}