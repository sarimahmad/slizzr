import React, { Component } from 'react';

import { View, Text,StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image} from 'react-native';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import resetPassword from '../resetPassword';
import ButtonResetPassaword from '../../component/ButtonResetPassword';

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
          <TouchableOpacity 
          style={styles.btnMap}
           >
          <Text style={styles.btnText}>List View</Text>
        </TouchableOpacity>
          </SafeAreaView>
    </View>
    );
  }
}
const styles = StyleSheet.create({
    topView:{
  height:hp('35%'),  
},
btnMap:{
    width:wp('90%'),
    marginHorizontal:'5%', 
    borderRadius:25,
    height:hp('8%'),
    backgroundColor:'black',
  position:'absolute',
  bottom:10,
     
},
    btnText:{
       
        fontSize: 16,
        color:'white',
        textAlign:'center',
        paddingTop:'5%',
        color:'white'

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
   marginVertical:10
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
      alignSelf: 'flex-end',
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
