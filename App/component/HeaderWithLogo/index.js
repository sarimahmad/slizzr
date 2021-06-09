/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { SCREEN } from '../../helper/Constant';
import { BLACK } from '../../helper/Color';

function HeaderWithLogo({ leftPress, leftIcon, rightPress, rightIcon, backColor, borderBottom }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'flex-end',
        paddingBottom: 21,
        width: SCREEN.width,
        paddingHorizontal: 30,
        alignSelf: 'center',
        backgroundColor: backColor,
        borderBottomColor: BLACK.border,
        borderBottomWidth: borderBottom ? 1 : 0,
      }}>
      {leftPress &&
        <TouchableOpacity
          onPress={leftPress}
          activeOpacity={0.85} style={{justifyContent: 'center', alignItems: 'center', height: 20, width: 20}}>
          <Image source={leftIcon} style={{ height: 40, width: 40, justifyContent: 'center' }} />
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
      {rightIcon && <TouchableOpacity
        underlayColor={backColor}
        onPress={rightPress}
        style={{
          width: 35,
          height: 35,
          borderRadius:22,
          backgroundColor:'white',
          elevation:3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={rightIcon}
          style={{ height: 28, width: 40, resizeMode: 'contain' }}
        />
      </TouchableOpacity>}
    </View>
  );
}

export default HeaderWithLogo;
