/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
import {ScrollView} from 'react-native';
import {GetAllPayoutStatusEvents} from '../../helper/Api';
import moment from 'moment';

export default class event extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      PayoutDetails: {},
    };
  }

  componentDidMount() {
    let id = this.props.route.params.id;
    if (id) {
      this.getEventDetail(id);
      this.getPayoutStatus(id);
    }
  }
  async getEventDetail(id) {
    // Get Event Detail here
  }

  async getPayoutStatus(id) {
    await GetAllPayoutStatusEvents({
      event_id: id,
    }).then(response => {
      console.log(response);
      if (response.PayoutDetails) {
        this.setState({
          isLoading: false,
          PayoutDetails: response.PayoutDetails,
        });
      }
    });
  }

  render() {
    const Event = this.state.PayoutDetails.events;
    const PayoutDetails = this.state.PayoutDetails;
    if (this.state.isLoading) {
      return (
        <View style={styles.wrapperView}>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            headerTitle={'Events'}
            borderBottom={true}
            backColor={WHITE.dark}
            leftIcon={require('../../assets/back.png')}
            leftPress={() => this.props.navigation.navigate('payouts')}
          />
          {console.log(this.state)}
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
                {Event.Name}
              </Text>
              <Text style={styles.textView1}>
                {Event.EventType} |$ {Event.Fee}
              </Text>
              <Text
                style={[
                  styles.textView1,
                  {color: '#F818D9', fontFamily: FONT.Nunito.bold},
                ]}>
                {moment(Event.Start_date).format(
                  'hh:mm A | MMM DD, YYYY - ddd',
                )}
              </Text>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Image
                  style={{marginRight: 5}}
                  source={require('../../assets/Slizzer-icon/location.png')}
                />
                <Text style={styles.textView1}>{Event.Address}</Text>
              </View>
              <Text style={styles.textView2}>
                Attendees on the List:
                <Text style={styles.numValue}> {PayoutDetails.Attendees}</Text>
              </Text>
              <Text style={styles.textView2}>
                Attendes Scanned In:
                <Text style={styles.numValue}>
                  {PayoutDetails.CheckedInAttendees}
                </Text>
              </Text>
              <Text style={styles.textView2}>
                Event Earnings:
                <Text style={styles.numValue}>
                  ${PayoutDetails.EventEarnings}
                </Text>
              </Text>
              <Text style={styles.textView2}>
                Service Charges & Payout Fee ($2.25):
                <Text style={styles.numValue}>
                  ${PayoutDetails.ServiceCharge}
                </Text>
              </Text>
              <Text style={styles.textView2}>
                Total Event Earnings:
                <Text style={styles.numValue}>
                  ${PayoutDetails.YourEarnings}
                </Text>
              </Text>
              <Text style={[styles.textView2, {fontSize: 12}]}>
                (All currencies shown in CAD)
              </Text>
              <Text style={styles.text3}>Status:</Text>

              <View>
                {PayoutDetails.PayoutStatus === 'COMPLETED' ? (
                  <View>
                    <Text style={styles.greentext}>PAID</Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.text4}>PAYOUT FAILED TO TRANSFER</Text>

                    {/* <TouchableOpacity style={styles.btn}>
                      <Text style={styles.btntext}> REQUEST PAYOUT</Text>
                    </TouchableOpacity> */}
                  </View>
                )}
              </View>
              {PayoutDetails.PayoutStatus !== 'COMPLETED' && (
                <Text style={styles.text5}>
                  NOTE: Make sure you have a valid payout method setup before
                  requesting. Payouts start processing 4-5 days after your
                  request and can take up to an additional 7 bank days to show
                  in your account.
                </Text>
              )}
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
  greentext: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    color: '#4CD964',
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
    marginTop: 49,
    marginBottom: 10,
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
