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
          <Image
            source={require('../../assets/bell.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.flex}>
          <TouchableOpacity onPress={() => this.setState({events: true})}>
            <Text style={styles.barChild}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({prePaid: true, events: false})}>
            <Text style={styles.barChild}>Prepaid</Text>
          </TouchableOpacity>

          <Text style={[styles.barChild, {width: wp('40%')}]}>
            Scan-&-Pay at door
          </Text>
          <Text style={styles.barChild}>free</Text>
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
                  marginTop: 50,
                  paddingHorizontal: 20,
                }}>
                <Image
                  source={require('../../assets/map-marker-outline.png')}
                  style={styles.logo}
                />
                <Text style={[styles.titleText, {marginTop: 10, fontSize: 27}]}>
                  Enable Location
                </Text>
                <Text style={styles.subtitleText}>
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
                marginTop: 50,
              }}>
              <FlatList
                data={this.state.findpeople}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View>
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
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('eventDetail')
                        }
                        style={styles.shareView}>
                        <Image source={require('../../assets/Right.png')} />
                      </TouchableOpacity>

                    <View
                      style={{height: 1, backgroundColor: 'lightgrey'}}></View>
                  </View>
                </View>
                )}
              />
            </View>
          )}
          {this.state.prePaid == true && (
            <View style={{marginTop:100}}>
                <Image
                  source={require('../../assets/logo.png')}
                  style={{height: 80, width: 80, alignSelf: 'center'}} />


                <Text style={styles.subtitleText}>
                  No events to show in your area.
                </Text>
                <TouchableOpacity style={styles.btnMap}>
                  <Text style={styles.btnText}>List View</Text>
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
            <View style={{backgroundColor: 'white'}}>
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
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  next: {
    paddingTop: 15,
  },
  detail: {
    width: wp('55%'),
  },
  btnLocation: {
    width: SCREEN.width - 140,
    borderRadius: 25,
    marginTop: 60,
    height: 50,
    backgroundColor: WHITE.dark,
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.1,
    elevation: 1,
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
    width: wp('20%'),
    height: hp('6%'),
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
  },
  subtitleText: {
    // marginVertical: 10,
    fontSize: 14,
    marginTop: 14,
    textAlign: 'center',
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
