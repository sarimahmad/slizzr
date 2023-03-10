/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
console.disableYellowBox = true;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';
import moment from 'moment';

import {SCREEN} from '../helper/Constant';
import ButtonResetPassaword from './ButtonResetPassword';

export default class DateAndTimePicker extends React.Component {
  state = {
    clearGoogleSearch: true,
    show: false,
    date: '',
    time: '',
    platform: true,
    dateTime: this.props.value,
    dateSelect: false,
    timeSelect: false,
  };
  // platform true === android
  // platform false === ios
  componentDidMount = () => {
    if (Platform.OS === 'ios') {
      this.setState({platform: false});
    }
    console.log('value in component' + this.props.value);
    this.setState({dateTime: this.props.value});
  };

  componentDidUpdate() {
    if (this.state.dateTime !== new Date(this.props.value)) {
      // this.setState({dateTime: new Date(this.props.value)});
    }
  }
  show = () => this.setState({show: true});

  OnChange = event => {
    if (this.props.type !== 'onlyDate') {
      if (this.state.dateSelect === true) {
        console.log('time');

        this.setState({timeSelect: true});
        this.setState({
          time: moment(event.nativeEvent.timestamp).format('hh:mm'),
        });
      } else if (this.state.dateSelect === false) {
        console.log('date');
        this.setState({
          date: moment(event.nativeEvent.timestamp).format('DD-MMM-YYYY'),
        });
        this.setState({dateSelect: true});
        this.setState({show: false});
      }

      if (this.state.dateSelect === true && this.state.timeSelect === true) {
        let selectedValue = this.state.date.concat(' ' + this.state.time);
        this.props.setDateAndTime(selectedValue);
        this.setState({dateSelect: false, show: false, timeSelect: false});
      }
    } else {
      this.setState({
        dateSelect: false,
        show: false,
      });
      this.props.setDateAndTime(event.nativeEvent.timestamp);
    }
  };

  OnChangeIos = (event, selectedValue) => {
    console.log('event', event);
    if (event.type !== 'dismissed') {
      this.setState({dateTime: selectedValue});
      console.log(moment(selectedValue).format('hh:mm a'));
      console.log(moment(selectedValue).format('DD MMM YYYY'));
      let newselectedValue = moment(selectedValue)
        .format('D MMM YYYY')
        .concat('  ' + moment(selectedValue).format('hh:mm a'));
      console.log(newselectedValue);
      this.setState({
        dateSelect: false,
      });

      this.props.setDateAndTime(newselectedValue);
    } else {
      this.setState({show: false, dateSelect: false});
    }
  };
  _onConfirm = () => {
    this.setState({show: false});
    this.props.setDateAndTime(this.state.dateTime);

    this.setState({dateSelect: false, show: false, timeSelect: false});
  };

  datePicker = () => {
    if (this.state.platform) {
      if (this.state.show) {
        return (
          <View style={{backgroundColor: 'red'}}>
            {this.props.showPreviousDate === 'no' && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.props.value}
                mode={'date'}
                minimumDate={moment().toDate()}
                is24Hour={true}
                editable={false}
                display="default"
                onChange={this.OnChange}
                onTouchCancel={value => {
                  console.log('touch cancel', value);
                  this.setState({show: false});
                }}
              />
            )}
            {this.props.showPreviousDate === 'yes' && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.props.value}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={this.OnChange}
                onTouchCancel={value => {
                  console.log('touch cancel', value);
                  this.setState({show: false});
                }}
              />
            )}
          </View>
        );
      }
    } else {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.show}>
          <View>
            <View style={{height: SCREEN.height / 2, marginTop: 200}}>
              {this.props.showPreviousDate === 'no' && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.props.value}
                  mode={'date'}
                  minimumDate={moment().toDate()}
                  is24Hour={true}
                  display="default"
                  onChange={this.OnChange}
                  onTouchCancel={value => {
                    console.log('touch cancel', value);
                    this.setState({show: false});
                  }}
                />
              )}
              {this.props.showPreviousDate === 'yes' && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.props.value}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={this.OnChange}
                  onTouchCancel={value => {
                    console.log('touch cancel', value);
                    this.setState({show: false});
                  }}
                />
              )}
            </View>
            <ButtonResetPassaword
              validate={true}
              btnLabel={'Add'}
              data={() => this.setState({show: false})}
            />
          </View>
        </Modal>
      );
    }
  };
  timePicker = () => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={this.props.value}
        mode={'time'}
        is24Hour={true}
        display="default"
        onChange={this.OnChange}
        onTouchCancel={value => {
          console.log('touch cancel', value);
          this.setState({show: false});
        }}
      />
    );
  };
  openModel = () => {
    if (this.props.editable === false) {
      this.setState({show: true});
    }
  };
  render() {
    return (
      <View style={styles.content}>
        <View>
          <TouchableOpacity
            style={styles.inputRight}
            onPress={() => {
              this.openModel();
            }}>
            {this.state.dateTime != null ? (
              <Moment
                style={this.props.datebutton}
                element={Text}
                format={this.props.format}>
                {this.props.value}
              </Moment>
            ) : (
              <View style={this.props.datebutton}>
                <Text style={{color: 'grey'}}>{this.props.value}</Text>
              </View>
            )}

            <Image
              source={require('../assets/calendar-range.png')}
              width={15.37}
              height={20}
              style={{marginRight: 10, marginBottom: 5, marginTop: 5}}
            />
          </TouchableOpacity>
        </View>

        {this.state.timeSelect === false &&
          this.state.dateSelect === true &&
          this.props.type !== 'onlyDate' &&
          this.timePicker()}
        {this.datePicker()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
  },
  firstSlot: {
    borderColor: 'rgba(0, 0, 0, 0.247487)',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 0,
    fontSize: 17,
    height: 53,
    width: '80%',
  },
  iosPicker: {
    marginTop: '50%',
  },
  buttonContainer: {
    margin: 25,
  },
  input: {
    borderColor: 'rgba(0, 0, 0, 0.247487)',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 0,
    fontSize: 17,
    height: 53,
  },
  inputRight: {
    borderColor: 'rgba(0, 0, 0, 0.247487)',
    borderWidth: 1,
    width: SCREEN.width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 0,
    height: 53,

    paddingLeft: 10,
    paddingRight: 0,
  },
});
