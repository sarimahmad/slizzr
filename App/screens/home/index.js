/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN, isIphoneXorAbove} from '../../helper/Constant';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {Marker} from 'react-native-maps';
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: false,
      mapView: true,
      date: new Date(2300, 10, 20),
      index: 0,
      markers: [
        {lat: 31.52037, lng: 74.358749},
        {lat: 31.64037, lng: 74.358749},
        {lat: 31.7037, lng: 74.358749},
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
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({date: currentDate});
    this.setState({showDate: false});
  };

  showDatepicker = () => {
    this.setState({showDate: true});
  };
  barTapped = indexTap => {
    if (indexTap === 0) {
      this.setState({index: 0});
      this.setState({listView: false});
      this.setState({mapView: true});
    } else if (indexTap === 1) {
      this.setState({index: 1});
      this.setState({listView: false});
      this.setState({mapView: false});
    } else if (indexTap === 2) {
      this.setState({index: 2});
      this.setState({listView: false});
      this.setState({mapView: false});
    }
    if (indexTap === 3) {
      this.setState({index: 3});
      this.setState({listView: false});
      this.setState({mapView: false});
    }
    if (indexTap === 4) {
      this.setState({index: 4});
      this.setState({listView: false});
      this.setState({mapView: false});
    }
  };

  listView = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            // marginBottom: SCREEN.height*0.15,
          }}>
          <FlatList
            data={this.state.findpeople}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View
                style={{
                  height: 80,
                  borderBottomColor: 'lightgrey',
                  borderBottomWidth: 1,
                  width: SCREEN.width,
                }}>
                <View style={[styles.flexRow, {width: SCREEN.width - 20}]}>
                  <View style={styles.imgView}>
                    <Image
                      source={require('../../assets/image2.jpg')}
                      style={{borderRadius: 44, height: 60, width: 60}}
                    />

                    <Image
                      style={{position: 'absolute', right: -10}}
                      source={require('../../assets/private.png')}
                    />
                  </View>

                  <View style={styles.detail}>
                    <Text style={styles.titleText}>{item.profileName}</Text>
                    <Text style={styles.adressText}>{item.adress}</Text>
                    <Text style={styles.purpleText}>{item.date}</Text>
                    <View style={styles.flexRow}>
                      <Image
                        style={{height: 16, width: 12, marginRight: 5}}
                        source={require('../../assets/location.png')}
                      />

                      <Text>15 KM away</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('eventDetail')
                    }
                    style={styles.shareView}>
                    <Image source={require('../../assets/Right.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  };
  mapView = () => {
    return (
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 31.52037,
          longitude: 74.358749,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}>
        {this.state.markers.map((marker, index) => (
          <MapView.Marker
            coordinate={{
              latitude: marker.lat,
              longitude: 74.358749,
            }}
            title={'title'}
            image={require('../../assets/marker.png')}
            description={'description'}
          />
        ))}
      </MapView>
    );
  };

  searchBar = () => {
    return (
      <View
        style={[
          this.state.index == 0 ? {opacity: 0.4} : {opacity: 1},
          {
            position: 'absolute',
            top: SCREEN.height * 0.18,
            alignSelf: 'center',
          },
        ]}>
        <View style={styles.inputSearch}>
          <Image
            source={require('../../assets/magnify.png')}
            style={{marginTop: 10, marginRight: 10}}
          />
          <TextInput
            placeholder={'Try “western homecoming party”'}
            placeholderTextColor={'#8e8e93'}
            // onChangeText={handleText}
          />
        </View>
      </View>
    );
  };
  enableLocation = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <MapView
          style={{flex: 1, opacity: 0.3}}
          initialRegion={{
            latitude: 31.52037,
            longitude: 74.358749,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        />

        <View
          style={{
            position: 'absolute',
            top: SCREEN.height * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            width: SCREEN.width,
          }}>
          <Image
            source={require('../../assets/map-marker-outline.png')}
            style={styles.logo}
          />
          <Text style={[styles.titleText, {marginTop: 20, fontSize: 27}]}>
            Enable Location
          </Text>
          <Text
            style={{
              color: BLACK.grey,
              marginHorizontal: 50,
              textAlign: 'center',
              fontSize: 17,
              fontFamily: FONT.Nunito.bold,
              marginTop: 7,
            }}>
            You will need to enable location to see events near you
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({mapView: true,index:5})}
            style={styles.btnLocation}>
            <Text style={styles.btnTextLocation}>Allow Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  noEvent = () => {
    return (
      <View style={{position: 'absolute', bottom: 120, alignSelf: 'center'}}>
        <Image
          source={require('../../assets/circle.png')}
          style={{
            height: 120,
            width: 120,
            alignSelf: 'center',
            marginVertical: 20,
          }}
        />
        <Text
          style={[
            styles.subtitleText,
            {
              fontSize: 20,
              fontFamily: FONT.Nunito.regular,
              textAlign: 'center',
              color: BLACK.grey,
            },
          ]}>
          No events to show{'\n'} in your area.
        </Text>
        <TouchableOpacity style={[styles.btnMap, {marginTop: 30}]}>
          <Text style={styles.btnText}>HOST AN EVENT</Text>
        </TouchableOpacity>
      </View>
    );
  };
  tapBar = () => {
    return (
      <View style={{overflow: 'hidden', paddingBottom: 5}}>
        <View
          style={[
            styles.flex,
            {
              alignItems: 'center',
              backgroundColor: '#fff',

              shadowColor: '#000',
              shadowOffset: {width: 2, height: 3},
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5,
            },
          ]}>
          <TouchableOpacity
            style={
              this.state.index === 0
                ? {
                    borderBottomColor: '#F818D9',
                    borderBottomWidth: 3,
                    borderColor: 'lightgrey',
                    justifyContent: 'center',
                    borderWidth: 1,
                    width: SCREEN.width * 0.2,
                    height: 39,
                  }
                : {
                    color: 'black',
                    width: SCREEN.width * 0.2,
                    height: 39,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    justifyContent: 'center',
                  }
            }
            onPress={() => this.barTapped(0)}>
            <Text
              style={[
                styles.barChild,
                this.state.index === 0 ? {color: '#F818D9'} : {color: 'black'},
              ]}>
              ALL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.index === 2
                ? {
                    borderBottomColor: '#F818D9',
                    borderBottomWidth: 3,
                    borderColor: 'lightgrey',
                    justifyContent: 'center',
                    borderWidth: 1,
                    width: SCREEN.width * 0.2,
                    height: 39,
                  }
                : {
                    color: 'black',
                    width: SCREEN.width * 0.2,
                    height: 39,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    justifyContent: 'center',
                  }
            }
            onPress={() => this.barTapped(2)}>
            <Text
              style={[
                styles.barChild,
                this.state.index === 2 ? {color: '#F818D9'} : {color: 'black'},
              ]}>
              PREPAID
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.index === 3
                ? {
                    borderBottomColor: '#F818D9',
                    borderBottomWidth: 3,
                    borderColor: 'lightgrey',
                    justifyContent: 'center',
                    borderWidth: 1,
                    width: SCREEN.width * 0.45,
                    height: 39,
                  }
                : {
                    color: 'black',
                    width: SCREEN.width * 0.45,
                    height: 39,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    justifyContent: 'center',
                  }
            }
            onPress={() => this.barTapped(3)}>
            <Text
              style={[
                styles.barChild,
                this.state.index === 3
                  ? {color: '#F818D9', width: SCREEN.width * 0.45}
                  : {color: 'black', width: SCREEN.width * 0.45},
              ]}>
              SCAN-&-PAY AT DOOR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.index === 4
                ? {
                    borderBottomColor: '#F818D9',
                    borderBottomWidth: 3,
                    borderColor: 'lightgrey',
                    justifyContent: 'center',
                    borderWidth: 1,
                    width: SCREEN.width * 0.2,
                    height: 39,
                  }
                : {
                    color: 'black',
                    width: SCREEN.width * 0.2,
                    height: 39,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    justifyContent: 'center',
                  }
            }
            onPress={() => this.barTapped(4)}>
            <Text
              style={[
                styles.barChild,
                this.state.index === 4
                  ? {color: '#F818D9', width: SCREEN.width * 0.15}
                  : {color: 'black', width: SCREEN.width * 0.15},
              ]}>
              FREE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  bottomView = () => {
    return (
      <View style={{height: 151, justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            width: SCREEN.width,
          }}>
          <TouchableOpacity
            onPress={this.showDatepicker}
            style={{flexDirection: 'row'}}>
            <View style={styles.input}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    height: 53,
                    width: SCREEN.width * 0.75,
                    paddingLeft: 20,
                    paddingTop: 15,
                    alignItems: 'center',
                    fontFamily: FONT.Nunito.semiBold,
                    fontSize: 16,
                  }}>
                  Thursday, August 24, 2020
                </Text>
                <View
                  style={{
                    height: 53,
                    width: 1,
                    backgroundColor: 'lightgrey',
                  }}
                />
              </View>
              <Image
                style={styles.logoAddCalender}
                source={require('../../assets/calendar-range.png')}
                onPress={this.showDatepicker}
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
          </TouchableOpacity>
          {this.state.mapView === true && (
            <TouchableOpacity
              style={styles.btnMap}
              onPress={() => this.setState({mapView: false, listView: true})}>
              <Text style={styles.btnText}>LIST VIEW</Text>
            </TouchableOpacity>
          )}
          {this.state.listView === true && (
            <TouchableOpacity
              style={styles.btnMap}
              onPress={() => this.setState({listView: false, mapView: true})}>
              <Text style={styles.btnText}>MAP VIEW</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.wrapperView}>
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

          {this.tapBar()}

          {(this.state.index === 5 && this.state.mapView==true) && this.mapView()}

          {this.state.index === 0 &&
            this.state.listView === false &&
            this.enableLocation()}
          {this.state.listView === true && this.listView()}

          {(this.state.index === 2 ||
            this.state.index === 3 ||
            this.state.index === 4) &&
            this.noEvent()}
          {(this.state.listView == true || this.state.mapView == true) &&
            this.searchBar()}
          {(this.state.listView === true || this.state.mapView === true) &&
            this.bottomView()}
          {(this.state.listView === true || this.state.mapView === true) && (
            <View
              style={{
                position: 'absolute',
                bottom: isIphoneXorAbove ? 182 : 148,

                right: 0,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('createEvent')}
                style={styles.logoAdd}>
                <Image source={require('../../assets/plus-circle.png')} />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topView: {
    // height: hp('35%'),
  },
  inputSearch: {
    width: SCREEN.width - 40,
    flexDirection: 'row',
    height: 42,
    borderWidth: 1,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    backgroundColor: 'white',

    borderRadius: 24,
    borderColor: 'lightgrey',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  input: {
    width: SCREEN.width - 40,
    borderWidth: 1,
    height: 53,

    marginVertical: 10,
    borderRadius: 12,
    borderColor: 'lightgrey',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imgView: {
    marginHorizontal: 20,
    alignItems: 'center',

    alignSelf: 'center',
  },
  shareView: {
    width: wp('20%'),
    justifyContent: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  adressText: {
    fontSize: 12,
    color: BLACK.grey,
    fontFamily: FONT.Nunito.regular,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    fontFamily: FONT.Nunito.bold,
  },
  flexRow: {
    flexDirection: 'row',
  },

  next: {
    paddingTop: 15,
  },
  detail: {
    width: SCREEN.width * 0.6,
  },
  btnLocation: {
    width: SCREEN.width - 98,
    marginTop: SCREEN.height * 0.078,
    height: 55,
    backgroundColor: WHITE.dark,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 3,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
  },
  btnMap: {
    marginTop: 10,
    width: SCREEN.width - 40,
    borderRadius: 25,
    height: 55,
    marginBottom: 20,
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
    bottom: 20,
  },
  btnText: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.bold,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  barChild: {
    height: 50,
    paddingTop: 14,
    fontFamily: FONT.Nunito.semiBold,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 14,
    marginTop: 14,
    fontFamily: FONT.Nunito.semiBold,
  },

  logo: {
    //   height: 80,
    //   width: 100,
    //   resizeMode: 'contain',
    marginTop: 25,

    alignSelf: 'center',
  },
  logoAdd: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  logoAddCalender: {
    position: 'absolute',
    right: 10,
    top: 13,
    // alignSelf:'flex-end',
    // marginRight:'5%',
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
    // alignSelf: 'center',
    // alignItems: 'center',
    // width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
  policyText: {
    alignSelf: 'center',
    marginTop: '2%',
    color: BLACK.appDark,
    fontFamily: FONT.Nunito.regular,
  },
});
