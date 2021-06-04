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
import { fonts } from 'react-native-elements/dist/config';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
export default class attendingEventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.wrapperView}>
             <SafeAreaView style={styles.contentView}>
        {/* <View style={[ {padding: 20, alignItems: 'center',alignItems: 'center',borderBottomColor:'lightgrey',borderBottomWidth:1}]}>
          <View style={{position: 'absolute',left:20,top:10}}>
           <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../../assets/back.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>Event</Text>
            </View>
      */}
       <HeaderWithOptionBtn
                    
                    borderBottom={true}
                    backColor={WHITE.dark}
                    headerTitle={'Event'}
                    leftPress={() => this.props.navigation.goBack()}
                    leftIcon={require('../../assets/back.png')}
                />   
       
          <ScrollView>
          <Image
                source={require('../../assets/eventInfo.png')}
                style={styles.logoEvent}
              />
          
          <View style={{alignSelf: 'center',}}>
          <Text style={[styles.titleText,{textAlign:'center',marginTop:20}]}>Uroojs Banger</Text>
          <Text style={[styles.text,{textAlign:'center',marginTop:5}]}>PREPAID | $5</Text>
          <Text style={[styles.purpleText,{textAlign:'center',marginTop:4}]}>11:30 PM | Feb 25, 2020 - WED | 2 HRS</Text>
         
          <Text style={{textAlign:'center',marginVertical:4}}>
              <Text style={[styles.titleText,{fontSize:12}]}>Host: </Text>
              <Text style={[styles.purpleText,{textDecorationLine:'underline'}]}>Holly Smith</Text>
          </Text>
          </View>
         <View style={{flexDirection:'row',backgroundColor:'rgba(178, 171, 177, 0.246039)',padding:20,margin:20,borderRadius:10}}>
         <Image
                source={require('../../assets/location.png')}
                style={{height:16,width:12,marginRight:5}}
              />
        
         <Text style={{fontSize:12,fontFamily:FONT.Nunito.regular,color:'#494949'}}>1817 18 St. SW Calgary AB T2T 4T2 (Calgary, Alberta)</Text>
            </View>
            <Text style={[styles.titleText,{textAlign:'center'}]}>Description:</Text>
            <Text style={[styles.text,{textAlign:'center',marginHorizontal:36,marginTop:10,marginBottom:20}]}>Tousled food truck polaroid, salvia bespoke small batch Pinterest Marfa. Fingerstache authentic craft beer, food truck Banksy Carles kale chips hoodie. Trust fund artisan master cleanse fingerstache post-ironic, fashion axe art party Etsy direct trade retro organic. Cliche Shoreditch Odd Future Pinterest, pug disrupt photo booth VHS literally occupy gluten-free polaroid Intelligentsia PBR mustache. Locavore fashion axe chia, iPhone cardigan disrupt Etsy dreamcatcher. Craft beer selvage fanny pack, 8-bit post-ironic keffiyeh </Text>
            <TouchableOpacity style={styles.btnMap}>
              <Text style={styles.btnText}>ATTENDEES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMap}>
              <Text style={styles.btnText}>VIEW ZICKET</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMap}>
              <Text style={styles.btnText}>MESSAGE HOST</Text>
            </TouchableOpacity>
          
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.btnTextCancel}>CANCEL ATTANDANCE</Text>
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
      backgroundColor:WHITE.dark
    }, contentView: {
      flex: 1,
     
      backgroundColor: WHITE.dark,
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
      
       borderRadius: 25,
        height: 50,
        alignSelf:'center',
        marginBottom:20,
        width:SCREEN.width-40,
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
  