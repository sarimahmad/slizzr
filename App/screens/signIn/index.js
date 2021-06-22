/* eslint-disable radix */
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
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TextField from '../../component/TextField/index';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT} from '../../helper/Constant';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import Validations from '../../helper/Validations';
import * as userActions from '../../redux/actions/user';
import Loader from '../../component/Loader';

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
    GoogleSignin.configure({
      iosClientId:
        '473629197290-h6orl8ujajl2r6a2075bhu1bs8dt5900.apps.googleusercontent.com',
      webClientId:
        '473629197290-3374lal9f0nk1cjcec4u41nns049jcfo.apps.googleusercontent.com',
    });
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

  isFormFilledCheck() {
    let checkPassword = Validations.checkPassword(this.state.password);
    let checkEmail = Validations.checkEmail(this.state.email);

    if (checkEmail && checkPassword) {
      return true;
    }
    if (!checkEmail) {
    } else if (!checkPassword) {
    }
    return false;
  }

  handleSubmit = () => {
    if (this.isFormFilled()) {
      this.setState({loading: true});
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
          const uid = response.user.uid;
          const usersRef = firestore().collection('users');
          usersRef
            .doc(uid)
            .get()
            .then(firestoreDocument => {
              this.props.callApi(firestoreDocument.data(), uid);
              this.setState({loading: false});
              this.checkTheUserCheck(
                firestoreDocument.data(),
                response.user.emailVerified,
              );
            })
            .catch(error => {
              this.setState({loading: false});
              Alert.alert('Internet Issue', 'Please check your internet');
            });
        })
        .catch(error => {
          this.setState({loading: false});
          if (error.code === 'auth/wrong-password') {
            Alert.alert('Password wrong', 'Please check your password');
          } else {
            Alert.alert('User Not Exist');
          }
        });
    }
    this.setState({loading: true});
  };

  firestoreLinking = data => {
    this.setState({loading: true});
    const usersRef = firestore().collection('users');
    usersRef
      .doc(data.id)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          usersRef
            .doc(data.id)
            .set(data)
            .then(firestoreDocuments => {
              this.props.callApi(firestoreDocuments.data(), data.id);
              this.setState({loading: false});
              this.checkTheUserCheck(firestoreDocuments.data());
            })
            .catch(error => {
              this.setState({loading: false});
              alert(error);
            });
          return;
        } else {
          if (
            firestoreDocument.data().age &&
            parseInt(firestoreDocument.data().age) > 16
          ) {
            this.props.callApi(firestoreDocument.data(), data.id);
            this.props.navigation.push('HomeStack');
          } else {
            this.props.callApi(firestoreDocument.data(), data.id);
            this.props.navigation.push('BirthDateSplash', {from: 'splash'});
          }
          this.setState({loading: false});
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  checkTheUserCheck(userParsed, verifiedEmail) {
    if (userParsed.email_verified === true) {
      if (userParsed.age && parseInt(userParsed.age) > 16) {
        this.props.navigation.navigate('HomeStack');
      } else {
        this.props.navigation.navigate('BirthDate', {from: 'SignIn'});
      }
    } else if (verifiedEmail === true) {
      const usersRef = firestore().collection('users');
      usersRef
        .doc(userParsed.id)
        .update({email_verified: true})
        .then(() => {
          usersRef
            .doc(userParsed.id)
            .get()
            .then(firestoreDocument => {
              this.props.callApi(firestoreDocument.data(), userParsed.id);
              this.setState({loading: false});
              this.props.navigation.navigate('BirthDate', {
                from: 'signIn',
              });
            });
        })
        .catch(error => {
          this.setState({loading: false});
          Alert.alert('User error', error);
        });
      if (userParsed.age && parseInt(userParsed.age) > 16) {
        this.props.navigation.navigate('HomeStack');
      } else {
        this.props.navigation.navigate('BirthDate', {from: 'SignIn'});
      }
    } else {
      Alert.alert(
        'Email not Verified',
        'Please verify your email ' + userParsed.email + ' and sign in again',
        [
          {
            text: 'Ok',
            onPress: () => {
              AsyncStorage.clear();
            },
          },
        ],
      );
    }
  }

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
          age: 14,
          STRIPE_CUST_ID: '',
          STRIPE_HOST_ID: '',
        };
        this.firestoreLinking(data);
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
          <ScrollView bounces={false}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.topView}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')}
                />
                <Text style={styles.titleText}>Welcome Back!</Text>
              </View>

              <TextField
                placeholder="Email address"
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
                validate={this.isFormFilledCheck()}
                btnLabel={'LOG IN'}
                data={
                  this.isFormFilledCheck()
                    ? this.handleSubmit
                    : console.log('ok')
                }
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
        {this.state.loading && <Loader loading={this.state.loading} />}
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
    fontSize: 15,
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
    fontSize: 14,
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
    textDecorationLine: 'underline',
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
