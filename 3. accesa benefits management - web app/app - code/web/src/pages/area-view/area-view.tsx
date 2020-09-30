import React, { Component } from 'react';
import { AreaService } from '../../services/areaService';
import './area-view.css';
import '../../services/areas_list';
import { Redirect } from 'react-router';
import BenefitService from '../../services/benefitService';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Input, Button, Tooltip } from '@material-ui/core';
import CreateArea from '../create-area/create-area';
import Error from '../../components/error/error';
import '../../models/program.ts';
import { Link } from 'react-router-dom';

export interface IAreaViewProps {
    redirect: any
}

export default class AreaView extends Component<IAreaViewProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            area: null,
            displayName: '',
            activeBenefits: [],
            inactiveBenefits: [],
            isLoading: true,

            newProgramName: '',
            newProgramDescription: '',
            newProgramUrl: '',
            creatingProgram: false,
            inputError: '',
            urlError: '',
            canCreate: false,
            isEditing: false,
            isDeleting: false
        }
    }

    componentWillMount() {
        this.setState({ isLoading: true, creatingProgram: false, area: AreaService.returnSelected() });
    }

    componentDidMount() {
        AreaService.saveCurrentArea(this.state.area.id, this.state.area.path);
        this.getBenefits();

        this.renderName();
    }

    componentWillUnmount() {
        this.setState({ area: null, benefits: [], isLoading: false, creatingProgram: false, isEditing: false });
    }

    validateInput = () => {
        if (this.state.newProgramName === '') {
            this.setState({ inputError: 'Name can not be empty' });
        } else {
            this.setState({ inputError: '' });
        }
    }

    validateUrl = () => {
        const valids = ['http://', 'https://'];

        if (this.state.newProgramUrl.search(valids[0]) !== -1) {
            if (this.state.newProgramUrl.search('.') !== -1) {
                this.setState({ urlError: '' });
            }
        } else if (this.state.newProgramUrl.search(valids[1]) !== -1) {
            if (this.state.newProgramUrl.search('.') !== -1) {
                this.setState({ urlError: '' });
            }
        } else {
            this.setState({ urlError: 'URL is not valid' });
        }

        if (this.state.inputError === '' && this.state.urlError === '') {
            this.setState({ canCreate: true });
        } else {
            this.setState({ canCreate: false });
        }
    }

    getBenefits = () => {
        this.setState({ isLoading: true });
        BenefitService.getBenefits(this.state.area.id)
            .then((res: any) => {
                this.setState({ activeBenefits: res[0], inactiveBenefits: res[1], isLoading: false, creatingProgram: false, isEditing: false });
            })
            .catch(err => console.log(err))
    }

    onCreateProgram = () => {
        BenefitService.createProgram(this.state.newProgramName, this.state.newProgramDescription, this.state.newProgramUrl, this.state.area.id)
            .then(res => {
                this.getBenefits();
                this.setState({ creatingProgram: false, newProgramName: '', newProgramDescription: '', newProgramUrl: '', isEditing: false });
            })
            .catch(err => console.log(err));
    }

    onDeletePress = () => {
        AreaService.removeArea(this.state.area.id)
            .then((rez) => {
                this.setState({ area: null });
                window.location.reload()
            })

    }

    renderName = () => {
        const maxLength = 50;
        if (this.state.area.name.length > maxLength) {
            const letters = this.state.area.name.split('');
            const lettersLeft = this.state.area.name.length - maxLength + 1;
            letters.splice(maxLength, lettersLeft);
            letters.push('...');
            const yes = letters.join("")
            this.setState({ displayName: yes })
        } else {
            this.setState({ displayName: this.state.area.name });
        }
    }

    renderActiveBenefits = () => {
        if (this.state.activeBenefits.length === 0) {
            return (
                <span>No active benefits.</span>
            );
        } else {
            return this.state.activeBenefits.map((b: any, key: any) => {
                return (
                    <Card key={key} onClick={() => this.onBenefitClick(b)}>
                        <Link to='/program' id='benefit-active'>
                            <span id='benefit-name'>{b.name}</span>
                            <i className="material-icons" id='view'>visibility</i>
                        </Link>
                    </Card>
                );
            })
        }
    }

    renderInactiveBenefits = () => {
        if (this.state.inactiveBenefits.length === 0) {
            return (
                <span>No inactive benefits.</span>
            );
        } else {
            return this.state.inactiveBenefits.map((b: any, key: any) => {
                return (
                    <Card key={key} onClick={() => this.onBenefitClick(b)}>
                        <Link to='/program' id='benefit-inactive'>
                            <span id='benefit-name'>{b.name}</span>
                            <i className="material-icons" id='view'>visibility</i>
                        </Link>
                    </Card>
                );
            })
        }
    }

    onBenefitClick = (p: any) => {
        console.log(p.id)
        BenefitService.assignProgram(p.id);
        BenefitService.saveCurrentProgram(p.id);
    }

    render() {
        if (this.state.area == null) { return <Redirect to='/' /> }

        if (this.state.isEditing === true) {
            return (
                <div>
                    <CreateArea area={this.state.area} action='Update'></CreateArea>
                    <span onClick={() => this.setState({ isEditing: false })} >Cancel</span>
                </div>
            );

        } else {
            return (
                <div id='background-img'>
                    <Card id='area-view-container'>
                        <div className='topRow'>

                            <img id="logo-style" src={this.state.area.logo}></img>
                            <i className="material-icons" id='edit-button' onClick={() => this.setState({ isEditing: true })}>edit</i>
                            <div style={{ width: '30%' }}>
                                <Tooltip title={this.state.area.name}>
                                    <h2>{this.state.displayName}</h2>
                                </Tooltip>
                            </div>
                            <div style={{ width: '20%' }}>
                                {
                                    this.state.activeBenefits.length == 0 ?
                                        <Button variant='contained' onClick={() => this.setState({ isDeleting: true })} id={this.state.isDeleting ? 'hide' : 'delete-button'}>Delete</Button>
                                        : null
                                }
                                <div id={this.state.isDeleting ? 'delete-confirmation' : 'hide'}>
                                    <span>Are you sure?</span>
                                    <Button id='confirm' onClick={this.onDeletePress}>Confirm</Button>
                                    <Button id='cancel' onClick={() => this.setState({ isDeleting: false })}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                        <Divider variant='middle' />
                        {
                            this.state.creatingProgram
                                ?
                                <div className='create-program-container'>
                                    <Error errorMsg={this.state.inputError}></Error>
                                    <Input
                                        id='create-input'
                                        placeholder="Enter new program name..."
                                        onBlur={this.validateInput}
                                        onChange={(x) => {
                                            this.setState({ newProgramName: x.target.value })
                                            this.validateInput();
                                        }}
                                        value={this.state.newProgramName}
                                    ></Input>
                                    <Input
                                        id='create-input'
                                        placeholder="Program descrption..."
                                        onChange={(x) => this.setState({ newProgramDescription: x.target.value })}
                                        value={this.state.newProgramDescription}
                                    ></Input>
                                    <Error errorMsg={this.state.urlError}></Error>
                                    <Input
                                        onBlur={this.validateUrl}
                                        id='create-input'
                                        placeholder="Add url..."
                                        onChange={(x) => {
                                            this.setState({ newProgramUrl: x.target.value })
                                            this.validateUrl();
                                        }}
                                        value={this.state.newProgramUrl}
                                    ></Input>
                                    <Button
                                        id='create-button'
                                        variant='contained'
                                        color='primary'
                                        disabled={this.state.canCreate ? false : true}
                                        onClick={() => this.onCreateProgram()}>Create</Button>
                                    <span className='showCreate' onClick={() => this.setState({ creatingProgram: false })}>Close</span>
                                </div>
                                :
                                <div id='area-items'>
                                    <p className="text-area">{this.state.area.description}</p>
                                </div>
                        }
                    </Card>

                    <Card id='benefits-container'>
                        <div className='benefits-header'>
                            <h4>Benefits</h4>
                            <span
                                className='showCreate'
                                onClick={() => this.setState({ creatingProgram: true })}
                            >Create</span>
                        </div>
                        <Divider variant='middle' />
                        <div id={this.state.isLoading ? 'showLoading' : 'hideLoading'}>
                            <CircularProgress thickness={2} size={30} disableShrink={true} value={100} />
                        </div>
                        <div className='benefits-list-container'>
                            <span style={{ fontStyle: 'italic' }}>Active</span>
                            {this.renderActiveBenefits()}
                            <span style={{ fontStyle: 'italic' }}>Inactive</span>
                            {this.renderInactiveBenefits()}
                        </div>
                    </Card>
                </div>
            );
        }
    }
}