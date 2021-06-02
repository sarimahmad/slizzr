import React, {Component} from 'react';
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class sharedHosts extends Component {
  constructor(props) {
    super(props);
    this.state = {

        attendingEvents:true,
        myevents:false,
        
    
        attendeesLIst: [
            {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },
              {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },  
      
              {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },  
      
              {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },  
              {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },  
      
        ]
      
    };

  }
  render() {
    return (
      <View style={styles.wrapperView}>
        {/* <HeaderWithOptionBtn leftIcon={require('../../assets/back.png')} headerTitle={'Shared Hosts'} leftPress={() => this.props.navigation.pop()} /> */}
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
            <Text style={styles.titleText}>Shared Hosts</Text>
           
          </View>
        <SafeAreaView style={styles.contentView}>
        <View style={{width:SCREEN.width-40,alignSelf:'center'}}>
          <Text style={{color:BLACK.lightgrey}}>Select shared hosts for:</Text>
      
            <View style={styles.form}>
        <Picker
              mode="dropdown"
              
              placeholder="Select your Category"
              placeholderStyle={{color:'black'}}
              placeholderIconColor="#007aff"
              style={{width: wp('100%') / 1.1}}
              selectedValue={"Adresses sauvegardées"}
              onValueChange={this.onValueChangeCatagory}
              >
              {/* <Picker.Item label="List of Saved Adress" value="adress 1" color="#5f1867"/> */}
              <Picker.Item label="Adresses sauvegardées" value="Adresses sauvegardées" />
              <Picker.Item label="adress 2" value="adress 2" />
              <Picker.Item label="adress 3" value="adress 3" />
              <Picker.Item label="adress 4" value="adress 4" />
            </Picker>
            </View>
  
            <Text style={{marginTop:20,color:BLACK.lightgrey,  fontFamily: FONT.Nunito.regular,}}>Invite shared hosts</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
         <View style={{marginRight:5,height:45,width:45,borderRadius:24,backgroundColor:'lightgrey',alignItems: 'center',justifyContent:'center'}}> 
             <Image source={require('../../assets/searchPurple.png')} />  
         </View>
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         <Image source={require('../../assets/profile2.png')} style={{marginHorizontal:5}} />  
         </View>
          <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.sharebtnText}>Invite shared hosts</Text>
            </TouchableOpacity>
            </View>
          
        
          <View style={styles.flex}>
            <TouchableOpacity onPress={this.myevents} style={styles.barChild}>
               <Text>SHARED HOSTS</Text>
               </TouchableOpacity>
            <TouchableOpacity  onPress={this.attendingEvents} style={styles.barChild}>
              <Text>PENDING REQUESTS</Text>
                </TouchableOpacity>
          </View>
        
             <FlatList
              data={this.state.attendeesLIst}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity 
                 >
                  <View style={styles.flexRow}>
                    <View style={styles.imgView}>
                      <Image style={{height:50,width:50}} source={require('../../assets/profile1.png')} />
                     
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.titleText}>{item.attendee}</Text>
                     
                    </View>
                    <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <Image style={{height:50,width:50}} source={require('../../assets/close.png')} />
                      </View>
                  </View>
                  <View
                      style={{height: 1, backgroundColor: 'lightgrey',width:SCREEN.width}}></View>
                 
                </TouchableOpacity> 
              )}
            /> 
     
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
    width:SCREEN.width,
    backgroundColor: WHITE.dark,
  }, btnTextLocation: {
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
  sharebtnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },
  shareButton:{
    borderRadius: 25,
    height: 50,
    marginBottom:20,
    backgroundColor: 'grey',
    justifyContent: 'center'
  
  },
  form: {
    // marginHorizontal:20,
    elevation:2,
    marginVertical:5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginTop: 20,
    borderRadius: 5,
  },

  btnMap: {
        width: wp('90%'),
        marginHorizontal: '5%',
        borderRadius: 25,
        height: 50,
        marginBottom:20,
        position: 'absolute',
        bottom:0,
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
    paddingVertical: 20,
    // paddingHorizontal:10,
    alignSelf: 'center',
    alignItems: 'center',
    
  },
  detail: {
    width: wp('50%'),
  },
  next: {
    paddingTop: 15,
  },
  imgView: {
    width: wp('20%'),
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {},
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
    fontFamily: FONT.Nunito.semiBold,
  },
  barChild: {
    borderBottomWidth: 1,
    width: SCREEN.width*0.5,
    height: 36,
    height:40,
    borderBottomColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
