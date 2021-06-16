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
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {connect} from 'react-redux';

import TextField from '../../component/TextField/index';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT} from '../../helper/Constant';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import Validations from '../../helper/Validations';
import * as userActions from '../../redux/actions/user';

class SignIn extends Component {
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

  componentDidMount() {
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

    if (checkEmail && checkPassword) {
      return true;
    }
    if (!checkEmail) {
      alert('invalid email');
    } else if (!checkPassword) {
      alert('invalid password');
    }
    return false;
  }

  handleSubmit = () => {
    if (this.isFormFilled()) {
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
          const uid = response.user.uid;
          console.log(response);
          const usersRef = firestore().collection('users');
          usersRef
            .doc(uid)
            .get()
            .then(async firestoreDocument => {
              if (!firestoreDocument.exists) {
                alert('User does not exist.');
                return;
              }
              console.log(firestoreDocument);
              const user = firestoreDocument._data;
              console.log(user);
              this.props.callApi(user, uid);
              this.props.navigation.navigate('HomeStack');
            })
            .catch(error => {
              alert(error);
            });
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  firestoreLinking = data => {
    const usersRef = firestore().collection('users');
    usersRef
      .doc(data.id)
      .set(data)
      .then(this.props.navigation.navigate('HomeStack'))
      .catch(error => {
        this.setState({loading: false});
        alert(error);
      });
  };

  googleSignInBtn = async () => {
    // this.setState({loading: true});
    // const {idToken} = await GoogleSignin.signIn();
    // const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    // auth()
    //   .signInWithCredential(googleCredential)
    //   .then(response => {
    //     const data = {
    //       Email: response.user._user.email,
    //       FirstName: response.user._user.displayName,
    //       LastName: response.user._user.displayName,
    //       Profile: response.user._user.photoURL,
    //       id: response.user._user.uid,
    //       Id: response.user._user.uid,
    //       type: 'google',
    //       displayName: response.user._user.displayName,
    //       email_verified: true,
    //       socialLogin: true,
    //     };
    //     this.firestoreLinking(data);
    //   })
    //   .catch(error => {
    //     this.setState({loading: false});
    //     alert(error);
    //   });
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
      })
      .catch(error => {
        this.setState({loading: false});
        alert(error);
      });
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

              <TouchableOpacity
                style={styles.btnFaceBook}
                activeOpacit={1}
                onPress={() => this.facebookSignIn()}>
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
                <View>
                  <Text style={styles.btnText}>Continue with Facebook</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnGoogle}
                activeOpacity={1}
                onPress={() => this.googleSignInBtn()}>
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
                <View>
                  <Text style={styles.btnText}>Continue with Google</Text>
                </View>
              </TouchableOpacity>

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
    fontFamily: FONT.Nunito.semiBold,
    fontSize:15
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
    fontFamily: FONT.Nunito.extraBold,
    fontSize:14
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
    textDecorationLine:'underline'
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

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, uid) => dispatch(userActions.setUser({user, uid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
