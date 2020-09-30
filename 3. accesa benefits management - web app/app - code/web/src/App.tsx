import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidenav from './components/sidenav/sidenav';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home/home';
import CreateArea from './pages/create-area/create-area';
import LoginPage from './pages/login/loginPage';
import AuthService from './services/authService';
import { AreaService } from './services/areaService';
import AreaView from './pages/area-view/area-view';
import ProgramView from './pages/program/program-view';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
        exact
        {...rest}
        render={(props: any) =>
            AuthService.getAuthStatus() ? <Component {...props} /> : <Redirect to="/login" />
        }

    />
);

const PublicRoute = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={(props: any) =>
            AuthService.getAuthStatus() ? <Redirect to="/" /> : <Component {...props} />
        }
    />
);

class App extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            sidebarOpen: false,
            update:false,
            areas: []
        }
    }

    componentWillMount() {
        AreaService.getAreas()
            .then(res => {
                const lastArea: any = localStorage.getItem('currentArea');
                AreaService.assignArea(parseInt(lastArea));
                const lastPath: any = localStorage.getItem('currentAreaPath');
                localStorage.setItem('invC', '0');
                localStorage.setItem('currentArea', '0');
                localStorage.setItem('currentAreaPath', '/');
                AuthService.autoAuthUser();
                this.setState({ areas: res })
                console.log(this.state.areas)
                return (
                    <Redirect to={lastPath} />
                );
            })

    }

    createRoutes = () => {
        return this.state.areas.map((a: any, key: any) => {
            return (
                <PrivateRoute key={key} path={a.path} component={AreaView}/>
            );
        })
    }

    redirectTo = (path:string) =>{
        this.setState({upadte:true});
        console.log('I swear i fucking called this method !!!!!!!!!!!!!!');
        return<Redirect to= {path} />
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Sidenav sidebarOpen={this.state.sidebarOpen}></Sidenav>
                    <div>
                        {this.createRoutes()}
                        <PrivateRoute path='/areas/food' component={AreaView} />
                        <PrivateRoute path='/' component={Home} />
                        <PrivateRoute path='/create-area' component={() => <CreateArea area={{name: '', description: '', icon: '', logo: ''}} />} />
                        <PrivateRoute path='/program' component={ProgramView}/>
                        <PublicRoute path='/login' component={LoginPage}/>

                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
