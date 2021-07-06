/* eslint-disable react/no-did-mount-set-state */
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
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';

import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import FlipImage from '../../component/FlipImage';
import * as userActions from '../../redux/actions/user';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {width} from '../../helper/Constant';
import {CheckEventStatus, AtendPublicEvent} from '../../helper/Api';
import Loader from '../../component/Loader';

class eventDetail extends Component {
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
      detailItem: {},
      date: '',
      imageUri: '',
      Check_Status: '',
      Ticket_Left: '',
      User_Attending_Event: '',
      loading: false,
    };
  }
  componentDidMount() {
    let id = this.props.route.params.detailItem;
    this.setState({user_id: this.props.userDetail.id});
    this.props.userDetail && this.getEventDetail(id, this.props.userDetail.id);
    this.props.userDetail &&
      this.getEventStatus({
        user_id: this.props.userDetail.id,
        event_id: this.props.route.params.detailItem,
      });
  }

  getEventDetail(id, userId) {
    this.setState({loading: true});
    const eventRef = firestore().collection('events');
    eventRef
      .doc(id)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
        } else {
          this.setState({
            myEvent: firestoreDocument.data().Host.id === userId,
          });
          this.setState({detailItem: firestoreDocument.data()});
          this.setState({
            date: firestoreDocument.data(),
            // .DateTime.toDate()
            // .toLocaleTimeString(),
          });
        }
      });
    // this.setState({loading: false});
  }

  async getEventStatus({user_id, event_id}) {
    const response = await CheckEventStatus({user_id, event_id});
    const {Check_Status, Ticket_Left, User_Attending_Event} = response;
    this.setState({
      Check_Status: Check_Status,
      Ticket_Left: Ticket_Left,
      User_Attending_Event: User_Attending_Event,
    });
    this.setState({loading: false});
  }

  async attendEvent({user_id, event_id}) {
    this.setState({loading: true});
    if (this.state.detailItem.EventType !== 'PREPAID') {
      AtendPublicEvent({user_id, event_id}).then(response => {
        this.getEventDetail(
          this.props.route.params.detailItem,
          this.props.userDetail.id,
        );
      });
    } else {
      this.props.navigation.navigate('prepay', {
        event_id: event_id,
        user_id: user_id,
        detailItem: this.state.detailItem,
      });
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            leftPress={() => this.props.navigation.goBack()}
            leftIcon={require('../../assets/back.png')}
            rightIcon={require('../../assets/share.png')}
            centerIcon={require('../../assets/slizerLogo.png')}
          />

          <ScrollView bounces={false}>
            <View
              style={{
                marginTop: 20,
                alignSelf: 'center',
                alignItems: 'center',
                width: SCREEN.width,
              }}>
              {this.state.detailItem && this.state.detailItem !== '' && (
                <FlipImage
                  imageUrl={this.state.detailItem.image}
                  Name={this.state.detailItem.Name}
                  Description={this.state.detailItem.Description}
                  Address={this.state.detailItem.Address}
                />
              )}
            </View>
            <View style={{width: SCREEN.width - 40, alignSelf: 'center'}}>
              <View style={styles.flex}>
                <Text style={[styles.titleText]}>
                  {this.state.detailItem.Name}
                </Text>
                {this.state.detailItem.EventType !== 'SCAN' && (
                  <Text style={[styles.purpleText]}>
                    {this.state.detailItem.EventType}
                  </Text>
                )}
                {this.state.detailItem.EventType === 'SCAN' && (
                  <Text style={[styles.purpleText]}> SCAN-&-PAY AT DOOR</Text>
                )}
              </View>
              <View style={[styles.flexRow, {paddingTop: 8}]}>
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
                  {this.state.detailItem.Host !== undefined &&
                    this.state.detailItem.Host.displayName}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: FONT.Nunito.bold,
                  fontSize: 12,
                  color: BLACK.textColor3,
                  marginTop: 3,
                  fontWeight: 'bold',
                }}>
                {moment(this.state.detailItem.Start_date).format(
                  'hh:mm A | MMM DD, YYYY - ddd',
                )}{' '}
                | {this.state.detailItem.duration} HRS
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
                  {this.state.detailItem.EventType !== 'FREE' &&
                    `$${this.state.detailItem.Fee}`}
                </Text>
              </View>
              <Text style={[styles.titleText, {marginTop: 9}]}>
                Mutual Attendees
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

            {!this.state.myEvent && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (
                    this.state.Check_Status === 'Active' &&
                    this.state.User_Attending_Event === false
                  ) {
                    this.attendEvent({
                      user_id: this.props.userDetail.id,
                      event_id: this.props.route.params.detailItem,
                    });
                  }
                }}
                style={
                  this.state.Check_Status === 'Active'
                    ? this.state.User_Attending_Event === false
                      ? styles.btnAttend
                      : styles.btnMapAttend
                    : styles.btnMapBooked
                }>
                <Text
                  style={
                    styles.btnText
                    //   [
                    //   styles.btnText,
                    //   {
                    //     color:
                    //       this.state.Check_Status === 'Active'
                    //         ? this.state.User_Attending_Event === false
                    //           ? WHITE.dark
                    //           : BLACK.app
                    //         : WHITE.dark,
                    //   },
                    // ]
                  }>
                  {this.state.Check_Status === 'Active'
                    ? this.state.User_Attending_Event === false
                      ? 'ATTEND'
                      : 'ATTENDING'
                    : 'Booked'}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
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

const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, uid) => dispatch(userActions.alterUser({user, uid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(eventDetail);
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
  listView: {
    marginRight: 11,
  },

  ImageView: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
    backgroundColor: 'black',
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
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    marginVertical: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
  },

  btnMapAttend: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    borderWidth: 1,
    marginVertical: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  btnAttend: {
    width: wp('90%'),
    marginHorizontal: '5%',
    backgroundColor: 'black',
    borderRadius: 25,
    height: 50,
    borderWidth: 1,
    marginVertical: 30,
    justifyContent: 'center',
  },
  btnMapBooked: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    marginVertical: 30,
    backgroundColor: 'red',
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
  },
  next: {
    paddingTop: 15,
  },
  detail: {
    width: wp('55%'),
  },
  contentView: {
    flex: 1,
    backgroundColor: WHITE.dark,
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
  purpleText: {
    fontSize: 12,
    color: BLACK.textColor2,
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
