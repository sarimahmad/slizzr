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
  PermissionsAndroid,
  ToastAndroid,
  Image,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {openSettings} from 'react-native-permissions';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';

import DateAndTimePicker from '../../component/DateAndTimePicker';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import storage from '@react-native-firebase/storage';
import WaitingFor from '../../component/WaitingFor';
import moment from 'moment';
import ErrorPopup from '../../component/ErrorPopup';

let allEvents = [];
let prepaidEvents = [];
let scanEvents = [];
let freeEvents = [];

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listView: false,
      mapView: true,
      enableLocation: false,
      date: new Date(),
      index: 0,
      allEvents: [],
      prepaidEvents: [],
      scanEvents: [],
      freeEvents: [],
      allLocations: [],
      currentData: [],
      popUpError: false,
      btnOneText: '',
      errorTitle: '',
      errorText: '',
    };
  }
  componentDidMount() {
    this.getEvents('start');
    this.getLocation();
  }
  hasPermissionIOS = async () => {
    const openSetting = () => {
      openSettings().catch(() => console.warn('cannot open settings'));
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
    }

    if (status === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow Slizzr to determine your location.',
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocation = async () => {
    const hasPermission = await this.hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        this.setState({enableLocation: true});
        console.log(position);
      },
      error => {
        this.setState({
          loading: false,
          errorTitle: 'USER ERROR',
          errorText: JSON.stringify(error),
          btnOneText: 'Ok',
          popUpError: true,
        });
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  };

  async getEvents(type) {
    allEvents = [];
    prepaidEvents = [];
    scanEvents = [];
    freeEvents = [];
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://slizzr-6a887.appspot.com/event?recent=TRUE&radius=50&lat=31.5203696&long=74.35874729999999&page=1&limit=2',
      requestOptions,
    )
      .then(response => response.json())
      .then(async querySnapShot => {
        await querySnapShot.Events.forEach(async doc => {
          await this.getImageUrl(doc.image).then(async res => {
            let event = {
              Description: doc.Description,
              id: doc.id,
              Name: doc.Name,
              EventType: doc.EventType,
              imageUrl: res,
              coordinate: {
                latitude: doc.Latitude,
                longitude: doc.Longitude,
              },
              Address: doc.Address,
              DateTime: doc.DateTime,
              userName: doc.userName,
              ...doc,
            };

            allEvents.push(event);
            if (event.EventType === 'PREPAID') {
              prepaidEvents.push(event);
            } else if (event.EventType === 'SCAN') {
              scanEvents.push(event);
            } else if (event.EventType === 'FREE') {
              freeEvents.push(event);
            }
            if (allEvents.length === querySnapShot.Events.length) {
              if (type === 'update') {
                this.state.index === 0
                  ? this.setState({currentData: allEvents})
                  : this.state.index === 2
                  ? this.setState({currentData: prepaidEvents})
                  : this.state.index === 3
                  ? this.setState({currentData: scanEvents})
                  : this.setState({currentData: freeEvents});
              } else {
                this.setState({currentData: allEvents});
              }
              this.setState({allEvents: allEvents});
              this.setState({prepaidEvents: prepaidEvents});
              this.setState({scanEvents: scanEvents});
              this.setState({freeEvents: freeEvents});
              this.setState({loading: false});
            }
          });
        });
      })
      .then(() => {
        console.log(this.state.allEvents);
      })

      .catch(error => {
        this.setState({
          loading: false,
          errorTitle: 'ERROR',
          errorText: JSON.stringify(error),
          btnOneText: 'Ok',
          popUpError: true,
        });
      });
  }
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({date: currentDate});
    this.setState({showDate: false});
  };

  showDatepicker = () => {
    this.setState({showDate: true});
  };
  getImageUrl = async imageName => {
    let imageRef = storage().ref('/' + imageName);
    return imageRef.getDownloadURL().catch(e =>
      this.setState({
        loading: false,
        errorTitle: 'ERROR',
        errorText: JSON.stringify(e),
        btnOneText: 'Ok',
        popUpError: true,
      }),
    );
  };

  barTapped = indexTap => {
    if (indexTap === 0) {
      this.setState({index: 0, currentData: this.state.allEvents});
    } else if (indexTap === 1) {
      this.setState({index: 1});
    } else if (indexTap === 2) {
      this.setState({index: 2, currentData: this.state.prepaidEvents});
    }
    if (indexTap === 3) {
      this.setState({index: 3, currentData: this.state.scanEvents});
    }
    if (indexTap === 4) {
      this.setState({index: 4, currentData: this.state.freeEvents});
    }
    this.getEvents('update');
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
          {this.state.currentData.length !== 0 && (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => console.log('Reach end')}
              data={this.state.currentData}
              refreshing={true}
              renderItem={({item}) => (
                <View
                  style={{
                    minHeight: 80,
                    borderBottomColor: 'lightgrey',
                    borderBottomWidth: 1,
                    width: SCREEN.width,
                  }}>
                  <View
                    style={[
                      styles.flexRow,
                      {width: SCREEN.width - 20, alignItems: 'center'},
                    ]}>
                    <View style={styles.imgView}>
                      <Image
                        source={{uri: item.imageUrl}}
                        style={{borderRadius: 44, height: 60, width: 60}}
                      />

                      <Image
                        style={{position: 'absolute', right: -10}}
                        source={require('../../assets/private.png')}
                      />
                    </View>

                    <View style={styles.detail}>
                      <Text style={styles.titleText}>{item.Name}</Text>
                      <Text style={styles.adressText}>
                        Host: {item.Host.displayName}
                      </Text>
                      <Text style={styles.purpleText}>
                        {moment(item.datetime).format(
                          'hh:mm A | MMM DD, YYYY - ddd',
                        )}
                      </Text>
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
                        this.props.navigation.navigate('eventDetail', {
                          detailItem: item.id,
                          imageUri: item.imageUrl,
                        })
                      }
                      style={styles.shareView}>
                      <Image source={require('../../assets/Right.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
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
        {this.state.currentData.map(
          (marker, index) =>
            marker.location && (
              <MapView.Marker
                key={index.toString()}
                coordinate={{
                  latitude: marker.location.latitude,
                  longitude: marker.location.longitude,
                }}
                onPress={() =>
                  this.props.navigation.navigate('eventDetail', {
                    detailItem: marker.id,
                    imageUri: marker.imageUrl,
                  })
                }
                image={require('../../assets/marker.png')}>
                <Text
                  style={{
                    position: 'absolute',
                    top: 30,
                    fontSize: 25,
                    left: -10,
                    fontFamily: FONT.Nunito.bold,
                  }}>
                  {marker.Name}
                </Text>
              </MapView.Marker>
            ),
        )}
      </MapView>
    );
  };

  searchBar = () => {
    return (
      <View
        style={[
          this.state.enableLocation === false ? {opacity: 0.4} : {opacity: 1},
          {
            position: 'absolute',
            top: 50,
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
            top: SCREEN.height * 0.08,
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
            onPress={() =>
              openSettings().catch(() => console.warn('cannot open settings'))
            }
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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('createEvent')}
          style={[styles.btnMap, {marginTop: 30}]}>
          <Text style={styles.btnText}>HOST AN EVENT</Text>
        </TouchableOpacity>
      </View>
    );
  };
  tapBar = () => {
    return (
      <View style={{paddingBottom: 5}}>
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
              this.state.index === 0 || this.state.index === 5
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
                this.state.index === 0 || this.state.index === 5
                  ? {color: '#F818D9'}
                  : {color: 'black'},
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
            <DateAndTimePicker
              testID="dateTimePicker"
              format="MMM DD, YYYY "
              value={this.state.date}
              mode={'date'}
              is24Hour={true}
              display="default"
              setDateAndTime={date => this.setState({date})}
              onChange={this.onChange}
            />
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
          {this.state.loading === true && <WaitingFor type="Events" />}
          {this.state.loading === false && (
            <View style={styles.wrapperView}>
              {this.tapBar()}

              {this.state.currentData.length !== 0 &&
                this.state.enableLocation === true &&
                this.state.mapView === true &&
                (this.state.index === 0 ||
                  this.state.index === 2 ||
                  this.state.index === 3 ||
                  this.state.index === 4) &&
                this.mapView()}

              {this.state.currentData.length !== 0 &&
                this.state.enableLocation === false &&
                this.state.mapView === true &&
                this.enableLocation()}

              {this.state.currentData.length < 1 && this.noEvent()}

              {this.state.listView === true &&
                (this.state.index === 0 ||
                  this.state.index === 2 ||
                  this.state.index === 3 ||
                  this.state.index === 4) &&
                this.listView()}

              {this.state.currentData.length > 0 && this.searchBar()}

              {this.state.currentData.length > 0 && this.bottomView()}
              {this.state.currentData.length > 0 &&
                (this.state.listView === true ||
                  this.state.mapView === true) && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 155,
                      right: 0,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('createEvent')
                      }
                      style={styles.logoAdd}>
                      <Image source={require('../../assets/plus-circle.png')} />
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          )}
        </SafeAreaView>
        {this.state.popUpError && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() =>
                this.setState({
                  popUpError: false,
                  btnOneText: '',
                  errorTitle: '',
                  errorText: '',
                })
              }
              doneButtonPress={() => this.doneClick()}
              errorTitle={this.state.errorTitle}
              errorText={this.state.errorText}
              btnOneText={this.state.btnOneText}
              btnTwoText={this.state.btnTwoText}
            />
          </Modal>
        )}
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
    callApi: (user, uid) => dispatch(userActions.alterUser({user, uid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(home);

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
    zIndex: 999,
  },
  input: {
    width: SCREEN.width - 40,
    borderWidth: 1,
    height: 53,
    marginVertical: 10,
    borderRadius: 12,
    borderColor: 'lightgrey',
  },
  imgView: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
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
    width: SCREEN.width * 0.55,
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
    backgroundColor: WHITE.dark,
  },
  policyText: {
    alignSelf: 'center',
    marginTop: '2%',
    color: BLACK.appDark,
    fontFamily: FONT.Nunito.regular,
  },
});
