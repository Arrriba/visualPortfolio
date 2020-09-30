import React, { Component } from "react";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Card from "@material-ui/core/Card";

import "./sidenav.css";
import NavItems from "./menu-items";
import LoginPage from "../../pages/login/loginPage";
import AuthService from "../../services/authService";
import DetailsHeader from "../header/header";
import Toolbar from "../header/toolbar";
import { withRouter } from "react-router-dom";
import Home from "../../pages/home/home";
import { Tooltip, Divider } from "@material-ui/core";
import Areas from "../../services/areas_list";
import { AreaService } from "../../services/areaService";
interface IBarProps {
    sidebarOpen: boolean;
    isAuthenticated: boolean;
}



class Sidenav extends Component<any, any> {
    private areas: any[] = [];

    constructor(props: any) {
        super(props);
        this.state = {
            sidebarOpen: false,
            update: false,
            clickedRoutes: new Set()
        };
        this.handleRouteClick = this.handleRouteClick.bind(this);
        this.setState({ sidebarOpen: false });
    }

    componentWillMount() {
        AreaService.getAreas()
            .then((res: any) => {
                this.areas = res;
                this.setState({update: true})
            });
    }

    rerender(){
        this.setState({update: true})
    }

    onSetSidebarOpen = (open: any) => {
        this.setState({ sidebarOpen: open });
    };

    onLogout = () => {
        AuthService.logout()
            .then(res => {
                this.setState({ sidebarOpen: false, isAuthenticated: false });
            })
            .catch(err => alert(err));
    };

    renderMenuItems = () => {
        const maxNameLength = 16;
        let shownName = '';
        return this.areas.map((p: any, key: any) => {
            if (p.name.length > maxNameLength) {
                const longName = p.name.split('');
                const letterLeft = p.name.length - maxNameLength + 1;
                longName.splice(15, letterLeft);
                longName.push("...");
                shownName = longName.join("");
                return (
                    <NavItem onClick={() => {
                        AreaService.assignArea(p.id);
                        AreaService.saveCurrentArea(p.id, p.path);
                    }} key={key} eventKey={p.name} id='nav-item'>
                        <NavIcon id='nav-icon'>
                            <Link to={p.path}>
                                <img id='sidenav-item-icon' src={p.icon} />
                            </Link>
                        </NavIcon>
                        <NavText id='nav-text'>
                            <Tooltip title={p.name}><Link to={p.path}>{shownName}</Link></Tooltip>
                        </NavText>
                    </NavItem>
                )
            } else {
                return (
                    <NavItem onClick={() => {
                        console.log(p.id)
                        AreaService.assignArea(p.id);
                        AreaService.saveCurrentArea(p.id, p.path);
                    }} key={key} eventKey={p.name} id='nav-item'>
                        <NavIcon id='nav-icon'>
                            <Link to={p.path} >
                                <img id='sidenav-item-icon' src={p.icon} />
                            </Link>
                        </NavIcon>
                        <NavText id='nav-text'>
                            <Tooltip title={p.name}><Link to={p.path}>{p.name}</Link></Tooltip>
                        </NavText>
                    </NavItem>
                );
            }
        });
    };

    handleRouteClick(routeClicked: any) {
        this.setState((clickedRoutes: any) => ({
            clickedRoutes: new Set(clickedRoutes).add(routeClicked)
        }));
        this.state.clickedRoutes.map((x: any) => console.log(x));
    }

    render() {
        if (this.state.update == true)this.setState({update:false})
        return (
            <div className="page">
                <SideNav id="sidenav" expanded={this.state.sidebarOpen} onToggle={() => null}>
                    <Tooltip title={this.state.sidebarOpen ? 'Close' : 'Open'}>
                        <div id={this.state.sidebarOpen ? "navbar-toggle-expanded" : "navbar-toggle-collapsed"} onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>
                            <h2>{this.state.sidebarOpen ? '<' : '>'}</h2>
                        </div></Tooltip>
                    <SideNav.Nav id='menu-items' defaultSelected="Home">
                        <NavItem eventKey='Create area' id='nav-item'>
                            <NavIcon id='nav-icon'>
                                <Link to='/create-area'>
                                    <img id='sidenav-item-icon' src={require('../../images/private/create1.png')} />
                                </Link>
                            </NavIcon>
                            <NavText id='nav-text'>
                                <Tooltip title='Create area'><Link to='/create-area'>Create area</Link></Tooltip>
                            </NavText>
                        </NavItem>
                        <Divider variant='middle'/>
                        {this.renderMenuItems()}
                    </SideNav.Nav>
                </SideNav>
                <div id='body'>
                    <div className="header">
                        <Toolbar pos={this.state.sidebarOpen} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidenav;
