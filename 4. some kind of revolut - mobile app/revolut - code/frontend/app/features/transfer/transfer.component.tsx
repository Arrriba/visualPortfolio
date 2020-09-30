import React, { Component } from 'react';
import { Alert, TextInput, Button, Image, View, AsyncStorage } from 'react-native';
import transferStyles from './transfer.component.styles';
import { MoneyService } from '../services/service'
import { validate } from '../validators/validator';


interface ITransferState {
    phoneNumber: string,
    targetPhoneNumber: string,
    amount: string,

    phoneNumberValidate: boolean,
    targetPhoneNumberValidate: boolean,
    amountValidate: boolean
    loggedIn: any
    refreshing: any
}

export default class TransferComponent extends Component<ITransferState, any> {


    constructor(props: any) {

        super(props);
        this._onPressButton = this._onPressButton.bind(this);


        this.state = {
            phoneNumber: "",
            targetPhoneNumber: "",
            amount: "",
            refreshing: false,

            loggedIn: false,

            phoneNumberValidate: true,
            targetPhoneNumberValidate: true,
            amountValidate: true
        };
    };

    _onPressButton() {
        if (this.state.phoneNumber == "" ||
            this.state.targetPhoneNumber == "" ||
            this.state.amount == "") {
            Alert.alert("Please try again!");
        }
        else
            (!this.state.phoneNumberValidate || !this.state.targetPhoneNumberValidate || !this.state.amountValidate) ? Alert.alert("Please try again!") : this.postTransfer()

    }

    private postTransfer = () => {
        MoneyService.postTransfer(this.state.phoneNumber, this.state.targetPhoneNumber, Number(parseInt(this.state.amount)))
            .then((res) => {
                Alert.alert(res.toString())
            })
            .catch((error: String) => {
                Alert.alert(error.toString())
            });
    }

    valAmount = (a: string) => {
        this.setState({
            amountValidate: validate(a, 'phoneNumber')
        })

    }

    val = (text: string, type: string) => {

        if (type == 'phoneNumber')
            this.setState({
                targetPhoneNumberValidate: validate(text, type)
            })
    }


    componentWillMount() {
        this._retrieveData();
    }

    _retrieveData() {
        Promise.all([
            AsyncStorage.getItem('phone'),
            AsyncStorage.getItem('loggedIn')
        ]).then(value => {
            if (value[0] !== null) {
                this.setState({ phoneNumber: value[0] })
                this.setState({ loggedIn: value[1] })
            }
        }).catch(error => {
            Alert.alert('eroare la primirea datelor de log in!')
            // Error retrieving data
        }
        )
    }
    render() {
        return (

            <View style={transferStyles.container}>
                <View style={transferStyles.image}>
                    <Image source={require('./paper_planes.png')}>
                    </Image>
                </View>
                <View style={transferStyles.alternativeTextLayout}>
                    <TextInput
                        placeholder={'From: ' + this.state.phoneNumber}
                        editable={false}
                        style={transferStyles.text}
                        underlineColorAndroid="#eac432"
                    >
                    </TextInput>
                    <TextInput
                        onChangeText={
                            (text) => {
                                this.setState({ targetPhoneNumber: text })
                                this.val(text, 'phoneNumber')

                            }
                        }
                        style={[transferStyles.text, !this.state.targetPhoneNumberValidate ? transferStyles.error : null]}
                        underlineColorAndroid="#eac432"
                        alignContent='center'
                        placeholder="To:"
                    >
                    </TextInput>
                    <TextInput
                        underlineColorAndroid="#eac432"
                        alignContent='center'

                        onChangeText={
                            (text) => {
                                this.setState({ amount: text })
                                this.valAmount(text)

                            }
                        }
                        style={[transferStyles.text, !this.state.amountValidate ? transferStyles.error : null]}

                        placeholder="Amount"
                    ></TextInput>
                </View>

                <View style={transferStyles.buttonContainer}>
                    <Button
                        onPress={this._onPressButton}
                        title="Transfer"
                        color="#66b4c1"
                    >
                    </Button>

                </View>

            </View>

        );
    }
}