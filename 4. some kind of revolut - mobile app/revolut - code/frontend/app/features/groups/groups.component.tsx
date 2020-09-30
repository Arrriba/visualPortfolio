import React, { Component } from 'react';
import { AsyncStorage, AppRegistry, RefreshControl, ListView, FlatList, Image, TextInput, View, Text, Button, Alert, ScrollView, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { GroupsService } from '../services/groupsService';
import groupStyles from './group.component.styles';

import groupsStyles from './groups.component.styles';

interface ILoginProps {
    navigation: any
};

interface ILoginState {
    phoneNumber: '',
    groupsList: [],
    groupName: '',
    groupNameField: '',
    refreshing: false,
};



export default class GroupsComponent extends Component<ILoginProps, any, ILoginState> {

    constructor(props: any) {
        super(props);
        this._storeData = this._storeData.bind(this);
        this._onPressGroup = this._onPressGroup.bind(this);
        this._onPressButtonCreateGroup = this._onPressButtonCreateGroup.bind(this);
        this._onPressButtonDeleteGroup = this._onPressButtonDeleteGroup.bind(this);
        this.state = {
            //phoneNumber: '',
            groupName: '',
            groupNameField: '',
            refreshing: false,

        }
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {

                AsyncStorage.getItem('phone')
                    .then(value => {
                        if (value != null) {
                            this.setState({ phoneNumber: value })
                            GroupsService.getMyGroups(this.state.phoneNumber)
                                .then((res) => {
                                    this.setState({
                                        groupsList: res,

                                    });

                                })
                                .catch((error: String) => {
                                    this.setState({
                                        friendsList: [],
                                    });
                                    Alert.alert(error.toString())
                                })

                        }
                    }).catch(error => {
                        Alert.alert('eroare la primirea datelor de log in!')
                    }
                    )

                //this.setState({phoneNumber:"11"});


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
        GroupsService.getMyGroups(this.state.phoneNumber)
            .then((res) => {
                this.setState({
                    groupsList: res,
                    refreshing: false
                });

            })
            .catch((error: String) => {
                this.setState({
                    friendsList: [],
                });
                Alert.alert(error.toString())
            })


    }


    _onPressGroup(value: string) {
        // this._storeData()
        //this.props.navigation.navigate("group");

        AsyncStorage.setItem('groupName', value)
            .catch(
                (error) =>
                    // Error saving data
                    Alert.alert(error)
            );

        this.props.navigation.navigate("group");
    }

    _onPressButtonCreateGroup() {
        if (this.state.groupNameField != '')
            GroupsService.postNewGroup(this.state.phoneNumber, this.state.groupNameField)
                .then((res) => {
                    Alert.alert(res.toString())
                    this._onRefresh()
                })
                .catch((error: String) => {
                    Alert.alert(error.toString())
                });
        else Alert.alert("No group name!")


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

    componentWillMount() {
        AsyncStorage.getItem('phone')
            .then(value => {
                if (value != null) {
                    this.setState({ phoneNumber: value })
                    GroupsService.getMyGroups(this.state.phoneNumber)
                        .then((res) => {
                            this.setState({
                                groupsList: res,

                            });

                        })
                        .catch((error: String) => {
                            this.setState({
                                friendsList: [],
                            });
                            Alert.alert(error.toString())
                        })
                }
            }).catch(error => {
                Alert.alert('eroare la primirea datelor de log in!')
            }
            )



    }

    _onPressButtonAdd() {
        if (this.state.phoneNumberValidate == true && this.state.targetPhoneNumber != '')
            GroupsService.postAddFriend(this.state.phoneNumber, this.state.targetPhoneNumber)
                .then((res) => {
                    Alert.alert(res.toString())
                })
                .catch((error: String) => {
                    Alert.alert(error.toString())
                });
        else Alert.alert("Invalid Field!")

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
        GroupsService.postDeleteGroup(this.state.phoneNumber, this.state.groupName)
            .then((res) => {
                Alert.alert(res.toString())
                this._onRefresh()
            })
            .catch((error: String) => {
                Alert.alert(error.toString())
            });

    }

    val = (text: string, type: string) => {

        if (type == 'phoneNumber')
            this.setState({
                //phoneNumberValidate: validate(text, type)
            })
        if (type == 'phoneNumberMembers')
            this.setState({
                ///phoneNumberMembersValidate: validate(text, 'phoneNumber')
            })
        if (type == 'friendNumber')
            this.setState({
                // friendNumberValidate: validate(text, 'phoneNumber')
            })
    }

    render() {
        return (
            <View style={groupsStyles.container}>
                <Image style={groupStyles.image}
                    //source={require('./friends_gif.gif')}
                    source={require('./team.jpg')}
                />
                <View style={groupsStyles.containerTitlu}>
                    <Text style={groupsStyles.text}>Groups</Text>
                    <TextInput
                        style={groupsStyles.textbox2}
                        onChangeText={
                            (text) => {
                                this.setState({ groupNameField: text })
                            }
                        }
                        placeholder='Group Name'
                        underlineColorAndroid='#FFDA22'
                    >
                    </TextInput>
                    <View style={groupsStyles.btnCreate}>
                        <Button
                            title="Create Group"
                            color='#ffcc00'

                            onPress={this._onPressButtonCreateGroup}
                        />
                    </View>
                </View>
                <View style={groupsStyles.containerRest}>
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
                            data={this.state.groupsList}
                            extraData={this.state.groupsList /* so that list is re-rendered when `list` changes */}
                            keyExtractor={(item: any) => item.name}

                            renderItem={({ item, index }) => (
                                <View style={groupsStyles.listItem}>

                                    <Text style={groupsStyles.textItem}
                                        //selectionColor="#08b3a0"
                                        onPress={() => {
                                            this.setState({ groupName: this.state.groupsList[index].name })
                                            //alert(this.state.groupName)

                                            this._onPressGroup(this.state.groupsList[index].name)
                                        }
                                        }
                                        onLongPress={() => {
                                            this.setState({ groupName: this.state.groupsList[index].name })
                                            Alert.alert(
                                                this.state.groupsList[index].name,
                                                'Delete group?',
                                                [
                                                    {
                                                        text: 'Delete', onPress: () => {
                                                            this._onPressButtonDeleteGroup()
                                                        }
                                                    },
                                                    { text: 'Cancel', onPress: () => null },
                                                ],
                                                // { cancelable: false }
                                            )
                                        }
                                        }
                                    //Alert.alert("Name: " + this.state.groupsList[index].name)}
                                    >{this.state.groupsList[index].name}</Text>
                                </View>

                            )}
                        ></FlatList>
                    </ScrollView>
                </View>

            </View>
        );

    }

}
