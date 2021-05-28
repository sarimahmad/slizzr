/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import { BLACK, BLUE, WHITE } from '../../helper/Color';

function HeaderWithOptionBtn({ leftPress, headerTitle, leftIcon, rightPress, rightIcon, backColor, borderBottom }) {
  const [searchToggle, setSearchToggle] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        height: isIphoneXorAbove ? 100 : 80,
        alignItems: 'center',
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
          activeOpacity={0.85} style={{ position: 'absolute', left: 20, justifyContent: 'center', alignItems: 'center', height: 20, width: 20, }}>
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
          <Text style={{ fontSize: 18, fontFamily: FONT.Nunito.bold, color: BLACK.app, marginLeft: 10 }}>{headerTitle}</Text>
        </View>
      </View>
      {rightIcon && <TouchableHighlight
        underlayColor={backColor}
        onPress={rightPress}
        style={{
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={rightIcon}
          style={{ height: 40, width: 40, resizeMode: 'contain' }}
        />
      </TouchableHighlight>}
    </View>
  );
}

export default HeaderWithOptionBtn;
