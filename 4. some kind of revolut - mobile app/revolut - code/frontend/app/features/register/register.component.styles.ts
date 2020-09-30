import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const registerStyles = StyleSheet.create({

    image: {
        width: '100%',
        height: '100%',
    },
    error: {
        backgroundColor: '#FFD6E3',
    },
    input: {
        justifyContent: 'center',
        flexDirection: 'column',
        width: 250,
        textAlign: 'center',
        fontSize: 16,
        backgroundColor: 'white',
        height: 40,
        flexWrap: 'wrap',
    },
    textboxes: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        top: 10,
    },
    btn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 40,
        width: 250,
        top:60,
        bottom: 40
    },

    container: {
        top: 20,
        justifyContent: 'center',
        bottom: 50,
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1
    }

});

export default registerStyles;