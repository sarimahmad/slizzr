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
export default class myEventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.wrapperView}>
         <View
            style={[{padding: 20, alignItems: 'center', alignItems: 'center',marginTop:20}]}>
            <View style={{position: 'absolute', left: 20, top: 10}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../../assets/back.png')}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>Event</Text>
           
          </View>
     
        <SafeAreaView style={styles.contentView}>
          <ScrollView>
          <Image
                source={require('../../assets/eventInfo.png')}
                style={styles.logoEvent}
              />
          
          <View style={{alignSelf: 'center',}}>
          <Text style={[styles.titleText,{textAlign:'center'}]}>Uroojs Banger</Text>
          <Text style={[styles.text,{textAlign:'center'}]}>PREPAID | $5</Text>
          <Text style={[styles.purpleText,{textAlign:'center'}]}>11:30 PM | Feb 25, 2020 - WED | 2 HRS</Text>
         
          <Text style={{textAlign:'center',marginVertical:5}}>
              <Text style={[styles.titleText,{fontSize:12}]}>Host:</Text>
              <Text style={styles.purpleText}>Holly Smith</Text>
          </Text>
          </View>
         <View style={{flexDirection:'row',backgroundColor:'rgba(178, 171, 177, 0.246039)',padding:20,margin:20,borderRadius:10}}>
         <Image
                source={require('../../assets/location.png')}
                style={styles.logoEvent}
              />
        
         <Text>1817 18 St. SW Calgary AB T2T 4T2 (Calgary, Alberta)</Text>
            </View>
            <Text style={[styles.titleText,{textAlign:'center'}]}>Description:</Text>
            <Text style={[styles.text,{textAlign:'center',marginHorizontal:36,marginVertical:10}]}>Tousled food truck polaroid, salvia bespoke small batch Pinterest Marfa. Fingerstache authentic craft beer, food  </Text>
            <TouchableOpacity style={styles.btnMap}>
              <Text style={styles.btnText}>Find PEOPLE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMap}>
              <Text style={styles.btnText}>ZICKET SCANNER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMap} onPress={()=>this.props.navigation.navigate("attendeesList")}>
              <Text style={styles.btnText}>ATTENDEES</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("sharedHosts")} style={styles.btnMap}>
              <Text style={styles.btnText}>SHARED HOSTS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMap}>
              <Text style={styles.btnText}>EDIT</Text>
            </TouchableOpacity>
          
            
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.btnTextCancel}>CANCEL EVENT</Text>
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

    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    // width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  }, btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,

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
        marginBottom:20,
      
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
      marginTop: 10,
      textDecorationLine: 'underline',
      fontFamily: FONT.Nunito.regular,
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
  