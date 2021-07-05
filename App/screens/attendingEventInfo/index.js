/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import moment from 'moment';
import {getEventDetail} from '../../helper/Api';
import Loader from '../../component/Loader';

export default class attendingEventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailItem: {},
      loading: false,
    };
  }
  componentDidMount() {
    let id = this.props.route.params.id;
    if (id) {
      this.getEventDetail(id);
    }
  }
  async getEventDetail(id) {
    this.setState({loading: true});
    await getEventDetail(id).then(response => {
      this.setState({detailItem: response.Event});
      this.setState({loading: false});
    });
    const TOKEN = await AsyncStorage.getItem('token');
    this.setState({currentUserUID: TOKEN});
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            headerTitle={'Event'}
            leftPress={() => this.props.navigation.goBack()}
            leftIcon={require('../../assets/back.png')}
          />

          <ScrollView>
            <Image
              source={{uri: this.state.detailItem.image}}
              style={styles.logoEvent}
            />

            <View style={{alignSelf: 'center'}}>
              <Text
                style={[
                  styles.titleText,
                  {textAlign: 'center', marginTop: 20},
                ]}>
                {this.state.detailItem.Name}
              </Text>
              <Text style={[styles.text, {textAlign: 'center', marginTop: 5}]}>
                {this.state.detailItem.EventType}{' '}
                {this.state.detailItem.EventType !== 'FREE' &&
                  `| $${this.state.detailItem.Fee}`}
              </Text>
              <Text
                style={[
                  styles.purpleText,
                  {textAlign: 'center', marginTop: 4},
                ]}>
                {moment(this.state.detailItem.Start_date).format(
                  'hh:mm A | MMM DD, YYYY - ddd',
                )}{' '}
                | {this.state.detailItem.duration} HRS
              </Text>

              <Text style={{textAlign: 'center', marginVertical: 4}}>
                <Text style={[styles.titleText, {fontSize: 12}]}>Host: </Text>
                <Text
                  style={[
                    styles.purpleText,
                    {textDecorationLine: 'underline'},
                  ]}>
                  {this.state.detailItem.Host &&
                    this.state.detailItem.Host.displayName}{' '}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(178, 171, 177, 0.246039)',
                padding: 20,
                margin: 20,
                borderRadius: 10,
              }}>
              <Image
                source={require('../../assets/location.png')}
                style={{height: 16, width: 12, marginRight: 5}}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONT.Nunito.regular,
                  color: '#494949',
                }}>
                {this.state.detailItem.Address}
              </Text>
            </View>
            <Text style={[styles.titleText, {textAlign: 'center'}]}>
              Description:
            </Text>
            <Text
              style={[
                styles.text,
                {
                  textAlign: 'center',
                  marginHorizontal: 36,
                  marginTop: 10,
                  marginBottom: 20,
                },
              ]}>
              {this.state.detailItem.Description}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('attendeesList', {
                  id: this.props.route.params.id,
                })
              }
              style={styles.btnMap}>
              <Text style={styles.btnText}>ATTENDEES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('zicketDetail', {
                  id: this.state.detailItem.id,
                })
              }
              style={styles.btnMap}>
              <Text style={styles.btnText}>VIEW ZICKET</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('chat', {
                  CurrentUserUID: this.state.currentUserUID.slice(1, -1),
                  HostUID: this.state.detailItem.Host.Id,
                  EventID: this.props.route.params.id,
                })
              }
              style={styles.btnMap}>
              <Text style={styles.btnText}>MESSAGE HOST</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.btnTextCancel}>CANCEL ATTANDANCE</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  contentView: {
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
    alignSelf: 'center',
    marginBottom: 20,
    width: SCREEN.width - 40,
    backgroundColor: 'black',
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
  logo: {},

  logoEvent: {
    marginTop: 10,
    width: '100%',
    height: 110,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'center',
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    marginTop: 10,

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
