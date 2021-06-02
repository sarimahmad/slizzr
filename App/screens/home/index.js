import React, {Component} from 'react';

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
} from 'react-native';
import {BLACK, BLUE, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'react-native';
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableMap: false,
      date: new Date(2300, 10, 20),
      showDate: false,
      prePaid: false,
      events: false,
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

    ],

    };
  }
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    this.setState({date: currentDate});
    this.setState({showDate: false});
  };

  showDatepicker = () => {
    this.setState({showDate: true});
  };

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        {/* <StatusBar style={{height:20}}/> */}
        <View style={[styles.flex, {padding: 10}]}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require('../../assets/drawer.png')}
              style={styles.logo}
            />
          </TouchableOpacity>

          <Image
            source={require('../../assets/homeLogo.png')}
            style={styles.logo}
          />
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("notification")}>
            <Image
            source={require('../../assets/bell.png')}
            style={styles.logo}
          />
          </TouchableOpacity>

        </View>
        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={[styles.flex,{height:50,alignItems: 'center',backgroundColor: '#fff',
     
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,}]}>
          <TouchableOpacity onPress={() => this.setState({events: true})}>
            <Text style={styles.barChild}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({prePaid: true, events: false})}>
            <Text style={styles.barChild}>Prepaid</Text>
          </TouchableOpacity>

          <Text style={[styles.barChild, {width:SCREEN.width*0.4}]}>
            Scan-&-Pay at door
          </Text>
          <Text style={styles.barChild}>free</Text>
        </View>
          </View>
        <SafeAreaView style={styles.contentView}>

          {(this.state.enableMap == true   ) && (
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: 26.4788,
                longitude: 80.292061,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
              }}
            />
          )}
          {(this.state.enableMap == true || this.state.events == true) && (
            <View
              style={{
                position: 'absolute',
                top: 0,
              }}>
              <View style={styles.inputSearch}>
                <Image
                  source={require('../../assets/magnify.png')}
                  style={{marginTop: 10, marginRight: 10}}
                />
                <TextInput

                placeholder={'Try “western homecoming party”'}
                  placeholderTextColor={'#8e8e93'}
                  // onChangeText={handleText}
                ></TextInput>
              </View>
            </View>
          )}
          {this.state.enableMap == false &&
            this.state.events == false &&
            this.state.prePaid == false && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width:SCREEN.width,
                  marginTop:40,
                  paddingHorizontal: 20,
                }}>
                <Image
                  source={require('../../assets/map-marker-outline.png')}
                  style={styles.logo}
                />
                <Text style={[styles.titleText, {marginTop: 20, fontSize: 27}]}>
                  Enable Location
                </Text>
                <Text style={[styles.subtitleText,{textAlign:'center'}]}>
                  You will need to enable location to see events near you
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({enableMap: true})}
                  style={styles.btnLocation}>
                  <Text style={styles.btnTextLocation}>Allow Location</Text>
                </TouchableOpacity>
              </View>
            )}
          {this.state.events == true && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 60,
              }}>
              <FlatList
                data={this.state.findpeople}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                <View style={{height:80,borderBottomColor:'lightgrey',borderBottomWidth:1,width:SCREEN.width}}>
                    <View style={[styles.flexRow,{width:SCREEN.width-20}]}>
                      <View style={styles.imgView}>
                        <Image source={require('../../assets/profile1.png')} />
                        <Image
                          style={{position: 'absolute', right: 15}}
                          source={require('../../assets/private.png')}
                        />

                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.titleText}>{item.profileName}</Text>
                        <Text style={styles.adressText}>{item.adress}</Text>
                        <Text style={styles.purpleText}>{item.date}</Text>
                    <View style={styles.flexRow}>
                    <Image
                          style={{height:16,width:12,marginRight:5}}
                          source={require('../../assets/location.png')}
                        />

                      <Text>15 KM away</Text>
                    </View>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('eventDetail')
                        }
                        style={styles.shareView}>
                        <Image source={require('../../assets/Right.png')} />
                      </TouchableOpacity>
                      </View>
                   
                  </View>
               
                )}
              />
            </View>
          )}
          {this.state.prePaid == true && (
            <View style={{position: 'absolute',bottom:120}}>
               
                <Image
                  source={require('../../assets/circle.png')}
                  style={{height: 120, width: 120, alignSelf: 'center',marginVertical:20}} />
                <Text style={[styles.subtitleText,{fontSize:20,  fontFamily: FONT.Nunito.regular,}]}>
                  No events to show{'\n'} in your area.
                </Text>
                <TouchableOpacity style={styles.btnMap}>
                  <Text style={styles.btnText}>HOST AN EVENT</Text>
                </TouchableOpacity>


                  </View>
          )}
            

            {this.state.prePaid == false && (
        
          <View style={styles.bottomView}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('createEvent')}
              style={styles.logoAdd}>
              <Image source={require('../../assets/plus-circle.png')} />
            </TouchableOpacity>
            <View style={{backgroundColor: 'white',alignSelf:'center'}}>
              <TouchableOpacity
                onPress={this.showDatepicker}
                style={{flexDirection: 'row'}}>
                <View style={styles.input}>
                  <Text style={{paddingTop: 15, paddingLeft: 20}}>
                    Thursday, August 24, 2020
                  </Text>
                  <Image
                    style={styles.logoAddCalender}
                    source={require('../../assets/calendar-range.png')}
                    onPress={this.showDatepicker}
                  />
                </View>
                {this.state.showDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                  />
                )}

            </TouchableOpacity>
              <TouchableOpacity style={styles.btnMap}>
                <Text style={styles.btnText}>List View</Text>
              </TouchableOpacity>
            </View>
          </View>
            )}
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topView: {
    // height: hp('35%'),
  },
  inputSearch: {
    width: SCREEN.width - 40,
    flexDirection: 'row',
    height: 42,
    borderWidth: 1,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    backgroundColor: 'white',

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
    width: SCREEN.width - 40,
    borderWidth: 1,
    height: 53,
    marginVertical: 10,
    borderRadius: 12,
    borderColor: 'lightgrey',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imgView: {
    
    width: SCREEN.width*0.25,
    // justifyContent: 'center',
    // alignSelf:'center'
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
  adressText:{
 fontSize:12,
 color: BLACK.grey,
    fontFamily: FONT.Nunito.regular,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    fontFamily: FONT.Nunito.bold,
  },
  flexRow: {
    flexDirection: 'row',
    
  },

  next: {
    paddingTop: 15,
  },
  detail: {
    width: SCREEN.width*0.6,
  },
  btnLocation: {
    width: SCREEN.width - 100,
    borderRadius: 25,
    marginTop: 60,
    height: 55,
    backgroundColor: WHITE.dark,
    
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.1,
    elevation: 5,
    justifyContent: 'center',

    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
  },
  btnMap: {
    width: SCREEN.width - 40,
    // marginHorizontal: '5%',
    borderRadius: 25,

    height: 50,
    marginBottom: 20,

    backgroundColor: 'black',
    justifyContent: 'center',
  },
  logoSearch: {
    position: 'absolute',
    left: 30,
    top: 25,
  },
  bottomView: {
    position: 'absolute',
   
    width:SCREEN.width,
    bottom: 0,
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
    color: 'black',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  barChild: {
    borderWidth: 1,
    width: SCREEN.width*0.2,
    height: 50,
    borderColor: 'lightgrey',
    paddingTop:14,
    fontFamily: FONT.Nunito.semiBold,
    textAlign: 'center',
  },
  subtitleText: {
    
    fontSize: 14,
    marginTop: 14,
   
    fontFamily: FONT.Nunito.semiBold,
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
    marginRight:10,
  },
  logoAddCalender: {
    position: 'absolute',
    right: 5,
    top: 13,
    // alignSelf:'flex-end',
    // marginRight:'5%',
  },

 

  detailWrapper: {
    alignSelf: 'center',
  },
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
  policyText: {
    alignSelf: 'center',
    marginTop: '2%',
    color: BLACK.appDark,
    fontFamily: FONT.Nunito.regular,
  },
});
