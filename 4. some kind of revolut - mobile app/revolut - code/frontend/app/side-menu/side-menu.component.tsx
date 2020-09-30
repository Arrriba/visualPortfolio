import React, { Component } from 'react';
import { ScrollView, Text, View, Image, Alert, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { AppRoutes, AppRouteTitles } from '../app.routes';
import styles from './side-menu.component.styles';
import sideMenuStyles from './side-menu.component.styles';
import { Button } from 'native-base';

interface ISideMenuProps {
    navigation: any,
}

export default class SideMenuComponent extends Component<ISideMenuProps, any> {
    private routesToDisplay: any[] = [];

    constructor(props: any) {
        super(props);

        this.routesToDisplay = Object.keys(AppRoutes)
            .map((value: any, index: number) => ({
                key: index,
                route: value
            }));
            const willFocusSubscription = this.props.navigation.addListener(
                'willFocus',
                () => {
                    AsyncStorage.getItem('phone').then((value) => {
                        if(value==null|| value===''){
                            AppRouteTitles.login = 'Login'
                        }
                        else AppRouteTitles.login = 'Logout'
                    })
                        .catch((error) => {
                        })
    
                }
    
            );
    
           
    }

    componentWillMount(){
        
                AsyncStorage.getItem('phone').then((value) => {
                    if(value==null|| value===''){
                        AppRouteTitles.login = 'Login'
                    }
                    else AppRouteTitles.login = 'Logout'

                })
                    .catch((error) => {
                    })

            

     
    }

    private navigateToScreen = (routeName: keyof typeof AppRoutes) => () => {
        AsyncStorage.getItem('phone').then((value) => {
            this.setState({ phoneNumber: value });
            if ((value == null || value === '') && (routeName === "top_up" || routeName === "transfer" || routeName === "friends" || routeName ==='pay' ||routeName ==='change'))
                Alert.alert('You have to login first!')
            else {
                if (value != null && routeName == "register")
                    Alert.alert('You have to logout first!')
                else {
                    const navigationAction = NavigationActions.navigate({ routeName });
                    this.props.navigation.dispatch(navigationAction);
                }
            }
        })
            .catch((error) => {
                console.error(error);
            })

    }




    private getNavigationItemClassesFor = (route: keyof typeof AppRoutes) => {
        const { navigation } = this.props;
        const lastRoute = navigation.state.routes[0].routes.length - 1;
        const currentScreen = navigation.state.routes[0].routes[lastRoute].routeName;
        if (currentScreen === route) {
            return [styles.activeMenuItem];
        }
        return [];
    };

    private renderNavigationItem = ({ route, key }: { route: keyof typeof AppRoutes, key: number }, index: number) => {
        const classes = [];
        const labelClasses = [styles.navItemLabel];

        if (index === 0) {
            classes.push(styles.firstDrawerItem);
        }
        if (route === AppRoutes.home) {
            labelClasses.push(styles.home);
        }

        return (
            <View key={key} style={[styles.drawerItem, ...classes, ...this.getNavigationItemClassesFor(route)]}>
                <Text
                    style={labelClasses}
                    onPress={

                        this.navigateToScreen(route)

                    }>{AppRouteTitles[route]}

                </Text>

            </View>
        );
    };


    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.menuHeader}>
                        <Text style={styles.menuHeaderTitle}>Accesa Starter 2k18</Text>
                    </View>
                    {this.routesToDisplay.map((route, index) => this.renderNavigationItem(route, index))}


                    <Image
                        style={sideMenuStyles.gif}
                        source={require('./gif.gif')}
                    />
                </ScrollView>
            </View>
        );
    }
}
