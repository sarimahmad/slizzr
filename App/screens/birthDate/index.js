import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonResetPassaword from '../../component/ButtonResetPassword';
import TextField from '../../component/TextField';
import Header from '../../component/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class BirthDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log("show")
    this.setState({showDate: true});
  };
  handleSubmit = () => {
    this.props.navigation.navigate('ConfirmEmail');
  };
  render() {
    return (
      <View style={styles.wrapperView}>
{/*     
           <Text style={styles.titleText}>
           How old are you?
          </Text>
          <TextField
          secure={"no"}
            placeholder={'Birth Date'}
            type="email"
            parentCallBack={this.storeInputData}
          />
          <ButtonResetPassaword
            btnLabel={'Continue'}
            data={this.handleSubmit}
          />
      */}
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
  <Text style={styles.titleText}>
           How old are you?
          </Text>
         
       <TouchableOpacity
              onPress={this.showDatepicker}
              style={{flexDirection: 'row', width: wp('90%')}}>
              <View style={styles.input}>
                <Text style={{paddingTop:15,paddingLeft:20}}>Birth Date</Text>
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
          />
     
           
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
    width: wp('90%'),
    // marginHorizontal: '5%',
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
    // alignSelf:'flex-end',
    // marginRight:'5%',
  },

  wrapperView: {
    height:hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F2F2F2'
  },
  textColor:{
      margin: '15%', textAlign: 'center',
      color:'#8e8e93'
  },
  text:{
    color:'#F818D9',
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  
  },
  textPurple:{
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
  
  },
  titleText: {
    marginTop: 13,
    marginBottom: '5%',
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 24,
    textAlign:'center',
   
  },  
  subtitletext:{
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.semiBold,
    fontSize: 16,
  },
  subtitletextbold:{
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
  },
});
