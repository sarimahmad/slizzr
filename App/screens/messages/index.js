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
export default class messages extends Component {
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
          <View style={[styles.flex, {padding: 20, alignItems: 'center'}]}>
          <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                source={require('../../assets/drawer.png')}
                style={styles.logo}
              />
            </TouchableOpacity>

            <Text style={styles.titleText}>Messages</Text>
            <View></View>
          </View>
         
        <SafeAreaView style={styles.contentView}>
          <View style={styles.flex}>
            <TouchableOpacity onPress={this.myevents} style={styles.barChild}>
               <Text>MY EVENTS</Text>
               </TouchableOpacity>
            <TouchableOpacity  onPress={this.attendingEvents} style={styles.barChild}>
              <Text>ATTENDING EVENTS</Text>
                </TouchableOpacity>
          </View>
          {this.state.attendingEvents == true && (
            <FlatList
              data={this.state.findpeople}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("messagesEvent")}
                 >
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
                      <Text style={styles.purpleText}>{item.date}</Text>
                    </View>
                   
                  </View>
                  <View style={{hiehgt:1,borderBottomWidth:1,borderBottomColor:'lightgrey',width:SCREEN.width}}></View>
          
                </TouchableOpacity>
              )}
            />
          )}
           {this.state.myevents == true && (
           
           <View style={{alignItems: 'center',marginTop:hp('30%')}}>
            <Text>You are not hosting any events at the moment.</Text>
            <TouchableOpacity
                onPress={() => this.setState({enableMap: true})}
                style={styles.btnLocation}>
                <Text style={styles.btnTextLocation}>Host?</Text>
              </TouchableOpacity>
           </View>
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
  contentView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    // width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
 btnTextLocation: {
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
    
  },
  detail: {
    width: wp('55%'),
  },
  next: {
    paddingTop: 15,
  },
  detail: {
    width: SCREEN.width *0.55,
  },
  imgView: {
    width: SCREEN.width *0.25,
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
