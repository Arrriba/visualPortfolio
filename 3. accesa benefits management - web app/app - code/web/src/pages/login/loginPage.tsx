import React, { Component } from 'react';
import './loginPage.css';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AuthService from '../../services/authService';
import { Redirect } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import Error from '../../components/error/error';
import InputValidator from '../../services/inputValidator';

interface IResetTextState {
    emailInput: string,
    sentReq: boolean;
    isLogged: boolean;
}
interface ILoginState {
    usernameInput: '';
    passwordInput: '';
    resetVisible: false;
    emailError: string;
    passwordError: string;
}
export default class LoginPage extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            resetVisible: false,
            usernameInput: '',
            passwordInput: '',
            isLogged: false,
            emailError: '',
            passwordError: '',
            loginError: '',
            wrongPasswrod: 0
        }

        this.handleResetTextClick = this.handleResetTextClick.bind(this);
    }

    componentWillMount() {
        const authStatus = localStorage.getItem('isLogged');
        const wrongCount = localStorage.getItem('wrongPassCount');
        if (authStatus === '1') {
            this.setState({ isLogged: true })
        } else {
            this.setState({ isLogged: false })
        }
    }

    validateInput = () => {
        const emailValid = InputValidator.validateEmail(this.state.usernameInput);

        if (emailValid === '') {
            return true;
        }

        this.setState({ emailError: emailValid });
        return false;
    }

    handleResetTextClick() {
        this.setState({ resetVisible: true })
    }

    onLogin = (email: string, pass: string) => {
        const { history } = this.props;
        const inputValid = this.validateInput();
        if (inputValid) {
            AuthService.login(email, pass)
                .then(res => {
                    this.setState({ isLogged: true });
                    AuthService.saveUserInfo(email);
                    this.props.history.push('/')
                })
                .catch(err => this.setState({ emailError: err.message }))
        }
        return;
    }

    render() {
        return (
            <div>
                <div className='cover-layer'></div>
                <Card id='login-container'>
                    <img className='login' src={require('../../images/private/home.png')}></img>
                    <Error errorMsg={this.state.emailError}></Error>
                    <Input id='text-input' placeholder='username' disableUnderline={false} onChange={(textInputt) => this.setState({ usernameInput: textInputt.target.value })}></Input>
                    <Input id='pass-input' type='password'
                        placeholder='password'
                        disableUnderline={false}
                        onChange={(textInputt) => this.setState({ passwordInput: textInputt.target.value })}></Input>
                    <Button variant='contained' size='small' id='button' onClick={() => this.onLogin(this.state.usernameInput, this.state.passwordInput)}>
                        <span>login</span>
                    </Button>
                    <div>
                        <p className='resetText'
                            onClick={() => this.handleResetTextClick()}>Forgot your password?</p>
                    </div>
                    {this.state.resetVisible ? <ResetText sentReq={false} emailInput={''} /> : null}
                    <h4><Error errorMsg={this.state.wrongPassword}></Error></h4>
                </Card>
            </div>
        )
    }
}

class ResetText extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            sentReq: false,
            emailInput: '',
        }
    }

    handleResetButton = () => {
        localStorage.setItem('invC', '0');
        AuthService.resetPassword(this.state.emailInput)
            .then(res => {
                this.setState({ sentReq: true });
            })
    }
    requestResponse = () => {
        return <div>
            <p>Email sent, please check!</p>
        </div>
    }
    requestInput = () => {
        return <div>
            <TextField type='text' id='email-input' placeholder='email'
                onChange={(e) => this.setState({ emailInput: e.target.value })}
            ></TextField>
            <Button id='reset-button' onClick={this.handleResetButton}>reset</Button>
        </div>
    }


    render() {
        if (this.state.sentReq === true) return <this.requestResponse />
        else return <this.requestInput />
    }


}