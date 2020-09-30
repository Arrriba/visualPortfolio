import React, { Component } from 'react';
import './toolbar.css';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import AuthService from '../../services/authService';

const toolbarStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  backgroundColor: '#f9fdfd',
  padding: '6px 8px'
};

const imgStyle = {
  display: 'flex',
  width: '300',
  height: '280'

};


class Toolbar extends Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  onLogout = () => {
    AuthService.logout()
      .then(res => {
        return null;
      })
      .catch(err => alert(err));
  }

  render() {
    const { pos } = this.props;
    return (
      <div className='toolbar-style' style={toolbarStyle}>
        {/* <div className={pos ? 'moved' : ''}>
          <Breadcrumb class='breadcrumb' tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
            <BreadcrumbItem tag="a" href="#">Library</BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/">Details</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Bootstrap</BreadcrumbItem>
          </Breadcrumb>
        </div> */}
        <div style={{ flex: 1 }}></div> 
        <Tooltip title="Profile"><Link to='/'><img className='user-img-style' alt='user details' src={require('../../images/avatar.png')}></img></Link></Tooltip>
        <Tooltip title="Logout"><Link to='/login' onClick={this.onLogout}><img className='logout-img-style' alt='user details' src={require("../../images/private/logout1.jpg")} /></Link></Tooltip>
      </div>
    );
  }
}

export default Toolbar;