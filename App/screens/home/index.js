import React, { Component } from 'react';

import { View, Text,StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image} from 'react-native';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import resetPassword from '../resetPassword';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import TextField from '../../component/TextField';

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
componentDidMount(){
    console.log(this.props)
}
  render() {
    return (
      <View style={styles.wrapperView}>
         <SafeAreaView style={styles.contentView}>
          <View style={[styles.flex,{padding:10}]}>
          <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                        <Image source={require('../../assets/drawer.png')} style={styles.logo} />
       </TouchableOpacity>

          <Image source={require('../../assets/homeLogo.png')} style={styles.logo} />
          <Image source={require('../../assets/bell.png')} style={styles.logo} />
          </View>          
          <View style={styles.flex}>
         <Text style={styles.barChild}>All</Text>
         <Text style={styles.barChild}>Prepaid</Text>
         <Text style={[styles.barChild,{width:wp('40%')}]}>Scan-&-Pay at door</Text>
         <Text style={styles.barChild}>free</Text>
          </View>

          <View style={{justifyContent: 'center',alignItems: 'center',margin:'10%'}}>
          <Image source={require('../../assets/map-marker-outline.png')} style={styles.logo} />
          <Text style={styles.titleText}>
          Enable Location
          </Text>
          <Text style={styles.subtitleText}>
          You will need to enable location to see events near you
          </Text>
          <TouchableOpacity 
          style={styles.btnLocation}
           >
          <Text style={styles.btnTextLocation}>Allow Location</Text>
        </TouchableOpacity>
          </View>          
         
         <View style={styles.bottomView}>
         <Image source={require('../../assets/plus-circle.png')} style={styles.logoAdd} />
         <View style={{flexDirection:'row',width:wp('90%')}}>
          <TextInput
            style={styles.input}
            placeholder={'Trusday'}
            placeholderTextColor={'#8e8e93'}
            // onChangeText={handleText}
            >

            </TextInput>
            <Image source={require('../../assets/calendar-range.png')} style={styles.logoAddCalender} />
      
        </View>
          <TouchableOpacity 
          style={styles.btnMap}
           >
          <Text style={styles.btnText}>List View</Text>
        </TouchableOpacity>
       
        </View>
          </SafeAreaView>
    </View>
    );
  }
}
const styles = StyleSheet.create({
    topView:{
  height:hp('35%'),  
},
input:{
  width:wp('90%'),
  marginHorizontal:'5%',
  borderWidth:1,
  marginVertical:10,
  borderRadius:12,
  borderColor:'lightgrey',
  shadowColor: 'black',
  shadowOffset: {width: 0, height: 2},
  shadowRadius: 6,
  shadowOpacity: 0.1,
  elevation: 2,

},
btnLocation:{
  width:wp('80%'),
  marginHorizontal:'10%', 
  borderRadius:25,
  marginTop:hp('5%'),
  height:hp('8%'),
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.1,
    elevation: 1,
  
  borderWidth:1,
  borderRadius:24,
  borderColor:BLACK.light,
  bottom:10,
     
},
btnMap:{
    width:wp('90%'),
    marginHorizontal:'5%', 
    borderRadius:25,
    height:hp('8%'),
    backgroundColor:'black',
  

},
bottomView:{
  position:'absolute',
    bottom:10
},
    btnText:{
       
        fontSize: 16,
        color:'white',
        textAlign:'center',
        paddingTop:'5%',
        color:'white',
        fontFamily:FONT.Nunito.regular,
    },
    btnTextLocation:{
      fontSize: 16,
      color:'black',
      textAlign:'center',
      paddingTop:'5%',
      fontFamily:FONT.Nunito.regular,

    },
    barChild:{
        borderWidth:1,
        width:wp('20%'),
        height:hp('6%'),
        borderColor:'lightgrey',
        paddingTop:12,  
        fontFamily:FONT.Nunito.regular,
        textAlign:'center'
    },
    subtitleText:{
   marginVertical:10,
   fontSize:14,
   textAlign:'center',
   fontFamily:FONT.Nunito.semiBold,
    },
    contentView:{
     height:hp('100%')
    },
    logo: {
    //   height: 80,
    //   width: 100,
    //   resizeMode: 'contain',
      marginTop: 25,
    
      alignSelf: 'center',
    },
    logoAdd: {
       alignSelf:'flex-end',
       marginRight:'5%',
      },
      
    logoAddCalender: {
      position: 'absolute',
      right:5,
      top:25
      // alignSelf:'flex-end',
      // marginRight:'5%',
     },
     
    flex:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    titleText: {
      marginTop: 13,
      marginBottom: '3%',
      color: BLACK.textInputTitle,
      fontFamily: FONT.Nunito.bold,
      fontSize: 24,
    },  
    detailWrapper: {
      alignSelf: 'center',
   
    
    },
    wrapperView: {
      height:hp('100%'),
      width:wp('100%'),
     flex:1,
    
    
    },
    policyText: {
   
      alignSelf: 'center',
      marginTop:'2%',
      color: BLACK.appDark,
      fontFamily: FONT.Nunito.regular,
    },
  
  });
