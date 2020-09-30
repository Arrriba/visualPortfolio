import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './login.css';

export default class Login extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* <div className='cover-layer'></div> */}
                <Card id='login-container'>
                    <img className='login' src={require('../../images/private/login.png')}></img>
                    <h2>Log is using the form below</h2>
                    <Input id='text-input' placeholder='Enter your username...'></Input>
                    <Input id='text-input' placeholder='Enter your password...'></Input>
                    <Button variant='contained' color='primary' size='small' id='button' onClick={() => console.log('asd')}>
                        <span>Login</span>
                    </Button>
                </Card>
            </div>
        );
    }

}