import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import TextField from '../../component/TextField';
import Header from '../../component/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';
export default class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  handleSubmit = () => {
    this.props.navigation.navigate('passConfirm');
  };
  componentDidMount(){
    // setTimeout(() => {
    //     this.props.navigation.navigate('Signin');
    //   }, 3000);
  }
  render() {
    return (
      <View style={styles.wrapperView}>
    
           <Text style={styles.titleColor}>
           Confirm your email address  
          </Text>
          <Text style={styles.textColor}>
          We sent a confirmation email to:
          </Text>
          <Text style={styles.subtitletextbold}>
          email@email.com
          </Text>
          <Text style={styles.textColor}>
          Check your email and click on the confirmation link to continue,
          </Text>
          <Text style={styles.textPurple}>
          Resend email
          </Text>
        
     
      </View> 
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 70,
  },
  wrapperView: {
    height:hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F2F2F2'
  },
  textColor:{
      fontSize:16,
      margin: '2%', textAlign: 'center',
      color:'#494949'
  },
  titleColor:{
    fontSize:26,
    margin: '2%', textAlign: 'center',
    color:'#494949',
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 24,
},
 text:{
    color:'#F818D9',
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  
  },
  textPurple:{
    color: '#F818D9',
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
    marginVertical:30
  
  },
  titleText: {
    marginTop: 13,
    marginBottom: '5%',
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 24,
    textAlign:'center',
   
  },  
  subtitletext:{
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.semiBold,
    fontSize: 16,
  },
  subtitletextbold:{
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    marginVertical:10
  },
});
