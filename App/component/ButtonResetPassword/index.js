import React from 'react'
import {TouchableOpacity,Text, StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ButtonResetPassaword = props =>{ 
   
    return (  
        <TouchableOpacity  onPress={props.data}
          style={styles.btnContainer}
           >
          <Text style={styles.btnText}>{props.btnLabel} </Text>
        </TouchableOpacity>
         )
}
export default ButtonResetPassaword

const styles = StyleSheet.create({
  btnContainer:{
    width:wp('90%'), 
    borderRadius:25,
    height:hp('8%'),
    backgroundColor:'grey',
    marginBottom:'2%', 
    marginTop:'2%',
    },
    btnText:{
      textAlignVertical: 'center',
        fontSize: 16,
        color:'white',
        textAlign:'center',
        paddingTop:'5%',
        color:'#f1f1f2'

    }
});