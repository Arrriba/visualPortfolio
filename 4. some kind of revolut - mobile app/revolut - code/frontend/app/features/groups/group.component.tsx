import React, { Component } from 'react';
import { Picker, AsyncStorage, AppRegistry, RefreshControl, ListView, FlatList, Image, TextInput, View, Text, Button, Alert, ScrollView, TouchableHighlight, TouchableNativeFeedback, PickerItem } from 'react-native';
import { GroupsService } from '../services/groupsService'
import groupStyles from './group.component.styles';
import loginStyles from '../login/login.component.styles';
import { validate } from '../validators/validator';
import SendSMS from 'react-native-sms';

interface IGroupProps {
    navigation: any,
    groupName: string,
    friendPhoneNumber: string,
    friendInput: string,
    friendInputValidate: boolean,
    newGroupName: string,
    splitBillInput: string,
    splitBillValidate: boolean,
    paymentAlert: string,
};
interface IGroupState {
    groupName: '',
    members: [],
    message: [],
    phoneNumber: '',
    refreshing: false,
    friendPhoneNumber: '',
    friendInput: '',
    friendInputValidate: true,
    newGroupName: '',
    splitBillInput: '',
    splitBillValidate: true,
    paymentAlert: '',
    phones: [],
    disableBtn:true,
};

export default class GroupComponent extends Component<IGroupProps, any, IGroupState>{
    constructor(props: any) {
        super(props);
        this._onPressButtonRemoveFromGroup = this._onPressButtonRemoveFromGroup.bind(this);
        this._onPressButtonAddToGroup = this._onPressButtonAddToGroup.bind(this);
        this._onRefresh = this._onRefresh.bind(this)
        this._onPressButtonRenameGroup = this._onPressButtonRenameGroup.bind(this);
        this._onPressButtonSplitBill = this._onPressButtonSplitBill.bind(this)
        this._sendPayingMessages = this._sendPayingMessages.bind(this)
        this.state = {
            // groupName:''
            refreshing: false,
            friendInputValidate: true,
            splitBillValidate: true,
            phones: [],
            message: [],


        }

        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {

                AsyncStorage.getItem('phone')
                    .then(value => {
                        if (value != null) {
                            this.setState({ phoneNumber: value })
                            AsyncStorage.getItem('split')
                    .then(value => {
                    if (value[0] !== null) {
                        this.setState({ disableBtn: false })
                    }
                })
                    .catch((error) => {
                        Alert.alert(error)
    
                    });
                        }

                    }).catch(error => {
                        Alert.alert('eroare la primirea datelor de log in!')
                    }
                    )
                AsyncStorage.getItem('groupName')
                    .then(value => {
                        if (value != null) {
                            this.setState({ groupName: value })
                        }
                    }).catch(error => {
                        Alert.alert('eroare la primirea datelor!')
                    }
                    )

                    
                    
                             
            
            });
    };

    componentWillMount() {

        AsyncStorage.getItem('phone')
            .then(value => {
                if (value != null) {
                    this.setState({ phoneNumber: value })
                }

                AsyncStorage.getItem('groupName')
                    .then(value => {
                        if (value != null) {
                            this.setState({ groupName: value })
                            GroupsService.getGroupsMembers(this.state.phoneNumber, this.state.groupName)
                                .then((res) => {
                                    this.setState({
                                        members: res,
                                    });

                                
                                AsyncStorage.getItem('split')
                .then(value => {
                if (value[0] !== null) {
                    this.setState({ splitBillInput: value[0] })
                    
                }
            else {
                throw value
            }
            })
            .catch(error => {
                Alert.alert(error)
            })
                                
                                
        }
                    ).catch(error => {
                        Alert.alert('eroare la primirea datelor!')
                    }
                    )
            }}).catch(error => {
                Alert.alert('eroare la primirea datelor de log in!')
            }
            )

    })

}
    _onPressButtonAddToGroup() {
        if (this.state.friendInputValidate == true && this.state.friendInput != '')
            GroupsService.postAddToGroup(this.state.phoneNumber, this.state.friendInput, this.state.groupName)
                .then((res) => {
                    Alert.alert(res.toString())
                    this._onRefresh()

                })
                .catch((error) => {
                    Alert.alert(error)
                });
        else Alert.alert("Invalid fields!")
        this.setState({ friendInput: '' })


    }
    _onPressButtonRemoveFromGroup() {
        GroupsService.postRemoveFromGroup(this.state.phoneNumber, this.state.friendPhoneNumber, this.state.groupName)
            .then((res) => {
                Alert.alert(res.toString())
                this._onRefresh()
            })
            .catch((error: String) => {
                Alert.alert(error.toString())
            });

    }

    _onPressButtonRenameGroup() {
        if (this.state.newGroupName != '')
            GroupsService.renameGroup(this.state.phoneNumber, this.state.groupName, this.state.newGroupName)
                .then((res) => {
                    Alert.alert(res.toString())
                    this.setState({ groupName: this.state.newGroupName })
                    this._onRefresh()
                })
                .catch((error: String) => {
                    Alert.alert(error.toString())
                });
        else Alert.alert("Invalid Fields!")

    }

    _onPressButtonSplitBill() {
        //if (this.state.splitBillInput != '') {
                AsyncStorage.getItem('split')
                .then(value => {
                if (value !== null) {
                    this.setState({ splitBillInput: value })
                    GroupsService.splitBill(this.state.phoneNumber, this.state.groupName, this.state.splitBillInput)
                .then((res) => {

                    Alert.alert(
                        'Payment',
                        res.toString(),
                        [
                            { text: 'Ok', onPress: () => {
                                this._sendPayingMessages()
                                
                                Alert.alert("Succeded!")
                        } },
                            //{text: 'Split', onPress: () => this._onPressButtonSplit(this.state.splitBillInput)},
                        ],
                    )
                })
                .catch((error) => {
                    Alert.alert(error)

                });
                }
            else {
                throw value
            }
            })
            .catch(error => {
                Alert.alert(error)
                return
            })
            
        
       //} else Alert.alert("Invalid Fields!")

    }

    _onPressButtonSplit(am: string) {
        GroupsService.split(this.state.phoneNumber, this.state.groupName, Number.parseFloat(am))
            .then((res) => {
                this._sendPayingMessages()

                Alert.alert(
                    'Bill Split!'
                )
            })
            .catch((error: String) => {
                Alert.alert(

                    error.toString()

                )
            });

    }

    _onPressButtonSplitAnyway(am: string) {
        GroupsService.split(this.state.phoneNumber, this.state.groupName, Number.parseFloat(am))
            .then((res) => {

                Alert.alert(
                    'Payment:',
                    res.toString()
                )
            })
            .catch((error: String) => {
                Alert.alert(

                    error.toString()

                )
            });
    }

    _sendPayingMessages() {
        const a = "New payment required from group " + this.state.groupName + ". Please take a look!";
        GroupsService.getGroupPhones(this.state.phoneNumber, this.state.groupName)
            .then((res) => {
                this.setState({ phones: res })
                //alert([this.state.phones].map((x:string)=>x.toString()))
                SendSMS.send({
                    body: a,
                    recipients: this.state.phones,
                    successTypes: ['sent', 'queued'],
                    allowAndroidSendWithoutReadPermission: true
                }, (completed, cancelled, error) => {

                    console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
                });
            })
            .catch((error: String) => {
                Alert.alert(

                    error.toString()

                )
            });
        const { message } = this.state;
        this.state.phones.forEach((element: any) => {
            message.push(element)
        });
        
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        GroupsService.getGroupsMembers(this.state.phoneNumber, this.state.groupName)
            .then((res) => {
                this.setState({
                    members: res,
                    refreshing: false,
                    friendInput: ''
                });

            })
            .catch((error) => {
                Alert.alert(error)
                this.setState({
                    friendInput: ''
                })
            })


    }

    val = (text: string, type: string) => {

        if (type == 'phoneNumber')
            this.setState({
                phoneNumberValidate: validate(text, type)
            })
        if (type == 'phoneNumberMembers')
            this.setState({
                phoneNumberMembersValidate: validate(text, 'phoneNumber')
            })
        if (type == 'friendNumber')
            this.setState({
                friendInputValidate: validate(text, 'phoneNumber')
            })
        if (type == 'amount')
            this.setState({
                splitBillValidate: validate(text, 'phoneNumber')
            })
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        style={groupStyles.scroll}
                    />
                }
            >

                <View style={groupStyles.container}>
                    
                    <Text
                        style={groupStyles.text}>{this.state.groupName}</Text>
                    <View style={groupStyles.btnShow}>
                      
                    </View>
                    <View style={groupStyles.lista}>
                        <ScrollView  //scrollEnabled={this.state.enableScrollViewScroll}
                            scrollEnabled={true}

                        >
                            <FlatList
                                data={this.state.members}
                                extraData={this.state.members /* so that list is re-rendered when `list` changes */}
                                keyExtractor={(item: any) => item[0]}
                               
                                renderItem={({ item, index }) => (
                                    <View>
                                        <Text style={groupStyles.textItem}
                                            //selectionColor="#08b3a0"
                                            onPress={() => Alert.alert("Name: " + this.state.members[index][0] + "\nPhone number: " + this.state.members[index][1])}
                                            onLongPress={() => {
                                                this.setState({ friendPhoneNumber: this.state.members[index][1] })
                                                Alert.alert(
                                                    this.state.members[index][0],
                                                    'Remove from group?',
                                                    [
                                                        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                                        { text: 'OK', onPress: () => this._onPressButtonRemoveFromGroup() },
                                                    ],
                                                    // { cancelable: false }
                                                )
                                            }
                                            }
                                        >{this.state.members[index][0]}</Text>
                                    </View>
                                )}
                            ></FlatList>
                        </ScrollView>
                    </View>
                   
                    <TextInput
                        onChangeText={
                            (text) => {
                                this.val(text, 'friendNumber'),
                                    this.setState({ friendInput: text })
                            }
                        } style={[groupStyles.textbox2,
                        !this.state.friendInputValidate ? loginStyles.error : null]}
                        placeholder='Phone Number'
                        underlineColorAndroid='#FFDA22'
                    >{this.state.friendInput != '' ? this.state.friendInput : null}
                    </TextInput>
                    <View style={groupStyles.btnShow}>
                        <Button
                            title="add to group"
                            color='#ffcc00'

                            onPress={() => this._onPressButtonAddToGroup()}
                        />
                    </View>
                    <TextInput
                        style={groupStyles.textbox2}
                        onChangeText={
                            (text) => {
                                this.setState({ newGroupName: text })
                            }
                        }
                        placeholder='New Group Name'
                        underlineColorAndroid='#FFDA22'
                    >{this.state.newGroupName != '' ? this.state.newGroupName : null}
                    </TextInput>
                    <View style={groupStyles.btnShow}>
                        <Button
                            title="Rename Group"
                            color='#08b3a0'

                            onPress={() => this._onPressButtonRenameGroup()}
                        />
                    </View>
                    {/*
                    <TextInput
                        onChangeText={
                            (text) => {
                                this.val(text, 'amount'),
                                    this.setState({ splitBillInput: text })
                            }
                        } style={groupStyles.textbox2}
                        placeholder='Amount to pay'
                        underlineColorAndroid='#FFDA22'
                    >{this.state.splitBillInput != '' ? this.state.splitBillInput : null}
                    </TextInput>
                    */}
                    <View style={groupStyles.btnShow}>
                        <Button
                            title="Split Bill"
                            color='#0AC774'
                            disabled = {this.state.disableBtn}
                            onPress={() => this._onPressButtonSplitBill()}
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }
}