import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SCREEN } from '../../helper/Constant';

const TextField = props => {
  const [showPassword, setShowPassword] = useState(true);

  const handleText = text => {
    props.parentCallBack(text, props.type);
  };
  return (
    <View>
         {/* {props.secure === 'no' && ( */}
        <View style={[styles.inputView,props.type== "small" ?  {width:(SCREEN.width-40)/2.1} : {width:SCREEN.width-40}]}>
          <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            placeholderTextColor={'#8e8e93'}
            onChangeText={handleText}></TextInput>
        </View>
         {/* )} */}
      {/* {props.secure === 'yes' && (
        <View style={styles.flex}>
           <View style={styles.inputPasssword}>
      
          <TextInput  
            style={styles.passwordInput}
            secureTextEntry={showPassword}
            placeholder={props.placeholder}
            onChangeText={handleText}
            placeholderTextColor={'#8e8e93'}
            ></TextInput>
         </View>
          <View style={styles.eyeView}>
            
              <TouchableOpacity style={{marginRight:10,marginTop:5}} onPress={() => setShowPassword(!showPassword)}>
                <Image source={showPassword == true ? require('../../assets/shape.png') : require('../../assets/eyeclose.png') } />
              </TouchableOpacity>
          </View> 
        </View>
      )}*/}
    </View>
  );
};
export default TextField;

const styles = StyleSheet.create({
  inputView: {
    alignSelf:"center",
    height: 53,
    marginTop:20
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
    marginTop:'5%',
    borderWidth: 2,
    borderColor: 'lightgrey',
    opacity: 0.4,

    color: 'lightgrey',
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
    height:50,
    borderWidth: 2,
    borderColor: 'lightgrey',
    opacity: 0.4,

    color: 'lightgrey',
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

