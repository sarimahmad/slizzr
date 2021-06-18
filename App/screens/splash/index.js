/* eslint-disable radix */
/* eslint-disable react-hooks/rules-of-hooks */

import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';

import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';

import {WHITE} from '../../helper/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const splash = props => {
  useEffect(() => {
    checkUSer();
  });

  const checkUSer = async () => {
    // AsyncStorage.clear();
    const userDetail = await AsyncStorage.getItem('userdetail');
    const TOKEN = await AsyncStorage.getItem('token');

    setTimeout(async () => {
      if (userDetail) {
        const userParsed = JSON.parse(userDetail);
        if (userParsed.user.email_verified === true) {
          if (userParsed.user.age && parseInt(userParsed.user.age) > 16) {
            props.callApi(JSON.parse(userDetail).user, JSON.parse(TOKEN));
            props.navigation.navigate('HomeStack');
          } else {
            props.callApi(JSON.parse(userDetail).user, JSON.parse(TOKEN));
            props.navigation.navigate('BirthDateSplash', {from: 'splash'});
          }
        } else {
          Alert.alert(
            'Email not Verified',
            'Please verify your email ' +
              userParsed.user.email +
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
