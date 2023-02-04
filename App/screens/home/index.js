/* eslint-disable no-alert */
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
import WaitingFor from '../../component/WaitingFor';
import ErrorPopup from '../../component/ErrorPopup';
import {
  createCustomerStripe,
  updateProfile,
  WelcomeEmail,
} from '../../helper/Api';
import Server from '../../helper/Server';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createFilter} from 'react-native-search-filter';
import moment from 'moment';
let allEvents = [];
let prepaidEvents = [];
let scanEvents = [];
let freeEvents = [];
const KEYS_TO_FILTERS = ['Name', 'DateTime'];

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchTerm: '',
      listView: false,
      mapView: true,
      enableLocation: false,
      date: new Date(),
      index: 0,
      allEvents: [],
      prepaidEvents: [],
      scanEvents: [],
      freeEvents: [],
      allLocations: {
        accuracy: 5,
        altitude: 0,
        altitudeAccuracy: -1,
        heading: -1,
        latitude: 43.7315,
        longitude: -79.7624,
        speed: -1,
      },
      currentData: [],
      popUpError: false,
      btnOneText: '',
      errorTitle: '',
      errorText: '',
      pageNumber: 1,
      StripeId: '',
    };
    this.getLocation = this.getLocation.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }
  componentDidMount() {
    this.updateProfileApi();
    this.getLocation();
    this.checkStripeClientId();
    if (this.props.route.params && this.props.route.params.from === 'signin') {
      this.WelcomeEmail();
    }
  }
  WelcomeEmail = async () => {
    let data = {
      name: this.props.userDetail.displayName,
      email: this.props.userDetail.Email,
    };
    WelcomeEmail(data).then(response => {
      alert(response.data.message);
    });
  };

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }
  updateProfileApi = async () => {
    let token = await AsyncStorage.getItem('FCMTOKEN');
    let platform;
    if (Platform.OS === 'android') {
      platform = 'ANDROID';
    } else {
      platform = 'ios';
    }
    let dataToSend = {
      platform: platform,
      token: token,
    };

    await updateProfile(this.props.userToken, dataToSend).then(response => {
      this.getUserFromFirestore(this.props.userToken);
      this.setState({loading: false});
    });
    this.setState({loading: false});
  };
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
  getUserFromFirestore = id => {
    this.setState({loading: true});
    const usersRef = firestore().collection('users');
    usersRef
      .doc(id)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          return;
        } else {
          this.setState({
            loading: false,
          });
          this.props.callApi(
            firestoreDocument.data(),
            firestoreDocument.data().id,
          );
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          btnOneText: 'Ok',
          errorTitle: 'ERROR',
          errorText: JSON.stringify(error),
          popUpError: true,
        });
      });
  };
  // updateProfile=async(response)=>{
  //  this.setState({loading:true})

  //   await updateProfile(this.props.userToken,response).then(
  //     response => {
  //   this.getUserFromFirestore(this.props.userToken);
  //   console.log(response)
  // },);
  // }
  checkStripeClientId = async () => {
    const userData = this.props.userDetail;

    if (!userData.STRIPE_CUST_ID || userData.STRIPE_CUST_ID === '') {
      await createCustomerStripe({user_id: userData.id}).then(
        async _response => {
          this.setState({StripeId: _response});
          this.setState({loading: true});
          this.getUserFromFirestore(this.props.userToken);
        },
      );
    } else {
      console.log(userData.STRIPE_CUST_ID === '');
    }
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
      this.setState({
        loading: false,
        errorTitle: 'PERMISSION ERROR',
        errorText: 'You need to enable the location permission ',
        btnOneText: 'Ok',
        popUpError: true,
      });
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        this.setState({enableLocation: true, allLocations: position.coords});
        setTimeout(() => {
          this.getEvents('start');
        }, 2000);
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
    this.setState({loading: true});
    allEvents = [];
    prepaidEvents = [];
    scanEvents = [];
    freeEvents = [];
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `${Server}/event?radius=${
        this.props.userDetail && this.props.userDetail.Radius
          ? this.props.userDetail.Radius
          : '5000'
      }&lat=${this.state.allLocations.latitude}&long=${
        this.state.allLocations.longitude
      }&page=${this.state.pageNumber}&limit=30`,
      requestOptions,
    )
      .then(response => response.json())
      .then(async querySnapShot => {
        if (querySnapShot.Events.length > 0) {
          await querySnapShot.Events.forEach(async doc => {
            console.warn(doc);
            let event = {
              Description: doc.Description,
              id: doc.id,
              Name: doc.Name,
              EventType: doc.EventType,
              imageUrl: doc.image,
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
        } else {
          this.setState({loading: false});
        }
      })
      .then(() => {})

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
  onChange = selectedDate => {
    if (selectedDate == undefined) {
      this.searchUpdated('');
    } else {
      const currentDate = selectedDate || this.state.date;
      let term = moment(currentDate).format('DD MMM YYYY');
      console.log(term);
      this.searchUpdated(term);

      this.setState({date: currentDate});
      this.setState({showDate: false});
    }
  };

  showDatepicker = () => {
    this.setState({showDate: true});
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
  eventDetail = item => {
    if (this.props.userDetail.id !== item.Host.id) {
      this.props.navigation.navigate('eventDetail', {
        detailItem: item.id,
      });
    } else {
      this.props.navigation.navigate('myEventInfo', {id: item.id});
    }
  };
  listView = () => {
    const currentData = this.state.currentData.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS),
    );

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          {currentData.length !== 0 && (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => console.log('Reach end')}
              data={currentData}
              refreshing={true}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.eventDetail(item)}
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
                      {item.PublicPrivate === 'Private' && (
                        <Image
                          style={{position: 'absolute', right: -10}}
                          source={require('../../assets/private.png')}
                        />
                      )}
                    </View>

                    <View style={styles.detail}>
                      <Text style={styles.titleText}>{item.Name}</Text>
                      <Text style={styles.adressText}>
                        Host: {item.Host.displayName}
                      </Text>
                      <Text style={styles.purpleText}>{item.DateTime}</Text>
                      <View style={styles.flexRow}>
                        <Image
                          style={{height: 16, width: 12, marginRight: 5}}
                          source={require('../../assets/location.png')}
                        />

                        <Text>{item.Distance} KM</Text>
                      </View>
                    </View>
                    <View style={styles.shareView}>
                      <Image source={require('../../assets/Right.png')} />
                    </View>
                  </View>
                </TouchableOpacity>
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
          latitude: this.state.allLocations.latitude,
          longitude: this.state.allLocations.longitude,
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
            onChangeText={term => {
              this.searchUpdated(term);
            }}
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
              value={this.state.date}
              format="MMM DD, YYYY"
              editable={false}
              mode="date"
              showPreviousDate={'no'}
              type="onlyDate"
              setDateAndTime={date => this.onChange(date)}
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
