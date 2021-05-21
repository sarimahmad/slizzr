import React, {Component} from 'react';

import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
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
        <SafeAreaView style={styles.contentView}>
          <View style={[styles.flex, {padding: 10}]}>
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
            <Image
              source={require('../../assets/bell.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.flex}>
            <Text style={styles.barChild}>All</Text>
            <Text style={styles.barChild}>Prepaid</Text>
            <Text style={[styles.barChild, {width: wp('40%')}]}>
              Scan-&-Pay at door
            </Text>
            <Text style={styles.barChild}>free</Text>
          </View>
          {this.state.enableMap == true && (
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
          {this.state.enableMap == true && (
            <View
              style={{
                position: 'absolute',
                top: 130,
                flexDirection: 'row',
                width: wp('100%'),
              }}>
              <Image
                source={require('../../assets/searchWhite.png')}
               
              />
              <TextInput
                style={styles.inputSearch}
                placeholder={'Try “western homecoming party”'}
                placeholderTextColor={'#8e8e93'}
                // onChangeText={handleText}
              ></TextInput>
              
            </View>
          )}
          {this.state.enableMap == false && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
                marginHorizontal: '5%',
              }}>
              <Image
                source={require('../../assets/map-marker-outline.png')}
                style={styles.logo}
              />
              <Text style={styles.titleText}>Enable Location</Text>
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
          <View style={styles.bottomView}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("createEvent")}  style={styles.logoAdd}
          >
          <Image
            source={require('../../assets/plus-circle.png')}
          />
          </TouchableOpacity>
          <View style={{backgroundColor:'white'}}>
            <TouchableOpacity
              onPress={this.showDatepicker}
              style={{flexDirection: 'row', width: wp('90%')}}>
              <View style={styles.input}>
                <Text style={{paddingTop:15,paddingLeft:20}}>Thursday, August 24, 2020</Text>
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

             
              <View></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMap}>
              <Text style={styles.btnText}>List View</Text>
            </TouchableOpacity>
          </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topView: {
    height: hp('35%'),
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
  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    borderRadius: 25,
    marginTop: hp('5%'),
    height: hp('8%'),
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.1,
    elevation: 1,

    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
  },
  btnMap: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: hp('8%'),
    backgroundColor: 'black',
  },
  logoSearch: {
    position: 'absolute',
    left: 30,
    top: 25,
  },
  bottomView: {
    position: 'absolute',
   
    bottom: 0,
    paddingBottom: 10,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingTop: '5%',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    paddingTop: '5%',
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
    marginVertical: 10,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: FONT.Nunito.semiBold,
  },
  contentView: {
    height: hp('100%'),
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
    marginTop: 13,
    marginBottom: '3%',
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 24,
  },
  detailWrapper: {
    alignSelf: 'center',
  },
  wrapperView: {
    height: hp('100%'),
    width: wp('100%'),
    flex: 1,
  },
  policyText: {
    alignSelf: 'center',
    marginTop: '2%',
    color: BLACK.appDark,
    fontFamily: FONT.Nunito.regular,
  },
});
