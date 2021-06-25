/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FONT, SCREEN } from '../../helper/Constant';
import { BLACK } from '../../helper/Color';


function ErrorPopup({ cancelButtonPress,doneButtonPress, errorTitle,errorText, btnOneText, btnTwoText  }) {
  return (
    <View style={{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
      <View style={{backgroundColor:'white',width:SCREEN.width,alignItems:'center',paddingVertical:20}}>
        {errorTitle && errorTitle !== '' &&
        <View>
            <Text style={styles.titleText}>{errorTitle}</Text>
        </View>
        }
        {errorText && errorText !== '' &&
        <View>
            <Text style={styles.errorText}>{errorText}</Text>
        </View>
        }
              {btnOneText && btnOneText !== '' && <TouchableOpacity
              style={styles.btnDone}
              onPress={cancelButtonPress}>
              <Text style={styles.btnDoneText}>{btnOneText}</Text>
            </TouchableOpacity>}
            {btnTwoText && btnTwoText !== '' && <TouchableOpacity
            style={styles.btnCancel}
            onPress={doneButtonPress}>
            <Text style={styles.btnCancelText}>{btnTwoText}</Text>
          </TouchableOpacity>}

          </View>
    </View>
  );
}

const styles = StyleSheet.create({
    titleText: {
        color: BLACK.textInputTitle,
        fontFamily: FONT.Nunito.bold,
        fontSize: 17,
        textAlign:'center',
        marginBottom:20,
      },
      errorText: {
        fontSize: 12,
        textAlign:'center',
        height:150,
        color: BLACK.grey,
        fontFamily: FONT.Nunito.regular,
        marginBottom:20,
      },
    btnDone: {
        marginTop: 10,
        width: SCREEN.width - 40,
        borderRadius: 25,
        height: 55,
        marginBottom: 20,
        backgroundColor: '#F818D9',
        justifyContent: 'center',
      },
      btnDoneText: {
        fontSize: 17,
        textAlign: 'center',
        color: 'white',
        fontFamily: FONT.Nunito.bold,
      },
      btnCancelText: {
        fontSize: 17,
        textAlign: 'center',
        color: 'black',
        fontFamily: FONT.Nunito.bold,
      },

      btnCancel: {
        width: SCREEN.width - 40,
        borderRadius: 25,
        marginBottom: 20,
        alignItems:'center',
        // backgroundColor: 'black',
        justifyContent: 'center',
      },

});

export default ErrorPopup;
