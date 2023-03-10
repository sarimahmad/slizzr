/* eslint-disable react-native/no-inline-styles */
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
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {width} from '../../helper/Constant';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
export default class eventDetail2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [
        {id: 1, image: require('../../assets/Slizzer-icon/testImage.webp')},
        {id: 2, image: require('../../assets/Slizzer-icon/testImage.webp')},
        {id: 3, image: require('../../assets/Slizzer-icon/testImage.webp')},
        {id: 4, image: require('../../assets/Slizzer-icon/testImage.webp')},
        {id: 5, image: require('../../assets/Slizzer-icon/testImage.webp')},
      ],
    };
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
              onPress={() => this.props.navigation.navigate('eventDetail')}>
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
            <View
              style={{
                elevation: 5,
                marginTop: 20,
                marginHorizontal: 20,
                borderRadius: 12,
                marginBottom: 20,
                padding: 10,
                backgroundColor: 'white',
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 6,
                shadowOpacity: 0.1,
                height: 335,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('eventDetail')}
                style={{
                  borderWidth: 1,
                  height: 35,
                  width: 35,
                  borderRadius: 24,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/backEvent.png')}
                  style={styles.logo}
                />
              </TouchableOpacity>
              <Text style={[styles.titleText, {textAlign: 'center'}]}>
                Nitish Birthday Party{' '}
              </Text>
              <Text
                style={[
                  styles.subtitleText,
                  {textAlign: 'center', fontSize: 12},
                ]}>
                Fixie tote bag ethnic keytar. Neutra vinyl American Apparel kale
                chips tofu art party, cardigan raw denim quinoa. Cray paleo
                tattooed, Truffaut skateboard street art PBR jean shorts
                Shoreditch farm-to-table Austin lo-fi Odd Future occupy. Chia
                semiotics skateboard, Schlitz messenger bag master cleanse High
                Life occupy vegan polaroid tote bag leggings. Single-origin
                coffee mumblecore deep v salvia mlkshk. Organic photo booth cray
                tofu, vegan fixie bitters sriracha. Blog Austin Wes Anderson,
                deep v pour-over trust fund vinyl mlkshk +1.{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgba(178, 171, 177, 0.246039)',
                  padding: 20,
                  marginHorizontal: 20,
                  marginTop: 5,
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../assets/location.png')}
                  style={{height: 16, width: 12}}
                />

                <Text style={{marginLeft: 5}}>
                  1817 18 St. SW Calgary AB T2T 4T2 (Calgary, Alberta)
                </Text>
              </View>
            </View>
            <View style={{width: SCREEN.width - 40, alignSelf: 'center'}}>
              <View style={styles.flex}>
                <Text style={[styles.titleText]}>
                  Brittney???s 18th Birthday{' '}
                </Text>
                <Text
                  style={[styles.titleText, {color: '#F818D9', fontSize: 12}]}>
                  PREPAID
                </Text>
              </View>
              <View style={[styles.flexRow, {paddingTop: 5}]}>
                <Text
                  style={[
                    styles.titleText,
                    {fontSize: 12, fontFamily: FONT.Nunito.regular},
                  ]}>
                  Host:{' '}
                </Text>
                <Text
                  style={[
                    styles.purpleText,
                    {
                      textDecorationLine: 'underline',
                      fontFamily: FONT.Nunito.regular,
                      paddingLeft: 4,
                    },
                  ]}>
                  Holly Smith
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: FONT.Nunito.bold,
                  fontSize: 12,
                  color: BLACK.textColor3,
                  marginTop: 3,
                }}>
                11:30 PM | FEB 25, 2020 - WED | 2 HRS
              </Text>
              <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
                <View style={[styles.flexRow, {paddingTop: 5}]}>
                  <Image
                    style={{width: 12, height: 16, marginRight: 5}}
                    source={require('../../assets/location.png')}
                  />
                  <Text
                    style={{
                      fontFamily: FONT.Nunito.semiBold,
                      fontSize: 12,
                      color: BLACK.grey,
                    }}>
                    15 KM away
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: FONT.Nunito.bold,
                    fontSize: 17,
                    color: BLACK.textColor2,
                  }}>
                  $15
                </Text>
              </View>
              <Text style={[styles.titleText, {marginTop: 9}]}>
                Mututal Attendes
              </Text>
              <View style={{height: 50, width: SCREEN.width, marginTop: 11}}>
                <FlatList
                  data={this.state.image}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View style={styles.listView}>
                      <Image style={styles.ImageView} source={item.image} />
                    </View>
                  )}
                />
              </View>
              <Text
                style={[
                  styles.purpleText,
                  {marginTop: 9, textDecorationLine: 'underline'},
                ]}>
                See more
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('prepay')}
              style={styles.btnMap}>
              <Text style={styles.btnText}>ATTEND</Text>
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
  listView: {
    marginRight: 11,
  },

  ImageView: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    marginVertical: 30,
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
    // paddingHorizontal:10,
  },
  detail: {
    width: wp('55%'),
  },
  next: {
    paddingTop: 15,
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
  logo: {},

  logoEvent: {
    width: width,
  },
  titleText: {
    color: BLACK.grey,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  subtitleText: {
    fontSize: 14,

    fontFamily: FONT.Nunito.semiBold,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    fontFamily: FONT.Nunito.bold,
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
