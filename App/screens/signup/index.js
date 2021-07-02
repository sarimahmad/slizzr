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
  Modal,
  Image,
  Alert,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

import TextField from '../../component/TextField/index';
import {BLACK, WHITE} from '../../helper/Color';
import ErrorPopup from '../../component/ErrorPopup';
import {FONT, SCREEN} from '../../helper/Constant';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import * as userActions from '../../redux/actions/user';
import Validations from '../../helper/Validations';
import Loader from '../../component/Loader';

class SignUp extends Component {
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

  isFormFilledCheck() {
    let checkPassword = Validations.checkPassword(this.state.password);
    let checkEmail = Validations.checkEmail(this.state.email);
    let checkfirstName = Validations.checkUsername(this.state.firstName);
    let checklastName = Validations.checkUsername(this.state.lastName);
    if (
      checkEmail &&
      checkPassword &&
      checkfirstName &&
      checklastName &&
      this.state.password === this.state.confirmPassword
    ) {
      return true;
    }
    return false;
  }

  isFormFilled() {
    let checkPassword = Validations.checkPassword(this.state.password);
    let confirmPass = Validations.checkPassword(this.state.confirmPassword);
    let checkEmail = Validations.checkEmail(this.state.email);
    let checkfirstName = Validations.checkUsername(this.state.firstName);
    let checklastName = Validations.checkUsername(this.state.lastName);
    if (
      checkEmail &&
      checkPassword &&
      checkfirstName &&
      checklastName &&
      confirmPass === checkPassword
    ) {
      return true;
    }
    if (!checkfirstName) {
      this.setState({
        loading: false,
        btnOneText: 'Ok',
        errorTitle: 'FIRST NAME INVALID',
        errorText: 'Please input the valid data in First name',
        popUpError: true,
      });
    } else if (!checkEmail) {
      this.setState({
        loading: false,
        btnOneText: 'Ok',
        errorTitle: 'EMAIL INVALID',
        errorText: 'Please input the valid data in Email',
        popUpError: true,
      });
    } else if (!checklastName) {
      this.setState({
        loading: false,
        btnOneText: 'Ok',
        errorTitle: 'LAST NAME INVALID',
        errorText: 'Please input the valid data in Last name',
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
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        loading: false,
        errorTitle: 'PASSWORD IS NOT MATCHING',
        errorText: 'Please check your password text you typed',
        btnOneText: 'Ok',
        popUpError: true,
      });
      return false;
    }
    return false;
  }

  handleSubmit = () => {
    if (this.isFormFilled()) {
      this.setState({loading: true});
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
          response.user.sendEmailVerification();
          const uid = response.user.uid;

          const data = {
            FirstName: this.state.firstName,
            last_name: this.state.lastName,
            id: uid,
            Id: uid,
            email: this.state.email,
            type: 'email',
            displayName: this.state.firstName + ' ' + this.state.lastName,
            email_verified: false,
            socialLogin: false,
            STRIPE_CUST_ID: '',
            STRIPE_HOST_ID: '',
            age: '13',
            Address: '',
            BirthDate: new Date(),
            Gender: '',
            Visibility: true,
            PushNotification: true,
            Radius: 50,
            bio: '',
            Location: {
              latitude: 0,
              longitude: 0
          },
          };
          const usersRef = firestore().collection('users');
          usersRef
            .doc(uid)
            .set(data)
            .then(async firestoreDocument => {
              this.props.callApi(data, uid);
              this.setState({loading: false});
              this.props.navigation.navigate('BirthDate', {
                from: 'signUp',
              });
            })
            .catch(error => {
              this.setState({
                loading: false,
                errorTitle: 'USER ERROR',
                errorText: JSON.stringify(error),
                btnOneText: 'Ok',
                popUpError: true,
              });
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            this.setState({
              loading: false,
              errorTitle: 'EMAIL DUBLICATE',
              errorText: 'There is already a user register with this email',
              btnOneText: 'Ok',
              popUpError: true,
            });
          } else {
            this.setState({
              loading: false,
              errorTitle: 'USER ERROR',
              errorText: JSON.stringify(error),
              btnOneText: 'Ok',
              popUpError: true,
            });
          }
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  googleSignInBtn = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    this.setState({loading: true});
    const usersRef = firestore().collection('users');
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
          Address: '',
          BirthDate: new Date(),
          Gender: '',
          Visibility: true,
          Radius: 50,
          bio: '',
          BirthDate: new Date(),
          Gender: '',
          Visibility: true,
          PushNotification: true,
          Radius: 50,
          bio: '',
          Location: {
            latitude: 0,
            longitude: 0
          },
        };

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
                  this.props.navigation.navigate('BirthDate', {from: 'signUp'});
                })
                .catch(error => {
                  this.setState({
                    loading: false,
                    errorTitle: 'ERROR',
                    errorText: JSON.stringify(error),
                    btnOneText: 'Ok',
                    popUpError: true,
                  });
                });
              return;
            } else {
              this.props.callApi(firestoreDocument.data(), data.id);
              this.setState({loading: false});
              this.props.navigation.navigate('HomeStack');
            }
          })
          .catch(error => {
            this.setState({
              loading: false,
              errorTitle: 'ERROR',
              errorText: JSON.stringify(error),
              btnOneText: 'Ok',
              popUpError: true,
            });
          });
      })
      .catch(error => {
        this.setState({
          loading: false,
          errorTitle: 'ERROR',
          errorText: JSON.stringify(error),
          btnOneText: 'Ok',
          popUpError: true,
        });
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

    this.setState({loading: false});

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    this.setState({loading: false});

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    auth()
      .signInWithCredential(facebookCredential)
      .then(response => {
        this.setState({loading: false});
        this.props.navigation.navigate('BirthDate', {userData: response});
      })
      .catch(error => {
        this.setState({loading: false});
        Alert.alert('Facebook Error', error);
      });
  };

  doneClick() {}

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
                <Text style={styles.titleText}>ign Up</Text>
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
                placeholder="Email address"
                type={'email'}
                parentCallBack={this.storeInputData}
              />
              <TextField
                placeholder="Password"
                type={'password'}
                parentCallBack={this.storeInputData}
              />
              <TextField
                placeholder="Confirm Password"
                type={'confirmPassword'}
                parentCallBack={this.storeInputData}
              />
              <ButtonResetPassaword
                validate={this.isFormFilledCheck()}
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
                  <Text
                    style={[styles.text, {fontSize: 12}]}
                    onPress={() =>
                      Linking.openURL('https://slizzrapp.com/#terms-of-service')
                    }>
                    Terms of Service
                  </Text>
                  <Text style={{fontSize: 12}}> and </Text>
                  <Text
                    style={[styles.text, {fontSize: 12}]}
                    onPress={() =>
                      Linking.openURL(
                        'https://slizzrapp.com/#privacy-and-cookie-policy',
                      )
                    }>
                    Privacy Policy.
                  </Text>
                </View>
              </View>
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
                  btnOneText: '',
                  errorTitle: '',
                  errorText: '',
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
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, uid) => dispatch(userActions.setUser({user, uid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
