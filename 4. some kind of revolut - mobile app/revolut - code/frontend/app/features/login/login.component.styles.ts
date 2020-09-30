import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const loginStyles = StyleSheet.create({
    image: {
        resizeMode: 'repeat',
    },
    lazytownimage: {
        width: '140%',
        flex: 1,
        height: '140%',
        justifyContent: 'flex-start',
        resizeMode: 'contain',
        bottom: 30,
        marginLeft: 7,
    },
    imageB: {
        width: '100%',
        height: '100%',

    },
    error: {
        backgroundColor: '#FFD6E3',
     
    },
    textbox: {
        top: 250,
        width: 270,
        height: 40,
        textAlign: 'center',
        fontSize: 16,
        flexDirection: 'column',
        alignContent: 'center',
        borderBottomColor: '#FFDA22',

    },
    text:{
        fontSize:30,
        color:'grey',
        fontFamily:'cursive',
        fontWeight:'bold',
        top:20,
        bottom:20,
        textAlign:'center'

},

    textbox2: {
        width: 270,
        height: 40,
        textAlign: 'center',
        fontSize: 16,
        flexDirection: 'column',
        borderBottomColor: '#FFDA22',


    },
    textContainer: {
        width: 200,
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },

    btn: {
        top:20,
        bottom: 20,
        width: 270,
        height: 35,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    btnContainer: {
        top:20,
        flex: 1,
        width: 270,
        height: 50,
        flexDirection: 'column',
        alignItems: 'flex-start',
        bottom: 0,
        justifyContent: 'flex-start',
    },

    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
    }
});

export default loginStyles;