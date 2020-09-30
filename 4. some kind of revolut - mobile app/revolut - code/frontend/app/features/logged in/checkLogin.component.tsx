import React, { Component } from 'react';
import LoginComponent from '../login/login.component';
import { AsyncStorage, Alert } from 'react-native';
import getPhoneNumber from '../login/login.component';
import TransferComponent from '../transfer/transfer.component';
import HomeComponent from '../home/home.component';
import { View } from 'native-base';
import TopUpComponent from '../top-up/top-up.component';
import RegisterComponent from '../register/register.component';
interface MyLoginProps {
    getPhone: getPhoneNumber,
    navigation: any,
    activ: boolean,
    loggedIn: boolean,
    phone: string,
}

interface MyLoginStatus {
    loggedIn: false,
    phone: '',
    activ: false
}

export default class checkLogin extends Component<MyLoginProps, any, MyLoginStatus>{
    constructor(props: any) {
        super(props);
        this.state = {
            loggedIn: false,
            phone: '',
        };

    };

    componentWillMount() {
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('phone');
            if (value !== null) {
                this.setState({ phone: value, loggedIn: true })
            }
        } catch (error) {
            Alert.alert('eroare la primirea datelor de log in!')
            // Error retrieving data
        }
    }


    render() {
        return (
            <View>
            <View>
                <HomeComponent phoneNo={this.state.phone} />

                <TransferComponent phoneNumber={this.state.phone}
                    logged={this.state.loggedIn} />
                <TopUpComponent logged={this.state.loggedIn}
                    phoneNumber={this.state.phone}
                />
                </View>
                <View>
                <LoginComponent phoneNumber={this.state.phone}

                />
                <RegisterComponent logged={this.state.loggedIn}
                    phoneNumber={this.state.phone}
                />

            </View>
            </View>

        );
    }

}

