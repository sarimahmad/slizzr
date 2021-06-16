/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import { FONT, SCREEN } from '../../helper/Constant';
import { BLACK } from '../../helper/Color';


function HeaderWithOptionBtn({ leftPress, headerTitle,rightIconText, leftIcon,profileIcon, rightPress, rightIcon, backColor, borderBottom,centerIcon,searchIcon }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        width: SCREEN.width,
        paddingHorizontal: 30,
        alignSelf: 'center',
        backgroundColor: backColor ? backColor : BLACK.dark,
        borderBottomColor: BLACK.border,
        borderBottomWidth: borderBottom ? 1 : 0,
      }}>
      {leftPress &&
        <TouchableOpacity
          onPress={leftPress}
          activeOpacity={0.85} style={{ position: 'absolute', left: 20, justifyContent: 'center', alignItems: 'center', height: 20, width: 20 }}>
          <Image source={leftIcon} style={{ height: 40, width: 40, justifyContent: 'center' }} />
        </TouchableOpacity>}
        {profileIcon &&

      <Image
      style={{position: 'absolute',left: 60, justifyContent: 'center', alignItems: 'center', height: 40, width: 40}}
      source={require('../../assets/profile1.png')}
    />}

        {centerIcon &&
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{
        flexDirection: 'row', alignItems: 'center',
      }}>
      <Image source={centerIcon} style={{  justifyContent: 'center' }} />
      </View>
    </View>
      }
{headerTitle &&
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center',
        }}>
          <Text style={{ fontSize: 17, fontFamily: FONT.Nunito.bold, color: BLACK.app }}>{headerTitle}</Text>
        </View>
      </View>
}
{rightIconText && <TouchableHighlight
        underlayColor={backColor}
        onPress={rightPress}
        style={{
          width: 35,
          height: 35,
          backgroundColor:'white',
          elevation:5,
          borderRadius:24,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
       <Text style={{fontFamily:FONT.Nunito.bold,fontSize:12,color:'#B2ABB1'}}>{rightIconText}</Text>
      </TouchableHighlight>}
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
          style={{  resizeMode: 'contain' }}
        />
      </TouchableHighlight>}
      {searchIcon && <TouchableHighlight
        underlayColor={backColor}
        onPress={rightPress}
        style={{
          width: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
       <View
              style={[

                {
                  elevation: 6,
                  marginRight: 5,
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 24,
                },
              ]}>
              <Image source={searchIcon} />
            </View>
      </TouchableHighlight>}
    </View>
  );
}

export default HeaderWithOptionBtn;
