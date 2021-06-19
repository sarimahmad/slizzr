/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import Validations from '../../helper/Validations';
export default class BirthDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:new Date(),
      showDate: false,
      ageCheck: false,
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({date: currentDate});
    if(Validations.checkAge(currentDate)) this.setState({ageCheck: true});
  };

  showDatepicker = () => {
    this.setState({showDate: true});
  };
  handleSubmit = () => {
    if(Validations.checkAge(this.state.date)){
      // Navigate From here to confirmation email page...
    }
  };

  firestoreLinking = data => {
    const usersRef = firestore().collection('users');
    usersRef
      .doc(data.id)
      .set(data)
      .then(this.props.navigation.navigate('HomeStack'))
      .catch(error => {
        this.setState({loading: false});
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          {this.state.showDate && (
            <RNDateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
              themeVariant="light"
            />
          )}
          <Text style={styles.titleText}>How old are you?</Text>

          <TouchableOpacity
            onPress={this.showDatepicker}
            style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={styles.input}>
              <Text
                style={{
                  paddingTop: 15,
                  paddingLeft: 20,
                  fontSize: 17,
                  fontFamily: FONT.Nunito.regular,
                  color: '#B2ABB1',
                }}>
                {this.state.showDate ? moment(this.state.date).format('ll') : 'Birth Date'}
              </Text>
              <Image
                style={styles.logoAddCalender}
                source={require('../../assets/calendar-range.png')}
                onPress={this.showDatepicker}
              />
            </View>
          </TouchableOpacity>
          <ButtonResetPassaword
            btnLabel={'Continue'}
            data={this.handleSubmit}
            validate={this.state.ageCheck}
          />       
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 70,
  },
  input: {
    width: SCREEN.width - 80,
    borderWidth: 1,
    height: 50,
    marginVertical: 10,
    borderRadius: 12,
    borderColor: 'lightgrey',
    
  },
  logoAddCalender: {
    position: 'absolute',
    right: 5,
    top: 13,
  },

  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
  textColor: {
    margin: '15%',
    textAlign: 'center',
    color: '#8e8e93',
  },
  text: {
    color: '#F818D9',
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  },
  textPurple: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  },
  titleText: {
    marginTop: 13,
    marginBottom: 10,
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 24,
    textAlign: 'center',
  },
  subtitletext: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.semiBold,
    fontSize: 16,
  },
  subtitletextbold: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
  },
});
