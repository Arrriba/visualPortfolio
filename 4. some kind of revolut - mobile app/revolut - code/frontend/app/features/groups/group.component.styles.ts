import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const groupStyles = StyleSheet.create({
    scroll: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    rest: {
        justifyContent: 'space-between',
        //resizeMode:'contain',
        alignItems: 'center',
        flexDirection: 'column',
        //bottom: 20,
        //top: 20,
        flex: 1,
    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        //resizeMode:'contain',
        alignItems: 'center',
        flexDirection: 'column',
        //bottom: 20,
        //top: 20,
        flexGrow: 1,
    },
    listItem: {
        marginLeft: 0
    },
    listItemLabel: {
        paddingLeft: 18
    },
    image: {
        //flex:1,
        //resizeMode:'contain',
       top: 20,
       //paddingTop:20,
        width: 157,
        height: 150
        //flex:1
    },
    text: {
        fontSize: 40,
        color: '#107f88',
        fontFamily: 'cursive',
        fontWeight: '900',

        top: 40,
        bottom: 40,
        textAlign: 'center',
        padding: 20

    },
    textItem: {
        fontSize: 24,
        color: 'grey',
        fontFamily: 'cursive',
        fontWeight: 'bold',
        //bottom:5,
        paddingBottom: 5,
        textAlign: 'center',
        textShadowColor: '#ffcc00',
        //textDecorationStyle:'dotted',
        //textDecorationLine:'underline'


        //borderBottomColor:'#08b3a0'


    },
    lista: {
        height: 200,
        width: 270,
        //flex:1,
        borderColor: '#08b3a0',
        borderBottomColor: '#08b3a0'
    },
    text1: {
        fontSize: 16,
        color: 'grey',
        //fontFamily:'cursive',
        fontWeight: 'bold',
        top: 10,
        bottom: 10,
        textAlign: 'center',
        flexGrow: 1

    },
    text2: {
        fontSize: 16,
        color: 'grey',
        //fontFamily:'cursive',
        fontWeight: 'bold',
        bottom: 30,
        flexGrow: 1,

        textAlign: 'center'

    },
    text3: {
        fontSize: 16,
        color: 'grey',
        //fontFamily:'cursive',
        fontWeight: 'bold',
        top: 10,

        //bottom:10,

        textAlign: 'center'

    },
    textbox2: {
        width: 270,
        height: 40,
        //top:30,
        textAlign: 'center',
        fontSize: 16,
        flexDirection: 'column',
        borderBottomColor: '#FFDA22',
        //flexGrow:1,
        //padding:10,
        // flex:1,
        //justifyContent:'flex-end'

    },
    textbox3: {
        width: 270,
        height: 40,
        top: 20,
        textAlign: 'center',
        fontSize: 16,
        flexDirection: 'column',
        borderBottomColor: '#FFDA22',


    },
    text6: {
        fontSize: 16,
        color: 'grey',
        //fontFamily:'cursive',
        fontWeight: 'bold',
        top: 30,
        bottom: 10,
        textAlign: 'center',
        flexGrow: 1

    },

    btnShow: {
        //bottom: 20,
        //top:20,
        //width: '90%',
        width: 270,
        //flex:1,
        height: 35,
        // flexGrow:1,
        //flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
        //justifyContent: 'flex-start',
    },
    btnShowMembers: {
        //bottom: 20,
        top: 20,
        width: 270,
        height: 35,
        flexGrow: 1,
        flexDirection: 'column',
        //justifyContent: 'flex-start',
    },

    btnsGroup: {
        width: 270,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flexGrow:1,


    },
    btnsGroup2: {
        top: 20,
        width: 270,
        //flexGrow:1,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnGroupDetails: {
        //bottom: 10,
        //alignSelf:'flex-start',
        //top:20,
        top: 10,
        width: 270,
        height: 35,
        //flexDirection: 'row',
        flexGrow: 1,
        //justifyContent: 'flex-start',
    },

});

export default groupStyles;