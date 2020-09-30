import React, { Component } from 'react';
import '../../components/header/header.css'

export default class DetailsHeader extends Component {
    render() {
        return (       
        <div className='upper-toolbar'>
        <span>I am the header</span>
        <span className='spacer'></span>
        <span>Ok</span>
        </div>
        );
    }
}