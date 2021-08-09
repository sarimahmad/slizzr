/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {BLACK} from '../../helper/Color';

import {SCREEN} from '../../helper/Constant';

const TextField = props => {
  const [showPassword, setShowPassword] = useState(true);

  const handleText = text => {
    props.parentCallBack(text, props.type);
  };
  return (
    <View>
      {/* {props.secure === 'no' && ( */}
      <View
        style={[
          styles.inputView,
          props.typeSize === 'small'
            ? {width: (SCREEN.width - 40) / 2.1}
            : {width: SCREEN.width - 40},
        ]}>
        {props.type === 'password' ? (
          <View>
          <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            placeholderTextColor={'#B2ABB1'}
            secureTextEntry={showPassword}
            onChangeText={handleText}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: 10,
            height: 40,
            backgroundColor:'red',
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props.type === 'password' && showPassword === true && (
            <Image
              style={{
                height: 40,
                backgroundColor:'red',
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../assets/eyeImage.png')}
            />
          )}
          {props.type === 'password' && showPassword === false && (
            <Image
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../assets/eyeclose.png')}
            />
          )}
        </TouchableOpacity>
</View>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              placeholder={props.placeholder}
              placeholderTextColor={'#B2ABB1'}
              onChangeText={handleText}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};
export default TextField;

const styles = StyleSheet.create({
  inputView: {
    alignSelf: 'center',
    height: 53,
    marginTop: 20,
    justifyContent: 'center',
  },
  inputPasssword: {
    // width: wp('80%'),
  },
  eyeView: {
    paddingTop: 10,
  },
  flex: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
    paddingLeft: 0,
    marginTop: '5%',
    borderWidth: 2,
    borderColor: 'lightgrey',

    color: 'black',
    opacity: 1,
    borderRadius: 12,
  },
  passwordInput: {
    color: 'lightgrey',
  },
  input: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
    paddingLeft: 20,
    height: 50,
    borderWidth: 2,
    borderColor: 'lightgrey',

    color: 'black',
    opacity: 1,
    borderRadius: 12,
  },
  errorLabel: {
    color: 'red',
  },
  errorView: {
    marginLeft: 20,
  },
});
