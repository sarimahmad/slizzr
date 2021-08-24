/* eslint-disable no-alert */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Modal,
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
import {getAttendeesList} from '../../helper/Api';
import Loader from '../../component/Loader';
import {connect} from 'react-redux';
import ErrorPopup from '../../component/ErrorPopup';
import {sendMessageToAttendees, disInviteAttendee} from '../../helper/Api';
const KEYS_TO_FILTERS = ['User.FirstName'];
import SearchInput, { createFilter } from 'react-native-search-filter';

class attendeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendingEvents: true,
      myevents: false,
      attendeesList: [],
      attendeesCount: 0,
      attendeesIdList: [],
      popUpError: false,
      btnOneText: '',
      errorTitle: '',
      errorText: '',
      messageAllText: '',
      hostEvent: true,
      hostId:'',
      searchTerm:''
   
    };
  }

  componentDidMount() {
    let eventId = this.props.route.params.id;
    let host = this.props.route.params.host;
    
    this.setState({eventId:eventId,hostId:host.id})
    if (eventId) {
      this.getAttendeesList(eventId);
    }
    if (host) {
      this.setState({hostEvent: host.id === this.props.userDetail.id});
    } else {
      this.setState({hostEvent: false});
    }
  }
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
            <Text style={styles.emptyFont}>
              You have not attendee at the moment.
            </Text>
          </View>
        
      </View>
    );
  };
 
  async getAttendeesList(eventId) {
    let attendeesIdList = [];
    this.setState({loading: true});
    await getAttendeesList(eventId).then(response => {
      this.setState({attendeesList: response.Attendees});
      this.setState({attendeesCount: response.Attendees.length});
      response.Attendees.forEach(element => {
        attendeesIdList.push(element.User.id);
      });
      this.setState({attendeesIdList: attendeesIdList});
      this.setState({loading: false});
    });
  }
  storeInputData = text => {
    this.setState({messageAllText: text});
  };

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }
  done = async () => {
    this.setState({popUpError: false, fbtnOneText: false});
    this.setState({errorTitle: false});
    this.setState({errorText: false});

    this.setState({loading: true});

    let data = {
      HostUID: this.props.userToken,
      AttendeesList: this.state.attendeesIdList,
      EventID: this.props.route.params.id,
      Text: this.state.messageAllText,
    };
    await sendMessageToAttendees(data).then(response => {
      this.setState({loading: false});
      alert(response.message);
    });
  };

  disInvite = async userId => {
    this.setState({loading: true});

    let data = {
      user_id: userId,
      event_id: this.props.route.params.id,
    };
    await disInviteAttendee(data).then(response => {
      this.setState({loading: false});
      this.getAttendeesList(this.props.route.params.id);
    });
  };

  render() {
    const attendeesList = this.state.attendeesList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
  
    const fromAttend =
      this.props.route.params.from && this.props.route.params.from === 'SharedHost';
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            headerTitle={'Attendee List'}
            leftPress={() => this.props.navigation.goBack()}
            leftIcon={require('../../assets/back.png')}
          />
          <View style={styles.inputSearch}>
            <Image
              style={{marginHorizontal: 10, marginTop: 10}}
              source={require('../../assets/searchWhite.png')}
            />

            <TextInput
              placeholder={'Search'}
              placeholderTextColor={'#8e8e93'}
              style={{fontSize: 17, fontFamily: FONT.Nunito.regular}}
              onChangeText={term => {
                this.searchUpdated(term);
              }}
          
            ></TextInput>
          </View>

          <FlatList
            data={attendeesList}
            keyExtractor={item => item.id}
            ListEmptyComponent={this.emptyListComponent}
          
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('myProfile', {
                    id: item.User.id,
                    MutualConnectionID:item.id,
                    eventId:this.state.eventId,
                    hostId:this.state.hostId

                  })
                }
                style={{
                  width: SCREEN.width,
                  borderBottomWidth: 1,
                  borderBottomColor: 'lightgrey',
                  marginBottom:
                    this.state.attendeesList.length - 1 === index ? 80 : 0,
                }}>
                <View style={[styles.flexRow, {height: 70}]}>
                  <View
                    style={{flexDirection: 'row', width: SCREEN.width * 0.6}}>
                       <View style={styles.imgView}>
                    {item.User && item.User.Profile  ? (
                      <Image
                        source={{uri: item.User.Profile}}
                        style={styles.logo}
                      />
                    ) : (
                      <View
                        style={[
                          styles.logo,
                          {
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#7b1fa2',
                            borderColor: '#7b1fa2',
                          },
                        ]}>
                        <Text
                          style={{
                            fontSize: 28,
                            fontWeight: '600',
                            color: 'white',
                          }}>
                          {item.User && item.User.FirstName.charAt(0).concat(
                            item.User.LastName.charAt(0),
                          )}
                        </Text>
                      </View>
                    )}
                  </View>
         
                    <View
                      style={[
                        styles.detail,
                        {flexDirection: 'row', alignItems: 'center'},
                      ]}>
                      <Text
                        style={[
                          styles.titleText,
                          {fontFamily: FONT.Nunito.semiBold, marginRight: 7},
                        ]}>
                        {item.User && item.User.FirstName}
                      </Text>
                      <Image
                        style={{height: 26, width: 28, resizeMode: 'contain'}}
                        source={require('../../assets/option.png')}
                      />
                    </View>
                  </View>

                  {!fromAttend && (
                    <TouchableOpacity
                      onPress={() => this.disInvite(item.User.id)}
                      style={{
                        height: 30,
                        width: 80,
                        borderRadius: 24,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#F818D9',
                      }}>
                      <Text style={{color: 'white', paddingHorizontal: 5}}>
                        DISINVITE
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
          {this.state.hostEvent && (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  errorTitle: 'Chat',
                  errorText: 'Send Message to All Attendees',
                  btnOneText: 'Ok',
                  popUpError: true,
                })
              }
              style={styles.btnMap}>
              <Text style={styles.btnText}>
                Message all {this.state.attendeesCount} attendees
              </Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.popUpError && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() => this.done()}
              parentCallBack={this.storeInputData}
              doneButtonPress={() => console.log('tapped')}
              errorTitle={this.state.errorTitle}
              textInput={true}
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
function mapStateToProps(state) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(attendeesList);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  inputSearch: {
    width: SCREEN.width - 40,
    flexDirection: 'row',
    height: 42,
    borderWidth: 1,
    justifyContent: 'flex-start',
    paddingLeft: 5,
    backgroundColor: BLACK.textInput,

    marginVertical: 10,
    borderRadius: 12,
    borderColor: 'lightgrey',
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
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: WHITE.dark,
    fontFamily: FONT.Nunito.regular,
  },
  emptyFont: {
    fontSize: 20,
    textAlign: 'center',
    color: '#494949',
    fontFamily: FONT.Nunito.regular,
    marginBottom: 20,
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
    width: SCREEN.width - 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    width: wp('50%'),
  },
  next: {
    paddingTop: 15,
  },
  imgView: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginBottom:10,
    marginRight: 20,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {height: 60, width: 60, borderWidth: 2, borderRadius: 30},
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
