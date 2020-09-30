import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const homeStyles = StyleSheet.create({
    inlineText: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        bottom: 20,

    },
    logged: {
        top: 20,
        color: '#273C42',
        fontSize: 20,
        bottom: 0,
        fontFamily: 'cursive',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    imageB: {
        width: '100%',
        height: '100%',

    },
    image: {

        resizeMode: 'contain',
        width: '60%',
        height: '30%',
        top: 30,
        bottom: 50,

    },
    btn: {
        width: 100,

    },
    btnContainer: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'stretch',
        height: 10,
        width: '70%',
        bottom: 100,
        alignSelf: 'center',
    },
    welcome: {
        top: 50,
        color: '#0099BB',
        fontSize: 60,
        fontFamily: 'cursive',
        fontWeight: '900',
        bottom: 20,
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    youth: {
        top: 50,
        flex: 1,
        justifyContent: 'flex-start',
        color: '#273C42',
        fontSize: 40,
        fontWeight: '900',
        bottom: 100,

    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        justifyContent: 'flex-start',

        alignItems: 'center',
        flexDirection: 'column',
        bottom: 20,
        top: 0,
        flex: 1,
    }

});

export default homeStyles;