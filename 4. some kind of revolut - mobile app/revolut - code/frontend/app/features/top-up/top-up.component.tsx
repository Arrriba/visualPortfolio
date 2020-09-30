import React, { Component } from 'react';
import { Alert, TextInput, AsyncStorage, Button, Image, View } from 'react-native';
import topStyles from './top-up.component.styles';
import { MoneyService } from '../services/service';
import { validate } from '../validators/validator';

interface ITopState {
  phoneNumber: string,
  amount: string,

  phoneNumberValidate: boolean,
  amountValidate: boolean,
  loggedIn: any,
}

export default class TopUpComponent extends Component<ITopState, any> {

  constructor(props: any) {
    super(props);

    this._onPressButton = this._onPressButton.bind(this);
    this.state = {
      phoneNumber: '',
      amount: "",
      loggedIn: true,
      phoneNumberValidate: true,
      amountValidate: true,
    };
  }


  _retrieveData = () => {

    AsyncStorage.getItem('phone').then((value) => {
      this.setState({ phoneNumber: value });
    })
      .catch((error) => {
        console.error(error);
      }
      )
  }



  _onPressButton() {
    if (this.state.phoneNumber == "" || this.state.amount == "") {
      Alert.alert("Please try again!");
    }
    else {
      if (!this.state.phoneNumberValidate || !this.state.amountValidate) {
        Alert.alert("Please try again!")
      } else {
        this.postTopUp()
      }
    }
  };

  private postTopUp = () => {
    MoneyService.postTopUp(Number(parseInt(this.state.phoneNumber, 10)), Number(parseInt(this.state.amount, 10)))
      .then((res) =>
        Alert.alert(res.toString())

      )
      .catch((error) => {
        Alert.alert(error)
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
        phoneNumberValidate: validate(text, type)
      })
  }

  render() {
    return (

      <View style={topStyles.container}>

        <View style={topStyles.alternativeTextLayout}>
          <TextInput
            onChangeText={
              (text) => {
                this.setState({ phoneNumber: text })
                this.val(text, 'phoneNumber')
              }
            }
            style={[topStyles.textInput,
            !this.state.phoneNumberValidate ? topStyles.error : null]}
            placeholder='Phone Number'
            underlineColorAndroid="#e59b42"
          >
          </TextInput>
          <TextInput
            underlineColorAndroid="#e59b42"
            onChangeText={
              (text) => {
                this.setState({ amount: text })
                this.valAmount(text)

              }
            }
            style={[topStyles.textInput,
            !this.state.amountValidate ? topStyles.error : null]}
            placeholder="Amount"
          ></TextInput>
        </View>

        <View style={topStyles.buttonContainer}>
          <Button
            onPress={this._onPressButton.bind(this)}
            title="top up"
            color="#87babe"
          />

        </View>

        <View style={topStyles.image}>
          <Image source={require('./toop.jpg')}>
          </Image>
        </View>
      </View>
    );
  }
}

