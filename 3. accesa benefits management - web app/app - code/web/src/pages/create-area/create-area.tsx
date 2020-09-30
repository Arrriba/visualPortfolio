import React, { Component } from 'react';

import './create-area.css';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const acceptedTypes = ['image/jpeg', 'image/png', 'image/x-icon']

export interface IPageProps {
    redirect: any
}

interface Area2 {
    Id: number;
    Name: string;
    Description: string;
    Logo: Object;
    Icon: Object;
}

export default class CreateArea extends Component<any, any> {

    private defaultIconPath = '../../images/default-icon.png';
    private errorIcon = ''

    constructor(props: any) {
        super(props);
        this.state = {
            area: this.props.area,
            areaName: this.props.area.name,
            areaDescription: this.props.area.description,

            hasLogo: false,
            hasIcon: false,

            logo: null,
            icon: null,

            defaultIcon: true,
            customIcon: false,

            iconToSend: '',
            logoToSend: '',

            validIcon: true,
            validLogo: false,

            action: this.props.action
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLogoChange = (event: any) => {
        if (event.target.files.length === 0) {
            this.setState({ logo: null, hasLogo: false });
        } else {
            let isValid = acceptedTypes.includes(event.target.files[0].type)
            this.setState({
                logo: isValid ? URL.createObjectURL(event.target.files[0]) : this.errorIcon,
                logoToSend: event.target.files[0],
                hasLogo: true,
                validLogo: isValid
            })
        }
    }

    handleIconChange = (event: any) => {

        if (event.target.files.length === 0) {
            this.setState({
                icon: null,
                hasIcon: false,
                defaultIcon: true,
                customIcon: false,
                validIcon: true

            });
        } else {
            let isValid = acceptedTypes.includes(event.target.files[0].type)
            console.log(isValid, event.target.files[0].type)
            this.setState({
                icon: isValid ? URL.createObjectURL(event.target.files[0]) : this.errorIcon,
                iconToSend: event.target.files[0],
                hasIcon: true,
                customIcon: true,
                defaultIcon: false,
                validIcon: isValid
            })
        }
    }

    onUpdate = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        const formData = new FormData();
       // if (!this.state.validIcon || !this.state.validLogo) return null;
        
        formData.append('Name', this.state.areaName);
        formData.append('Description', this.state.areaDescription);

        formData.append('Logo', this.state.logoToSend);
        formData.append('Icon', this.state.iconToSend);
        const options = {
            method: 'PUT',
            body: formData
        };
        fetch('https://localhost:44301/api/areas/updatearea/'+this.state.area.id, options)
            .then((response: any) => {
                this.setState({ logo: response.Logo });
                window.location.reload()
                console.log(this.state.logoToSend)
            })
            .catch(err => console.log(err))
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        const formData = new FormData();
        if (!this.state.validIcon || !this.state.validLogo) return null;

        formData.append('Name', this.state.areaName);
        formData.append('Description', this.state.areaDescription);

        formData.append('Logo', this.state.logoToSend);
        formData.append('Icon', this.state.iconToSend);
        const options = {
            method: 'POST',
            body: formData
        };
        fetch('https://localhost:44301/api/areas/createarea', options)
            .then((response: any) => {
                this.setState({ logo: response.Logo });
                window.location.reload()
                console.log(this.state.logoToSend)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <form id='form-id' onSubmit={this.handleSubmit} encType='multipart/form-data'>

                <div className='full-page-container'>
                    <div id='create-area-container'>
                        <h2 className='create-area-font'>Area name:</h2>
                        <div className='input-style'>
                            <Input name='Name' value={this.state.areaName} placeholder='enter area name...' onChange={(textInputt) => this.setState({ areaName: textInputt.target.value })}></Input>
                        </div>
                        <h4 className='choose-logo-font'>Choose a logo:</h4>
                        <div id='choose-logo'>
                            <input name='Logo' className='input-style' type='file' accept='image/*' onChange={this.handleLogoChange} placeholder="Choose a logo"></input>
                            <img className='img-create' style={this.state.hasLogo ? { display: 'inline' } : { display: 'white' }} src={this.state.logo} />
                        </div>
                        <div className='checkbox-icon'>
                            <div style={{ flexDirection: 'row' }}>
                                <h4 className='create-area-font'>Icon:</h4>
                                <div className='icon-preview'>
                                    {/* <Input type='file' disableUnderline disabled={this.state.customIcon ? false : true} onChange={this.handleIconChange}></Input> */}
                                    <input className='input-style' accept='image/*' name='Icon' type='file' onChange={this.handleIconChange}></input>

                                    <img id='default-icon' src={this.state.icon} />
                                </div>
                            </div>
                        </div>
                        <TextField name='Description' value={this.state.areaDescription} placeholder='Enter area description below' variant='filled' multiline={true} rows={5} onChange={(areaInput) => this.setState({ areaDescription: areaInput.target.value })}></TextField>
                        <Button type='submit' id='button-style' variant='contained' color='primary' onClick={(e) => {
                            if (this.state.action === 'Create') {
                                this.handleSubmit(e);
                            } else if (this.state.action === 'Update') {
                                this.onUpdate(e);
                            }
                        }}>{this.state.action}</Button>
                    </div>
                </div>
            </form>

        );
    }
}