import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
import {ScrollView} from 'react-native';
export default class event extends Component {
  constructor() {
    super();
    this.state = {
      editType: true,
    };
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            headerTitle={'Events'}
            borderBottom={true}
            backColor={WHITE.dark}
            leftIcon={require('../../assets/back.png')}
            leftPress={() => this.props.navigation.navigate('payouts')}
            // rightIcon={require('../../assets/Slizzer-icon/edit.png')}
            // rightPress={() => this.setState({ editType: !this.state.editType })}
          />
          <ScrollView>
            <View style={[styles.wrapperView, {alignItems: 'center'}]}>
              <View>
                <Image
                  source={require('../../assets/eventInfo.png')}
                  style={{width: SCREEN.width}}
                />

                <Image
                  source={require('../../assets/lock.png')}
                  style={{position: 'absolute', right: 30, top: 20}}
                />
              </View>

              <Text
                style={[
                  styles.textView1,
                  {fontFamily: FONT.Nunito.bold, fontSize: 17},
                ]}>
                Uroojs Banger
              </Text>
              <Text style={styles.textView1}>Prepaid |$5</Text>
              <Text style={[styles.textView1, {color: '#F818D9',fontFamily:FONT.Nunito.bold}]}>
                11:30 PM | Feb 25, 2020 - WED
              </Text>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Image
                  style={{marginRight: 5}}
                  source={require('../../assets/Slizzer-icon/location.png')}
                />
                <Text style={styles.textView1}>Toronto, ON</Text>
              </View>
              <Text style={styles.textView2}>
                Attendees on the List:
                <Text style={styles.numValue}> 100</Text>
              </Text>
              <Text style={styles.textView2}>
                Attendes Scanned In:
                <Text style={styles.numValue}> 86</Text>
              </Text>
              <Text style={styles.textView2}>
                Event Earnings:
                <Text style={styles.numValue}> $430</Text>
              </Text>
              <Text style={styles.textView2}>
                Service Charges & Payout Fee ($2.25):
                <Text style={styles.numValue}> $51.60</Text>
              </Text>
              <Text style={styles.textView2}>
                Total Event Earnings:
                <Text style={styles.numValue}> $378.40</Text>
              </Text>
              <Text style={[styles.textView2,{fontSize:12}]}>
                (All currencies shown in CAD)
              </Text>
              <Text style={styles.text3}>Status:</Text>
              <View>
                {/* {this.state.editType ? <Text style={styles.start}>PAYOUT on the way</Text> :( */}
                <View>
                  <Text style={styles.text4}>PAYOUT FAILED TO TRANSFER</Text>

                  <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntext}> REQUEST PAYOUT</Text>
                  </TouchableOpacity>
                </View>
                {/* )} */}
              </View>

              <Text style={styles.text5}>
                NOTE: Make sure you have a valid payout method setup before
                requesting. Payouts start processing 4-5 days after your request
                and can take up to an additional 7 bank days to show in your
                account.
              </Text>
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
  imageView: {
    width: SCREEN.width - 40,
    height: (SCREEN.width - 40) / 2.3,
    resizeMode: 'stretch',
  },
  textView1: {
    marginBottom: 5,
    fontFamily: FONT.Nunito.regular,
    fontSize: 12,
    color: '#494949',
  },
  textView2: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 16,
    fontWeight: '600',
    color: '#494949',
    marginBottom: 5,
  },
  numValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F818D9',
  },
  text3: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    color: '#494949',
    marginTop: 15,
    marginBottom: 5,
  },
  text4: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    color: '#FF2D55',
    textAlign: 'center',
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    backgroundColor: '#1E1E1E',
    borderRadius: 27.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 34,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
  },
  text5: {
    fontFamily: FONT.Nunito.semiBold,
    fontSize: 12,
    marginTop:49,
    marginBottom:10,
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginLeft: 23,
    marginRight: 9,
    color: '#494949',
  },
  start: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    textAlign: 'center',
    color: '#FF9500',
    marginBottom: 139,
  },
});
