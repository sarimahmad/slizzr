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
import {
  getUserAttendedEvents,
  getUserEvents,
  getAllSharedRequests,
  getAllSharedEvents,
} from '../../helper/Api';
import Loader from '../../component/Loader';
import {connect} from 'react-redux';
import Share from 'react-native-share';

class manageEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendingEvents: true,
      myevents: false,
      loading: true,
      index: 1,
      userEvents: [],
      userAttendedEvents: [],
      userSharedEvents:[],
      userSharedRequests: [],
      userSharedEvents: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserEvents();
      this.getUserAttendedEvents();
      this.getAllSharedRequests();
      this.getAllUserSharedEvents();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  async getAllSharedEvents(id) {
    this.setState({loading: true});

    await getAllSharedEvents(id).then(response => {
      console.log('response' + response);
      this.setState({sharedEvents: response.data.SharedEvents, loading: false});
    });
  }
  
  async getUserEvents() {
    await getUserEvents(this.props.userToken).then(response => {
      this.setState({loading: false});
      this.setState({userEvents: response.UserHostedEvent, loading: false});
    });
  }

  async getUserAttendedEvents() {
    await getUserAttendedEvents(this.props.userToken).then(response => {
      this.setState({loading: false});
      this.setState({userAttendedEvents: response.UserAttendedEvents});
    });
  }
  async getAllSharedRequests() {
    await getAllSharedRequests(this.props.userToken).then(response => {
      this.setState({loading: false});
      this.setState({
        userSharedRequests: response.data.SharedhostRequest.length,
      });
    });
  }

  async getAllUserSharedEvents() {
    await getAllSharedEvents(this.props.userToken).then(response => {
      this.setState({loading: false});
      this.setState({
        userSharedEvents: response.data.SharedEvents,
      });
    });
  }

  barTapped = indexTap => {
    if (indexTap === 1) {
      this.setState({index: 1});
    } else if (indexTap === 2) {
      this.setState({index: 2});
    }
    if (indexTap === 3) {
      this.setState({index: 3});
    }
    if (indexTap === 4) {
      this.setState({index: 4});
    }
  };

  myevents = () => {
    this.setState({myevents: true});
    this.setState({attendingEvents: false});
  };
  attendingEvents = () => {
    this.setState({myevents: false});
    this.setState({attendingEvents: true});
  };
  topBar = () => {
    return (
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={
            this.state.index === 1
              ? {
                  borderBottomColor: '#F818D9',
                  borderBottomWidth: 3,
                  borderColor: 'lightgrey',
                  justifyContent: 'center',
                  borderWidth: 1,
                  width: SCREEN.width * 0.34,
                  height: 39,
                }
              : {
                  color: 'black',
                  width: SCREEN.width * 0.34,
                  height: 39,
                  borderColor: 'lightgrey',
                  borderWidth: 1,
                  justifyContent: 'center',
                }
          }
          onPress={() => this.barTapped(1)}>
          <Text
            style={[
              styles.barText,
              this.state.index === 1 ? {color: '#F818D9'} : {color: 'black'},
            ]}>
            MY EVENTS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            this.state.index === 2
              ? {
                  borderBottomColor: '#F818D9',
                  borderBottomWidth: 3,
                  borderColor: 'grey',
                  justifyContent: 'center',
                  borderWidth: 1,
                  width: SCREEN.width * 0.34,
                  height: 39,
                }
              : {
                  color: 'black',
                  width: SCREEN.width * 0.34,
                  height: 39,
                  borderColor: 'grey',
                  justifyContent: 'center',
                  borderWidth: 1,
                }
          }
          onPress={() => this.barTapped(2)}>
          <Text
            style={[
              styles.barText,
              this.state.index === 2 ? {color: '#F818D9'} : {color: 'black'},
            ]}>
            ATTENDING EVENTS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            this.state.index === 3
              ? {
                  borderBottomColor: '#F818D9',
                  borderBottomWidth: 3,
                  borderColor: 'grey',
                  justifyContent: 'center',
                  borderWidth: 1,
                  width: SCREEN.width * 0.34,
                  height: 39,
                }
              : {
                  color: 'black',
                  width: SCREEN.width * 0.34,
                  height: 39,
                  borderColor: 'grey',
                  justifyContent: 'center',
                  borderWidth: 1,
                }
          }
          onPress={() => this.barTapped(3)}>
          <Text
            style={[
              styles.barText,
              this.state.index === 3 ? {color: '#F818D9'} : {color: 'black'},
            ]}>
            SHARED EVENTS
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Empty Component
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
        {this.state.index === 1 && (
          <View>
            <Text style={styles.emptyFont}>
              You are not hosting any events at the moment.
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('createEvent')}
              style={styles.btnMap}>
              <Text style={styles.btnText}>HOST?</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.index === 2 && (
          <View>
            <Text style={styles.emptyFont}>
              You are not attending any events at the moment.
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HomeStack')}
              style={styles.btnMap}>
              <Text style={styles.btnText}>LOOK FOR EVENTS</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.index === 3 && (
          <View>
            <Text style={styles.emptyFont}>
              You are not sharing any events at the moment.
            </Text>
          </View>
        )}
      </View>
    );
  };
  shareEvent = () => {
    let options = {
      message: 'testing',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
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
            rightPress={() => this.props.navigation.navigate('createEvent')}
            rightIcon={require('../../assets/plus.png')}
            headerTitle={'Manage Events'}
          />

          {this.topBar()}

          {/* Shared Host */}
          {this.state.userSharedRequests !== 0 && (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('sharedHostRequests')
              }
              style={styles.sharedView}>
              <Text style={{color: 'white', paddingLeft: 20}}>
                SHARED HOST REQUESTS
              </Text>
              <Text style={{color: 'white', paddingRight: 20}}>
                +{this.state.userSharedRequests}
              </Text>
            </TouchableOpacity>
          )}

          {this.state.index === 1 && (
            <FlatList
              data={this.state.userEvents}
              keyExtractor={item => item.id}
              ListEmptyComponent={this.emptyListComponent}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('myEventInfo', {id: item.id})
                  }
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                  }}>
                  <View style={styles.flexRow}>
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
                      <Text style={styles.subtitleText}>
                        {item.EventType === 'SCAN'
                          ? 'SCAN-&-PAY AT DOOR'
                          : item.EventType}
                      </Text>
                      <Text style={[styles.purpleText, {marginTop: 5}]}>
                        {item.DateTime}
                      </Text>
                    </View>
                    {item.PublicPrivate === 'Private' ?
                    
                    <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('directInvites')
                    }
                      style={styles.shareView}>
                      <Image source={require('../../assets/messageIcon.png')} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                   
                    onPress={() => this.shareEvent()}
                    style={styles.shareView}>
                    <Image source={require('../../assets/share.png')} />
                  </TouchableOpacity>
           
                 
              }
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          {this.state.index === 2 && (
            <FlatList
              data={this.state.userAttendedEvents}
              keyExtractor={item => item.id}
              ListEmptyComponent={this.emptyListComponent}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('attendingEventInfo', {
                      id: item.Event.id,
                    })
                  }
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                  }}>
                  <View style={styles.flexRow}>
                    <View style={styles.imgView}>
                      <Image
                        source={{uri: item.Event.image}}
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
                      <Text style={styles.titleText}>{item.Event.Name}</Text>
                      <Text style={styles.subtitleText}>
                        Host: {item.Event.Host.displayName}
                      </Text>
                      {item.PublicPrivate !== 'Private' && (
                      
                      <Text style={[styles.purpleText, {marginTop: 5}]}>
                        {item.Event.DateTime}
                      </Text>
                      )}
                    </View>
                    {item.PublicPrivate === 'Private' ?
                   <TouchableOpacity
                   onPress={() => this.shareEvent()}
                     style={styles.shareView}>
                     <Image source={require('../../assets/messageIcon.png')} />
                   </TouchableOpacity>
                   :
                   <TouchableOpacity
                   onPress={() =>
                     this.props.navigation.navigate('directInvites')
                   }
                   style={styles.shareView}>
                   <Image source={require('../../assets/share.png')} />
                 </TouchableOpacity>
          
              }
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          {this.state.index === 3 && (
            <FlatList
              data={this.state.userSharedEvents}
              keyExtractor={item => item.Event.id}
              ListEmptyComponent={this.emptyListComponent}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('myEventInfo', {
                      id: item.Event.id,
                    })
                  }
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                  }}>
                  <View style={styles.flexRow}>
                    <View style={styles.imgView}>
                      <Image
                        source={{uri: item.Event.image}}
                        style={{borderRadius: 44, height: 60, width: 60}}
                      />
                      {item.Event.PublicPrivate === 'Private' && (
                        <Image
                          style={{position: 'absolute', right: -10}}
                          source={require('../../assets/private.png')}
                        />
                      )}
                    </View>

                    <View style={styles.detail}>
                      <Text style={styles.titleText}>{item.Event.Name}</Text>
                      <Text style={styles.subtitleText}>
                        {item.Event.EventType === 'SCAN'
                          ? 'SCAN-&-PAY AT DOOR'
                          : item.Event.EventType}
                      </Text>
                      <Text style={[styles.purpleText, {marginTop: 5}]}>
                        {item.Event.DateTime}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => this.shareEvent()}
                      style={styles.shareView}>
                      <Image source={require('../../assets/share.png')} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
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
export default connect(mapStateToProps, mapDispatchToProps)(manageEvents);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  sharedView: {
    width: SCREEN.width,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#FF9500',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnMap: {
    marginTop: 10,
    width: SCREEN.width - 40,
    borderRadius: 25,
    height: 55,
    marginBottom: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  contentView: {
    flex: 1,

    // width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
  emptyFont: {
    fontSize: 20,
    textAlign: 'center',
    color: '#494949',
    fontFamily: FONT.Nunito.regular,
    marginBottom: 20,
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

    alignItems: 'center',
  },
  subtitleText: {
    color: '#494949',
    fontFamily: FONT.Nunito.regular,
    fontSize: 12,
  },

  next: {
    paddingTop: 15,
  },
  detail: {
    width: wp('55%'),
    height: 80,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imgView: {
    marginHorizontal: 20,
    alignItems: 'center',
    alignSelf: 'center',
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
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
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
  barText: {
    borderColor: 'lightgrey',
    fontSize: 11,
    fontFamily: FONT.Nunito.semiBold,
    color: BLACK.grey,
    textAlign: 'center',
    alignItems: 'center',
  },
});
