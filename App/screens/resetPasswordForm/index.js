/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import TextField from '../../component/TextField';
import Header from '../../component/Header';

export default class forgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
    };
  }
  storeInputData = (text, type) => {
    if (type === 'newPassword') {
      this.setState({newPassword: text});
    } else if (type === 'confirmPassword') {
      this.setState({confirmPassword: text});
    }
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <Header
          headerTitle={'Reset Password'}
          navigation={this.props.navigation}
          route={'ResetPass'}
        />
        <SafeAreaView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10%',
          }}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <Text
            style={{
              marginTop: '10%',
              marginBottom: '10%',
              color: '#8e8e93',
              fontFamily: 'Nunito',
            }}>
            Select a new password.
          </Text>
          <TextField
            secure={'yes'}
            placeholder={'New Password'}
            type="newPassword"
            parentCallBack={this.storeInputData}
          />
          <TextField
            secure={'yes'}
            placeholder={'Confirm Password'}
            type="confirmPassword"
            parentCallBack={this.storeInputData}
          />
          <ButtonResetPassaword btnLabel={'Reset password'} />
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
    backgroundColor: '#F2F2F2',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
