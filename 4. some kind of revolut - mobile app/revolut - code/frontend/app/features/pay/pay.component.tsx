import React, { Component } from 'react';
import { AsyncStorage, AppRegistry, RefreshControl, ListView, FlatList, Image, TextInput, View, Text, Button, Alert, ScrollView, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, AlertIOS } from 'react-native';
import { GroupsService } from '../services/groupsService';
import payStyles from './pay.component.styles';
import { validate,validatePayAmount } from '../validators/validator';
import { MoneyService } from '../services/service';
import { AppRoutes } from '../../app.routes';


interface ILoginProps {
    navigation: any
    amountInput: string,
    amountValidate: boolean,
    refreshing: false,
    toPayBills: [],
    balance: string
};

interface ILoginState {
    amountInput: '',
    amountValidate: true,
};



export default class PayComponent extends Component<ILoginProps, any, ILoginState> {

    constructor(props: any) {
        super(props);
        this._storeData = this._storeData.bind(this);
        this._onPressButtonPayBill = this._onPressButtonPayBill.bind(this);

        this.state = {
            amountValidate: true,
            refreshing: false,

        }
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {

                MoneyService.getToPayBills(this.state.phoneNumber)
                    .then((res) => {
                        this.setState({
                            toPayBills: res,

                        });
                        this.getBalance()


                    })
                    .catch((error: String) => {
                        this.setState({
                            toPayBills: [],
                        });
                        Alert.alert(error.toString())
                    })


            });

        const didBlurSubscription = this.props.navigation.addListener(
            'willBlur',
            () => {
            }
        );
    };
    _storeData() {
        Promise.all(
            [AsyncStorage.setItem('groupName', this.state.groupName),

            ]).catch(error => {
                // Error saving data
                Alert.alert(error)
            });

    }
    onEnableScroll = (value: boolean) => {
        this.setState({
            enableScrollViewScroll: value,
        });
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        MoneyService.getToPayBills(this.state.phoneNumber)
            .then((res) => {
                this.setState({
                    toPayBills: res,
                    refreshing: false
                });
                this.getBalance()
            })
            .catch((error: String) => {
                this.setState({
                    toPayBills: [],
                });
                Alert.alert(error.toString())
            })


    }


    _onPressButtonPayBill() {
        if (this.state.amountInput != '')
            MoneyService.pay(this.state.phoneNumber, Number.parseFloat(this.state.amountInput))
                .then((res) => {
                    Alert.alert("Pay/split it from the list below!")
                    this._onRefresh()
                    this.setState({amountInput: ''})
                })
                .catch((error: String) => {
                    Alert.alert(error.toString())
                    //console.warn(error.toString())
                });
        else Alert.alert("Invalid field!")


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

    componentWillMount() {
        AsyncStorage.getItem('phone')
            .then(value => {
                if (value != null) {
                    this.setState({ phoneNumber: value })
                    MoneyService.getToPayBills(this.state.phoneNumber)
                        .then((res) => {
                            this.setState({
                                toPayBills: res,

                            });

                        })
                        .catch((error: String) => {
                            this.setState({
                                toPayBills: [],
                            });
                            Alert.alert(error.toString())
                        })


                }
            }).catch(error => {
                Alert.alert('eroare la primirea datelor de log in!')
            }
            )



    }



    val = (text: string, type: string) => {

        if (type == 'amount')
            this.setState({
                //amountValidate: validate(text, 'phoneNumber')
            })
        if (type == 'payAmount')
            this.setState({
                //amountValidate: validate(text, 'payAmount')
            })
        if (type == 'friendNumber')
            this.setState({
                // friendNumberValidate: validate(text, 'phoneNumber')
            })
            if (type == 'payAmount')
            this.setState({
                amountValidate: validatePayAmount(text)
            })
    
        }

    render() {
        return (
            <View style={payStyles.container}>
                <Image style={payStyles.image}
                    //source={require('./friends_gif.gif')}
                    source={require('./money.png')}
                />
                <View style={payStyles.containerTitlu}>
                    <Text style={payStyles.text}>My Bills</Text>
                    <TextInput
                        onChangeText={
                            (text) => {
                                this.val(text, 'payAmount'),
                                    this.setState({ amountInput: text })
                            }
                        } style={[payStyles.textbox2,this.state.amountValidate?null:payStyles.error]}
                        placeholder='Amount'
                        underlineColorAndroid='#FFDA22'
                    >{this.state.amountInput != '' ? this.state.amountInput : null}
                    </TextInput>
                    <View style={payStyles.btnCreate}>
                        <Button
                            title="Pay Bill"
                            color='#ffcc00'

                            onPress={this._onPressButtonPayBill}
                        />

                    </View>
                    <Text style={payStyles.text1}>Balance: {this.state.balance}$</Text>

                    {/*
                    <View style={payStyles.btnCreate}>
                        <Button
                            title="Split Bill"
                            color='#08b3a0'

                            onPress={() => this.props.navigation.navigate('groups')}
                        />

                    </View>
                    */}
                    <View style={payStyles.btnCreate}>
                        <Button
                            title="who owes me?"
                            color='#0AC774'

                            onPress={() => this.props.navigation.navigate('who')}
                        />

                    </View>
                </View>
                <Text style={payStyles.text2}>To pay:</Text>

                <View style={payStyles.containerRest}>
                    <ScrollView  //scrollEnabled={this.state.enableScrollViewScroll}
                        scrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        <FlatList
                            data={this.state.toPayBills}
                            extraData={this.state.toPayBills /* so that list is re-rendered when `list` changes */}
                            keyExtractor={(item: any) => item.idBill.toString()}

                            renderItem={({ item, index }) => (
                                <View style={payStyles.listItem}>

                                    <Text style={payStyles.textItem}

                                        onLongPress={() => {                                                   //this.setState({groupName: this.state.groupsList[index].name})

                                            Alert.alert(
                                                'Bill Details',
                                                `Bill no: ${this.state.toPayBills[index].idBill}\nFrom: ${this.state.toPayBills[index].phoneNumber}\nAmount: ${this.state.toPayBills[index].amount}\n`,
                                                [
                                                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                                    { text: 'Pay&Split', onPress: () => {
                                                        //if(this.state.toPayBills[index].phoneNumber!==this.state.phoneNumber){
                                                        MoneyService.payPendingBill(this.state.toPayBills[index].phoneNumber, this.state.toPayBills[index].amount,
                                                            this.state.toPayBills[index].idBill, this.state.toPayBills[index].payed)
                                                            .then((res) => {
                                                                AsyncStorage.setItem('split', this.state.toPayBills[index].amount.toString()),

                                                                this.props.navigation.navigate('groups')
                                                            })
                                                            .catch((error: String) => {
                                                                Alert.alert(error.toString())
                                                            });
                                           
                                                     //}else Alert.alert("This has already been split! You have to pay it yourself.")
                                                    } 
                                                    },
                                                    {
                                                        text: 'Pay', onPress: () => {
                                                            MoneyService.payPendingBill(this.state.toPayBills[index].phoneNumber, this.state.toPayBills[index].amount,
                                                                this.state.toPayBills[index].idBill, this.state.toPayBills[index].payed)
                                                                .then((res) => {
                                                                    Alert.alert(res.toString())
                                                                    this._onRefresh()
                                                                })
                                                                .catch((error: String) => {
                                                                    Alert.alert(error.toString())
                                                                });
                                                        }
                                                    },
                                                ],
                                                // { cancelable: false }
                                            )

                                        }
                                        }
                                    //Alert.alert("Name: " + this.state.groupsList[index].name)}
                                    >{"no. " + item.idBill.toString() + ":          " + item.amount.toString() + " $"}</Text>
                                </View>

                            )}
                        ></FlatList>
                    </ScrollView>
                </View>

            </View>
        );

    }

}
