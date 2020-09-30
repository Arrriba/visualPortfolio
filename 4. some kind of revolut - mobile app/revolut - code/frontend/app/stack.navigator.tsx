import { Icon } from "native-base";
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { AppRoutes, AppRouteTitles } from './app.routes';
import HomeComponent from './features/home/home.component';
import LoginComponent from './features/login/login.component';
import NflCrimesComponent from './features/nfl-crimes/nfl-crimes.component';
import RegisterComponent from './features/register/register.component';
import TopUpComponent from './features/top-up/top-up.component';
import TransferComponent from './features/transfer/transfer.component';
import FriendsComponent from './features/friends/friends.component';
import GroupsComponent from './features/groups/groups.component';
import GroupComponent from './features/groups/group.component';
import PayComponent from './features/pay/pay.component';
import ChangeComponent from './features/change/change.component';
import WhoComponent from './features/who/who.component';

const styles = StyleSheet.create({
    menuIcon: {
        marginLeft: 10
    }
});

const renderNavigationOptionFor = (route: keyof typeof AppRoutes, navigation: any) => ({
    title: AppRouteTitles[route] ,
    headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIcon}>
            <Icon name="menu"/>
        </TouchableOpacity>
    )
});

export const stackNavigator = StackNavigator({
    groups:{
        screen: GroupsComponent,
    },
    group:{
        screen: GroupComponent,
    },
    who:{
        screen: WhoComponent,
    },
    [AppRoutes.home]: {
        screen: HomeComponent,
        navigationOptions: ({ navigation }: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.home, navigation)
    },
    [AppRoutes.login]: {
        screen: LoginComponent,
        navigationOptions: ({ navigation }: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.login, navigation)
    },
    [AppRoutes.friends]: {
        screen: FriendsComponent,
        navigationOptions: ({ navigation }: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.friends, navigation)
    },
    [AppRoutes.register]: {
        screen: RegisterComponent,
        navigationOptions: ({ navigation }: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.register, navigation)
    },
    [AppRoutes.top_up]: {
        screen: TopUpComponent,
        navigationOptions: ({ navigation }: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.top_up, navigation)
    },
    [AppRoutes.transfer]: {
        screen: TransferComponent,
        navigationOptions: ({ navigation }: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.transfer, navigation)
    },
    [AppRoutes.pay]: {
        screen: PayComponent,
        navigationOptions: ({ navigation }: { navigation: any }) =>
       renderNavigationOptionFor(AppRoutes.pay, navigation)

    },
    [AppRoutes.change]: {
        screen: ChangeComponent,
        navigationOptions: ({ navigation }: { navigation: any }) =>
       renderNavigationOptionFor(AppRoutes.change, navigation)

    },
    /*
    [AppRoutes.nfl_crimes]: {
        screen: NflCrimesComponent,
        navigationOptions: ({ navigation }: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.nfl_crimes, navigation)
    }*/
}, {
    //modulul se poate schimba ca sa se deschida direct unde e nevoie
    //initialRouteName:"groups"
    initialRouteName: AppRoutes.home

});