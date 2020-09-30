import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const changeStyles = StyleSheet.create({
    
    imageB: {
        width: 200,
        height: 200,

    },
    
  
    text:{
        fontSize:30,
        color:'grey',
        fontFamily:'cursive',
        fontWeight:'bold',
        top:20,
        bottom:20,
        textAlign:'center',
        paddingTop:20,

},

  
    textContainer: {
        width: 200,
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },

    btnShow: {
       
        width: 270,
        height: 35,
        flexDirection: 'column',
        paddingTop:30,
        //justifyContent: 'flex-start'
    },

    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor:'white',
        flex: 1,
    }
});

export default changeStyles;