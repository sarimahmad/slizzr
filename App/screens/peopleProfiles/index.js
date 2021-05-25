import React, { Component } from 'react';

import {
    View,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    Image,
    TouchableWithoutFeedback,
  } from 'react-native';
  import {BLACK, BLUE, WHITE} from '../../helper/Color';
  import {FONT, SCREEN} from '../../helper/Constant';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
export default class peopleProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
        searchPeople:false,
        findpeople: [
            {
              imgProfile:'',  
              profileName: 'Marriage Anniversary',
              adress: 'Host: Tallah Cotton',
              date: '11:30 PM | Feb 25, 2020 - WED',
            },
           
            
          ],
    };
  }

  render() {
    return (
        <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
        
          <View
            style={[
              styles.flex,
              {
                padding: 10,
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
              },
            ]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                source={require('../../assets/drawer.png')}
                style={styles.logo}
              />
            </TouchableOpacity>

            <Image
              source={require('../../assets/homeLogo.png')}
              style={styles.logo}
            />
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('lookFriends')}
              style={[
                styles.logo,
                {
                  elevation: 6,
                  marginRight: 5,
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 24,
                },
              ]}>
              <Image source={require('../../assets/searchGrey.png')} />
            </TouchableOpacity>
          </View>
   <ScrollView >

       <View style={styles.ageView}>
   
       <Text style={{fontSize:17,color:'#F818D9',fontFamily:FONT.Nunito.regular,paddingRight:5}}>Age:</Text>
       <Text style={{fontSize:17,fontFamily:FONT.Nunito.regular,paddingRight:5}}>Min:</Text>
    
       <View style={{borderWidth:1,borderRadius:5,paddingHorizontal:20,paddingVertical:15,borderColor:'lightgrey'}}><Text>17</Text></View>
       <Text style={{paddingHorizontal:5}}>Max :</Text>
       <View style={{borderWidth:1,borderRadius:5,paddingHorizontal:20,paddingVertical:15,borderColor:'lightgrey'}}><Text>25</Text></View>
       </View>
  
       <View style={styles.cardView}>
         <View style={styles.topView}>

         <Image source={require('../../assets/cardTopView.png')} style={{alignSelf:'center',}} />      
        
         </View>
        
         <View style={styles.bottomView}>
             <View style={{ alignItems: 'center',justifyContent: 'center',}}>
   <Text style={styles.titleText}>Mary Poppins, 22, F</Text>
   <View style={{flexDirection:'row',marginTop:5}}>
   <Image source={require('../../assets/location.png')} style={{marginHorizontal:5}}  />  
   <Text>12 KM away</Text>
   </View>
   </View>
   <Text style={[styles.titleText,{alignItems: 'flex-start',marginTop:12}]}>Mutual Connections</Text>
         <View style={{flexDirection:'row',marginTop:10}}>
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         </View>
         <Text style={styles.purpleText}>See more</Text>
         <TouchableOpacity
                
                style={styles.btnLocation}>
                <Text style={styles.btnTextLocation}>DIRECT INVITE</Text>
              </TouchableOpacity>
         </View>
         <Image source={require('../../assets/cardImage1.png')} style={{position:'absolute',left:100,top:40}} />
        
         </View>
        <View style={styles.cardView}>
         <View style={styles.topView}>

         <Image source={require('../../assets/cardTopView.png')} style={{alignSelf:'center',}} />      
        
         </View>
        
         <View style={styles.bottomView}>
             <View style={{ alignItems: 'center',justifyContent: 'center',}}>
   <Text style={styles.titleText}>Mary Poppins, 22, F</Text>
   <View style={{flexDirection:'row',marginTop:5}}>
   <Image source={require('../../assets/location.png')} style={{marginHorizontal:5}}  />  
   <Text>12 KM away</Text>
   </View>
   </View>
   <Text style={[styles.titleText,{alignItems: 'flex-start',marginTop:12}]}>Mutual Connections</Text>
         <View style={{flexDirection:'row',marginTop:10}}>
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         </View>
         <Text style={styles.purpleText}>See more</Text>
         <TouchableOpacity
                
                style={styles.btnLocation}>
                <Text style={styles.btnTextLocation}>DIRECT INVITE</Text>
              </TouchableOpacity>
         </View>
         <Image source={require('../../assets/cardImage1.png')} style={{position:'absolute',left:100,top:40}} />
        
         </View>

</ScrollView>
        </SafeAreaView>
      </View>
   
    );
  }
}
const styles = StyleSheet.create({
   ageView:{
   flexDirection:'row',
   marginTop:10,
   alignItems: 'center',
   marginHorizontal:20
   },
    btnLocation: {
        // width: wp('0%'),
        marginHorizontal: 20,
        borderRadius: 25,
        marginVertical:20,
        marginBottom: 25,
        height: 50,
        backgroundColor:'black',
        elevation: 1,
        justifyContent:'center',
         
        borderWidth: 1,
        borderRadius: 24,
        borderColor: BLACK.light,   
        bottom: 10,
      },
    topView:{
     height:100
    },
    bottomView:{
    height:312,
    paddingHorizontal:20,
    marginTop:50
     
    },
    cardView:{
    marginHorizontal:10,
    borderRadius:20,
    height:412,
    marginTop:20,

    elevation:6,
    

    // backgroundColor:'green'
    },
    detailView:{
   
    },
    searchBar:{
     borderWidth:1,
     borderColor:'grey',
     height:40,
     elevation:4,
     shadowOpacity: 0.8,
     shadowRadius: 1,
     shadowOffset: {
    //    height: 1,
    //    width: 1
     
    },
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
    imgView: {
      width: wp('25%'),
    },
    inputSearch: {
      width: wp('90%'),
      marginHorizontal: '5%',
      borderWidth: 1,
      backgroundColor: 'white',
      paddingLeft: 40,
      marginVertical: 10,
      borderRadius: 24,
      borderColor: 'lightgrey',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.1,
      elevation: 2,
    },
    input: {
      width: wp('90%'),
      marginHorizontal: '5%',
      borderWidth: 1,
      height: hp('7%'),
      marginVertical: 10,
      borderRadius: 12,
      borderColor: 'lightgrey',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.1,
      elevation: 2,
    },
     btnMap: {
      width: wp('90%'),
      marginHorizontal: '5%',
      borderRadius: 25,
      height: 50,
      backgroundColor: 'black',
      justifyContent: 'center',
    },
    logoSearch: {
      position: 'absolute',
      left: 30,
      top: 25,
    },
    
    btnText: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      color: 'white',
      fontFamily: FONT.Nunito.regular,
    },
    btnTextLocation: {
      fontSize: 16,
      color:'white',
      textAlign: 'center',
      fontFamily: FONT.Nunito.regular,
    },
    barChild: {
      borderWidth: 1,
      width: wp('20%'),
      height: hp('6%'),
      borderColor: 'lightgrey',
      paddingTop: 12,
      fontFamily: FONT.Nunito.regular,
    },
    subtitleText: {
      fontSize: 12,
  
      fontFamily: FONT.Nunito.semiBold,
    },
    contentView: {
    flex:1,
    },
    logo: {
      //   height: 80,
      //   width: 100,
      //   resizeMode: 'contain',
      marginTop: 25,
  
      alignSelf: 'center',
    },
    logoAdd: {
      alignSelf: 'flex-end',
      marginRight: '5%',
      marginTop: '10%',
    },
    logoAddCalender: {
      position: 'absolute',
      right: 5,
      top: 13,
      // alignSelf:'flex-end',
      // marginRight:'5%',
    },
  
    flex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleText: {
      color: BLACK.textInputTitle,
      fontFamily: FONT.Nunito.bold,
      fontSize: 17,
      marginTop:12
    },
    purpleText: {
      fontSize: 12,
      color: '#F818D9',
      marginTop:10,
      textDecorationLine:'underline',
      fontFamily: FONT.Nunito.semiBold,
    },
    detailWrapper: {
      alignSelf: 'center',
    },
    wrapperView: {
     
      flex: 1,
    },
    policyText: {
      alignSelf: 'center',
      marginTop: '2%',
      color: BLACK.appDark,
      fontFamily: FONT.Nunito.regular,
    },
  });