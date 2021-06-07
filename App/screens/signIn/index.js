/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import TextField from '../../component/TextField/index';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT} from '../../helper/Constant';
import ButtonResetPassaword from '../../component/ButtonResetPassword';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }
  storeInputData = (text, type) => {
    if (type === 'firstName') {
      this.setState({firstName: text});
    } else if (type === 'lastName') {
      this.setState({lastName: text});
    } else if (type === 'email') {
      this.setState({email: text});
    } else if (type === 'password') {
      this.setState({password: text});
    } else if (type === 'confirmPassword') {
      this.setState({confirmPassword: text});
    }
  };
  handleSubmit = () => {
    this.props.navigation.navigate('HomeStack');
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <View style={styles.topView}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')}
                />
                <Text style={styles.titleText}>WELCOME BACK!</Text>
              </View>

              <TextField placeholder="Email adress" />
              <TextField placeholder="Password" />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ResetPass')}>
                <Text style={[styles.textPurple, {marginTop: 10}]}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              <ButtonResetPassaword
                btnLabel={'LOG IN'}
                data={this.handleSubmit}
              />
              <Text style={styles.subtitleTextBold}>
                Other login up options
              </Text>

              <View style={styles.btnFaceBook}>
                <View
                  style={{
                    position: 'absolute',
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 44,
                    backgroundColor: 'white',
                    left: 30,
                  }}>
                  <Image source={require('../../assets/facebook.png')} />
                </View>
                <TouchableOpacity>
                  <Text style={styles.btnText}>Continue with Facebook</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.btnGoogle}>
                <View
                  style={{
                    position: 'absolute',
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 44,
                    backgroundColor: 'white',
                    left: 30,
                  }}>
                  <Image source={require('../../assets/google.png')} />
                </View>
                <TouchableOpacity>
                  <Text style={styles.btnText}>Continue with Google</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}
                style={{marginTop: 25, flexDirection: 'row'}}>
                <Text style={styles.subtitleText}>Don’t have an account? </Text>
                <Text style={styles.textPurple}>Sign up.</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topView: {
    // height:hp('35%'),
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
  },
  subtitleText: {
    fontFamily: FONT.Nunito.regular,
  },
  btnContainer: {
    width: '100%',
    borderRadius: 25,
    height: 55,
    justifyContent: 'center',
    backgroundColor: 'grey',
    marginBottom: '2%',
    marginTop: '2%',
  },
  btnText: {
    textAlignVertical: 'center',
    fontSize: 16,
    textAlign: 'center',
    // paddingTop:'5%',
    fontFamily: FONT.Nunito.bold,
    color: '#f1f1f2',
  },
  subtitleTextBold: {
    marginVertical: 10,
    fontFamily: FONT.Nunito.bold,
  },

  logo: {
    height: 64,
    width: 64,
    resizeMode: 'contain',
    marginTop: 26,

    alignSelf: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    color: '#F818D9',
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  },
  textPurple: {
    color: '#F818D9',
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  },
  titleText: {
    marginTop: 13,
    marginBottom: '3%',
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 24,
    alignSelf: 'flex-end',
  },
  subtitletext: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.semiBold,
    fontSize: 16,
  },
  detailWrapper: {
    alignSelf: 'center',
  },
  wrapperView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE.dark,
  },

  policyText: {
    alignSelf: 'center',
    marginTop: '2%',
    color: BLACK.appDark,
    fontFamily: FONT.Nunito.regular,
  },
  btnFaceBook: {
    backgroundColor: '#3664A2',
    width: '100%',
    borderRadius: 25,
    height: 55,
    justifyContent: 'center',
    marginTop: 10,
  },
  btnGoogle: {
    backgroundColor: '#FF3B30',
    width: '100%',
    borderRadius: 25,
    height: 55,
    justifyContent: 'center',
    marginTop: 19,
  },
  //     absoluteLeftIcon: {
  //       position: 'absolute',
  //       left: 10,
  //     },
  //     flex: {
  //       flexDirection: 'row'
  //     },
  //     alreadyHaveAccount: {
  //       fontSize: 14,
  //       fontFamily: FONT.Nunito.regular,
  //       color: BLACK.textInputTitle,
  //       alignSelf: 'center',
  //       marginTop: 19,
  //     }
});
