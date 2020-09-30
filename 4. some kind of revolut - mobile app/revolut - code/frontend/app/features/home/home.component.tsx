import React, { Component } from 'react';
import { AsyncStorage, View, Text, Button, Image, Alert, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import homeStyles from './home.component.styles';
import { AppRoutes } from '../../app.routes';

interface HomeProps {
    phoneNo: string,
    changedText: boolean,
    refreshing: boolean
}



export default class HomeComponent extends Component<any, HomeProps, any> {

    private interval: any;
    constructor(props: any) {
        super(props);
        this.state = {
            phoneNo: '',
            changedText: true,
        }
    };

    componentWillMount() {
        this.interval = setInterval(() => {
            this._retrieveData();
        }, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('phone');

            if (value !== null) {
                this.setState({ phoneNo: value })
            }
            else {
                this.setState({ phoneNo: '' })
            };
        } catch (error) {
            Alert.alert("Eroare la primirea datelor!")
        };
    }

    _removeItem = async () => {
        try {
            await AsyncStorage.removeItem('phone');
            this.setState({ phoneNo: '' })
        } catch (error) {
            Alert.alert("Eroare la logout!")
        };
    }

    _onPressLogout = () => {
        if (this.state.phoneNo == '') {
            Alert.alert("Already logged out!")
        }
        else {
            Alert.alert("Logged out!")
            this._removeItem();
        }
    }

    render() {

        const { navigation } = this.props;

        return (

            <ImageBackground style={homeStyles.imageB}
                source={require('./m3.jpg')} >

                <View style={homeStyles.container}>

                    <Text style={homeStyles.welcome}
                    >Welcome to the</Text>
                    <Image
                        style={homeStyles.image}
                        source={require('./accesa_logo_bg.png')}
                    />
                    <View style={homeStyles.inlineText}>
                        <Image source={require('./youth2.gif')} />
                        <Text style={homeStyles.welcome}> program</Text>
                    </View>
                    <Text
                        style={homeStyles.logged}
                    >Login phone number: {this.state.phoneNo}</Text>

                </View>
                <View style={[homeStyles.btnContainer]}
                >
                    <Button

                        title={this.state.phoneNo == '' ? 'Login' : 'Logout'}
                        color='#0099BB'

                        onPress={() => {
                            if (this.state.phoneNo == '') {
                                navigation.navigate(AppRoutes.login)                                            //celalalt param
                            }
                            else {
                                this._onPressLogout()
                            }
                        }
                        }
                    ></Button>
                </View>
            </ImageBackground>

        );
    }
}