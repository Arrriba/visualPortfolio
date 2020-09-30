import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const transferStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  error: {
    backgroundColor: '#FFD6E3',
  },
  image: {
    flex: 1,
    margin: 40,
    top: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 20,
    top: 1,
  },
  text:{
    fontSize:16,
  },
  alternativeTextLayout: {
    margin: 20,
    flex:1,
    alignContent:'center',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default transferStyles;