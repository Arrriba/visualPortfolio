import React, { Component } from 'react';
import { Button, Text, View, Image, TextInput, ImageBackground, Alert, ScrollView, AsyncStorage, RefreshControl } from 'react-native';
import { AppRoutes } from '../../app.routes';
import loginStyles from './login.component.styles';
import '../logged in/checkLogin.component';
import { validate } from '../validators/validator';
import {MoneyService,BalanceResponse} from '../services/service'
import { AppRouteTitles } from '../../app.routes';


interface ILoginProps {
    navigation: any,
    phonee: any
};

interface ILoginState {
    phoneNumber: string,
    pass: string,
    confpass: string,
    firstMount:boolean,

    phoneNumberValidate: boolean;
    firstNameValidate: boolean;
    lastNameValidate: boolean;
    passValidate: boolean;
};

export default class LoginComponent extends Component<ILoginProps, any, ILoginState> {

    private interval: any;

    constructor(props: any) {
        super(props);
        this._onPressButtonLogin = this._onPressButtonLogin.bind(this);
        this._onPressButtonLogout = this._onPressButtonLogout.bind(this);

        this._onPressButton = this._onPressButton.bind(this);
        this._storeData = this._storeData.bind(this);
        this._removeItem = this._removeItem.bind(this);
        this._retrieveData = this._retrieveData.bind(this);

        this.state = {
            phoneNumber: '',
            firstName: 'null',
            lastName: 'null',
            pass: '',
            confpass: 'null',
            refreshing: false,
            phoneNumberInput:'',


            balance: '',
            textPhone: 'Phone Number',
            textPass: 'Password',

            loggedIn: false,

            phoneNumberValidate: true,
            firstNameValidate: true,
            lastNameValidate: true,
            passValidate: true

        };
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this._retrieveData();


            }

        );

        const didBlurSubscription = this.props.navigation.addListener(
            'willBlur',
            () => {
                this._storeData()
            }
        );
    };

    _storeData() {

        Promise.all(
            [AsyncStorage.setItem('phone', this.state.phoneNumber),
            AsyncStorage.setItem('password', this.state.pass),
            AsyncStorage.setItem('loggedIn', this.state.loggedIn.toString())

            ]).catch(error => {
                // Error saving data
                Alert.alert(error)
            });

    }

    _onPressButtonLogout(){
        Promise.all([
            AsyncStorage.removeItem('phone'),
            AsyncStorage.removeItem('password'),
            AsyncStorage.removeItem('loggedIn')
        ]).then(() => {
            this.setState({ phoneNumber: '' })
            this.setState({ pass: '' })
            this.setState({ loggedIn: false })
            this.setState({ balance: '' })

        }).catch(() => {
            Alert.alert("Eroare la logout!")
        })
    }

    _removeItem() {
        Promise.all([
            AsyncStorage.removeItem('phone'),
            AsyncStorage.removeItem('password'),
            AsyncStorage.removeItem('loggedIn')
        ]).then(() => {
            this.setState({ phoneNumber: '' })
            this.setState({ pass: '' })
            this.setState({ loggedIn: false })
            this.setState({ balance: '' })

        }).catch(() => {
            Alert.alert("Eroare la logout!")
        })
    }

    _onPressButtonLogin() {
        if (this.state.phoneNumber == "" ||
            this.state.pass == "") {
            Alert.alert("Please try again!");
        }
        else {
            this._retrieveData();
            if (this.state.loggedIn===true) {
                this._removeItem();

            }
            else {
                if (!this.state.phoneNumberValidate) {
                    Alert.alert("Please try again!")
                } else {
                    this.setState({loggedIn: true})
                    this.postLogin();
                    this._storeData();
                    AppRouteTitles.login =  'Logout'

                }
            }
        }
    }

    _onPressButton() {
        if (this.state.phoneNumber == "" ||
            this.state.pass == ""
        ) {
            Alert.alert("Please try again!");
        }
        else
            (!this.state.phoneNumberValidate) ? Alert.alert("Please try again!") : this.getBalance()
    }


    private postLogin = () => {
        MoneyService.postLogin(this.state.phoneNumber,
        this.state.pass)
        .then((res) => {
            Alert.alert("logged in!")
           // Promise.all(
              //  [
                AsyncStorage.setItem('phone', this.state.phoneNumber),
                AsyncStorage.setItem('password', this.state.pass),
                AsyncStorage.setItem('loggedIn', this.state.loggedIn.toString())
                
           // ]).catch(error => {
            //        // Error saving data
            //        Alert.alert(error.toString())
              //  });
            

        })
        .catch((error) => {
            Alert.alert(error)
            Promise.all([
                AsyncStorage.removeItem('phone'),
                AsyncStorage.removeItem('password'),
                AsyncStorage.removeItem('loggedIn')
            ]).then(() => {
                this.setState({ phoneNumber: '' })
                this.setState({ pass: '' })
                this.setState({ loggedIn: false })
                this.setState({ balance: '' })
    
            }).catch(() => {
                Alert.alert("Eroare la logout!")
            })
        });
}

private getBalance = () => {
    MoneyService.getBalance2(this.state.phoneNumber)
        .then((res )=> {
            this.setState({
                balance: res.toString(),
            });
        })
        .catch((error: String) => {
            this.setState({
                balance: '',
            });
            Alert.alert(error.toString())
        });

}
componentWillMount(){
    Promise.all([
        AsyncStorage.getItem('phone'),
        AsyncStorage.getItem('password'),
        AsyncStorage.getItem('loggedIn')
    ]).then(value => {
        if (value[0] !== null) {
            this.setState({ phoneNumber: value[0] })
            this.setState({ pass: value[1] })
            this.setState({ loggedIn: value[2] })
            this.setState({ textPhone: value[0] })
            this.setState({ textPass: value[1] })
        }
        this._storeData()
    }).catch(error => {
        Alert.alert('eroare la primirea datelor de log in!')
        // Error retrieving data
    }
    )
}
    _retrieveData() {
        Promise.all([
            AsyncStorage.getItem('phone'),
            AsyncStorage.getItem('password'),
            AsyncStorage.getItem('loggedIn')
        ]).then(value => {
            if (value[0] !== null) {
                this.setState({ phoneNumber: value[0] })
                this.setState({ pass: value[1] })
                this.setState({ loggedIn: value[2] })
                this.setState({ textPhone: value[0] })
                this.setState({ textPass: value[1] })
            }
        }).catch(error => {
            Alert.alert('eroare la primirea datelor de log in!')
            // Error retrieving data
        }
        )
    }

    val = (text: string, type: string) => {

        if (type == 'phoneNumber')
            this.setState({
                phoneNumberValidate: validate(text, type)
            })
    }



    render() {
        const { navigation } = this.props;

        return (

            <ImageBackground style={loginStyles.imageB}
                source={require('./blank.jpg')}>
                <View style={loginStyles.container}>
                    <View style={loginStyles.textContainer}>

                        <TextInput
                            onChangeText={
                                (text) => {
                                    this.val(text, 'phoneNumber'),
                                        this.setState({ phoneNumberInput: text })
                                        this.state.phoneNumberValidate ? this.setState({phoneNumber: text}):this.setState({phoneNumber:null})
                                    this.setState({ textPhone: this.state.phoneNumber })
                                }
                            } style={[loginStyles.textbox2,
                            !this.state.phoneNumberValidate ? loginStyles.error : null]}
                            placeholder='Phone Number'
                            underlineColorAndroid='#FFDA22'
                        >{
                                this.state.phoneNumber == '' ? null : this.state.phoneNumber
                            }
                        </TextInput>
                        <TextInput
                            onChangeText={(text) => {
                                this.setState({ pass: text })
                                this.setState({ textPass: this.state.pass })

                            }}
                            style={loginStyles.textbox2}
                            secureTextEntry={true}
                            placeholder='Password'
                            underlineColorAndroid='#FFDA22'

                        >{
                                this.state.pass == '' ? null : this.state.pass
                            }</TextInput>
                        <Text style={loginStyles.text}>Balance: {this.state.balance}</Text>

                    </View>

                    <View style={loginStyles.btnContainer}>
                        <View style={loginStyles.btn}>
                            <Button
                                title={this.state.loggedIn == false ? "login" : 'logout'}
                                color="#33b69f"
                                onPress={this.state.loggedIn==false?this._onPressButtonLogin:this._onPressButtonLogout
                                }

                            />
                        </View>
                        <View style={loginStyles.btn}>

                            <Button
                                title="Register now!"
                                color="#297cbe"
                                onPress={() =>
                                    this.state.phoneNumber == null || this.state.phoneNumber === '' ?
                                        navigation.navigate(AppRoutes.register) : Alert.alert("You have to logout first!")
                                }>
                            </Button>
                        </View>
                        <View style={loginStyles.btn}>

                            <Button
                                title="get balance"
                                color="#FFDA22"
                                onPress={this._onPressButton}>
                            </Button>
                        </View>
                    </View>
                    <Image source={require('./lazy_town2.jpg')}
                        style={loginStyles.lazytownimage}
                    >
                    </Image>

                </View>

            </ImageBackground>


        );
    }


}

