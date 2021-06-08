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
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
export default class sharedHostRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendingEvents: true,
      myevents: false,
      messages: [
        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
      ],
      findpeople: [
        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },

        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },

        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
        {
          imgProfile: '',
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        {/* <View style={[styles.flex, {padding: 20, alignItems: 'center',marginTop:20 }]}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("manageEvent")}>
              <Image
                source={require('../../assets/back.png')}
                style={styles.logo}
              />
            </TouchableOpacity>

            <Text style={styles.titleText}>Shared Host Requests</Text>
            <View></View>
          </View> */}

        <SafeAreaView style={styles.contentView}>
        <HeaderWithOptionBtn
          borderBottom={true}
          backColor={WHITE.dark}
          headerTitle={'Shared Host Requests'}
          leftPress={() => this.props.navigation.goBack()}
          leftIcon={require('../../assets/back.png')}
        />
          <FlatList
            data={this.state.findpeople}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('attendingEventInfo')
                }
                style={{
                  width:SCREEN.width,
                  borderBottomWidth: 1,
                  borderBottomColor: 'lightgrey',
                }}>
                
                <View style={styles.flexRow}>
                  <View style={{flexDirection:"row"}}>
                  <View style={styles.imgView}>
                    <Image 
                    style={{width:50, height:50, borderRadius:25}}
                    source={require('../../assets/image2.jpg')} />
                  </View>

                  <View style={styles.detail}>
                    <Text style={styles.titleText}>{item.profileName}</Text>
                    <Text style={styles.subtitleText}>{item.adress}</Text>
                    <Text style={styles.purpleText}>{item.date}</Text>
                  </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('manageEvent')
                      }
                      style={{
                        marginBottom: 5,
                        marginRight: 5,
                        height: 30,
                        width: 30,
                        borderRadius: 24,
                        backgroundColor: '#4CD964',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image source={require('../../assets/check.png')} />
                    </TouchableOpacity>
                    <View
                      style={{
                        marginRight: 5,
                        height: 30,
                        width: 30,
                        borderRadius: 24,
                        backgroundColor: '#FF3B30',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image source={require('../../assets/closeIcon.png')} />
                    </View>
                  </View>
                </View>
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
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    // width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
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
    width:SCREEN.width- 40,
    alignSelf: 'center', height:80,
    alignItems:'center',
    justifyContent:'space-between'

  },

  imgView: {
    width:50,
   height: 50,
   borderRadius:25,

    marginRight:20

  },
  shareView: {
    width: wp('20%'),
    justifyContent: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {},
  titleText: {
    color: BLACK.grey,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  subtitleText:{
    color: BLACK.grey,
    fontFamily: FONT.Nunito.regular,
    fontSize: 12,

  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    textDecorationLine: 'underline',
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
