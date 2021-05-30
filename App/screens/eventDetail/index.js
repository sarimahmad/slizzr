import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
  } from 'react-native';
  import {SafeAreaView} from 'react-navigation';
  import {BLACK, BLUE, WHITE} from '../../helper/Color';
  import {FONT, SCREEN} from '../../helper/Constant';
  import {width, height} from '../../helper/Constant';
  
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
export default class eventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
            <View style={[styles.flex, {padding: 20, alignItems: 'center',borderBottomColor:'lightgrey',borderBottomWidth:1}]}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("manageEvent")}>
              <Image
                source={require('../../assets/back.png')}
                style={styles.logo}
              />
            </TouchableOpacity>

            <Image
                source={require('../../assets/slizerLogo.png')}
                style={styles.logo}
              />
                <Image
                source={require('../../assets/share.png')}
                style={styles.logo}
              />
           
          
          </View>
          <ScrollView>
          <View>
          <Image
                source={require('../../assets/eventDetail.png')}
                style={styles.logoEvent}
              />
            <TouchableOpacity  onPress={()=>this.props.navigation.navigate("eventDetail2")} style={{position: 'absolute',top:30,padding:10,borderRadius:60,backgroundColor:'white',left:30}}>    
          <Image
                source={require('../../assets/group.png')}
              
              />  
              </TouchableOpacity>
          </View>
          <View style={{alignSelf: 'center',}}>
          <View style={styles.flex}>
          <Text style={[styles.titleText,{textAlign:'center'}]}>Brittney’s 18th Birthday </Text>
          <Text style={[styles.purpleText,{textAlign:'center'}]}>SCAN-&-pay at door</Text>
          </View>
          <View style={styles.flexRow}>
          <Text style={[styles.titleText,{fontSize:12}]}>Host:</Text>
          <Text style={styles.purpleText}>Holly Smith</Text>
          </View>
          <Text style={[styles.purpleText,]}>11:30 PM | Feb 25, 2020 - WED | 2 HRS</Text>
         
         
          </View>
          <Text style={[styles.titleText,{marginLeft:20,marginTop:10}]}>Mututal Attendes</Text>
          <View style={{flexDirection:'row',marginLeft:20,marginVertical:10}}>
         
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         </View>
         <Text style={[styles.purpleText,{marginLeft:20,marginBottom:10, textDecorationLine:'underline',}]}>See more</Text>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("prepay")} style={styles.btnMap}>
              <Text style={styles.btnText}>Attend</Text>
            </TouchableOpacity>
          
            
            </ScrollView>
          </SafeAreaView>
   </View>
   );
  }
}
const styles = StyleSheet.create({
    wrapperView: {
      flex: 1,
    },
    btnTextLocation: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      fontFamily: FONT.Nunito.regular,
  
    },
    btnText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        color: 'white',
        fontFamily: FONT.Nunito.regular,
      },
      btnTextCancel: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        color: 'red',
        fontFamily: FONT.Nunito.regular,
      },
      cancelButton:{
        width: wp('90%'),
        marginHorizontal: '5%',
        borderRadius: 25,
        height: 50,
        marginBottom:20,
        borderWidth:1,
        borderColor:'black',
        justifyContent: 'center'
      
      },
    btnMap: {
        width: wp('90%'),
        marginHorizontal: '5%',
        borderRadius: 25,
        height: 50,
        marginVertical:30,
        backgroundColor: 'black',
        justifyContent: 'center'
      },
    
    btnLocation: {
      width: wp('80%'),
      marginHorizontal: '10%',
      borderRadius: 25,
      marginTop: hp('5%'),
      height: 50,
      elevation: 1,
      justifyContent:'center',
      backgroundColor:'black',
      borderWidth: 1,
      borderRadius: 24,
      borderColor: BLACK.light,
      bottom: 10,
    },
    flexRow: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal:10,
      
    },
    detail: {
      width: wp('55%'),
    },
    next: {
      paddingTop: 15,
    },
    detail: {
      width: wp('55%'),
    },
    contentView: {
      flex: 1,
    },
    imgView: {
      width: wp('25%'),
    },
    shareView: {
  
      width: wp('20%'),
      justifyContent: 'center',
    },
    flex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text:{
   fontSize:12,
   color:'#494949'
    },
    logo: {
        },
    
    logoEvent: {
        width:width
    },
    titleText: {
      color: BLACK.textInputTitle,
      fontFamily: FONT.Nunito.bold,
      fontSize: 17,
      
    },
    purpleText: {
      fontSize: 12,
      color: '#F818D9',
    
      textDecorationLine: 'underline',
      fontFamily: FONT.Nunito.semiBold,
    },
    barChild: {
      borderWidth: 1,
      width: wp('50%'),
      height: 36,
      height:40,
      borderColor: 'lightgrey',
      paddingTop: 12,
      fontFamily: FONT.Nunito.regular,
      textAlign: 'center',
      alignItems: 'center',
    },
  });
  