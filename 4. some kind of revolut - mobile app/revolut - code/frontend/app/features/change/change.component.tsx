import React, { Component, PureComponent } from 'react';
import { View, Alert, AsyncStorage, RefreshControl, Text, Button, Image, ScrollView } from 'react-native';
import changeStyles from './change.component.styles';
import { MoneyService } from '../services/service';
//import { LoginButton } from 'react-native-fbsdk';
interface IChangeProps {
    navigation: any,
    phoneNumber: string,
    change: number,
    refreshing: boolean,
}
interface IChangeState {
    phoneNumber: '',

}

export default class ChangeComponent extends Component<IChangeProps, any, IChangeState>{
    constructor(props: any) {
        super(props);
        this._onPressButton = this._onPressButton.bind(this);
        this._onRefresh = this._onRefresh.bind(this);

        this.state = {
            refreshing: false,
        }
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                AsyncStorage.getItem('phone')
                    .then(value => {
                        if (value != null) {
                            this.setState({ phoneNumber: value })
                        }
                        MoneyService.getChange(this.state.phoneNumber)
                            .then((res) => {
                                this.setState({
                                    change: res
                                });
                            })
                            .catch((error: String) => {
                                this.setState({
                                    change: '',
                                });
                                Alert.alert(error.toString())
                            })
                    }).catch(error => {
                        Alert.alert('eroare la primirea datelor!')
                    })
            });
    }
    componentWillMount() {
        AsyncStorage.getItem('phone')
            .then(value => {
                if (value != null) {
                    this.setState({ phoneNumber: value })
                }
                MoneyService.getChange(this.state.phoneNumber)
                    .then((res) => {
                        this.setState({
                            change: res,

                        });

                    })
                    .catch((error: String) => {
                        this.setState({
                            change: '',
                        });
                        Alert.alert(error.toString())
                    })
            }).catch(error => {
                Alert.alert('eroare la primirea datelor!')
            }
            )

    }
    _onPressButton() {

        MoneyService.TopUpChange(Number(parseInt(this.state.phoneNumber, 10)), this.state.change)
            .then((res) => {
                this._onRefresh()
                Alert.alert(res.toString())
            }
            )
            .catch((error) => {
                Alert.alert(error)
            });

    };
    _onRefresh() {
        this.setState({ refreshing: true });
        MoneyService.getChange(this.state.phoneNumber)
            .then((res) => {
                this.setState({
                    change: res,
                    refreshing: false
                });
            })
            .catch((error: String) => {
                this.setState({
                    change: '',
                });
                Alert.alert(error.toString())
            })
    }
    render() {

        return (
            <ScrollView
                scrollEnabled={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                <View style={changeStyles.container}>
                    <Image
                        style={changeStyles.imageB}
                        source={require('./piggy.png')}

                    ></Image>
                    <Text style={changeStyles.text}>Savings:</Text>
                    <Text style={changeStyles.text}>{this.state.change}</Text>
                    <View style={changeStyles.btnShow}>
                        <Button
                            title="Top Up"
                            color='#F8DD0C'

                            onPress={() => this._onPressButton()}
                        />
                    </View>

                </View>
            </ScrollView>
        );
    }
}

