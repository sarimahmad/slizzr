import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { FONT, SCREEN } from '../../helper/Constant';

const ButtonResetPassaword = props => {
  return (
    <TouchableOpacity onPress={props.data} style={styles.btnContainer}>
      <Text style={styles.btnText}>{props.btnLabel} </Text>
    </TouchableOpacity>
  );
};
export default ButtonResetPassaword;

const styles = StyleSheet.create({
  btnContainer: {
    width: SCREEN.width - 40,
    alignSelf:'center',
    borderRadius: 25,
    height: 55,
    justifyContent: 'center',
    backgroundColor: 'grey',
    marginTop: 26,
  },
  btnText: {
    fontFamily:FONT.Nunito.bold,
    textAlignVertical: 'center',
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
