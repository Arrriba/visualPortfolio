import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const topStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  error: {
    backgroundColor: '#FFD6E3',

  },
  image: {
    top:1,
    flex: 2,
    height: 10,
    width: 10,
    marginRight: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    top: 100,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: 270,
  },
  textInput:{
    fontSize:16,
    textAlign:'center',
    bottom:10,
  },
  alternativeTextLayout: {
    flex: 1,
    top: 50,
    width: 270,
    bottom:10,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
});

export default topStyles;