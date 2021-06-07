/* eslint-disable react/self-closing-comp */
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';

export default class sharedHosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      image: [
        {id: 1, image: require('../../assets/profile2.png')},
        {id: 2, image: require('../../assets/profile2.png')},
        {id: 3, image: require('../../assets/profile2.png')},
        {id: 4, image: require('../../assets/profile2.png')},
        {id: 5, image: require('../../assets/profile2.png')},
        {id: 4, image: require('../../assets/profile2.png')},
        {id: 5, image: require('../../assets/profile2.png')},
        {id: 4, image: require('../../assets/profile2.png')},
        {id: 5, image: require('../../assets/profile2.png')},
      ],

      attendeesLIst: [
        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },
        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },
        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },
        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },

        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },

        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },
        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },

        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },

        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },
        {
          imgProfile: '',
          attendee: 'Ava Gregoraci',
          count: 3,
        },
      ],
    };
  }
  barTapped = indexTap => {
    if (indexTap === 0) {
      this.setState({index: 0});
    } else if (indexTap === 1) {
      this.setState({index: 1});
    }
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <HeaderWithOptionBtn
          borderBottom={true}
          backColor={WHITE.dark}
          headerTitle={'Shared Hosts'}
          leftPress={() => this.props.navigation.goBack()}
          leftIcon={require('../../assets/back.png')}
        />
        <SafeAreaView style={styles.contentView}>
          <View style={{width: SCREEN.width - 40, alignSelf: 'center'}}>
            <Text
              style={{
                color: BLACK.lightgrey,
                fontSize: 12,
                fontFamily: FONT.Nunito.regular,
              }}>
              Select shared hosts for:
            </Text>

            <View style={styles.form}>
              <Picker
                mode="dropdown"
                placeholder="Select your Category"
                placeholderStyle={{color: 'black'}}
                placeholderIconColor="#007aff"
                style={{width: wp('100%') / 1.1}}
                selectedValue={'Adresses sauvegardées'}
                onValueChange={this.onValueChangeCatagory}>
                {/* <Picker.Item label="List of Saved Adress" value="adress 1" color="#5f1867"/> */}
                <Picker.Item
                  label="Adresses sauvegardées"
                  value="Adresses sauvegardées"
                />
                <Picker.Item label="adress 2" value="adress 2" />
                <Picker.Item label="adress 3" value="adress 3" />
                <Picker.Item label="adress 4" value="adress 4" />
              </Picker>
            </View>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View
                style={{
                  marginRight: 5,
                  height: 45,
                  width: 45,
                  borderRadius: 24,
                  backgroundColor: '#EBE5F1',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={require('../../assets/searchPurple.png')} />
              </View>

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
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.sharebtnText}>INVITE SHARED HOSTS</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.flex, {marginTop: 20}]}>
            <TouchableOpacity
              style={
                this.state.index === 0
                  ? {
                      borderBottomColor: '#F818D9',
                      borderBottomWidth: 3,
                      justifyContent: 'center',
                      width: SCREEN.width * 0.5,
                      height: 39,
                    }
                  : {
                      color: 'black',
                      width: SCREEN.width * 0.5,
                      height: 39,
                      justifyContent: 'center',
                    }
              }
              onPress={() => this.barTapped(0)}>
              <Text
                style={[
                  styles.barChild,
                  this.state.index === 0
                    ? {color: '#F818D9'}
                    : {color: 'black'},
                ]}>
                SHARED HOSTS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.index === 1
                  ? {
                      borderBottomColor: '#F818D9',
                      borderBottomWidth: 3,
                      justifyContent: 'center',
                      width: SCREEN.width * 0.5,
                      height: 39,
                    }
                  : {
                      color: 'black',
                      width: SCREEN.width * 0.5,
                      height: 39,
                      justifyContent: 'center',
                    }
              }
              onPress={() => this.barTapped(1)}>
              <Text
                style={[
                  styles.barChild,
                  this.state.index === 1
                    ? {color: '#F818D9'}
                    : {color: 'black'},
                ]}>
                PENDING REQUESTS
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.attendeesLIst}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.flexRow}>
                  <View style={styles.imgView}>
                    <Image
                      style={{height: 50, width: 50}}
                      source={require('../../assets/profile1.png')}
                    />
                  </View>
                  <View style={styles.detail}>
                    <Text style={styles.titleText}>{item.attendee}</Text>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={{height: 35, width: 35}}
                      source={require('../../assets/close.png')}
                    />
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'lightgrey',
                    width: SCREEN.width,
                  }}></View>
              </TouchableOpacity>
            )}
          />
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

  contentView: {
    width: SCREEN.width,
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
  sharebtnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },
  shareButton: {
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  form: {
    // marginHorizontal:20,
    elevation: 2,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginTop: 10,
    borderRadius: 5,
  },

  btnMap: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
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
    paddingVertical: 20,
    // paddingHorizontal:10,
    // alignSelf: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  detail: {
    width: wp('60%'),
  },
  next: {
    paddingTop: 15,
  },
  imgView: {
    width: wp('20%'),
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {},
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
  },
  barChild: {
    borderBottomWidth: 1,
    width: SCREEN.width * 0.5,
    height: 40,
    borderBottomColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
