import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const whoStyles = StyleSheet.create({
    container: {
        //width: Dimensions.get('window').width,
        //height: Dimensions.get('window').height,
        backgroundColor:'white',
        justifyContent: 'center',
        //resizeMode:'contain',
        alignItems: 'center',
        flexDirection: 'column',
        //bottom: 20,
        //top: 20,
       // flexGrow:1,
       flex:1
    },
    error: {
        backgroundColor: '#FFD6E3',
     
    },
    text:{
        paddingTop:80,
        fontSize:40,
        color:'#08b3a0',
        fontFamily:'cursive',
        fontWeight:'900',
        //top:20,
       //bottom:40,
       //padding:10,
        textAlign:'center',

},
text2:{
    fontSize:40,
    color:'grey',
    paddingBottom:20,
    paddingTop:100,
    fontFamily:'cursive',
    fontWeight:'900',
    //top:20,
   //bottom:40,
   //padding:10,
    textAlign:'center',

},
listItem:{
   // borderColor:'#08b3a0',
    //borderBottomWidth:1,
    //borderTopWidth:1
},
    textItem:{
        fontSize:20,
        color:'grey',
        fontFamily:'cursive',
        fontWeight:'bold',
        //bottom:5,
        paddingBottom:5,
        textShadowColor:'#ffcc00',
        textAlign:'center'
        

        },
        image: {
            //flex:1,
            //resizeMode:'contain',
           top: 20,
           //paddingTop:20,
            width: 157,
            height: 150,
            paddingBottom:30
            //flex:1

        },
        containerRest:{
            flex:1,
            justifyContent:'center',
            paddingBottom:50,
            width:270,
            alignContent:'center',
        },
        lista:{
            //paddingTop:20,
            //top:30,
            flexGrow:1,
            borderColor:'#08b3a0',
            borderBottomColor:'#08b3a0',
            alignItems:'center',
            paddingBottom:30,
            justifyContent:'center'
        },

        containerTitlu:{
            flex:1,

            justifyContent:'center'
        },
        textbox2: {
            width: 270,
            height: 60,
            textAlign: 'center',
            fontSize: 16,
            borderBottomColor: '#FFDA22',
          
        },
        btnCreate: {
  
            width:270,
            height: 35,
            flexDirection: 'column',
        },

});

export default whoStyles;