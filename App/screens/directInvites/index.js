import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Share,
  TouchableOpacity,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import {SafeAreaView} from 'react-navigation';
import {BLACK} from '../../helper/Color';
import {getAllFriends} from '../../helper/Api';
import {TextInput} from 'react-native';

// import Share from 'react-native-share';
import {connect} from 'react-redux';
const KEYS_TO_FILTERS = ['Friend.FirstName'];
import SearchInput, {createFilter} from 'react-native-search-filter';
import {sendDirectInvite} from '../../helper/Api';
import Loader from '../../component/Loader';

class directInvites extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      searchTerm: '',
      selectedName: '',
      selectedUser: {},
      data: [],
    };
  }
  footer = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.sendDirectInvite()}
          style={styles.btn}>
          <Text style={styles.btntext}>DIRECT INVITES</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.shareInvites()}>
          <Text style={styles.lastText}>More Invite Options</Text>
        </TouchableOpacity>
      </View>
    );
  };
  shareInvites = async () => {
    try {
      const result = await Share.share({
        message: 'Your message here',
        title: 'message',
        url: '',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result);
          alert(result);
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        alert('dismissed');
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
    // Share.open(options)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     err && console.log(err);
    //   });
  };
  async getAllFriends() {
    this.setState({loading: true});
    await getAllFriends(this.props.userToken).then(response => {
      console.log('response' + response);
      this.setState({friends: response.Users, loading: false});
    });
  }

  async sendDirectInvite() {
    let data = {
      current_user_id: this.props.userDetail.id,
      friend_user_id: this.state.selectedUser.friend_user_id,
      event_id: this.props.eventId,
    };
    this.setState({loading: true});
    await sendDirectInvite(data).then(response => {
      console.log('response' + response);
      alert('Invite Send');
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
          marginTop: SCREEN.height / 4,
        }}>
        <View>
          <Text style={styles.emptyFont}>
            You have no friend at the moment.
          </Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.getAllFriends();
  }
  
  searchUpdated(term) {
    this.setState({searchTerm: term});
  }
  render() {
    const friends = this.state.friends.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <TouchableOpacity style={styles.headerView}>
            <Text style={styles.headerTxt}>Direct Invites</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.closeBtn}>
              <Image source={require('../../assets/Slizzer-icon/close.png')} />
            </TouchableOpacity>
          </TouchableOpacity>
          <View
            style={[
              styles.textInput,
              {backgroundColor: 'lightgrey', marginTop: 18},
            ]}>
            <Image
              style={{
                position: 'absolute',
                bottom: 10,
                left: 20,
                width: 17.5,
                height: 17.5,
              }}
              source={require('../../assets/searchBlack.png')}
            />
            <TextInput
              onChangeText={term => {
                this.searchUpdated(term);
              }}
            
              style={styles.textInput}
              placeholder={'Search Slizzr Connections'}
            />
          </View>
          <Text style={styles.text1}>
            Select people to directly invite to your event: EVENT NAME HERE.
          </Text>
          <FlatList
            numColumns={3}
            data={friends}
            ListEmptyComponent={this.emptyListComponent}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    selectedName: item.Friend.FirstName,
                    selectedUser: item,
                  })
                }
                style={styles.blockView}>
                <View style={[styles.blockView, {height: SCREEN.width / 3}]}>
                  {this.state.selectedName !== item.Friend.FirstName && (
                    <View style={styles.imageView}>
                      {item.Pictures && item.Pictures.length > 0 ? (
                        <Image
                          source={{uri: item.Pictures[0].Profile_Url}}
                          style={styles.logo}
                        />
                      ) : (
                        <View
                          style={[
                            styles.imageView,
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
                            {item.Friend &&
                              item.Friend.FirstName.charAt(0).concat(
                                item.Friend.LastName.charAt(0),
                              )}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}


                  {this.state.selectedName.includes(item.Friend.FirstName) && (
                    <View
                      style={[
                        styles.imageView,
                        {
                          
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(0,0,0, 0.5)',
                        },
                      ]}>
                      <Image
                        style={styles.imageView2}
                        source={require('../../assets/Slizzer-icon/tickWhite.png')}
                      />
                    </View>
                  )}
                                    <View style={styles.detail}>
                    <Text style={styles.titleText}>
                      {item.Friend && item.Friend.FirstName}
                    </Text>
                  </View>

                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={this.footer}
          />
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
export default connect(mapStateToProps, mapDispatchToProps)(directInvites);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  headerTxt: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 30,
    color: '#494949',
    marginLeft: 32,
  },
  closeBtn: {
    backgroundColor: 'white',
    height: 35,
    width: 35,
    marginRight: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowOpacity: 0.4,
    shadowOffset: {height: 4},
  },
  text1: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
    color: '#979797',
    marginHorizontal: 20,
    marginTop: 23,
  },
  blockView: {
    width: SCREEN.width / 3,
    alignItems: 'center',
    marginTop: 9,
  },
  textView: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    color: BLACK.textColor,
  },
  imageView: {
    height: '90%',
    width: '90%',
    borderRadius: SCREEN.width / 3 / 2,
  },
  imageView2: {
    width: '40%',
    height: '29%',
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    backgroundColor: BLACK.textColor3,
    borderRadius: 27.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
  },
  lastText: {
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
    color: BLACK.textColor2,
    marginBottom: 31,
    textDecorationLine: 'underline',
    marginTop: 31,
  },
  textInput: {
    width: SCREEN.width - 40,
    height: 36,
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: 33.5,
  },
});
