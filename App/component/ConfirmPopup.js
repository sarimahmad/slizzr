import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { DeleteUser } from '../helper/Api';
import { FONT, SCREEN } from '../helper/Constant';

export default class ConfirmPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
removeAccount=async()=>{
    }
  render() {
    return (
        <TouchableOpacity onPress={this.props.cancel} style={styles.modalBackground}>
        <View style={styles.innerBox}>
        <Text style={[styles.lowerText,{textAlign:'center',paddingTop:10,fontWeight:'bold',marginHorizontal:20}]}>Are you sure you want to permenently delete your account?</Text>
        <Text style={[styles.lowerText,{fontSize:14}]}>This account will no longer be available and all data in the account will be permenetly deleted.</Text>
       <View style={{flex:1,justifyContent: 'flex-end',margin:10}}>
        <View style={{bottom:0,flexDirection:'row',justifyContent: 'space-between',}}>
        <TouchableOpacity
      onPress={this.props.cancel}
      style={[
        styles.btnContainer,
        {backgroundColor: 'white',borderWidth:1,borderColor:'lightgrey'},
      ]}>
      <Text style={[styles.btnText,{color:'grey'}]}>Cancel ,Keep Account</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={this.props.delete}
    style={[
        styles.btnContainer,
        {backgroundColor: 'red'},
      ]}>
      <Text style={styles.btnText}>Delete Account</Text>
    </TouchableOpacity>
        </View>
        </View>
    </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    modalBackground: {
    height:SCREEN.height,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
      },
     innerBox:{
        height:SCREEN.height*0.4,
        width:SCREEN.width*0.9,
        alignSelf:'center',backgroundColor:'white',
        paddingHorizontal:5,borderRadius:12,
       
     },
    btnContainer: {
      width: 140,
      alignSelf: 'center',
      borderRadius: 12,
      height: 55,
      justifyContent: 'center',
      marginTop: 26,
    },
    btnText: {
      fontFamily: FONT.Nunito.bold,
      textAlignVertical: 'center',
      fontSize: 12,
      textAlign: 'center',
      color: '#FFFFFF',
    },
    lowerText: {
        fontFamily: FONT.Nunito.regular,
        fontSize: 17,
        marginHorizontal: 10,
        alignSelf: 'center',
        marginTop: 8,
      },
  });
  