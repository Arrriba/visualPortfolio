import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import '../home/home.css'
import AuthService from '../../services/authService';
import InputValidator from '../../services/inputValidator';
import { AreaService } from '../../services/areaService';

import { Redirect } from 'react-router-dom';


export default class Home extends Component<any, any> {

    private note = '*NOTE: new password must consist of at least one UPPERCASE, one LOWERCASE, one SPECIAL SYMBOL and a NUMBER with a minimum of 6 characters';
    private validator: any;

    constructor(props: any) {
        super(props);
        this.state = {
            isAuthenticated: false,
            emailDisplayed: 'mail',
            oldPassword: '',
            newPassword: '',
            newPasswordConf: '',
            oldPasswordError: false,
            newPasswordError: false,
            newPasswordConfError: false,
            canChangePwd: false,
            changeStatus: '',
            changeStateError: false
        }
    }

    componentWillMount() {
        const state = AuthService.getAuthStatus();
        AreaService.forgetCurrentArea();
        this.setState({ isAuthenticated: state, changeStatus: this.note });
        if (state === true) {
            const ml = AuthService.getUserInfo().email;
            this.setState({ emailDisplayed: ml });
        }
    }

    onChangePassword = () => {
        this.setState({
            oldPassword: '',
            newPassword: '',
            newPasswordConf: ''
        });
        AuthService.changePassword(this.state.emailDisplayed, this.state.oldPassword, this.state.newPassword)
            .then(res => {
                this.setState({ changeStateError: true, changeStatus: 'Password successfuly changed!' });
            })
            .catch(err => {
                if (err.id === 1) {
                    AuthService.logout();
                    this.setState({ changeStateError: false, changeStatus: err.msg, isAuthenticated: false })
                } else {
                    this.setState({ changeStateError: false, changeStatus: err.msg })
                }
            })
    }

    validateOldPassword = () => {
        if (this.state.oldPassword === '') {
            this.setState({
                oldPasswordError: true
            });
        } else {
            this.setState({
                oldPasswordError: false
            });
        }
    }

    validateNewPassword = () => {
        const error = InputValidator.validatePasswords(this.state.newPassword);

        if (error === '') {
            this.setState({ newPasswordError: false });
        } else {
            this.setState({ newPasswordError: true });
        }
    }

    validateNewPasswordConf = () => {
        if (this.state.newPassword !== this.state.newPasswordConf) {
            this.setState({ newPasswordConfError: true });
        } else {
            this.setState({ newPasswordConfError: false });
        }
        this.validateAllFields();
        this.validator = setInterval(this.validateAllFields, 1000);
    }

    validateAllFields = () => {
        if (this.state.oldPasswordError === true ||
            this.state.newPasswordError === true ||
            this.state.newPasswordConfError === true) {
            this.setState({ canChangePwd: false });
        } else {
            this.setState({ canChangePwd: true });
        }
    }

    render() {
        if (this.state.isAuthenticated === false) {
            return (
                <Redirect to='/login' />
            );
        }
        return (
            <div className='page-container'>
                <div id='card-id' className='card-elements'>
                    <br />
                    <h4 id='text'>Login account:</h4>
                    <div id='text-input'>{this.state.emailDisplayed}</div>
                    <br />
                    <h4 id='text'>Change password?</h4>
                    <div>
                        <Input id={this.state.oldPasswordError ? 'old-pwd' : 'text-input'} value={this.state.oldPassword} onBlur={() => this.validateOldPassword()} type='password' placeholder='old password' disableUnderline={false} onChange={(textInputt) => this.setState({ oldPassword: textInputt.target.value })}></Input>
                        <Input id={this.state.newPasswordError ? 'old-pwd' : 'text-input'} value={this.state.newPassword} onBlur={() => this.validateNewPassword()} type='password' placeholder='new password' disableUnderline={false} onChange={(textInputt) => this.setState({ newPassword: textInputt.target.value })}></Input>
                        <Input id={this.state.newPasswordConfError ? 'old-pwd' : 'text-input'} value={this.state.newPasswordConf} onBlur={() => this.validateNewPasswordConf()} type='password' placeholder='confirm new password' disableUnderline={false} onChange={(textInputt) => this.setState({ newPasswordConf: textInputt.target.value })}></Input>
                        <span className={this.state.changeStateError ? 'change-succ' : 'change-error-note'}>{this.state.changeStatus}</span>
                        <Button size='small' id={this.state.canChangePwd ? 'button' : 'button-disabled'} disabled={this.state.canChangePwd ? false : true} onClick={() => {
                            clearInterval(this.validator);
                            this.onChangePassword();
                        }}>
                            <span>change</span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}