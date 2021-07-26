/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable react-hooks/rules-of-hooks */

import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {connect} from 'react-redux';

import * as userActions from '../../redux/actions/user';
import {WHITE} from '../../helper/Color';
import messaging from '@react-native-firebase/messaging';

const splash = props => {
  const [fcmToken, setFcmToken] = React.useState(null);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      checkUSer();
    });

    return unsubscribe;
  }, [checkUSer, props.navigation]);

  useEffect(() => {
    getToken();
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // console.log(remoteMessage)
    });
    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  //fl9ZzRl_SZCj7rT4aqTzdd:APA91bG6XEiv9YBr3H209-LsB-pa-420tca7QSBO1voxVWieAZ3yIpLDiOjIwKNoIcgsuaZon_FMZfctsBy4Y20UxqfHxetNt8PKTq_rB6tzEI7kLVN4D_bQP_NvqaC40QjNZ_CTdVvv
  async function getToken() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
  }
  const checkUSer = async () => {
    // AsyncStorage.clear();
    const userDetail = await AsyncStorage.getItem('userdetail');
    const TOKEN = await AsyncStorage.getItem('token');

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
