/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import {SafeAreaView} from 'react-navigation';
import {BLACK, WHITE} from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Textarea from 'react-native-textarea';
export default class editProfle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Zoya',
      lname: 'Rajput',
      email: 'zoya_rajput@slizzr.com',
      birthDate: '11/26/1996',
      gender: 'Female',
      adress: 'Niagara Falls, ON',
      message: 'This gal loves to party',
      enableMap: false,
      date: new Date(),
      showDate: false,
      events: false,
      event: 'Female',
    };
  }
  onValueChangeCatagory = () => {};
  showDatepicker = () => {
    this.setState({showDate: true});
  };
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({date: currentDate});
    this.setState({showDate: false});
  };
  showDatepicker = () => {
    this.setState({showDate: true});
  };
  handleInput = (value, type) => {
    if (type === 'name') {
      this.setState({name: value});
    } else if (type === 'lname') {
      this.setState({lname: value});
    } else if (type === 'email') {
      this.setState({email: value});
    } else if (type === 'birthDate') {
      this.setState({birthDate: value});
    } else if (type === 'gender') {
      this.setState({gender: value});
    } else if (type === 'adress') {
      this.setState({adress: value});
    } else if (type === 'message') {
      this.setState({message: value});
    }
  };

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            backColor={WHITE.dark}
            borderBottom={true}
            leftIcon={require('../../assets/back.png')}
            leftPress={() => this.props.navigation.navigate('myProfile')}
            headerTitle={'Edit Profile'}
          />
          <ScrollView style={styles.wrapperView} bounces={true}>
            <View style={styles.blockView}>
              <View style={{height: 200, width: SCREEN.width}}>
                <Image
                  style={{
                    position: 'absolute',
                    left: 0,
                    height: 140,
                    width: 140,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/profileImage1.png')}
                />

                <Image
                  style={{
                    position: 'absolute',
                    left: 30,
                    height: 170,
                    width: 170,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/profileImage2.png')}
                />

                <Image
                  style={{
                    position: 'absolute',
                    right: 0,
                    height: 140,
                    width: 140,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/profileImage1.png')}
                />
                <Image
                  style={{
                    position: 'absolute',
                    right: 30,
                    height: 170,
                    width: 170,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/profileImage2.png')}
                />

                <Image
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    height: 200,
                    width: 200,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/profileImage3.png')}
                />
                <Image
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 10,
                    height: 35,
                    width: 35,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/edit.png')}
                />
              </View>

              <TextInput
                value={this.state.name}
                onChangeText={value => this.handleInput(value, 'name')}
                style={styles.inputTextView}
              />
              <TextInput
                value={this.state.lname}
                style={styles.inputTextView}
                onChangeText={value => this.handleInput(value, 'lname')}
              />
              <TextInput
                value={this.state.email}
                style={styles.inputTextView}
                onChangeText={value => this.handleInput(value, 'email')}
              />
              {Platform.OS === 'android' ? (
                <TouchableOpacity
                  onPress={this.showDatepicker}
                  style={styles.DataTimeWrapper}>
                  <View style={styles.input}>
                    <Text style={{paddingTop: 15, paddingLeft: 20}}>
                      {this.state.date.toDateString()}
                    </Text>
                  </View>

                  <View style={styles.logoAddCalenderView}>
                    <Image
                      source={require('../../assets/calendar-range.png')}
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

                  <View />
                </TouchableOpacity>
              ) : (
                <View style={styles.DataTimeWrapper}>
                  <DateTimePicker
                    style={styles.DateTimeInnerIOS}
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    textColor="black"
                    themeVariant="light"
                    onChange={this.onChange}
                  />
                  <View style={styles.logoAddCalenderView}>
                    <Image
                      source={require('../../assets/calendar-range.png')}
                    />
                  </View>
                </View>
              )}
              <View style={[styles.form, {paddingLeft: 10}]}>
                <RNPickerSelect
                  style={{
                    height: 53,
                    width: SCREEN.width - 40,
                    alignSelf: 'center',
                    backgroundColor: WHITE.dark,
                    borderWidth: 0.5,
                    borderRadius: 10,
                    paddingLeft: 15,
                  }}
                  onValueChange={value => console.log(value)}
                  items={[
                    {label: 'Female', value: 'Female'},
                    {label: 'Male', value: 'Male'},
                    {label: 'Other', value: 'Other'},
                  ]}
                />
              </View>
              <TextInput
                value={this.state.adress}
                onChangeText={value => this.handleInput(value, 'adress')}
                style={styles.inputTextView}
              />
              <Textarea
                value={this.state.message}
                onChangeText={value => this.handleInput(value, 'message')}
                style={[
                  styles.inputTextView,
                  {height: 159, paddingBottom: 130},
                ]}
              />
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btntext}>SAVE</Text>
              </TouchableOpacity>
            </View>
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
  blockView: {
    marginTop: 30,
    // alignItems: 'center'
  },
  form: {
    marginVertical: 5,
    borderWidth: 1,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    borderColor: 'lightgrey',
    height: 53,
    borderRadius: 5,
    justifyContent: 'center',
  },
  profileView: {
    height: 176,
    width: 50,
  },
  inputTextView: {
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    width: SCREEN.width - 40,
    height: 53,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: 'lightgrey',
    fontSize: 16,
    fontFamily: FONT.Nunito.regular,
    marginTop: 20,
    alignSelf: 'center',
  },
  DataTimeWrapper: {
    backgroundColor: WHITE.dark,
    height: 53,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    borderWidth: 0.3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: BLACK.shadow,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginVertical: 20,
  },
  input: {
    width: '100%',
    marginHorizontal: '5%',
    height: '100%',
  },
  logoAddCalenderView: {
    position: 'absolute',
    right: 0,
    width: 58,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: BLACK.border,
  },
  DateTimeInnerIOS: {
    height: '90%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: BLACK.shadow,
    shadowOffset: {width: 1, height: 1},
    backgroundColor: WHITE.dark,
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    paddingLeft: 10,
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    backgroundColor: 'black',
    borderRadius: 27.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
    fontWeight: 'bold',
  },
});
