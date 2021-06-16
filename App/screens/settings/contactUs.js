/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import Textarea from 'react-native-textarea';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';

export default class contactUs extends Component {
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            backColor={WHITE.dark}
            headerTitle={'Contact Us'}
            borderBottom={true}
            leftPress={() => this.props.navigation.pop()}
            leftIcon={require('../../assets/back.png')}
          />
          <Text style={styles.textView}>
            Please fill out this form to contact us and we’ll get back to you as
            soon as we can!
          </Text>
          <View style={styles.inputView}>
            <TextInput style={styles.inputTextView} placeholder="Name" />
            <TextInput
              style={styles.inputTextView}
              placeholder="Email Address"
            />
            <TextInput
              style={styles.inputTextView}
              placeholder="Phone Number"
            />
            <Textarea
              style={[styles.inputTextView, {height: 159}]}
              maxLength={200}
              placeholder="Message"
            />
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntext}> SEND MESSAGE</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperView: {
    backgroundColor: WHITE.dark,
    flex: 1,
  },
  textView: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    color: '#494949',
  },
  inputView: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputTextView: {
    backgroundColor: WHITE.dark,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    width: SCREEN.width - 40,
    height: 53,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: 'lightgrey',
    fontSize: 16,
    fontFamily: FONT.Nunito.regular,
    marginTop: 20,
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    backgroundColor: 'black',
    borderRadius: 27.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
    fontWeight: 'bold',
  },
});
