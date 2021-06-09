/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import TextField from '../../component/TextField';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT} from '../../helper/Constant';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';

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
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            backColor={WHITE.dark}
            headerTitle={'Notification'}
            leftPress={() => this.props.navigation.openDrawer()}
            leftIcon={require('../../assets/drawer.png')}
          />
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
            <Text
              style={{
                fontFamily: FONT.Nunito.regular,
                fontSize: 17,
                color: BLACK.grey,
                marginTop: 40,
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
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    marginTop: 40,

    height: 70,
    width: 70,
  },
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
