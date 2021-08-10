/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';

import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import { WelcomeEmail } from '../../helper/Api';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
 class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleSubmit = () => {
    this.props.navigation.navigate('passConfirm');
  };

  componentDidMount() {

  }
  sendEmail(){
   
    // auth().createUserWithEmailAndPassword(this.props.route.params.user.email)
    //     .then(response => {
    //       response.user.sendEmailVerification();
    //     })
    //     .catch(error => {
    //         alert("failed")
    //       }) 
       
    
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />

          <Text style={styles.titleColor}>Confirm your email address</Text>
          <Text style={[styles.textColor, {marginTop: 22, fontSize: 20}]}>
            We sent a confirmation email to:
          </Text>
          <Text style={styles.subtitletextbold}>
            {this.props.route.params &&
            this.props.route.params.from &&
            this.props.route.params.from === 'birth'
              ? this.props.route.params.user.email
              : 'Test@email.com'}
          </Text>
          <Text
            style={[styles.textColor, {marginTop: 26, paddingHorizontal: 50}]}>
            Check your email and click on the confirmation link to continue,
          </Text>
        {/* <TouchableOpacity onPress={()=>this.sendEmail()}>
          <Text style={styles.textPurple}>Resend email</Text>
          </TouchableOpacity> */}
        </SafeAreaView>
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, uid) => dispatch(userActions.setUser({user, uid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);

const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 70,
  },
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
  textColor: {
    fontSize: 16,
    textAlign: 'center',
    color: BLACK.grey,
    fontFamily: FONT.Nunito.regular,
  },
  titleColor: {
    marginTop: 26,
    textAlign: 'center',
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 28,
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
    marginVertical: 30,
    textDecorationLine: 'underline',
  },
  titleText: {
    marginTop: 13,
    marginBottom: '5%',
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 24,
    textAlign: 'center',
  },
  subtitletext: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.semiBold,
    fontSize: 16,
  },
  subtitletextbold: {
    color: BLACK.grey,
    fontFamily: FONT.Nunito.bold,
    fontSize: 20,
    marginTop: 26,
  },
});
