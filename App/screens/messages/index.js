import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
export default class messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
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
  myevents = () => {
    this.setState({ myevents: true });
    this.setState({ attendingEvents: false });
  };
  attendingEvents = () => {
    this.setState({ myevents: false });
    this.setState({ attendingEvents: true });
  };
  barTapped = indexTap => {
    if (indexTap === 0) {
      this.setState({ index: 0 });
    } else if (indexTap === 1) {
      this.setState({ index: 1 });
    }
  };
  topBar = () => {
    return (
      <View style={styles.flex}>
        <TouchableOpacity
          style={
            this.state.index == 0
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
              this.state.index == 0 ? { color: '#F818D9' } : { color: 'black' },
            ]}>
            MY EVENTS
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            this.state.index == 1
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
              this.state.index == 1 ? { color: '#F818D9' } : { color: 'black' },
            ]}>
            ATTENDING EVENTS
        </Text>
        </TouchableOpacity>
      </View>

    )
  }
  noEvent = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: hp('30%') }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONT.Nunito.regular,
            textAlign: 'center',
          }}>
          You are not hosting any events at the moment.
      </Text>
        <TouchableOpacity
          onPress={() => this.setState({ enableMap: true })}
          style={styles.btnLocation}>
          <Text style={[styles.btnTextLocation]}>HOST?</Text>
        </TouchableOpacity>
      </View>

    )
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            headerTitle={'Messages'}
            leftPress={() => this.props.navigation.openDrawer()}
            leftIcon={require('../../assets/drawer.png')}
          />
          {this.topBar()}

          {this.state.index == 0 && (
            <FlatList
              data={this.state.findpeople}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('messagesEvent')
                  }>
                  <View style={styles.flexRow}>
                    <View style={styles.imgView}>

                      <Image source={require('../../assets/image2.jpg')} style={{ borderRadius: 44, height: 60, width: 60 }} />

                      <Image
                        style={{ position: 'absolute', right: -10 }}
                        source={require('../../assets/private.png')}
                      />
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.titleText}>{item.profileName}</Text>
                      <Text style={styles.greyText}>{item.adress}</Text>
                      <Text style={styles.purpleText}>{item.date}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      hiehgt: 1,
                      borderBottomWidth: 1,
                      borderBottomColor: 'lightgrey',
                      width: SCREEN.width,
                    }}></View>
                </TouchableOpacity>
              )}
            />
          )}
          {this.state.index == 1 && (
            this.noEvent()
          )}
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
    backgroundColor: WHITE.dark,
  },
  btnTextLocation: {
    fontSize: 14,
    color: 'white',
    flex: 1,
    textAlign: 'center',
    fontFamily: FONT.Nunito.bold,
    paddingTop: 15,
  },
  greyText: {
    fontSize: 12,
    color: BLACK.grey,
    fontFamily: FONT.Nunito.regular,
  },
  btnLocation: {
    width: SCREEN.width - 40,
    alignContent: 'center',
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    elevation: 1,
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,

    paddingHorizontal: 10,
    alignItems: 'center',
  },
  detail: {
    width: wp('55%'),
  },
  next: {
    paddingTop: 15,
  },
  detail: {
    width: SCREEN.width * 0.55,
  },
  imgView: {
    marginHorizontal: 20,
    alignItems: 'center',

    alignSelf: 'center'
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
    marginTop: 5,
    fontFamily: FONT.Nunito.bold,
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
