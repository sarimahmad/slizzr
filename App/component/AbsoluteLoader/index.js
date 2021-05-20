/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, ActivityIndicator, View} from 'react-native';

import {FONT, SCREEN} from '../../helper/Constant';
import {BLACK, WHITE} from '../../helper/Color';

function AbsoluteLoader({loadingText}) {
  return (
    <View
      style={{
        width: SCREEN.width,
        alignSelf: 'center',
        height: SCREEN.height,
        position: 'absolute',
        backgroundColor: BLACK.transParent,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{fontSize: 20, fontFamily: FONT.semiBold, color: WHITE.dark}}>
        {loadingText}
      </Text>
      <ActivityIndicator size={'large'} color={WHITE.dark} />
    </View>
  );
}

export default AbsoluteLoader;
