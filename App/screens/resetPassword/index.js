import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

import ButtonResetPassaword from '../../component/ButtonResetPassword';
import TextField from '../../component/TextField';
import Header from '../../component/Header';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT} from '../../helper/Constant';
import Validations from '../../helper/Validations';
import {Alert} from 'react-native';

export default class resetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      confirmPassword: '',
      loading: false,
    };
  }
  storeInputData = (text, type) => {
    if (type === 'email') {
      this.setState({email: text});
    }
  };

  handleSubmit = () => {
    if (Validations.checkEmail(this.state.email)) {
      this.setState({loading: true});
      auth().sendPasswordResetEmail(this.state.email);
      this.setState({loading: false});
      Alert.alert(
        'Email Sent',
        'Please check your email ' +
          this.state.email +
          ' reset the password and sign in again',
        [
          {
            text: 'Ok',
            onPress: () => {
              this.props.navigation.navigate('Signin');
            },
          },
        ],
      );
    } else {
      this.setState({loading: false});
      Alert.alert('Email Not valid', 'Please provide us valuid email ');
    }
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
            validate={Validations.checkEmail(this.state.email)}
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
    marginTop: 40,
    alignSelf: 'center',
    height: 70,
    width: 70,
  },
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  textColor: {
    fontSize: 17,
    fontFamily: FONT.Nunito.regular,
    marginTop: 40,
    paddingHorizontal: 50,
    textAlign: 'center',
    color: BLACK.grey,
  },
});
