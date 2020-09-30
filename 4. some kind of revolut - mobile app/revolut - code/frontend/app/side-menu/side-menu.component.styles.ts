import { StyleSheet } from 'react-native';
import { Header } from 'react-navigation';

const sideMenuStyles = StyleSheet.create({
    activeMenuItem: {
        backgroundColor: 'lightblue'
    },
    buton: {
        flex:1,
        
    },
    container: {
        flex: 1
    },
    drawerItem: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'lightgray',
        padding: 0
    },
    firstDrawerItem: {
        borderTopWidth: 1
    },
    menuHeader: {
        height: Header.HEIGHT,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    menuHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0099BB'
    },
    navItemLabel: {
        padding: 10
    },
    gif:{
        paddingTop:100,
        width:300,
        height:400,
    },
    home: {
        color: '#0099BB'
    }
});

export default sideMenuStyles;