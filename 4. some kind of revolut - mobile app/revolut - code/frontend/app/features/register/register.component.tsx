import React, { Component } from 'react';
import { AsyncStorage, Button, View, ImageBackground, TextInput, Alert } from 'react-native';
import registerStyles from './register.component.styles';
import { validate, validateAmount, validatePass } from '../validators/validator';
import { MoneyService } from '../services/service'
interface IRegisterState {
    phoneNumber: string,
    firstName: string,
    lastName: string,
    pass: string,
    confpass: string,
    amount: string,

    phoneNumberValidate: boolean;
    firstNameValidate: boolean;
    lastNameValidate: boolean;
    passValidate: boolean;
    amountValidate: boolean,
    logged: boolean,
    navigation: any,
};

export default class RegisterComponent extends Component<IRegisterState, any>{


    constructor(props: any) {

        super(props);
        this._onPressButton = this._onPressButton.bind(this);

        this.state = {
            phoneNumber: '',
            firstName: '',
            lastName: '',
            pass: '',
            confpass: '',
            amount: '',

            phoneNumberValidate: true,
            firstNameValidate: true,
            lastNameValidate: true,
            passValidate: true,
            amountValidate: true,


        };

    }

    _onPressButton() {
        if (this.isValid()) {
            this.postRegister();
         //   this.registerTopUp()
        }
        else Alert.alert("Please try again!")
    }



    componentWillMount() {
        this._retrieveData();


    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('phone');

            if (value !== null) {
                this.setState({ phoneNumber: value })
            }
            else {
                this.setState({ phoneNumber: '' })
            };
        } catch (error) {
            Alert.alert("Eroare la primirea datelor!")
        };
    }


    private postRegister = () => {
        MoneyService.postRegister(this.state.phoneNumber,
            this.state.pass, Number(parseInt(this.state.amount,10)), this.state.firstName,
            this.state.lastName
        )
            .then((res) => {
                Alert.alert(res.toString())
            })
            .catch((error) => {
                Alert.alert(error)
            });
    }

    private registerTopUp = () => {
        MoneyService.postTopUp(Number(parseInt(this.state.phoneNumber, 10)),
            Number(parseInt(this.state.amount, 10))
        )
        
            .catch((error: String) => {
                Alert.alert(error.toString())
            });
    }

    valPass(p1: string, p2: string) {
        this.setState({
            passValidate: validatePass(p1, p2)
        })
    }

    valAmount = (a: string) => {
        this.setState({
            amountValidate: validateAmount(a)
        })
    }

    val = (text: string, type: string) => {

        if (type == 'phoneNumber')
            this.setState({
                phoneNumberValidate: validate(text, type)
            })

        if (type == 'firstName')
            this.setState({
                firstNameValidate: validate(text, type)
            })
        if (type == 'lastName')
            this.setState({
                lastNameValidate: validate(text, type)
            })
    }

    isValid() {
        if (this.state.phoneNumber == "" || this.state.phoneNumber == null ||
            this.state.firstName == "" || this.state.firstName == null ||
            this.state.lastName == "" || this.state.lastName == null ||
            this.state.pass == "" || this.state.pass == null ||
            this.state.confpass == "" || this.state.confpass == null ||
            this.state.amount == "" || this.state.amount == null ||
            !this.state.phoneNumberValidate || !this.state.passValidate || !this.state.firstNameValidate || !this.state.lastNameValidate || !this.state.amountValidate) { return false }
        return true
    }


    render() {

        return (
            <ImageBackground style={registerStyles.image}
                source={require('./eyee.jpg')}>
                <View style={registerStyles.container}>
                    <View style={registerStyles.textboxes}>
                        <TextInput
                            onChangeText={
                                (text) => {
                                    this.setState({ firstName: text })
                                    this.val(text, 'firstName')

                                }}

                            style={[registerStyles.input,
                            !this.state.firstNameValidate ? registerStyles.error : null]}
                            underlineColorAndroid="#eac432"

                            placeholder="First Name">

                        </TextInput>

                        <TextInput
                            underlineColorAndroid="#eac432"

                            onChangeText={
                                (text) => {
                                    this.setState({ lastName: text })
                                    this.val(text, 'lastName')

                                }
                            }

                            style={[registerStyles.input,
                            !this.state.lastNameValidate ? registerStyles.error : null]}
                            placeholder="Last Name">
                        </TextInput>
                        <TextInput
                            underlineColorAndroid="#eac432"

                            onChangeText={
                                (text) => {
                                    this.setState({ phoneNumber: text })
                                    this.val(text, 'phoneNumber')

                                }
                            }

                            style={[registerStyles.input,
                            !this.state.phoneNumberValidate ? registerStyles.error : null]}
                            placeholder="Phone number">
                        </TextInput>
                        <TextInput
                            underlineColorAndroid="#eac432"

                            onChangeText={(text) => this.setState({ pass: text })}
                            style={registerStyles.input}
                            secureTextEntry={true}
                            placeholder="Password">
                        </TextInput>
                        <TextInput
                            underlineColorAndroid="#eac432"

                            onChangeText={
                                (text) => {
                                    this.setState({ confpass: text })
                                    this.valPass(this.state.pass, text)

                                }
                            }

                            style={[registerStyles.input,
                            !this.state.passValidate ? registerStyles.error : null
                            ]}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                        >
                        </TextInput>
                        <TextInput
                            underlineColorAndroid="#eac432"

                            onChangeText={
                                (text) => {
                                    this.setState({ amount: text })
                                    this.valAmount(text)

                                }}

                            style={[registerStyles.input,
                            !this.state.amountValidate ? registerStyles.error : null
                            ]}
                            placeholder="Amount (min 200)"
                        >
                        </TextInput>
                    </View>
                    <View style={registerStyles.btn}>
                        <Button
                            title="Register"
                            color="#57abd9"
                            onPress={this._onPressButton}
                        />
                    </View>
                </View>
            </ImageBackground>

        );
    }
}

