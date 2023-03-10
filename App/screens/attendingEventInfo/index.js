/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';

import * as userActions from '../../redux/actions/user';
import ErrorPopup from '../../component/ErrorPopup';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import moment from 'moment';
import {getEventDetail, deleteAttendEvent} from '../../helper/Api';
import Loader from '../../component/Loader';

class attendingEventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailItem: {},
      loading: false,
      btnOneText: '',
      errorTitle: '',
      errorText: '',
      popUpError: false,
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
     let location= {
        Lat: this.props.userDetail.Location.latitude,
        Long:  this.props.userDetail.Location.longitude
    }
    await getEventDetail(location,id)
      .then(response => {
        if(response.Event){
        this.setState({
          detailItem: response.Event,
          loading:false
        });
      }else{
        alert(response)
        this.props.navigation.goBack()
      }
      }).catch(error => console.log(error));
    
    this.setState({currentUserUID: this.props.userDetail.id});
  }

  cancelEvent = async () => {
    let id = this.props.route.params.id;
    this.setState({loading: true});
    await deleteAttendEvent({
      user_id: this.props.userDetail.id,
      event_id: id,
    }).then(response => {
      if (response.status && response.status === 200) {
        this.setState({loading: false});
        this.props.navigation.pop();
      } else {
        this.setState({
          loading: false,
          btnOneText: 'Ok',
          errorTitle: 'ERROR',
          errorText: JSON.stringify(response),
          popUpError: true,
        });
      }
    });
  };

  render() {
    const {detailItem} =this.state
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
              source={{uri: detailItem.image}}
              style={styles.logoEvent}
            />

            <View style={{alignSelf: 'center'}}>
              <Text
                style={[
                  styles.titleText,
                  {textAlign: 'center', marginTop: 20},
                ]}>
                {detailItem.Name}
              </Text>
              <Text style={[styles.text, {textAlign: 'center', marginTop: 5}]}>
                {detailItem.EventType}{' '}
                {detailItem.EventType !== 'FREE' &&
                  `| $${detailItem.Fee}`}
              </Text>
              <Text
                style={[
                  styles.purpleText,
                  {textAlign: 'center', marginTop: 4},
                ]}>
                {moment(detailItem.Start_date).format(
                  'hh:mm A | MMM DD, YYYY - ddd',
                )}{' '}
                | {detailItem.duration} HRS
              </Text>

              <TouchableOpacity onPress={()=>this.props.navigation.navigate('myProfile', {
                    id: detailItem.userId,
        
                    eventId:detailItem.id,
                    hostId:detailItem.Host.id

                  })} style={[styles.flexRow]}>
                   <Text style={[styles.titleText, {fontSize: 12}]}>Host: </Text>
                <Text
                  style={[
                    styles.purpleText,
                    {textDecorationLine: 'underline'},
                  ]}>
                  {detailItem.Host &&
                    detailItem.Host.displayName}{' '}
                </Text>
              </TouchableOpacity>
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
                {detailItem.Address}
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
              {detailItem.Description}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('attendeesList', {
                  id: this.props.route.params.id,
                  host: detailItem.Host,
                  from: 'attend',
                })
              }
              style={styles.btnMap}>
              <Text style={styles.btnText}>ATTENDEES</Text>
            </TouchableOpacity>
            {console.warn('Detail Item')}

            {console.warn(this.state.detailItem)}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('zicketDetail', {
                  EventID: this.props.route.params.id,
                  UserID: this.props.userDetail.id,
                })
              }
              style={styles.btnMap}>
              <Text style={styles.btnText}>VIEW ZICKET</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('chat', {
                  CurrentUserUID: this.state.currentUserUID,
                  HostUID: detailItem.Host.Id,
                  EventID: this.props.route.params.id,
                })
              }
              style={styles.btnMap}>
              <Text style={styles.btnText}>MESSAGE HOST</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => this.cancelEvent()}>
              <Text style={styles.btnTextCancel}>CANCEL ATTANDANCE</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.popUpError && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() => {
                this.setState({
                  loading: false,
                  btnOneText: 'Ok',
                  errorTitle: 'UPDATED',
                  errorText: 'Your profile has been updated!',
                  popUpError: true,
                });
                this.props.navigation.pop();
              }}
              doneButtonPress={() => {
                this.setState({
                  loading: false,
                  btnOneText: 'Ok',
                  errorTitle: 'UPDATED',
                  errorText: 'Your profile has been updated!',
                  popUpError: true,
                });
                this.props.navigation.pop();
              }}
              errorTitle={this.state.errorTitle}
              errorText={this.state.errorText}
              btnOneText={this.state.btnOneText}
              btnTwoText={this.state.btnTwoText}
            />
          </Modal>
        )}
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
export default connect(mapStateToProps, mapDispatchToProps)(attendingEventInfo);
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
    width: SCREEN.width - 40,
    height: 110,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
 
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
