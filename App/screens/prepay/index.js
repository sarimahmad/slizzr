/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {width} from '../../helper/Constant';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
import {CustomerCharge} from '../../helper/Api'
export default class prepay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prepayModal: false,
      number:'',
      exp_month:null,
      cvc:'',
      exp_year:null,
      formValid:false,
      user_id:'',
      event_id:'',
      monthSelected:false,
    };
  }
  
async prepay() {

 let exp_month= this.state.exp_year.substring(0, 2)
 let exp_year= this.state.exp_year.substring(3, 5)
  console.log(exp_year,exp_month)
  if(this.state.formValid===false){
    alert("Invalid Form")  
    }else{
      this.setState({prepayModal:false})
      console.log(this.state)
     data={
      number: this.state.number,
      exp_month: parseInt(exp_month),
      exp_year: parseInt(exp_year),
      cvc: this.state.cvc,
      user_id: this.state.user_id,
      event_id:this.state.event_id 
    }
      await CustomerCharge(data).then(response => {
      alert("successful")
      });
          
    }
}

componentDidMount(){
 this.setState({user_id:this.props.route.params.user_id})
 this.setState({event_id:this.props.route.params.event_id})
   
}
  _onChange = (form) => {
  
 this.setState({cvc:form.values.cvc})
 this.setState({exp_month:form.values.expiry})
 this.setState({exp_year:form.values.expiry})

 this.setState({number:form.values.number})
if(form.valid === true){
  this.setState({formValid:true})
}
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            headerTitle={'PreyPay to Attend'}
            borderBottom={true}
            backColor={WHITE.dark}
            leftIcon={require('../../assets/back.png')}
            leftPress={() => this.props.navigation.goBack()}
          />
          {this.state.prepayModal === false && (
            <View style={{flex:1}}>
              <View style={{marginTop: 20}}>
                <Image
                  source={require('../../assets/eventInfo.png')}
                  style={{width: SCREEN.width}}
                />

                <Image
                  source={require('../../assets/lock.png')}
                  style={{position: 'absolute', right: 30, top: 20}}
                />
              </View>
              <View style={{width: SCREEN.width - 40, alignSelf: 'center'}}>
                <View style={{marginHorizontal: 20, alignSelf: 'center'}}>
                  <Text style={[styles.titleText, {textAlign: 'center'}]}>
                    Uroojs Banger
                  </Text>
                  <Text
                    style={[
                      styles.purpleText,
                      {textAlign: 'center', marginTop: 8},
                    ]}>
                    11:30 PM | Feb 25, 2020 - WED
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <Text
                    style={[
                      {
                        fontFamily: FONT.Nunito.regular,
                        fontSize: 18,
                        color: BLACK.grey,
                        marginTop: 10,
                      },
                    ]}>
                    PREPAID ZICKET X 1
                  </Text>
                  <Text
                    style={[
                      {
                        fontFamily: FONT.Nunito.extraBold,
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: 10,
                      },
                    ]}>
                    $5
                  </Text>
                </View>
                <Text
                  style={[
                    {
                      fontFamily: FONT.Nunito.extraBold,
                      textAlign: 'center',
                      fontSize: 15,
                      marginTop: 15,
                    },
                  ]}>
                  Pay now with Google Pay
                </Text>

                <TouchableOpacity style={[styles.btnMap]}>
                  <Image
                    source={require('../../assets/Gpay.png')}
                    style={{alignItems: 'center', justifyContent: 'center'}}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    {
                      fontFamily: FONT.Nunito.extraBold,
                      textAlign: 'center',
                      fontSize: 15,
                    },
                  ]}>
                  Or use a card below
                </Text>

                <Text
                  style={[
                    styles.subtitleText,
                    {
                      textAlign: 'center',
                      marginTop: SCREEN.height * 0.04,
                      fontFamily: FONT.Nunito.regular,
                      color: BLACK.grey,
                    },
                  ]}>
                  ** put scrollable stripe card + billing address form here**
                  https://stripe.com/img/docs/elements/elements-demo-iphone.png
                </Text>
              </View>

              <View style={{flex: 1, }}>
                <TouchableOpacity
                  onPress={() =>  this.setState({prepayModal:true})}
                  style={[
                    styles.btnPay,
                    {alignSelf: 'center', marginBottom: 10},
                  ]}>
                  <Text
                    style={[
                      {
                        fontSize: 14,
                        fontFamily: FONT.Nunito.bold,
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      },
                    ]}>
                    PAY
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {this.state.prepayModal==true &&
          <View style={{marginTop:20}}>
              <CreditCardInput  onChange={this._onChange} />
              <View style={{flex: 1, }}>
                <TouchableOpacity
                  onPress={() => this.prepay()}
                  style={[
                    styles.btnPay,
                    {alignSelf: 'center', marginBottom: 10},
                  ]}>
                  <Text
                    style={[
                      {
                        fontSize: 14,
                        fontFamily: FONT.Nunito.bold,
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      },
                    ]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              
              </View>
          }
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
  btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },
  btnTextCancel: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    fontFamily: FONT.Nunito.regular,
  },
  cancelButton: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  btnMap: {
    borderRadius: 25,
    height: 50,
    marginBottom: 30,
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
  },

  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    marginTop: hp('5%'),
    height: 50,
    elevation: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
  },
  btnPay: {
    // marginHorizontal: '10%',
    borderRadius: 25,
    marginTop: 30,
    alignItems: 'center',
    height: 56,
    width: 92,
    elevation: 1,
    justifyContent: 'center',
    backgroundColor: '#1FB438',
    bottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  next: {
    paddingTop: 15,
  },
  detail: {
    width: wp('55%'),
  },
  contentView: {
    flex: 1,
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
  text: {
    fontSize: 12,
    color: '#494949',
  },

  logoEvent: {
    width: width,
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  subtitleText: {
    // marginVertical: 10,
    fontSize: 14,

    fontFamily: FONT.Nunito.semiBold,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',

    fontFamily: FONT.Nunito.semiBold,
  },
  barChild: {
    borderWidth: 1,
    width: wp('50%'),
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
