import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import { width, height } from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
export default class chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.wrapperView}>

        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn

            borderBottom={true}
            backColor={WHITE.dark}
            headerTitle={'Cindy Ray'}
            leftPress={() => this.props.navigation.goBack()}
            leftIcon={require('../../assets/back.png')}
            profileIcon={require('../../assets/profile1.png')}
          />
          <KeyboardAvoidingView
            style={styles.wrapperView}
            enabled
            keyboardVerticalOffset={isIphoneXorAbove ? 120 : 80}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ width: SCREEN.width - 40, alignSelf: 'center', flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require('../../assets/profile1.png')}
                />
                <View>
                  <View style={styles.myMessages}>
                    <Text style={{ color: 'white' }}>
                      Hey! Anything you want, might be chilly so maybe a jacket.
                  </Text>
                  </View>
                  <Text
                    style={{ textAlign: 'left', color: '#B2ABB1', fontSize: 12 }}>
                    02/17/2020 - 08:02 PM
                </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <View style={styles.otherMessages}>
                    <Text>What do you reccomend I bring to this event?</Text>
                  </View>
                  <Text
                    style={{ textAlign: 'right', color: '#B2ABB1', fontSize: 12 }}>
                    02/17/2020 - 08:02 PM
                </Text>
                </View>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require('../../assets/profile1.png')}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                bottom: 0,
                height: isIphoneXorAbove ? 100 : 63,
                backgroundColor: '#EBE5F1',
                width: SCREEN.width,
                paddingHorizontal: 20,
                alignItems: 'center'
              }}>
              <View
                style={{
                  backgroundColor: WHITE.dark,
                  height: 43,
                  width: SCREEN.width * 0.6,
                  borderRadius: 12,
                }}>
                <TextInput
                  style={[styles.titleText, { fontFamily: FONT.Nunito.semiBold }]}
                  placeholder={'Type something to send…'}
                  placeholderTextColor={'#8e8e93'}
                />
              </View>
              <View
                style={[
                  {

                    marginRight: 5,
                    padding: 10,
                    height: 43,
                    width: 43,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Image source={require('../../assets/addChat.png')} />
              </View>
              <View
                style={[
                  {

                    marginRight: 5,
                    padding: 10,
                    height: 43,
                    width: 43,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Image source={require('../../assets/sendChat.png')} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  myMessages: {
    backgroundColor: '#F818D9',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    height: 66,
    width: SCREEN.width * 0.75,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherMessages: {
    backgroundColor: '#EBE5F1',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    height: 66,
    width: SCREEN.width * 0.75,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  detail: {
    flexDirection: 'row',
    width: wp('60%'),
    paddingTop: 10,
  },
  next: {
    paddingTop: 15,
  },

  imgView: {
    width: wp('20%'),
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {},
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
  },
  barChild: {
    borderWidth: 1,
    width: wp('50%'),
    height: 36,
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
