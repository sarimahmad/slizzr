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
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import * as userActions from '../../redux/actions/user';
import {connect} from 'react-redux';
import ErrorPopup from '../../component/ErrorPopup';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {getEventDetail, deleteHostEvent} from '../../helper/Api';
import moment from 'moment';
import Loader from '../../component/Loader';
class myEventInfo extends Component {
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
          loading:false,
          detailItem: response.Event,
      
        });
      }else{
        alert(response)
        this.props.navigation.goBack()
        this.setState({
          loading:false,
        });
      
      }
      })
      .catch(error => console.log(error));
  
  }

  cancelEvent = async () => {
    let id = this.props.route.params.id;
    this.setState({loading: true});
    await deleteHostEvent(id, {CancellationReason: 'Optional'}).then(
      response => {
        if (response.status === 200) {
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
      },
    );
  };

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
              style={styles.logoEvent1}
            />

            <View style={{alignSelf: 'center'}}>
              <Text style={[styles.titleText, {textAlign: 'center'}]}>
                {this.state.detailItem.Name}
              </Text>
              <Text style={[styles.text, {textAlign: 'center'}]}>
                {this.state.detailItem.EventType}{' '}
                {this.state.detailItem.EventType !== 'FREE' &&
                  `| $${this.state.detailItem.Fee}`}
              </Text>
              <Text style={[styles.purpleText, {textAlign: 'center'}]}>
                {moment(this.state.detailItem.Start_date).format(
                  'hh:mm A | MMM DD, YYYY - ddd',
                )}{' '}
                | {this.state.detailItem.duration} HRS
              </Text>

              <Text style={{textAlign: 'center', marginVertical: 5}}>
                <Text style={[styles.titleText, {fontSize: 12}]}>Host: </Text>
                <Text style={styles.purpleText}>
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
                style={styles.logoEvent}
              />

              <Text>
                {this.state.detailItem && this.state.detailItem.Address}
              </Text>
            </View>
            <Text style={[styles.titleText, {textAlign: 'center'}]}>
              Description:
            </Text>
            <Text
              style={[
                styles.text,
                {textAlign: 'center', marginHorizontal: 36, marginVertical: 10},
              ]}>
              {this.state.detailItem && this.state.detailItem.Description}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('peopleProfiles')}
              style={styles.btnMap}>
              <Text style={styles.btnText}>Find PEOPLE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Scan', {
                  id: this.state.detailItem.id,
                })
              }
              style={styles.btnMap}>
              <Text style={styles.btnText}>ZICKET SCANNER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnMap}
              onPress={() =>
                this.props.navigation.navigate('attendeesList', {
                  id: this.state.detailItem.id,
                  host: this.state.detailItem.Host,
                  from: 'host',
                })
              }>
              <Text style={styles.btnText}>ATTENDEES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('sharedHosts',{id:this.props.route.params.id})}
              style={styles.btnMap}>
              <Text style={styles.btnText}>SHARED HOSTS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('createEvent', {
                  id: this.state.detailItem.id,
                  from: 'edit',
                })
              }
              style={styles.btnMap}>
              <Text style={styles.btnText}>EDIT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.cancelEvent()}
              style={styles.cancelButton}>
              <Text style={styles.btnTextCancel}>CANCEL EVENT</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(myEventInfo);
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  detailImage: {
    width: SCREEN.width - 40,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 20,
    height: 110,
  },
  contentView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    // width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
  btnMap: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,

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
  logoEvent1: {
    marginVertical: 10,
    width: SCREEN.width - 40,
    height: 110,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoEvent: {},
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
    fontFamily: FONT.Nunito.regular,
  },
  barChild: {
    borderWidth: 1,
    width: wp('50%'),
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
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
});
