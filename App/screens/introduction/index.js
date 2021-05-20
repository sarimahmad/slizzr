import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { BLACK, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';

class introduction extends Component {
  state = {};
  componentDidMount() {
    setTimeout(() => {
      // this.props.navigation.navigate('User');
    }, 3000);
  }
  render() {
    return (  
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <SafeAreaView style={styles.container}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={styles.detailText}>Revolutionize the way you host and attend events!</Text>
          <Image style={styles.getStartedImg} source={require('../../assets/get_started_mobile.png')} />
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("Signup")} style={styles.getStartedBtn} activeOpacity={0.8}>
            <Text style={styles.getStartedText}>GET STARTED</Text>
          </TouchableOpacity>
         <TouchableOpacity onPress={()=>this.props.navigation.navigate("Signin")}>
          <Text style={styles.loginText}>LOG IN</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default introduction;

const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 70,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE.dark,
  },
  detailText: {
    fontSize: 20,
    fontFamily: FONT.Nunito.regular,
    color: BLACK.textColor,
    marginTop: 15,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  getStartedImg: {
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 30,
    height: SCREEN.height / 1.9,
  },
  getStartedBtn: {
    height: 55,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLACK.btn,
    borderRadius: 27.5,
  },
  loginText: {
    fontSize: 14,
    color: BLACK.textColor,
    fontFamily: FONT.Nunito.bold,
    alignSelf: 'center',
    marginTop: 20,
  },
  getStartedText: {
    fontSize: 14,
    color: WHITE.dark,
    fontFamily: FONT.Nunito.bold,
    alignSelf: 'center',
  }
});
