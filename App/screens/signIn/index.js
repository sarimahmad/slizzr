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
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {connect} from 'react-redux';

import TextField from '../../component/TextField/index';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT} from '../../helper/Constant';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import Validations from '../../helper/Validations';
import * as userActions from '../../redux/actions/user';
import Loader from '../../component/Loader';
import ErrorPopup from '../../component/ErrorPopup';
import PushNotification, {Importance} from 'react-native-push-notification';
import NotifService from '../../helper/NotifService';
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
      popUpError: false,
      btnOneText: '',
      errorTitle: '',
      errorText: '',
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
      this.setState({
        loading: false,
        btnOneText: 'Ok',
        errorTitle: 'EMAIL INVALID',
        errorText: 'Please input the valid data in Email',
        popUpError: true,
      });
    } else if (!checkPassword) {
      this.setState({
        loading: false,
        btnOneText: 'Ok',
        errorTitle: 'PASSWORD INVALID',
        errorText: 'Please input the valid data in Password',
        popUpError: true,
      });
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
              this.setState({
                loading: false,
                btnOneText: 'Ok',
                errorTitle: 'ERROR',
                errorText: JSON.stringify(error),
                popUpError: true,
              });
            });
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            this.setState({
              loading: false,
              btnOneText: 'Ok',
              errorTitle: 'WRONG PASSWORD',
              errorText: 'Please check your password again.',
              popUpError: true,
            });
          } else {
            this.setState({
              loading: false,
              btnOneText: 'Ok',
              errorTitle: 'NOT FOUND',
              errorText: 'User not found Please sign Up first',
              popUpError: true,
            });
          }
        });
    }
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
              this.getUserFromFirestore(data.id);
            })
            .catch(error => {
              this.setState({
                loading: false,
                btnOneText: 'Ok',
                errorTitle: 'ERROR',
                errorText: JSON.stringify(error),
                popUpError: true,
              });
            });
          return;
        } else {
          if (
            firestoreDocument.data().age &&
            parseInt(firestoreDocument.data().age) > 16
          ) {
            this.props.callApi(firestoreDocument.data(), data.id);
            this.setState({loading: false});
            this.props.navigation.push('HomeStack', {from: 'signin'});
          } else {
            this.props.callApi(firestoreDocument.data(), data.id);
            this.setState({loading: false});
            this.props.navigation.push('BirthDateSplash', {from: 'splash'});
          }
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          btnOneText: 'Ok',
          errorTitle: 'ERROR',
          errorText: JSON.stringify(error),
          popUpError: true,
        });
      });
  };

  getUserFromFirestore = id => {
    this.setState({loading: true});
    const usersRef = firestore().collection('users');
    usersRef
      .doc(id)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          return;
        } else {
          if (
            firestoreDocument.data().age &&
            parseInt(firestoreDocument.data().age) > 16
          ) {
            this.props.callApi(firestoreDocument.data(), id);
            this.setState({loading: false});
            this.props.navigation.push('HomeStack', {from: 'signin'});
          } else {
            this.props.callApi(firestoreDocument.data(), id);
            this.setState({loading: false});
            this.props.navigation.push('BirthDateSplash', {from: 'splash'});
          }
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          btnOneText: 'Ok',
          errorTitle: 'ERROR',
          errorText: JSON.stringify(error),
          popUpError: true,
        });
      });
  };

  checkTheUserCheck(userParsed, verifiedEmail) {
    if (userParsed.email_verified === true) {
      if (userParsed.age && parseInt(userParsed.age) > 16) {
        this.props.navigation.navigate('HomeStack', {from: 'signin'});
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
              this.props.navigation.navigate('BirthDate', {from: 'signIn'});
            });
        })
        .catch(error => {
          this.setState({loading: false});
          Alert.alert('User error', error);
        });
      if (userParsed.age && parseInt(userParsed.age) > 16) {
        this.props.navigation.navigate('HomeStack', {from: 'signin'});
      } else {
        this.props.navigation.navigate('BirthDate', {from: 'SignIn'});
      }
    } else {
      this.props.navigation.navigate('ConfirmEmail', {
        from: 'birth',
        user: userParsed,
      });

      // Alert.alert(
      //   'Email not Verified',
      //   'Please verify your email ' + userParsed.email + ' and sign in again',
      //   [
      //     {
      //       text: 'Ok',
      //       onPress: () => {
      //     this.props.navigation.navigate()
      //       },
      //     },
      //   ],
      // );
    }
  }

  googleSignInBtn = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    this.setState({loading: true});
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
          age: '13',
          Address: {
            city: '',
            line1: '',
            postal_code: '',
            state: '',
            country: '',
          },
          BirthDate: {
            day: 0,
            month: 0,
            year: 0,
          },
          Visibility: true,
          Radius: 50,
          Gender: '',
          PushNotification: true,
          bio: '',
          Location: {
            latitude: 0,
            longitude: 0,
          },
        };

        this.firestoreLinking(data);
      })
      .catch(error => {
        this.setState({
          loading: false,
          btnOneText: 'Ok',
          errorTitle: 'ERROR',
          errorText: JSON.stringify(error),
          popUpError: true,
        });
      });
  };

  facebookSignIn = async () => {
   
  
       // const result = await LoginManager.logInWithPermissions([
    //   'public_profile',
    //   'email',
    // ]);
    // if (result.isCancelled) {
    //   throw 'User cancelled the login process';
    // }

    // // Once signed in, get the users AccesToken
    // const data = await AccessToken.getCurrentAccessToken();

    // if (!data) {
    //   throw 'Something went wrong obtaining access token';
    // }

    // // Create a Firebase credential with the AccessToken
    // const facebookCredential = auth.FacebookAuthProvider.credential(
    //   data.accessToken,
    // );
    // this.setState({loading: true});
    // auth()
    //   .signInWithCredential(facebookCredential)
    //   .then(response => {
    //     console.log('responseFb', JSON.stringify(response));
    //     this.setState({loading: false});
    //   })
    //   .catch(error => {
    //     this.setState({loading: false});
    //     alert(error);
    //   });
  };

  doneClick() {}

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
                <Text style={styles.subtitleText}>Don???t have an account? </Text>
                <Text style={styles.textPurple}>Sign up.</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.popUpError && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() =>
                this.setState({
                  popUpError: false,
                  btnOneText: this.state.btnOneText,
                  errorTitle: this.state.titleText,
                  errorText: this.state.errorText,
                })
              }
              doneButtonPress={() => this.doneClick()}
              errorTitle={this.state.errorTitle}
              errorText={this.state.errorText}
              btnOneText={this.state.btnOneText}
              btnTwoText={this.state.btnTwoText}
            />
          </Modal>
        )}
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
