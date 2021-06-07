import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

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
    width: '100%',
    borderRadius: 25,
    height: 55,
    justifyContent: 'center',
    backgroundColor: 'grey',

    marginTop: 26,
  },
  btnText: {
    textAlignVertical: 'center',
    fontSize: 16,
    textAlign: 'center',
    color: '#f1f1f2',
  },
});
