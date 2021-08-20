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
import {
  getAllFriends,
  inviteSharedHost,
  getAllSharedEvents,
  getAllSharedHostsforEventAccepted,
  getAllPendingSharedHostsforEvent,
  getUserEvents
} from '../../helper/Api';
import {connect} from 'react-redux';
import Loader from '../../component/Loader';
import {ScrollView} from 'react-native';

class sharedHosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      eventId:'',
      hostSelected: {},
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
      sharedHosts: [],
      userEvents: [],
      friendsList: [],
    };
  }
  barTapped = indexTap => {
    if (indexTap === 0) {
      this.setState({index: 0});
    } else if (indexTap === 1) {
      this.setState({index: 1});
    }
  };
  async getAllFriends() {
    this.setState({loading: true});
    await getAllFriends(this.props.userToken).then(response => {
      this.setState({friendsList: response.Users, loading: false});
    });
  }

  async getMutualConnections(id) {
    await getMutualConnections(id).then(response => {
      this.setState({mutualConnections: response.Users, loading: false});
    });
  }
  async shareEventRequest() {
    this.setState({loading: true});
    await shareEventRequest(this.props.userToken).then(response => {
      this.setState({friendsList: response.Users, loading: false});
    });
  }
  componentDidMount() {
    this.getAllFriends();
    this.getUserEvents()

    }
  async getAllFriends() {
    this.setState({loading: true});
    await getAllFriends(this.props.userToken).then(response => {
      console.log('response' + response);
      this.setState({friendsList: response.Users, loading: false});
    });
  }
   async getUserEvents() {
    await getUserEvents(this.props.userToken).then(response => {
      this.setState({loading: false});
      this.setState({userEvents: response.UserHostedEvent, loading: false});
    });
  }

 async getAllSharedHostsforEventAccepted(id) {
    this.setState({loading: true});

    await getAllSharedHostsforEventAccepted(id).then(response => {
      console.log('response' + response);
      this.setState({sharedHostsEventsAccepted: response.data.Sharedhost, loading: false});
    });
  }
  

 
  async getAllPendingSharedHostsforEvent(id) {
    this.setState({loading: true});
    
    await getAllPendingSharedHostsforEvent(id).then(response => {
      console.log('response' + response);
      this.setState({sharedHostsEventsPending: response.data.SharedEvents, loading: false});
    });
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
          marginTop: 50,
        }}>
        {this.state.index === 0 && (
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
        {this.state.index === 1 && (
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
        
      </View>
    );
  };
  getSharedEventData=(id)=>{
    this.getAllPendingSharedHostsforEvent(id)
    this.getAllSharedHostsforEventAccepted(id)
  }
  inviteSharedHost = async () => {
    if (this.state.hostSelected) {
      console.log(this.state.hostSelected);
      let data = {
        host_id: this.props.userToken,
        event_id: this.props.route.params.id,
      };
      this.setState({loading: true});

      await inviteSharedHost(data, this.state.hostSelected.Friend.id).then(response => {
        if (response.status === 200) {
          alert(response.data.message);
          this.setState({loading: false, hostSelected: {}});
        } else {
          alert('failed');
          this.setState({loading: false});
        }
      });
    } else {
      alert('Select host');
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
        <ScrollView>
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
                onValueChange={(item, itemIndex) => this.getSharedEventData(item)} 

                  style={styles.PickerStyleClass}
                  selectedValue={this.state.mode}
                   >
                  {this.state.userEvents.map((item, key) => (
                   <Picker.Item label={item.Name} value={item.id} key={key} />)
                   )}
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
                  data={this.state.friendsList}
                  horizontal
                  ListEmptyComponent={this.emptyListComponent}
            
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => this.setState({hostSelected: item})}
                      style={styles.listView}>
                           <View style={styles.imgView}>
                    {item.Pictures && item.Pictures.length > 0 ? (
                      <Image
                        source={{uri: item.Pictures[0].Profile_Url}}
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
                          {item.Friend && item.Friend.FirstName.charAt(0).concat(
                            item.Friend.LastName.charAt(0),
                          )}
                        </Text>
                      </View>
                    )}
                  </View>
           </TouchableOpacity>
                  )}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.inviteSharedHost()}
                style={[
                  styles.shareButton,
                  {
                    backgroundColor:
                      Object.keys(this.state.hostSelected).length !== 0
                        ? BLACK.btn
                        : 'grey',
                  },
                ]}>
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
{this.state.index==0 &&
            <FlatList
              data={this.state.sharedHostsEventsAccepted}
              keyExtractor={item => item.id}
              ListEmptyComponent={this.emptyListComponent}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.setState({hostSelected: item})}
                  activeOpacity={0.1}>
                  <View style={styles.flexRow}>
                    {/* <View style={styles.imgView}>
                      <Image
                        style={{height: 50, width: 50}}
                        source={{uri: item.User.Profile}}
                      />
                    </View> */}
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
                    {/*  */}
                    <View style={styles.detail}>
                      <Text style={styles.titleText}>
                        {item.User.displayName}
                      </Text>
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
  }
  {this.state.index==1 &&
            <FlatList
              data={this.state.sharedHostsEventsPending}
              keyExtractor={item => item.id}
              ListEmptyComponent={this.emptyListComponent}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.setState({hostSelected: item})}
                  activeOpacity={0.1}>
                  <View style={styles.flexRow}>
                    {/* <View style={styles.imgView}>
                      <Image
                        style={{height: 50, width: 50}}
                        source={{uri: item.User.Profile}}
                      />
                    </View> */}

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
                    {/*  */}
                    <View style={styles.detail}>
                      <Text style={styles.titleText}>
                        {item.User.displayName}
                      </Text>
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
  }
          </SafeAreaView>
        </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(sharedHosts);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },

  contentView: {
    width: SCREEN.width,
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
  logo: {height: 40, width: 40, borderWidth: 2, borderRadius: 30},
  
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
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 20,
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
