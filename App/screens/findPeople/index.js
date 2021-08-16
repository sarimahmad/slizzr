/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../component/Loader';
class findPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateEvents: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.getPrivateEvents();
  }
  getPrivateEvents = async () => {
    let privateEvents = [];
    const usersRef = firestore().collection('events');
    this.setState({loading: true});
    usersRef.get().then(async doc => {
      doc._docs.forEach(element => {
        if (
          element._data.PublicPrivate === 'Private' &&
          element._data.Host.id === this.props.userDetail.id
        )
          privateEvents.push(element._data);
      });
      this.setState({
        loading: false,
        privateEvents: privateEvents,
      });
    });
    console.log(privateEvents);
  };
  emptyListComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          display: 'flex',
          marginTop: SCREEN.height / 4,
        }}>
        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              alignSelf: 'center',
              marginVertical: 10,
              height: 80,
              width: 80,
            }}
          />

          <Text style={styles.emptyFont}>
            Your currently not hosting any Private events to find people and
            send Direct Invites for.{' '}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            leftPress={() => this.props.navigation.openDrawer()}
            leftIcon={require('../../assets/drawer.png')}
            rightPress={() => this.props.navigation.navigate('peopleProfiles')}
            searchIcon={require('../../assets/searchGrey.png')}
            headerTitle={'Find People For'}
          />
          <FlatList
            data={this.state.privateEvents}
            keyExtractor={item => item.id}
            ListEmptyComponent={this.emptyListComponent}
            renderItem={({item}) => (
              <View
                style={{
                  minHeight: 80,
                  borderBottomColor: 'lightgrey',
                  borderBottomWidth: 1,
                  width: SCREEN.width,
                }}>
                <View
                  style={[
                    styles.flexRow,
                    {width: SCREEN.width - 20, alignItems: 'center'},
                  ]}>
                  <View style={styles.imgView}>
                    <Image
                      source={{uri: item.image}}
                      style={{borderRadius: 44, height: 60, width: 60}}
                    />
                    {item.PublicPrivate === 'Private' && (
                      <Image
                        style={{position: 'absolute', right: -10}}
                        source={require('../../assets/private.png')}
                      />
                    )}
                  </View>

                  <View style={styles.detail}>
                    <Text style={styles.titleText}>{item.Name}</Text>
                    <Text style={styles.adressText}>
                      Host: {item.Host.displayName}
                    </Text>
                    <Text style={styles.purpleText}>{item.DateTime}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('myEventInfo', {id: item.id})
                    }
                    style={styles.shareView}>
                    <Image source={require('../../assets/Right.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

export default connect(mapStateToProps)(findPeople);
const styles = StyleSheet.create({
  topView: {
    // height: hp('35%'),
  },
  emptyFont: {
    fontSize: 20,
    textAlign: 'center',
    color: '#494949',
    fontFamily: FONT.Nunito.regular,
    marginBottom: 20,
  },

  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  detail: {
    width: SCREEN.width * 0.55,
  },
  next: {
    paddingTop: 15,
  },
  imgView: {
    marginHorizontal: 20,
    alignItems: 'center',

    alignSelf: 'center',
  },
  inputSearch: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingLeft: 40,
    marginVertical: 10,
    borderRadius: 24,
    borderColor: 'lightgrey',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  input: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderWidth: 1,
    height: hp('7%'),
    marginVertical: 10,
    borderRadius: 12,
    borderColor: 'lightgrey',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    marginTop: hp('5%'),
    height: 50,
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.1,
    elevation: 1,
    justifyContent: 'center',

    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
  },
  btnMap: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  logoSearch: {
    position: 'absolute',
    left: 30,
    top: 25,
  },
  bottomView: {
    position: 'absolute',

    bottom: 0,
    paddingBottom: 10,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  barChild: {
    borderWidth: 1,
    width: wp('20%'),
    height: hp('6%'),
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
  },
  subtitleText: {
    fontSize: 12,

    fontFamily: FONT.Nunito.semiBold,
  },
  logo: {
    //   height: 80,
    //   width: 100,
    //   resizeMode: 'contain',
    marginTop: 25,

    alignSelf: 'center',
  },
  logoAdd: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginTop: '10%',
  },
  logoAddCalender: {
    position: 'absolute',
    right: 5,
    top: 13,
    // alignSelf:'flex-end',
    // marginRight:'5%',
  },

  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  adressText: {
    fontSize: 12,
    color: BLACK.grey,
    fontFamily: FONT.Nunito.regular,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    fontFamily: FONT.Nunito.bold,
  },
  detailWrapper: {
    alignSelf: 'center',
  },
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  policyText: {
    alignSelf: 'center',
    marginTop: '2%',
    color: BLACK.appDark,
    fontFamily: FONT.Nunito.regular,
  },
});
