/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { SCREEN } from '../../helper/Constant';
import { BLACK } from '../../helper/Color';

function HeaderWithLogo({ leftPress, leftIcon, rightPress, rightIcon, backColor, borderBottom,relation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        width: SCREEN.width,
        paddingHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: backColor,
        borderBottomColor: BLACK.border,
        borderBottomWidth: borderBottom ? 1 : 0,
      }}>
      {leftPress &&
        <TouchableOpacity
          onPress={leftPress}
          activeOpacity={0.85} style={{justifyContent: 'center', alignItems: 'center', height: 20, width: 20}}>
          <Image source={leftIcon} style={{ height: 40, width: 40, borderRadius: 20 }} />
        </TouchableOpacity>}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center',
        }}>
          <Image source={require('../../assets/homeLogo.png')} />
        </View>
      </View>
      {(rightIcon && relation===false) &&<TouchableOpacity
        underlayColor={backColor}
        onPress={rightPress}
        style={{
          width: 35,
          height: 35,
          borderRadius:18,
          backgroundColor:'white',
          elevation:3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={rightIcon}
          style={{ height: 40, width: 40, borderRadius: 20 }}
        />
      </TouchableOpacity>}
    </View>
  );
}

export default HeaderWithLogo;
