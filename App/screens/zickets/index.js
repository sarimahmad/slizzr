/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {APPCOLOR, BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';

export default class Zickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendingEvents: false,
      scanZickets: true,
      messages: [
        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
      ],
      findpeople: [
        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },

        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },

        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
      ],
    };
  }
  scanZickets = () => {
    this.setState({scanZickets: true});
    this.setState({attendingEvents: false});
  };
  attendingEvents = () => {
    this.setState({scanZickets: false});
    this.setState({attendingEvents: true});
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            headerTitle={'Zicket List'}
            leftIcon={require('../../assets/drawer.png')}
            leftPress={() => this.props.navigation.openDrawer()}
            backColor={WHITE.dark}
          />
          <View style={styles.flex}>
            <TouchableOpacity
              onPress={() => this.scanZickets()}
              style={styles.barChild}>
              <Text
                style={{
                  color: this.state.scanZickets
                    ? APPCOLOR.text
                    : BLACK.textColor,
                  fontSize: 11,
                  fontFamily: FONT.Nunito.bold,
                }}>
                SCAN ZICKETS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.attendingEvents}
              style={styles.barChild}>
              <Text
                style={{
                  color: !this.state.scanZickets
                    ? APPCOLOR.text
                    : BLACK.textColor,
                  fontSize: 11,
                  fontFamily: FONT.Nunito.bold,
                }}>
                ATTENDING EVENTS
              </Text>
            </TouchableOpacity>
          </View>
          {!this.state.scanZickets ? (
            <View style={{alignItems: 'center', marginTop: hp('30%')}}>
              <Text style={styles.detail}>
                You are not attending any events at the moment.
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({enableMap: true})}
                style={styles.btnLocation}>
                <Text style={styles.btnTextLocation}>look for events!</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{alignItems: 'center', marginTop: hp('30%')}}>
              <Text style={styles.det0ail}>
                You are not hosting any events at the moment.
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Scan')}
                style={styles.btnLocation}>
                <Text style={styles.btnTextLocation}>Host?</Text>
              </TouchableOpacity>
            </View>
          )}
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
  detailText: {
    fontSize: 20,
    color: 'white',
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
    marginVertical: 20,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.bold,
  },
  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    borderRadius: 25,
    marginTop: hp('5%'),
    height: 50,
    elevation: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: BLACK.light,
    bottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  detail: {
    width: SCREEN.width - 40,
    alignSelf: 'center',
    textAlign: 'center',
  },
  next: {
    paddingTop: 15,
  },
  contentView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  imgView: {
    width: wp('25%'),
  },
  flex: {
    flexDirection: 'row',
    backgroundColor: WHITE.dark,
    justifyContent: 'space-between',
  },
  logo: {},
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: APPCOLOR.text,
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
  },
  barChild: {
    borderWidth: 1,
    width: wp('50%'),
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
