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
export default class manageEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {

        attendingEvents:true,
        myevents:false,
      messages: [
        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
    ],
        findpeople: [
            {
                imgProfile: '',
                profileName: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                date: '11:30 PM | Feb 25, 2020 - WED',
              },
              {
                imgProfile: '',
                profileName: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                date: '11:30 PM | Feb 25, 2020 - WED',
              },  
      
              {
                imgProfile: '',
                profileName: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                date: '11:30 PM | Feb 25, 2020 - WED',
              },  
      
              {
                imgProfile: '',
                profileName: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                date: '11:30 PM | Feb 25, 2020 - WED',
              },  
              {
                imgProfile: '',
                profileName: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                date: '11:30 PM | Feb 25, 2020 - WED',
              },  
      
        ]
      
    };

  }
myevents = ()=>{
this.setState({myevents:true})
this.setState({attendingEvents:false})
}
attendingEvents = ()=>{
  this.setState({myevents:false})
  this.setState({attendingEvents:true})
  
}
  render() {
    return (
      <View style={styles.wrapperView}>
             <SafeAreaView style={styles.contentView}>
               <View
            style={[{padding: 20, alignItems: 'center', alignItems: 'center',marginTop:20 }]}>
            <View style={{position: 'absolute', left: 20, top: 10}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../../assets/back.png')}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>Manage Events</Text>
            <View style={{position: 'absolute', right: 20, top: 10}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../../assets/plus.png')}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>
          </View>
     
       
          <View style={styles.flex}>
            <TouchableOpacity onPress={this.myevents} style={styles.barChild}>
               <Text style={styles.barText}>MY EVENTS</Text>
               </TouchableOpacity>
            <TouchableOpacity  onPress={this.attendingEvents} style={styles.barChild}>
              <Text style={styles.barText}>ATTENDING EVENTS</Text>
                </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("sharedHostRequests")} style={styles.sharedView}>
           <Text style={{color:'white',paddingLeft:20}}>SHARED HOST REQUESTS</Text>
           <Text style={{color:'white',paddingRight:20}}>+2</Text>
          </TouchableOpacity>
          {this.state.attendingEvents == true && (
            <FlatList
              data={this.state.findpeople}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("attendingEventInfo")}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                  }}>
                  <View style={styles.flexRow}>
                    <View style={styles.imgView}>
                      <Image source={require('../../assets/profile1.png')} />
                      <Image
                        style={{position: 'absolute', right: 15}}
                        source={require('../../assets/private.png')}
                      />
               
                    </View>
                    
                    <View style={styles.detail}>
                   <Text style={styles.titleText}>{item.profileName}</Text>
                   <Text style={styles.subtitleText}>{item.adress}</Text>
                   <Text style={[styles.purpleText,{marginTop:5}]}>{item.date}</Text>
                 </View>
                    <View style={styles.shareView}>
                      <Image source={require('../../assets/share.png')} />
                    </View>
                   
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
           {this.state.myevents == true && (
           
           <FlatList
           data={this.state.findpeople}
           keyExtractor={item => item.id}
           renderItem={({item}) => (
             <TouchableOpacity onPress={()=>this.props.navigation.navigate("myEventInfo")}
               style={{
                 borderBottomWidth: 1,
                 borderBottomColor: 'lightgrey',
               }}>
               <View style={styles.flexRow}>
                 <View style={styles.imgView}>
                   <Image source={require('../../assets/profile1.png')} />
                   <Image
                     style={{position: 'absolute', right: 15}}
                     source={require('../../assets/private.png')}
                   />
            
                 </View>
                 
                 <View style={styles.detail}>
                   <Text style={styles.titleText}>{item.profileName}</Text>
                   <Text style={styles.subtitleText}>{item.adress}</Text>
                   <Text style={[styles.purpleText,{marginTop:5}]}>{item.date}</Text>
                 </View>
                 <View style={styles.shareView}>
                   <Image source={require('../../assets/messageIcon.png')} />
                 </View>
                  
               </View>
             </TouchableOpacity>
           )}
         />
       )}
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
  sharedView:{
    width:SCREEN.width, height:40,alignItems: 'center',backgroundColor:'#FF9500',flexDirection:'row',justifyContent: 'space-between',
  
  },
  contentView: {
    flex: 1,
  
    // width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  }, btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,

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
    alignItems: 'center',
  },
  subtitleText:{
    color: BLACK.lightgrey,
    fontFamily: FONT.Nunito.regular,
    fontSize: 12,
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
  logo: {},
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    
  
    fontFamily: FONT.Nunito.bold,
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
  barText: {
    borderColor: 'lightgrey',
    fontSize:11,
    fontFamily: FONT.Nunito.bold,
    textAlign: 'center',
    alignItems: 'center',
  },
});
