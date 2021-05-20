import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import TextField from '../../component/TextField';
import Header from '../../component/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';
export default class BirthDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  handleSubmit = () => {
    this.props.navigation.navigate('ConfirmEmail');
  };
  render() {
    return (
      <View style={styles.wrapperView}>
    
           <Text style={styles.titleText}>
           How old are you?
          </Text>
          <TextField
          secure={"no"}
            placeholder={'Birth Date'}
            type="email"
            parentCallBack={this.storeInputData}
          />
          <ButtonResetPassaword
            btnLabel={'Continue'}
            data={this.handleSubmit}
          />
     
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
      margin: '15%', textAlign: 'center',
      color:'#8e8e93'
  },
  text:{
    color:'#F818D9',
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  
  },
  textPurple:{
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  
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
  },
});
