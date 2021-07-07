/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Linking,
  Switch,
  Modal,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux'
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import Loader from '../../component/Loader';
import {DeleteUser, updateProfile} from '../../helper/Api'
import ErrorPopup from '../../component/ErrorPopup';
import firestore from '@react-native-firebase/firestore';
import Slider from '@react-native-community/slider';
import * as userActions from '../../redux/actions/user';
import Geolocation from 'react-native-geolocation-service';
import ConfirmPopup from '../../component/ConfirmPopup';
 class settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      pushNotifications:false,
      profileVisibility:false,
      isModalVisible: false,
      popUpError: false,
      btnOneText: '',
      errorTitle: '',
      errorText: '',
      btnTwoText: '',
      radius:0,
      enableLocation:false,
      confirmPopup:false,
     
    };
  }
  componentDidMount(){
   this.getLocation()
    if(this.props.userDetail){
    this.setState({profileVisibility:this.props.userDetail.Visibility})
    this.setState({pushNotifications:this.props.userDetail.PushNotification})
    this.setState({radius:this.props.userDetail.Radius})
    }
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
      this.setState({
        loading: false,
      });
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        this.setState({enableLocation: true,});
        console.log(this.state.enableLocation)
      },
      error => {
        this.setState({
          loading: false,
       
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
 updateProfile=async(value,type)=>{
   
    let updatedData={};
    if(type==="profileVisibility"){
   updatedData={Visibility :value}
   this.setState({profileVisibility:value})
    
    }
   else if(type==="pushNotifications"){
    updatedData={PushNotification: value}
    this.setState({pushNotifications:value})
   
  }else if(type==="radius"){
    updatedData={"Radius":value}
    this.setState({radius:value})
   
  }
   this.setState({loading:true})
   
    await updateProfile(this.props.userToken,updatedData).then(
      response => {
    this.getUserFromFirestore(this.props.userToken);
        
  },);
  }
  
  getUserFromFirestore = id => {
    const usersRef = firestore().collection('users');
    usersRef
      .doc(id)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          return;
        } else {
          this.props.callApi(firestoreDocument.data(), id);
          console.log(firestoreDocument._data)
          this.setState({
            loading: false,
           });
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({
          loading: false,
        });
      });
  };
  removeAccount = async ()=>{
    
    await DeleteUser(this.props.userToken).then(
      response => {
        if(response.status===200){
          this.setState({confirmPopup:false})
        AsyncStorage.clear();
        this.props.navigation.dispatch(StackActions.popToTop());
        }else{
          this.setState({confirmPopup:false})
          alert("Failed Deleting Account")
        }
     }
    )

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
            {this.state.enableLocation === false &&
            <View style={{width:SCREEN.width,height:SCREEN.height*0.5,alignItems:'center',justifyContent: 'center',}}>
                <Image
              source={require('../../assets/loader.png')}
              style={{ opacity:0.5}}
            />
          <View style={{position: 'absolute',height:SCREEN.height*0.5,alignSelf:'center'}}>
            <Image
              source={require('../../assets/Slizzer-icon/locationIcon.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.textStyle}>Enable Location</Text>
            <Text style={[styles.lowerText,{textAlign:'center'}]}>
              Allow location to turn on and set the radius to find nearby events
              or people
            </Text>
            <TouchableOpacity onPress={()=>this.getLocation()} style={styles.btn1}>
              <Text> ALLOW LOCATION</Text>
            </TouchableOpacity>

            </View>
            </View>
   }
           {this.state.enableLocation === true &&
            <View style={{marginVertical:10}}>
              <Text style={[styles.lowerText,{textAlign:'center',marginTop:10}]}>Set the radius to find nearby events or people</Text>
            <Image
              source={require('../../assets/loader.png')}
              style={{ alignSelf: 'center',}}
            />
               <View style={styles.sliderBox}>
            <Text> {this.state.radius} KM</Text>
            </View>

             <Slider 
           value={this.state.radius}
           maximumValue={100}
           thumbTintColor={'#F818D9'}
           thumbTouchSize={styles.thumbSize}
           trackStyle={'lightgrey'}
           onValueChange={(value) => this.updateProfile(value,"radius")} />
          
         
            </View>
   }
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
                <Switch
                 style={[styles.icon, {width: 55, height: 37}]}
            
                 trackColor={{ false: "lightgrey", true: "lightgrey" }}
                 thumbColor={this.state.pushNotifications ? "#F818D9" : "grey"}
                  ios_backgroundColor="lightgrey"
        onValueChange={(value)=>this.updateProfile(value,"pushNotifications")}
        value={this.state.pushNotifications}
      />
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowView}>
                <Text style={styles.textView}>
                  Profile Visibility in People Radar
                </Text>
                <Switch
                 style={[styles.icon, {width: 55, height: 37}]}
            
        trackColor={{ false: "lightgrey", true: "lightgrey" }}
        thumbColor={this.state.profileVisibility ? "#F818D9" : "grey"}
        ios_backgroundColor="lightgrey"
        onValueChange={(value)=>this.updateProfile(value,"profileVisibility")}
        value={this.state.profileVisibility}
      />
              </TouchableOpacity>
              <TouchableOpacity  onPress={() =>
                      Linking.openURL(
                        'https://slizzrapp.com/#privacy-and-cookie-policy',
                      )
                    } style={styles.rowView}>
                <Text style={styles.textView}>Privacy Policy</Text>
                <Image  
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>
                      Linking.openURL('https://slizzrapp.com/#terms-of-service')
                    }  style={styles.rowView}>
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
                  AsyncStorage.clear();
                  this.props.navigation.dispatch(StackActions.popToTop());
                }}
                style={styles.rowView}>
                <Text style={styles.textView}>Logout</Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Slizzer-icon/Right.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>       this.setState({confirmPopup:true})            }
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
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.confirmPopup === true && <ConfirmPopup    
                delete={()=>this.removeAccount()}
                cancel={()=>this.setState({confirmPopup:false})}
                />}
     
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
    callApi: (user, uid) => dispatch(userActions.setUser({user, uid})),
 
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(settings);

const styles = StyleSheet.create({
  wrapperview: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  thumbSize:{
  height:30
  },
  sliderBox:{
    alignSelf:'center',marginVertical:10,height:53,width:91,borderRadius:10,backgroundColor:'white',elevation:6,alignItems:'center',justifyContent: 'center',
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
    marginTop: 30,
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
