import React, { Component } from 'react';
import './error.css';


interface ErrorProps {
    errorMsg: string;
}

export default class Error extends Component<ErrorProps> {
    render() {
        const { errorMsg } = this.props;
        return (
            <span className='error'>{ errorMsg }</span>
        );
    }
}
