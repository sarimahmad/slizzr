/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

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
        {props.type === 'password' || props.type === 'confirmPassword' ? (
          <View   style={styles.input}
          >
        
            <TextInput
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
                    top:6
                 }}>
                 {(props.type === 'password' || props.type === 'confirmPassword') && showPassword === true && (
                 
                  <Image
                     style={{
                      height: 30,
                      width: 30,
                      justifyContent: 'center',
                       alignItems: 'center',
                     }}
                     source={require('../../assets/eyeImage.png')}
                   />
                 )}
                 {(props.type === 'password' || props.type === 'confirmPassword') && showPassword === false && (
                   
                   <Image
                     style={{
                       height: 30,
                       width: 30,
                       justifyContent: 'center',
                       alignItems: 'center',
                     }}
                     source={require('../../assets/eyeImage.png')}
                 
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
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  errorLabel: {
    color: 'red',
  },
  errorView: {
    marginLeft: 20,
  },
});
