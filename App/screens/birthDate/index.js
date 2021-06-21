/* eslint-disable no-alert */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

import ButtonResetPassaword from '../../component/ButtonResetPassword';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import DateAndTimePicker from '../../component/DateAndTimePicker';
import firestore from '@react-native-firebase/firestore';
import * as userActions from '../../redux/actions/user';
import Loader from '../../component/Loader';

class BirthDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      showDate: false,
      age: 20,
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({date: currentDate});
  };

  showDatepicker = () => {
    this.setState({showDate: true});
  };
  handleSubmit = () => {
    const current_date = new Date();
    const difference_date =
      current_date.getTime() - new Date(this.state.date).getTime();
    const difference_in_days = difference_date / (1000 * 3600 * 24);
    const age_in_year = difference_in_days / 365;
    if (age_in_year > 16) {
      this.firestoreLinking(age_in_year);
    } else {
      Alert.alert(
        'Age not Valid',
        'you need to be more than 16 year old to use this app',
      );
    }
  };

  firestoreLinking = async data => {
    this.setState({loading: true});
    const userDetail = await AsyncStorage.getItem('userdetail');
    const usersRef = firestore().collection('users');
    usersRef
      .doc(JSON.parse(userDetail).user.id)
      .update({age: data})
      .then(() => {
        usersRef
          .doc(JSON.parse(userDetail).user.id)
          .get()
          .then(firestoreDocument => {
            this.props.callApi(
              firestoreDocument.data(),
              JSON.parse(userDetail).user.id,
            );
            if (this.props.route.params === 'signUp') {
              this.props.navigation.navigate('ConfirmEmail');
            } else {
              this.props.navigation.navigate('HomeStack');
            }
            this.setState({loading: false});
          });
      })
      .catch(error => {
        this.setState({loading: false});
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <Text style={styles.titleText}>How old are you?</Text>

          <DateAndTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={'date'}
            is24Hour={true}
            display="default"
            setDateAndTime={date => this.setState({date})}
            onChange={this.onChange}
          />
          <ButtonResetPassaword
            btnLabel={'Continue'}
            data={this.handleSubmit}
          />
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, uid) => dispatch(userActions.setUser({user, uid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BirthDate);
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
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
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
