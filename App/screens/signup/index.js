/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

import TextField from '../../component/TextField/index';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import Validations from '../../helper/Validations';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
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

  isFormFilled() {
    let checkPassword = Validations.checkPassword(this.state.password);
    let checkEmail = Validations.checkEmail(this.state.email);
    let checkfirstName = Validations.checkUsername(this.state.firstName);
    let checklastName = Validations.checkUsername(this.state.lastName);
    if (checkEmail && checkPassword && checkfirstName && checklastName) {
      return true;
    }
    if (!checkfirstName) {
      alert('firstName required');
    } else if (!checkEmail) {
      alert('invalid email');
    } else if (!checklastName) {
      alert('lastname required');
    } else if (!checkPassword) {
      alert('invalid password');
    }
    return false;
  }

  handleSubmit = () => {
    if (this.isFormFilled()) {
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
          const uid = response.user.uid;

          const data = {
            FirstName: this.state.firstName,
            LastName: this.state.lastName,
            id: uid,
            Id: uid,
            Email: this.state.email,
            type: 'google',
            displayName: this.state.firstName + ' ' + this.state.lastName,
            email_verified: false,
            socialLogin: false,
            verification: response.user,
          };

          this.props.navigation.navigate('BirthDate', {userData: data});
        })
        .catch(error => {
          alert(error);
        });
    } else {
    }
  };

  googleSignInBtn = async () => {
    this.setState({loading: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    auth()
      .signInWithCredential(googleCredential)
      .then(response => {
        const data = {
          Email: response.user._user.email,
          FirstName: response.user._user.displayName,
          LastName: response.user._user.displayName,
          Profile: response.user._user.photoURL,
          id: response.user._user.uid,
          Id: response.user._user.uid,
          type: 'google',
          displayName: response.user._user.displayName,
          email_verified: true,
          socialLogin: true,
        };
        this.props.navigation.navigate('BirthDate', {userData: data});
      })
      .catch(error => {
        this.setState({loading: false});
        alert(error);
      });
  };

  facebookSignIn = async () => {
    this.setState({loading: true});
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    auth()
      .signInWithCredential(facebookCredential)
      .then(response => {
        console.log('responseFb', JSON.stringify(response));
        this.props.navigation.navigate('BirthDate', {userData: response});
      })
      .catch(error => {
        this.setState({loading: false});
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <View style={styles.flex}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')}
                />
                <Text style={styles.titleText}>ing Up</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '5%',
                }}>
                <View style={{marginRight: 6}}>
                  <TextField
                    placeholder="First Name"
                    type={'firstName'}
                    typeSize="small"
                    parentCallBack={this.storeInputData}
                  />
                </View>
                <View style={{marginLeft: 6}}>
                  <TextField
                    placeholder="Last Name"
                    type={'lastName'}
                    typeSize="small"
                    parentCallBack={this.storeInputData}
                  />
                </View>
              </View>
              <TextField
                placeholder="Email adress"
                type={'email'}
                parentCallBack={this.storeInputData}
              />
              <TextField
                placeholder="Password"
                type={'password'}
                parentCallBack={this.storeInputData}
              />
              <TextField
                placeholder="ConfirmPassword"
                type={'confirmPassword'}
                parentCallBack={this.storeInputData}
              />
              <ButtonResetPassaword
                btnLabel={'SIGN UP'}
                data={this.handleSubmit}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signin')}
                style={{marginTop: 26, flexDirection: 'row'}}>
                <Text style={styles.subtitletext}>
                  Already have an account?
                </Text>
                <Text style={[styles.subtitletext, {color: '#F818D9'}]}>
                  {' '}
                  Log in
                </Text>
              </TouchableOpacity>
              <Text style={[styles.subtitletextbold, {marginTop: 10}]}>
                Other sign up options
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
                <TouchableOpacity onPress={() => this.facebookSignIn()}>
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
                <TouchableOpacity onPress={() => this.googleSignInBtn()}>
                  <Text style={styles.btnText}>Continue with Google</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: 25}}>
                <Text style={{fontSize: 12}}>
                  By signing up, you agree to Slizzr’s{' '}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.text, {fontSize: 12}]} onPress={() =>  Linking.openURL('https://slizzrapp.com/#terms-of-service')}>
                    Terms of Service
                  </Text>
                  <Text style={{fontSize: 12}}> and </Text>
                  <Text style={[styles.text, {fontSize: 12}]} onPress={() =>  Linking.openURL('https://slizzrapp.com/#privacy-and-cookie-policy')}>
                    Privacy Policy.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    height: 65,
    width: 65,
    resizeMode: 'contain',
    marginTop: 25,

    alignSelf: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    color: '#F818D9',
    fontFamily: FONT.Nunito.regular,
  },
  textPurple: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  },
  titleText: {
    marginTop: 26,

    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 28,
    alignSelf: 'flex-end',
  },
  subtitletext: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.regular,
    fontSize: 15,
  },
  subtitletextbold: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
  },
  detailWrapper: {
    alignSelf: 'center',
  },
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
  //     btnText: {
  //       fontSize: 16,
  //       alignSelf: 'center',
  //       fontFamily: FONT.Nunito.medium,
  //       fontSize: 14,
  //       color: BLACK.textInputTitle,
  //
  //     },
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
  btnText: {
    textAlignVertical: 'center',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: FONT.Nunito.bold,
    color: '#f1f1f2',
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
