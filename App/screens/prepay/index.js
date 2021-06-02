import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {BLACK, BLUE, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {width, height} from '../../helper/Constant';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
export default class prepay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <View
            style={[
              styles.flex,
              {
                padding: 20,
                alignItems: 'center',
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
              },
            ]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('eventDetail2')}>
              <Image
                source={require('../../assets/back.png')}
                style={styles.logo}
              />
            </TouchableOpacity>

            <Image
              source={require('../../assets/slizerLogo.png')}
              style={styles.logo}
            />
            <Image
              source={require('../../assets/share.png')}
              style={styles.logo}
            />
          </View>
          <ScrollView>
            <Image
              source={require('../../assets/eventInfo.png')}
              style={styles.logo}
            />
            <View style={{marginHorizontal: 20, alignSelf: 'center'}}>
              <Text style={[styles.titleText,{textAlign:'center'}]}>Uroojs Banger</Text>
              <Text style={[styles.purpleText,{textAlign:'center'}]}>
                11:30 PM | Feb 25, 2020 - WED
              </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent: 'space-between',marginHorizontal:20}}>
              <Text style={[styles.titleText,{textAlign:'center',marginTop:10}]}>PREPAID ZICKET X 1</Text>
              <Text style={[styles.titleText,{textAlign:'center',marginTop:10}]}>$5</Text>
            </View>
            <Text style={[styles.titleText,{textAlign:'center',marginTop:10}]}>Pay now with Google Pay</Text>
          
            <TouchableOpacity style={styles.btnMap}>
            <Image
              source={require('../../assets/Gpay.png')}
              style={{alignItems: 'center',justifyContent: 'center',}}
            />
            </TouchableOpacity>
            <Text style={[styles.subtitleText,{textAlign:'center',marginTop:10}]}>Or use a card below</Text>
           
            <Text style={[styles.subtitleText,{textAlign:'center',marginTop:10}]}>** put scrollable stripe card + billing address form here** 
https://stripe.com/img/docs/elements/elements-demo-iphone.png</Text>
           
             <TouchableOpacity style={[styles.btnPay,{alignSelf:'center'}]}>
          <Text style={{alignItems: 'center',justifyContent: 'center',color:'white',}}>PAY</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },
  btnTextCancel: {
    fontSize: 16,
    color: 'white',
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
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
  },

  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    borderRadius: 25,
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
    width: wp('20%'),
    // marginHorizontal: '10%',
    borderRadius: 25,
    marginTop: hp('5%'),
    alignItems: 'center',
    height: 50,
    elevation: 1,
    justifyContent: 'center',
    backgroundColor: '#1FB438',
    borderWidth: 1,  
    borderRadius: 24,
    bottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  detail: {
    width: wp('55%'),
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

    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
  },
  barChild: {
    borderWidth: 1,
    width: wp('50%'),
    height: 36,
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
