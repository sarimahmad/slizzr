/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {StackActions} from '@react-navigation/native';

import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';

export default class settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  render() {
    return (
      <View style={styles.wrapperview}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            leftPress={() => this.props.navigation.openDrawer()}
            leftIcon={require('../../assets/drawer.png')}
            rightPress={() => this.props.navigation.navigate('Notifications')}
            rightIcon={require('../../assets/bell.png')}
            centerIcon={require('../../assets/homeLogo.png')}
          />

          <ScrollView styel={styles.contentView} bounces={false}>
            <Image
              source={require('../../assets/Slizzer-icon/locationIcon.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.textStyle}>Enable Location</Text>
            <Text style={styles.lowerText}>
              Allow location to turn on and set the radius to find nearby events
              or people
            </Text>
            <TouchableOpacity style={styles.btn1}>
              <Text> ALLOW LOCATION</Text>
            </TouchableOpacity>

            <View style={styles.verticalView}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('paymentsandPayouts')
                }
                style={[
                  styles.rowView,
                  {borderTopColor: 'lightgrey', borderTopWidth: 1},
                ]}>
                <Text style={styles.textView}>Payments and Payouts</Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('BlockedUser')}
                style={styles.rowView}>
                <Text style={styles.textView}>Blocked User</Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowView}>
                <Text style={styles.textView}>Push Notifications</Text>
                <Image
                  style={[styles.icon, {width: 55, height: 37}]}
                  source={require('../../assets/Slizzer-icon/RightCopy.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowView}>
                <Text style={styles.textView}>
                  Profile Visibility in People Radar
                </Text>
                <Image
                  style={[styles.icon, {width: 55, height: 37}]}
                  source={require('../../assets/Slizzer-icon/off.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowView}>
                <Text style={styles.textView}>Privacy Policy</Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowView}>
                <Text style={styles.textView}>Term of Service</Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('aboutSlizzr')}
                style={styles.rowView}>
                <Text style={styles.textView}>About Slizzr</Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('help')}
                style={styles.rowView}>
                <Text style={styles.textView}>Help</Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Intro')
                  AsyncStorage.removeItem('token');
                }}
                style={styles.rowView}>
                <Text style={styles.textView}>Logout</Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.clear();
                  this.props.navigation.dispatch(StackActions.popToTop());
                  // this.props.navigation.push('Splash');
                }}
                style={[styles.rowView, {borderBottomWidth: 0}]}>
                <Text
                  style={[
                    styles.textView,
                    {color: '#FF2D55', fontWeight: '700'},
                  ]}>
                  Remove Account
                </Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperview: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,
  },
  flex: {
    padding: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    alignSelf: 'center',
  },
  locationIcon: {
    alignSelf: 'center',
    marginTop: 34,
  },
  textStyle: {
    alignSelf: 'center',
    fontFamily: FONT.Nunito.bold,
    marginTop: 21,
    fontSize: 28,
  },
  lowerText: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    marginHorizontal: 42,
    alignSelf: 'center',
    marginTop: 8,
  },
  btn1: {
    width: SCREEN.width / 1.5,
    height: 55,
    marginTop: 59,
    marginBottom: 20,
    alignSelf: 'center',
    marginHorizontal: 49,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BLACK.light,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
  },
  verticalView: {},
  rowView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    height: 75,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textView: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    marginVertical: 26,
    marginLeft: 20,
    fontWeight: '400',
  },
  icon: {
    marginRight: 20,
    height: 35,
    width: 35,
  },
  slideBar: {
    marginBottom: 20,
    marginTop: 101,
    marginHorizontal: 20,
  },
});
