/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';

import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import Loader from '../../component/Loader';
import ErrorPopup from '../../component/ErrorPopup';
import {connect} from 'react-redux';
import {
  getAllRequests,
  acceptandRejectRequest,
  getAllNotifications,
  DecideSharedHostRequest,
} from '../../helper/Api';

// Todo Need to implement User profile picture
// Already added Pictures Array in the response so take it from there
class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getAllNotifications();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async getAllNotifications() {
    this.setState({loading: true});
    await getAllNotifications(this.props.userToken).then(response => {
      this.setState({notifications: response.Notifications, loading: false});
// handler.onNotification()

    });
  }
notificationTap=(notif)=>{
  if(notif.NotificationType==="NOTIFICATION"){
    this.props.navigation.navigate("Notifications")
  }else if(notif.NotificationType==="MESSAGE"){
   this.props.navigation.navigate("messages")
 }else if(notif.NotificationType==="PROFILE"){
   this.props.navigation.navigate("myProfile",notif.PRIMARY_ID)
 }else if(notif.NotificationType==="SHAREDREQUEST"){
   this.props.navigation.navigate("sharedHosts")
 }else if(notif.NotificationType==="SHAREDEVENTDETAIL"){
   this.props.navigation.navigate("sharedHosts")
 }else if(notif.NotificationType==="MANAGESHAREDHOST"){
   this.props.navigation.navigate("sharedHosts",)
 }else if(notif.NotificationType==="MANAGEEVENT"){
   this.props.navigation.navigate("manageEvent")
 }else if(notif.NotificationType==="EVENTDETAIL"){
   this.props.navigation.navigate("eventDetail",notif.PRIMARY_ID)
 }
 
}
  async acceptandRejectRequest(status, item) {
    const data = {
      current_user_id: this.props.userToken,
      mutual_connection_id: item.MutualConnectionID,
      status: status,
    };
    this.setState({loading: true});
    await acceptandRejectRequest(data).then(response => {
      this.setState({loading: false});
      Alert.alert('Successfull', response.message, [
        {text: 'OK', onPress: () => this.getAllNotifications()},
      ]);
    });
  }

  async acceptandRejectSharedHostRequest({ACCEPTED, shared_host_id}) {
    this.setState({loading: true});
    await DecideSharedHostRequest({ACCEPTED, shared_host_id}).then(response => {
      this.setState({loading: false});
      Alert.alert('Successfull', response.message, [
        {text: 'OK', onPress: () => this.getAllNotifications()},
      ]);
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
        <Text style={styles.emptyFont}>You have no notification</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            backColor={WHITE.dark}
            headerTitle={'Notification'}
            leftPress={() => this.props.navigation.openDrawer()}
            leftIcon={require('../../assets/drawer.png')}
          />
          <FlatList
            data={this.state.notifications}
            keyExtractor={item => item.NotificationID}
            ListEmptyComponent={this.emptyListComponent}
            renderItem={({item}) => (
              <View>
                {/* Only Message */}
                {item.NotificationType === 'MESSAGE' && (
                  <View style={styles.flexRow}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.imgView}>
                        <Image
                          source={require('../../assets/notification2.png')}
                        />
                      </View>
                      <View style={styles.detail}>
                        <Text style={[styles.subtitleText]}>
                          {item.Message}
                        </Text>

                        {/* Implement time here */}
                        <Text style={styles.greyText}>
                          {item.LastNotification}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* Only Direct Invite */}
                {/* Only press move to event detail*/}
                {item.NotificationType === 'DIRECTINVITE' && (
                  <View
                    style={styles.flexRow}
                    onPress={() => console.log(item.EventID)}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.imgView}>
                        <Image
                          source={require('../../assets/notification2.png')}
                        />
                      </View>
                      <View style={styles.detail}>
                        <Text style={[styles.subtitleText]}>
                          {item.Message}
                        </Text>

                        {/* Implement time here */}
                        <Text style={styles.greyText}>
                          {item.LastNotification}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* Only Mutual Connect Type */}
                {item.NotificationType === 'MUTUAL' && (
                  <View style={styles.flexRow}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.imgView}>
                        <Image
                          source={require('../../assets/notification2.png')}
                        />
                      </View>
                      <View style={styles.detail}>
                        <Text style={[styles.subtitleText]}>
                          {item.Message}
                        </Text>
                        {/* Implement time here */}
                        <Text style={styles.greyText}>
                          {item.LastNotification}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.acceptandRejectRequest('ACCEPTED', item)
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
                      <TouchableOpacity
                        onPress={() =>
                          this.acceptandRejectRequest('REJECTED', item)
                        }
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
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {/* Only SHARED Host Type */}
                {item.NotificationType === 'SHARED' && (
                  <View style={styles.flexRow}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.imgView}>
                        <Image
                          source={require('../../assets/notification2.png')}
                        />
                      </View>
                      <View style={styles.detail}>
                        <Text style={[styles.subtitleText]}>
                          {item.Message}
                        </Text>
                        {/* Implement time here */}
                        <Text style={styles.greyText}>
                          {item.LastNotification}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.acceptandRejectSharedHostRequest({
                            ACCEPTED: 'TRUE',
                            shared_host_id: item.SharedHostID,
                          })
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
                      <TouchableOpacity
                        onPress={() =>
                          this.acceptandRejectSharedHostRequest({
                            ACCEPTED: 'FALSE',
                            shared_host_id: item.SharedHostID,
                          })
                        }
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
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View
                  style={{
                    hiehgt: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                    width: SCREEN.width,
                  }}
                />
              </View>
            )}
          />
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.popUpError === true && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() => this.done()}
              doneButtonPress={() => this.done()}
              errorTitle={this.state.errorTitle}
              errorText={this.state.errorText}
              btnOneText={this.state.btnOneText}
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
export default connect(mapStateToProps, mapDispatchToProps)(notification);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  emptyFont: {
    fontSize: 20,
    textAlign: 'center',
    color: '#494949',
    fontFamily: FONT.Nunito.regular,
    marginBottom: 20,
  },

  imgView: {
    width: SCREEN.width * 0.16,
  },
  detail: {
    width: SCREEN.width * 0.6,
  },
  contentView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  greyText: {
    fontSize: 12,
    color: BLACK.lightgrey,
    fontFamily: FONT.Nunito.regular,
  },
  flexRow: {
    flexDirection: 'row',
    height: 80,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  subtitleText: {
    fontSize: 12,
    color: BLACK.grey,
    fontFamily: FONT.Nunito.semiBold,
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
});
