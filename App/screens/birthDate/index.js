import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';

import ButtonResetPassaword from '../../component/ButtonResetPassword';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import DateAndTimePicker from '../../component/DateAndTimePicker';
import * as userActions from '../../redux/actions/user';
import Loader from '../../component/Loader';
import {updateProfile} from '../../helper/Api';
import moment from 'moment';

class BirthDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      showDate: false,
      age: 20,
      age_in_year:0,
      day:'',
      month:'',
      year:''
    };
  }

  onChange = selectedDate => {
   let selected_age_in_year=  moment(selectedDate).format('YYYY') 
   let current_age_in_year = moment(new Date()).format('YYYY');
    current_age_in_year =  moment(current_age_in_year).format('YYYY') 
  
    const age_in_year = parseInt(current_age_in_year)-parseInt(selected_age_in_year);

   let currentDate =
      moment(selectedDate).format('llll') ||
      moment(this.state.DateTime).format('llll');
   let year ,month,day
   year = moment(currentDate).format('YYYY')
   month = moment(currentDate).format('DD')
   day =  moment(currentDate).format('M')
   console.log(year,month,day)
    if (age_in_year > 16) {
      this.setState({
        age_in_year:age_in_year,
        DateTime: currentDate,
        day: day,
        month: month,
        year: year,
        age: age_in_year,
      });
    }
   console.log(this.state)
    this.setState({date: selectedDate});
    if (age_in_year > 16) {
      console.log(age_in_year)
      this.setState({ageCheck: true});
      
    } else {
      this.setState({ageCheck: false});
      console.log(age_in_year)
    }
  };

  updateProfileApi = async () => {
    if (this.state.ageCheck > 0) {
      const dataToSend = {
        day: this.state.day,
        month: this.state.month,
        year: this.state.year,
        age: this.state.age,
        DateTime: this.state.DateTime,
      };
      await updateProfile(this.props.userToken, dataToSend).then(_response => {
        this.props.callApi(_response.data.User, this.props.userToken);
        if (this.props.route.params.from === 'signUp') {
          this.props.navigation.navigate('ConfirmEmail', {
            from: 'birth',
            user: _response.data.User,
          });
          console.log(_response.data.User)
        } else {
          this.props.navigation.navigate('HomeStack');
        }
        this.setState({loading: false});
      });
    }

    this.setState({loading: false});
  };

  showDatepicker = () => {
    this.setState({showDate: true});
  };
  handleSubmit = () => {
    
    if (this.state.age_in_year > 16) {
      this.updateProfileApi();
    } else {
      Alert.alert(
        'Age not Valid',
        'you need to be more than 16 year old to use this app',
      );
    }
  };

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <Text style={styles.titleText}>How old are you?</Text>
          <DateAndTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            format="MMM DD, YYYY"
            editable={false}
            mode="date"  
            showPreviousDate={"yes"}
            type="onlyDate"
            setDateAndTime={date => this.onChange(date)}
          />
          <ButtonResetPassaword
            btnLabel={'Continue'}
            data={this.handleSubmit}
            validate={this.state.ageCheck}
          />
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

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
