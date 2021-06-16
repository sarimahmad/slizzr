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
      <SafeAreaView style={styles.contentView}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
         
           <Text style={styles.titleColor}>
           Confirm your email address  
          </Text>
          <Text style={[styles.textColor,{marginTop:22,fontSize:20}]}>
          We sent a confirmation email to:
          </Text>
          <Text style={styles.subtitletextbold}>
          email@email.com
          </Text>
          <Text style={[styles.textColor,{marginTop:26, paddingHorizontal:50}]}>
          Check your email and click on the confirmation link to continue,
          </Text>
          <Text style={styles.textPurple}>
          Resend email
          </Text>
        
     </SafeAreaView>
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
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
 textColor:{
      fontSize:16,
      textAlign: 'center',
      color:BLACK.grey,
      fontFamily:FONT.Nunito.regular
  },
  titleColor:{
    fontSize:26,
    marginTop: 26, textAlign: 'center',
    color:BLACK.grey,
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 28,
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
    marginVertical:30,
    textDecorationLine:'underline'  
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
    color: BLACK.grey,
    fontFamily: FONT.Nunito.bold,
    fontSize: 20,
    marginTop:26
  },
});
