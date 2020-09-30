import React, { Component } from 'react';
import { AsyncStorage, AppRegistry, RefreshControl, ListView, FlatList, Image, TextInput, View, Text, Button, Alert, ScrollView, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { GroupsService } from '../services/groupsService';
import whoStyles from './who.component.styles';
import { validate } from '../validators/validator';
import { MoneyService } from '../services/service';
import { AppRoutes } from '../../app.routes';
import SendSMS from 'react-native-sms';


interface ILoginProps {
    navigation: any,
    refreshing: false,
    blackList: [],
};

interface ILoginState {
    blackList: [],
};



export default class WhoComponent extends Component<ILoginProps, any, ILoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            refreshing: false,
            blackList: []
        }
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {

                AsyncStorage.getItem('phone')
                    .then(value => {
                        if (value != null) {
                            this.setState({ phoneNumber: value })
                            MoneyService.getWhoOwesMe(this.state.phoneNumber)
                                .then((res) => {
                                    this.setState({
                                        blackList: res,

                                    });

                                })
                                .catch((error: String) => {
                                    this.setState({
                                        blackList: [],
                                    });
                                    Alert.alert(error.toString())
                                })

                        }
                    }).catch(error => {
                        Alert.alert('eroare la primirea datelor de log in!')
                    }
                    )



            });

    };

    onEnableScroll = (value: boolean) => {
        this.setState({
            enableScrollViewScroll: value,
        });
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        MoneyService.getWhoOwesMe(this.state.phoneNumber)
            .then((res) => {
                this.setState({
                    blackList: res,
                    refreshing: false
                });

            })
            .catch((error: String) => {
                this.setState({
                    blackList: [],
                });
                Alert.alert(error.toString())
            })


    }



    componentWillMount() {
        AsyncStorage.getItem('phone')
            .then(value => {
                if (value != null) {
                    this.setState({ phoneNumber: value })
                    MoneyService.getWhoOwesMe(this.state.phoneNumber)
                        .then((res) => {
                            this.setState({
                                blackList: res,

                            });

                        })
                        .catch((error: String) => {
                            this.setState({
                                blackList: [],
                            });
                            Alert.alert(error.toString())
                        })

                }
            }).catch(error => {
                Alert.alert('eroare la primirea datelor de log in!')
            }
            )




    }



    render() {
        return (
            <View style={whoStyles.container}>
                <Text style={whoStyles.text2}>Blacklist:</Text>

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
                        data={this.state.blackList}
                        extraData={this.state.blackList /* so that list is re-rendered when `list` changes */}
                        keyExtractor={(item: any) => item.idBill.toString()}

                        renderItem={({ item, index }) => (
                            <View style={whoStyles.listItem}>

                                <Text style={whoStyles.textItem}
                                    
                                    onLongPress={() => {                                                   //this.setState({groupName: this.state.groupsList[index].name})
                                        const a = "Short reminder that you owe me " + this.state.blackList[index].amount.toString() + "!";

                                        Alert.alert(
                                            `Phone number: ${this.state.blackList[index].phoneNumber.toString()}`,
                                            'Warn him?',
                                            [
                                                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                                { text: 'Cancel', onPress: () => null },
                                                {
                                                    text: 'Yes', onPress: () => {
                                                        SendSMS.send({
                                                            body: a,
                                                            recipients: [this.state.blackList[index].phoneNumber],
                                                            successTypes: ['sent', 'queued'],
                                                            allowAndroidSendWithoutReadPermission: true
                                                        }, (completed, cancelled, error) => {

                                                            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
                                                        });
                                                    }
                                                },
                                            ],
                                        )

                                    }
                                    }
                                >{"phoneNo. " + item.phoneNumber.toString() + ":          " + item.amount.toString() + " $"}</Text>
                            </View>

                        )}
                    ></FlatList>
                </ScrollView>

            </View>
        );

    }

}
