import React, {Component} from 'react';
import {Text, View, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import Header from '../../component/Header';

export default class help extends Component {
  render() {
    return (
      <View style={styles.wrapperView}>
        <Header
          headerTitle={'Help'}
          navigation={this.props.navigation}
          route={'SettingsNavigation'}
        />
        <View style={styles.text}>
          <Text style={styles.textView}>OPEN SITE HERE</Text>
        </View>
        <Text
          style={styles.textView2}
          onPress={() => Linking.openURL('https://slizzrapp.com/#faq')}>
          OPEN https://slizzrapp.com/#faq on this page
        </Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btntext}> CONTACT US</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    marginTop: 20,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    marginTop: 30,
    fontWeight: 'bold',
    fontFamily: FONT.Nunito.regular,
    fontSize: 24,
  },
  textView2: {
    marginTop: 51,
    marginHorizontal: 20,
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    lineHeight: 27,
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    backgroundColor: '#1E1E1E',
    borderRadius: 27.5,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
  },
});
