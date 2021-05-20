import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import TextField from '../../component/TextField';
import Header from '../../component/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    
           <Text style={styles.textColor}>
            Enter the email address you registered with. We’ll send you an email
            in order to let you choose a new password.
          </Text>
          <TextField
          secure={"no"}
            placeholder={'Your Email Adress'}
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
  }
});
