/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable react-hooks/rules-of-hooks */

import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {connect} from 'react-redux';

import * as userActions from '../../redux/actions/user';
import {WHITE} from '../../helper/Color';
import messaging from '@react-native-firebase/messaging';
import NotifService from '../../helper/NotifService';
import PushNotification, {Importance} from 'react-native-push-notification';

const splash = props => {
  const [fcmToken, setFcmToken] = React.useState(null);
  const [registerToken, setRegisterToken] = useState(null);
  const [messageRegister, setMessageRegister] = useState(null);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      checkUSer();
    });

    return unsubscribe;
  }, [checkUSer, props.navigation]);

  useEffect(() => {
    getToken();
    localNotif()
    requestUserPermission();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     // console.log(remoteMessage)
  //   });
  //   return unsubscribe;
  // }, []);
  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('FCMTOKEN', token);
    AsyncStorage.setItem('FCMTOKEN', token);

    this.notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
  }
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      registerAppWithFCM();
      console.log('Authorization status:', authStatus);
    }
  };
// 

function localNotif(title,message) {
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: "default-channel-id",
    ticker: 'My Notification Ticker', // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
    subText: 'This is a subText', // (optional) default: none
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: 'group', // (optional) add group to message
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

    when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

    /* iOS only properties */
    category: '', // (optional) default: empty string
    subtitle: 'My Notification Subtitle', // (optional) smaller title below notification title

    /* iOS and Android properties */
    title: title, // (optional)
    message: message, // (required)
    number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  });}
//fl9ZzRl_SZCj7rT4aqTzdd:APA91bG6XEiv9YBr3H209-LsB-pa-420tca7QSBO1voxVWieAZ3yIpLDiOjIwKNoIcgsuaZon_FMZfctsBy4Y20UxqfHxetNt8PKTq_rB6tzEI7kLVN4D_bQP_NvqaC40QjNZ_CTdVvv
  async function getToken() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
  }

  async function onRegister(token) {
    setRegisterToken(token);
    setMessageRegister(true);
    this.setState({registerToken: token.token, fcmRegistered: true});
  }
  async function onNotif(notif) {
    Alert.alert(notif.title);
    localNotif(notif.title,notif.message)
   
  }

  const checkUSer = async () => {
    localNotif("notif.title","notif.message")
   
    const userDetail = await AsyncStorage.getItem('userdetail');
    const TOKEN = await AsyncStorage.getItem('token');
console.log(TOKEN)
    setTimeout(async () => {
      if (userDetail) {
        const userParsed = JSON.parse(userDetail);
        if (userParsed.email_verified === true) {
          if (userParsed.age && parseInt(userParsed.age) > 16) {
            props.callApi(JSON.parse(userDetail), JSON.parse(TOKEN));
            props.navigation.navigate('HomeStack');
          } else {
            props.callApi(JSON.parse(userDetail), JSON.parse(TOKEN));
            props.navigation.navigate('BirthDateSplash', {from: 'splash'});
          }
        } else {
          Alert.alert(
            'Email not Verified',
            'Please verify your email ' +
              userParsed.email +
              ' and sign in again',
            [
              {
                text: 'Ok',
                onPress: () => {
                  AsyncStorage.clear();
                  props.navigation.navigate('AccountStack');
                },
              },
            ],
          );
        }
      } else if (!userDetail) {
        props.navigation.navigate('AccountStack');
      }
    }, 100);
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE.dark,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, uid) => dispatch(userActions.alterUser({user, uid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(splash);
