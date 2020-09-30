import React, { Component } from 'react';
import './program-view.css';
import { Redirect } from 'react-router';
import BenefitService from '../../services/benefitService';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Input, Button } from '@material-ui/core';
import '../../models/program';
import Switch from "react-switch";


export interface IProgramViewProps {
    redirect: any
}

export default class ProgramView extends Component<IProgramViewProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            program: null,
            checked: false,
            // isLoading: true,
            // isEditing: false,
            isDeleting: false
        }
        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount() {
        this.setState({ isLoading: true, program: BenefitService.returnSelected() });
    }

    componentDidMount() {
        BenefitService.saveCurrentProgram(this.state.program.id);
        this.setState({checked: this.state.program.active === 1 ? true: false})
        console.log(this.state.program.active)
    }

    componentWillUnmount() {
        this.setState({ program: null });
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
        BenefitService.deleteProgram(this.state.program.id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err))
    }
    handleChange(checked: any) {

        this.setState({ checked });
        BenefitService.switchBenefit(this.state.program.id)

    }



    render() {
        return (
            <div id='program-container'>
                <Card id='program-view-container'>
                    <div className='topRoww'>
                        <label>
                            <Switch checked={this.state.checked}
                                onChange={this.handleChange}
                                uncheckedIcon={
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            fontSize: 15,
                                            color: "#ff7350",
                                            paddingRight: 2
                                        }}
                                    >
                                        Off
  </div>
                                }
                                checkedIcon={
                                    <svg viewBox="0 0 10 10" height="100%" width="100%" fill="#8fdbff">
                                        <circle r={3} cx={5} cy={5} />
                                    </svg>
                                }
                                className="react-switch"
                                id="icon-switch" />
                        </label>
                        {/* <i className="material-icons" id='edit-button' onClick={() => this.setState({ isEditing: true })}>edit</i> */}
                        <h2 id='program-title'>{this.state.program.name}</h2>
                        <Button variant='contained' onClick={this.onDeletePress} id='delete-buttonn'>delete</Button>
                    </div>
                    <div><p className="text-program">{this.state.program.description}</p>

                    </div>

                </Card>
            </div>
        );
    }
}
