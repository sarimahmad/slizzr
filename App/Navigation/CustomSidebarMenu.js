// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { BLACK, BLUE, WHITE } from '../helper/Color';
import { FONT, SCREEN } from '../helper/Constant';
// import colors from '../config/colors';
// import Icon from "../components/Icon";

const CustomSidebarMenu = (props) => {

  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <View style={{ flex: 1, }}>
       
      
      <View style={{  height: 100, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
      <Image source={require('../assets/LogoDrawer.png')} style={styles.logoDrawer} />
        
      </View>
      <SafeAreaView style={{ flex: 1, }}>
       
          <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('Account')}>
           
            <View style={styles.NameDetailWrapper}>
            <Image source={require('../assets/profilePic.png')} style={styles.logo} />
     
              <Text style={styles.EmailText}>
              Zoya Rajput
            </Text>
            </View>
          </TouchableOpacity>
        
     
        <DrawerContentScrollView {...props}>
          <View >
            <DrawerItemList {...props} />
          </View>
        
        </DrawerContentScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoDrawer:{
  marginVertical:20
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
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
    backgroundColor:'white',
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
    marginLeft: 15,flexDirection:'row',
  },
  Nametext: {
    fontSize: 16,
    color: 'rgba(120, 120, 120, 1)',
    fontWeight: '400',
  },
  EmailText: {
    fontSize: 16,
    fontFamily:FONT.Nunito.bold,
    alignSelf:'center',
    color: 'rgba(120, 120, 120, 1)',
  
  },
  AbsoluteRightIcon: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CustomSidebarMenu;
