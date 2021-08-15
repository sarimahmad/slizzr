/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';

import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import moment from 'moment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {getZicketDetails} from '../../helper/Api';
import Loader from '../../component/Loader';

class zicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailItem: undefined,
      loading: true,
    };
  }

  componentDidMount() {
    let event_id = this.props.route.params.EventID;
    let user_id = this.props.route.params.UserID;
    console.log(event_id);
    console.log(user_id);
    if (event_id) {
      this.getZicketDetail({event_id, user_id});
    }
  }
  async getZicketDetail({event_id, user_id}) {
    await getZicketDetails({event_id: event_id, user_id: user_id}).then(
      response => {
        console.log('response', JSON.stringify(response));
        this.setState({loading: false, detailItem: response.User_Zicket[0]});
      },
    );
  }

  async hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  // Android Doesnt work on URL Fix That
  // Response show popup message successfully saved like that
  async savePicture(url) {
    if (Platform.OS === 'android' && !(await this.hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(url)
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  render() {
    if (this.state.detailItem === undefined) {
      return (
        <View style={styles.wrapperView}>
          <SafeAreaView
            style={[
              styles.contentView,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            {!this.state.loading ? (
              <Text>No Zicket found</Text>
            ) : (
              <Loader loading={this.state.loading} loadingText={'Fetching'} />
            )}
          </SafeAreaView>
        </View>
      );
    }
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            headerTitle={'Zickets'}
            leftPress={() => this.props.navigation.goBack()}
            leftIcon={require('../../assets/back.png')}
          />

          <ScrollView>
            <Image
              source={{uri: this.state.detailItem.Event.image}}
              style={styles.logoEvent}
            />

            <View style={{alignSelf: 'center'}}>
              <Text
                style={[
                  styles.titleText,
                  {textAlign: 'center', marginTop: 20},
                ]}>
                {this.state.detailItem.Event.Name}
              </Text>
              <Text style={[styles.text, {textAlign: 'center', marginTop: 5}]}>
                {this.state.detailItem.Event.EventType}{' '}
                {this.state.detailItem.Event.EventType !== 'FREE' &&
                  `| $${this.state.detailItem.Event.Fee}`}
              </Text>
              <Text
                style={[
                  styles.purpleText,
                  {textAlign: 'center', marginTop: 4},
                ]}>
                {moment(this.state.detailItem.Event.Start_date).format(
                  'hh:mm A | MMM DD, YYYY - ddd',
                )}{' '}
                | {this.state.detailItem.Event.duration} HRS
                {/* 11:30 PM | Feb 25, 2020 - WED | 2 HRS */}
              </Text>

              <Text style={{textAlign: 'center', marginVertical: 4}}>
                <Text style={[styles.titleText, {fontSize: 12}]}>Host: </Text>
                <Text
                  style={[
                    styles.purpleText,
                    {textDecorationLine: 'underline'},
                  ]}>
                  {this.state.detailItem.Event.Host.displayName}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(178, 171, 177, 0.246039)',
                padding: 20,
                margin: 20,
                borderRadius: 10,
              }}>
              <Image
                source={require('../../assets/location.png')}
                style={{height: 16, width: 12, marginRight: 5}}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONT.Nunito.regular,
                  color: '#494949',
                }}>
                {this.state.detailItem.Event.Address}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 2,
                alignSelf: 'center',
                borderColor: '#F818D9',
                height: 242,
                width: 242,
              }}>
              <Image
                source={{uri: this.state.detailItem.QRImage}}
                style={{height: 239, width: 239}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              <Text style={styles.titleText}>Host: </Text>
              <Text style={{fontFamily: FONT.Nunito.regular, fontSize: 17}}>
                {this.state.detailItem.Event.Host.displayName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Text style={styles.titleText}>Attendee: </Text>
              <Text style={{fontFamily: FONT.Nunito.regular, fontSize: 17}}>
                {this.state.detailItem.User.displayName}
              </Text>
            </View>

            {/* Make text look Good */}
            <View
              style={{alignSelf: 'center', marginTop: 20, marginBottom: 10}}>
              <TouchableOpacity
                onPress={() => this.savePicture(this.state.detailItem.QRImage)}>
                <Text>Save to Gallery</Text>
              </TouchableOpacity>
            </View>
            {this.state.detailItem.Event.EventType === 'SCAN' && (
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 16,

                  marginBottom: 10,
                }}>
                <Image
                  source={require('../../assets/invalid.png')}
                  // style={{height:55,width:174}}
                />

                <Text
                  style={{
                    fontFamily: FONT.Nunito.semiBold,
                    fontSize: 12,
                    color: '#F818D9',
                    textAlign: 'left',
                  }}>
                  {' '}
                  #Valid payment method must be set up to ensure entry at door
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
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

export default connect(mapStateToProps)(zicketDetail);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  detailImage: {
    width: SCREEN.width - 40,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 20,
    height: 110,
  },

  contentView: {
    flex: 1,
    width: SCREEN.width - 20,
    alignSelf: 'center',
    backgroundColor: WHITE.dark,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },
  btnTextCancel: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    fontFamily: FONT.Nunito.regular,
  },
  cancelButton: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  btnMap: {
    borderRadius: 25,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
    width: SCREEN.width - 40,
    backgroundColor: 'black',
    justifyContent: 'center',
  },

  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    marginTop: hp('5%'),
    height: 50,
    elevation: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  next: {
    paddingTop: 15,
  },
  detail: {
    width: wp('55%'),
  },

  imgView: {
    width: wp('25%'),
  },
  shareView: {
    width: wp('20%'),
    justifyContent: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    color: '#494949',
  },
  logo: {},

  logoEvent: {
    marginTop: 10,
    width: '100%',
    height: 110,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'center',
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    marginTop: 10,

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
