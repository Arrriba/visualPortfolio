import React, { Component } from 'react';
import { AsyncStorage, AppRegistry, RefreshControl, ListView, FlatList, Image, TextInput, View, Text, Button, Alert, ScrollView, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import friendsStyles from './friends.component.styles';
import { GroupsService } from '../services/groupsService';
import { validate } from '../validators/validator';
import loginStyles from '../login/login.component.styles';
import GroupsComponent from '../groups/groups.component';
import SendSMS from 'react-native-sms';

interface ILoginProps {
    navigation: any,
};

interface ILoginState {
    phoneNumber: string,
    friendsList: any,

    phoneNumberValidate: boolean,
    friendNumberValidate: boolean,
    textPhone: string,
    groupName: string,
    targetPhoneNumber: string
};


export default class FriendsComponent extends Component<ILoginProps, any, ILoginState> {

    constructor(props: any) {
        super(props);
        this._onPressButton = this._onPressButton.bind(this);
        this._onPressButtonGroupsDetails = this._onPressButtonGroupsDetails.bind(this);
        this._onPressButtonGroupsMembers = this._onPressButtonGroupsMembers.bind(this);
        this._onPressButtonAdd = this._onPressButtonAdd.bind(this);
        this._onRefresh = this._onRefresh.bind(this)
        this._onPressButtonAddToGroup = this._onPressButtonAddToGroup.bind(this);
        this._onPressButtonRemoveFromGroup = this._onPressButtonRemoveFromGroup.bind(this);
        this._onPressButtonDeleteGroup = this._onPressButtonDeleteGroup.bind(this);
        this.onEnableScroll = this.onEnableScroll.bind(this);
        this.state = {
            phoneNumber: '',
            targetPhoneNumber: '',
            refreshing: false,
            enableScrollViewScroll: true,

            targetPhoneNumberValidate: true,
            groupName: '',
            addToGroup: '',
            phoneNumberMembers: '',
            phoneNumberMembersValidate: true,
            groupNameMembers: '',
            friendNumber: '',
            friendPhoneNumber: '',
            friendNumberValidate: true,
            friendsList: [],
            groupsDetails: [],
            groupsMembers: [],
            phoneNumberValidate: true,
            textPhone: 'Phone Number',

        }
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                AsyncStorage.getItem('phone')
                    .then(value => {
                        if (value != null) {
                            this.setState({ phoneNumber: value })
                        }
                        GroupsService.getFriends(this.state.phoneNumber)
                    .then((res) => {
                        this.setState({
                            friendsList: res,

                        });

                    })
                    .catch((error: String) => {
                        this.setState({
                            friendsList: [],
                        });
                        Alert.alert(error.toString())
                    })
                    }).catch(error => {
                        Alert.alert('eroare la primirea datelor de log in!')
                    }
                    )
                

                    

            });

        const didBlurSubscription = this.props.navigation.addListener(
            'willBlur',
            () => {
            }
        );
    };
    onEnableScroll = (value: boolean) => {
        this.setState({
            enableScrollViewScroll: value,
        });
    };

    someFunction() {
 
        SendSMS.send({
            body: 'The default body of the SMS!',
            recipients: ['0754042050','0740077957'],
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
        }, (completed, cancelled, error) => {
     
            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
     
        });
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        GroupsService.getFriends(this.state.phoneNumber)
                    .then((res) => {
                        this.setState({
                            friendsList: res,

                        });

                    })
                    .catch((error: String) => {
                        this.setState({
                            friendsList: [],
                        });
                        Alert.alert(error.toString())
                    })
        this.setState({
            targetPhoneNumber: '',

            targetPhoneNumberValidate: true,
            groupName: '',
            addToGroup: '',
            phoneNumberMembers: '',
            phoneNumberMembersValidate: true,
            groupNameMembers: '',
            friendNumber: '',
            friendPhoneNumber: '',
            friendNumberValidate: true,
            //friendsList: [],
            groupsDetails: [],
            groupsMembers: [],
            phoneNumberValidate: true,
            textPhone: 'Phone Number',
        })
        this.setState({ refreshing: false });
        //this.componentWillMount();
    }

    _onPressButton() {
        //this.props.navigation.navigate('groups');
       
        GroupsService.getFriends(this.state.phoneNumber)
            .then((res) => {
                this.setState({
                    friendsList: res,

                });

            })
            .catch((error: String) => {
                this.setState({
                    friendsList: [],
                });
                Alert.alert(error.toString())
            })

    }

    _onPressButtonGroupsDetails() {
        GroupsService.getGroupsDetails(this.state.phoneNumberMembers, this.state.groupNameMembers)
            .then((res) => {
                this.setState({
                    groupsDetails: res,
                    //groupsMembers:[],
                    friendsList: []
                });
                Alert.alert(this.state.groupsDetails[0] + '\n' + this.state.groupsDetails[1] + '\n' + this.state.groupsDetails[2])

            })
            .catch((error: String) => {
                this.setState({
                    groupsDetails: [],
                });
                Alert.alert(error.toString())
            })
        //if(this.state.groupsDetails!==null)
        //Alert.alert(this.state.groupsDetails[0]+'\n'+this.state.groupsDetails[1]+'\n'+this.state.groupsDetails[2])

    }

    _onPressButtonGroupsMembers() {
        if (this.state.phoneNumberMembers != '' && this.state.phoneNumberMembersValidate && this.state.groupNameMembers != '')
            GroupsService.getGroupsMembers(this.state.phoneNumberMembers, this.state.groupNameMembers)
                .then((res) => {
                    this.setState({
                        groupsMembers: res,
                        //groupsDetails:[],
                        friendsList: []
                    });

                })
                .catch((error) => {

                    Alert.alert(error)
                })
        else Alert.alert("Invalid fields!")
    }


    _onPressButtonAdd() {
        if (this.state.phoneNumberValidate == true && this.state.targetPhoneNumber != ''){
            GroupsService.postAddFriend(this.state.phoneNumber, this.state.targetPhoneNumber)
                .then((res) => {
                    SendSMS.send({
                        body: "I've just requested your friendship!",
                        recipients: [this.state.targetPhoneNumber],
                        successTypes:  ['sent', 'queued'],
                        allowAndroidSendWithoutReadPermission: true
                    }, (completed, cancelled, error) => {
                 
                        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
                 
                    });
                    Alert.alert(res.toString())
                    this._onRefresh()
                })
                .catch((error: String) => {
                    Alert.alert(error.toString())
                });
        
        
    }
    else Alert.alert("Invalid Field!")

        /*
        if (this.state.phoneNumberValidate == true && this.state.targetPhoneNumber != '')
            GroupsService.postAddFriend(this.state.phoneNumber, this.state.targetPhoneNumber)
                .then((res) => {
                    Alert.alert(res.toString())
                })
                .catch((error: String) => {
                    Alert.alert(error.toString())
                });
        else Alert.alert("Invalid Field!")
*/
    }

    _onPressButtonAddToGroup() {
        if (this.state.friendNumberValidate == true && this.state.friendPhoneNumber != '' && this.state.addToGroup != '')
            GroupsService.postAddToGroup(this.state.phoneNumber, this.state.friendPhoneNumber, this.state.addToGroup)
                .then((res) => {
                    Alert.alert(res.toString())
                })
                .catch((error) => {
                    Alert.alert(error)
                });
        else Alert.alert("Invalid fields!")

    }

    _onPressButtonRemoveFromGroup() {
        if (this.state.phoneNumberValidate && this.state.friendNumberValidate && this.state.friendPhoneNumber != '' && this.state.addToGroup != '')
            GroupsService.postRemoveFromGroup(this.state.phoneNumber, this.state.friendPhoneNumber, this.state.addToGroup)
                .then((res) => {
                    Alert.alert(res.toString())
                })
                .catch((error: String) => {
                    Alert.alert(error.toString())
                });
        else Alert.alert("Invalid Fields!")

    }

    
    _onPressButtonDeleteGroup() {
        if (this.state.groupName != '')
            GroupsService.postDeleteGroup(this.state.phoneNumber, this.state.groupName)
                .then((res) => {
                    Alert.alert(res.toString())
                })
                .catch((error: String) => {
                    Alert.alert(error.toString())
                });
        else Alert.alert("No group name!")

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
                friendNumberValidate: validate(text, 'phoneNumber')
            })
    }

    render() {


        return (

            // {
            /*    <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between'
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            />
            */
            //}
            <ScrollView>
            <View style={friendsStyles.container}>
                <Image style={friendsStyles.image}
                    source={require('./Friends-PNG-Pic.png')}
                />
                <Text
                    style={friendsStyles.text}>Friends:</Text>
                <View style={friendsStyles.btnShow}>
                    {/*
                            <Button
                            //color='#ffcc00'
                            color="#08b3a0"
                            title="Show friends"
                            onPress={this._onPressButton}
                        />
                       */}
                </View>
                <View style={friendsStyles.lista}>
                    <ScrollView  //scrollEnabled={this.state.enableScrollViewScroll}
                        scrollEnabled={true}
                        
                    >
                        <FlatList
                            data={this.state.friendsList}
                            extraData={this.state.friendsList /* so that list is re-rendered when `list` changes */}
                            keyExtractor={(item: any) => item[0]}
                            onTouchStart={() => {
                                this.onEnableScroll(false);
                            }}
                            onMomentumScrollEnd={() => {
                                this.onEnableScroll(true);
                            }}
                            renderItem={({ item, index }) => (
                                <View>
                                    <Text style={friendsStyles.textItem}
                                        //selectionColor="#08b3a0"
                                        onPress={() => Alert.alert("Name: " + this.state.friendsList[index][0] + "\nPhone number: " + this.state.friendsList[index][1])}
                                    >{this.state.friendsList[index][0]}</Text>
                                </View>
                            )}
                        ></FlatList>
                    </ScrollView>
                </View>
                {/*<FlatList
            //data={
                //Object.keys([...this.state.friendsList])
            //.map((value) =>value)
          //  }
            data={
                [key: [this.state.friendsList
                .map((value: string) =>value)]
            ]

              }    
        
            renderItem={({item}) => <Text style={friendsStyles.textItem}>{item.valueOf}</Text>}
          />
        </View>      
            */}
                {/* <Text
                        style={friendsStyles.text1}
                    >{[...this.state.friendsList].map((x) =>
                    x + '\n')}</Text>*/}
                <TextInput
                    onChangeText={
                        (text) => {
                            this.val(text, 'phoneNumber'),
                                this.setState({ targetPhoneNumber: text })
                            this.setState({ textPhone: this.state.targetPhoneNumber })
                        }
                    } style={[loginStyles.textbox2,
                    !this.state.phoneNumberValidate ? loginStyles.error : null]}
                    placeholder='Phone Number'
                    underlineColorAndroid='#FFDA22'
                >{
                        this.state.targetPhoneNumber == '' ? null : this.state.targetPhoneNumber
                    }
                </TextInput>
                <View style={friendsStyles.btnShow}>
                    <Button
                        title="add friend"
                        color='#ffcc00'

                        onPress={this._onPressButtonAdd}
                    />
                </View>
                <View style={friendsStyles.btnShow}>
                    <Button
                        title="Groups"
                        color='#08b3a0'

                        onPress={() => this.props.navigation.navigate("groups")}
                    />
                </View>

            </View>

             </ScrollView>
        );
    }
}
/*
interface ILoginPropss {
    navigation: any,
};

class FlatListBasics extends Component<ILoginPropss,any,ILoginState> {


    constructor(props: any){
        super(props);
        this.state = {
            phoneNumber: '',
            friendsList:[],
        }

    }

    getData(){
        GroupsService.getFriends(this.state.phoneNumber)
        .then((res) => {
            this.setState({
                friendsList: res,

            });

        })
        .catch((error: String) => {
            this.setState({
                friendsList: [],
            });
            Alert.alert(error.toString())
        })
    }

    getFriends(){
        GroupsService.getFriends(this.state.phoneNumber)
            .then((res) => {
                this.setState({
                    friendsList: res,

                });

            })
            .catch((error: String) => {
                this.setState({
                    friendsList: [],
                });
                Alert.alert(error.toString())
            })

    }
    render() {
      return (
        <View style={friendsStyles.text1}>
          <FlatList
            data={
                Object.keys([...this.state.friendsList])
            .map((value) =>value)
            }
            renderItem={({item}) => <Text style={friendsStyles.textItem}>{item}</Text>}
          />
        </View>
      );
    }
  }
  */