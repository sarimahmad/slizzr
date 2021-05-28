/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';
import HeaderWithLogo from '../../component/HeaderWithLogo';
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableMap: false,
      date: new Date(),
      showDate: false,
    };
  }
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({date: currentDate});
    this.setState({showDate: false});
  };

  showDatepicker = () => {
    this.setState({showDate: true});
  };

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <HeaderWithLogo
          leftIcon={require('../../assets/drawer.png')}
          leftPress={() => this.props.navigat.openDrawer()}
          backColor={WHITE.dark}
          rightIcon={require('../../assets/bell.png')}
          rightPress={() => this.props.navigation.navigate('Notification')}
        />
        <SafeAreaView style={styles.contentView}>
          <View style={styles.flex}>
            <Text style={styles.barChild}>All</Text>
            <Text style={styles.barChild}>Prepaid</Text>
            <Text style={[styles.barChild, {width: wp('40%')}]}>
              Scan-&-Pay at door
            </Text>
            <Text style={styles.barChild}>free</Text>
          </View>
          {this.state.enableMap === true && (
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: 26.4788,
                longitude: 80.292061,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
              }}
            />
          )}
          {this.state.enableMap === true && (
            <View
              style={{
                position: 'absolute',
                top: 130,
                flexDirection: 'row',
                width: wp('100%'),
              }}>
              <Image source={require('../../assets/searchWhite.png')} />
              <TextInput
                style={styles.inputSearch}
                placeholder={'Try “western homecoming party”'}
                placeholderTextColor={'#8e8e93'}
                // onChangeText={handleText}
              />
            </View>
          )}
          {this.state.enableMap === false && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
                marginHorizontal: '5%',
              }}>
              <Image
                source={require('../../assets/map-marker-outline.png')}
                style={styles.logo}
              />
              <Text style={styles.titleText}>Enable Location</Text>
              <Text style={styles.subtitleText}>
                You will need to enable location to see events near you
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({enableMap: true})}
                style={styles.btnLocation}>
                <Text style={styles.btnTextLocation}>Allow Location</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.bottomView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('createEvent')}
              style={styles.logoAdd}>
              <Image source={require('../../assets/plus-circle.png')} />
            </TouchableOpacity>
            <View style={styles.bottomWhiteView}>
              {Platform.OS === 'android' ? (
                <TouchableOpacity
                  onPress={this.showDatepicker}
                  style={styles.DataTimeWrapper}>
                  <View style={styles.input}>
                    <Text style={{paddingTop: 15, paddingLeft: 20}}>
                      {this.state.date.toDateString()}
                    </Text>
                  </View>

                  <View style={styles.logoAddCalenderView}>
                    <Image
                      source={require('../../assets/calendar-range.png')}
                    />
                  </View>
                  {this.state.showDate && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.date}
                      mode={'date'}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChange}
                    />
                  )}

                  <View />
                </TouchableOpacity>
              ) : (
                <View style={styles.DataTimeWrapper}>
                  <DateTimePicker
                    style={styles.DateTimeInnerIOS}
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    textColor="black"
                    themeVariant="light"
                    onChange={this.onChange}
                  />
                  <View style={styles.logoAddCalenderView}>
                    <Image
                      source={require('../../assets/calendar-range.png')}
                    />
                  </View>
                </View>
              )}
              <TouchableOpacity style={styles.btnMap}>
                <Text style={styles.btnText}>List View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topView: {
    height: hp('35%'),
  },
  inputSearch: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingLeft: 40,
    marginVertical: 10,
    borderRadius: 24,
    borderColor: 'lightgrey',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  input: {
    width: '100%',
    marginHorizontal: '5%',
    height: '100%',
  },
  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    borderRadius: 25,
    marginTop: hp('5%'),
    height: 50,
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.1,
    elevation: 1,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: BLACK.light,
    bottom: 10,
  },
  btnMap: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  logoSearch: {
    position: 'absolute',
    left: 30,
    top: 25,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
  },
  btnText: {
    fontSize: 16,
    color: WHITE.app,
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  bottomWhiteView: {
    backgroundColor: WHITE.app,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  barChild: {
    borderWidth: 1,
    width: wp('20%'),
    height: hp('6%'),
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
  },
  subtitleText: {
    marginVertical: 10,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: FONT.Nunito.semiBold,
  },
  contentView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  logo: {
    marginTop: 25,
    alignSelf: 'center',
  },
  logoAdd: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginTop: '10%',
  },
  logoAddCalenderView: {
    position: 'absolute',
    right: 0,
    width: 58,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: BLACK.border,
  },
  DataTimeWrapper: {
    backgroundColor: WHITE.app,
    height: 53,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    borderWidth: 0.3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: BLACK.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginVertical: 20,
  },
  DateTimeInnerIOS: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: BLACK.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },

  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    marginTop: 13,
    marginBottom: '3%',
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 24,
  },
  detailWrapper: {
    alignSelf: 'center',
  },
  wrapperView: {
    height: hp('100%'),
    width: wp('100%'),
    flex: 1,
  },
  policyText: {
    alignSelf: 'center',
    marginTop: '2%',
    color: BLACK.appDark,
    fontFamily: FONT.Nunito.regular,
  },
});
