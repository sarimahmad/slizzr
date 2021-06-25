/* eslint-disable react-native/no-inline-styles */
// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {FONT, SCREEN} from '../helper/Constant';

const CustomSidebarMenu = props => {
  const [userObject, setUserObject] = useState({});
  useEffect(() => {
    async function fetchData() {
      const userDetail = await AsyncStorage.getItem('userdetail');
      setUserObject(JSON.parse(userDetail));
    }
    fetchData();
  });
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 100,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/LogoDrawer.png')}
          style={styles.logoDrawer}
        />
      </View>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            props.navigation.navigate('myProfile', {from: 'drawer'})
          }>
          <View style={styles.NameDetailWrapper}>
            {userObject && userObject.user ? (
              <Image
                source={{uri: userObject.user.Profile}}
                style={styles.logo}
              />
            ) : (
              <View style={styles.logo} />
            )}

            <Text style={styles.EmailText}>
              {userObject && userObject.user
                ? userObject.user.FirstName
                : 'User'}
            </Text>
          </View>
        </TouchableOpacity>

        <DrawerContentScrollView {...props}>
          <View>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoDrawer: {
    marginVertical: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderRadius: 30,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 40,
  },
  RowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  UserImageWrapper: {
    height: 40,
    width: 40,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  NameDetailWrapper: {
    marginLeft: 15,
    flexDirection: 'row',
  },
  Nametext: {
    fontSize: 16,
    color: 'rgba(120, 120, 120, 1)',
    fontWeight: '400',
  },
  EmailText: {
    fontSize: 20,
    fontFamily: FONT.Nunito.bold,
    alignSelf: 'center',
    color: 'rgba(30, 30, 30, 1)',
    marginLeft: 10,
    width: SCREEN.width / 2.7,
  },
  AbsoluteRightIcon: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
