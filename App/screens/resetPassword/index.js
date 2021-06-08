/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import TextField from '../../component/TextField';
import Header from '../../component/Header';
import { BLACK, WHITE } from '../../helper/Color';
import { FONT } from '../../helper/Constant';

export default class resetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      confirmPassword: '',
    };
  }
  storeInputData = (text, type) => {
    if (type === 'email') {
      this.setState({email: text});
    }
  };
  handleSubmit = () => {
    this.props.navigation.navigate('PassConfirm');
  };
  render() {
    return (
      <View style={styles.wrapperView}>
         <SafeAreaView>
        <Header
          headerTitle={'Reset Password'}
          navigation={this.props.navigation}
          route={'Signin'}
        />
       
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.textColor}>
            Enter the email address you registered with. We’ll send you an email
            in order to let you choose a new password.
          </Text>
          <TextField
            secure={'no'}
            placeholder={'Your Email Adress'}
            type="email"
            parentCallBack={this.storeInputData}
        
          />
          <ButtonResetPassaword
            btnLabel={'Reset password'}
            data={this.handleSubmit}
          />
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    marginTop:40,
    alignSelf:"center",
    height: 70,
    width: 70,
  },
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  textColor: {
    fontSize:17,
    fontFamily:FONT.Nunito.regular,
    marginTop:40,
    paddingHorizontal:50,
    textAlign: 'center',
    color: BLACK.grey,
  },
});
