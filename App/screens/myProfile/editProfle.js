/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import {SafeAreaView} from 'react-navigation';
import {BLACK, WHITE} from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import RNPickerSelect from 'react-native-picker-select';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

import GoogleSearchBar from '../../component/GoogleSearchBar';
import * as userActions from '../../redux/actions/user';
import DateAndTimePicker from '../../component/DateAndTimePicker';
import Loader from '../../component/Loader';

class editProfle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      Address: '',
      enableMap: false,
      DateTime: new Date(),
      showDate: false,
      selectLocationFlag: false,
      events: false,
      event: 'Female',
      firstName: '',
      lastName: '',
      gender: 'Male',
      bioText: '',
      userName: '',
      loading: false,
    };
  }

  showDatepicker = () => {
    this.setState({showDate: true});
  };
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({date: currentDate});
    this.setState({showDate: false});
  };
  showDatepicker = () => {
    this.setState({showDate: true});
  };

  setAllOldstate() {
    if (this.state.firstName !== this.props.userDetail.FirstName) {
      this.setState({
        firstName: this.props.userDetail.FirstName,
        lastName: this.props.userDetail.LastName,
        userName: this.props.userDetail.displayName,
        bioText: this.props.userDetail.bio ? this.props.userDetail.bio : '',
        Address: this.props.userDetail.Address,
      });
    }
    if (this.props.userDetail.location) {
      this.setState({Address: this.props.userDetail.location.address});
    }
  }

  firestoreLinking = async () => {
    const dataToSend ={
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      displayName: this.state.userName,
      Address: this.state.Address,
      bio: this.state.bioText,
      Gender: this.state.gender}
    this.setState({loading: true});
    const usersRef = firestore().collection('users');
    usersRef
      .doc(this.props.userDetail.id)
      .update(dataToSend)
      .then(() => {
        usersRef
          .doc(this.props.userDetail.id)
          .get()
          .then(firestoreDocument => {
            this.props.callApi(
              firestoreDocument.data(),
              this.props.userDetail.id,
            );
            this.setState({loading: false});
            this.props.navigation.pop();
          });
      })
      .catch(error => {
        this.setState({loading: false});
        alert(error);
      });
  };
  componentDidMount() {
    this.setAllOldstate();
  }
  setLocation = (latitude, longitude) => {
    console.log(latitude, longitude);
    this.setState({
      selectLocationFlag: false,
      localErrorLocation: null,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };
  getAdress = address => {
    // alert(address);
    console.log(address);

    this.setState({
      currentLocationPlace: address,
      Address: address,
    });
  };

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            backColor={WHITE.dark}
            borderBottom={true}
            leftIcon={require('../../assets/back.png')}
            leftPress={() => this.props.navigation.navigate('myProfile')}
            headerTitle={'Edit Profile'}
          />
          <ScrollView style={styles.wrapperView} bounces={true}>
            <View style={styles.blockView}>
              <View style={{height: 200, width: SCREEN.width}}>
                <Image
                  style={{
                    position: 'absolute',
                    left: 0,
                    height: 140,
                    width: 140,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/profileImage1.png')}
                />

                <Image
                  style={{
                    position: 'absolute',
                    left: 30,
                    height: 170,
                    width: 170,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/profileImage2.png')}
                />

                <Image
                  style={{
                    position: 'absolute',
                    right: 0,
                    height: 140,
                    width: 140,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/profileImage1.png')}
                />
                <Image
                  style={{
                    position: 'absolute',
                    right: 30,
                    height: 170,
                    width: 170,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/profileImage2.png')}
                />

                <Image
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                  }}
                  source={
                    this.props.userDetail && this.props.userDetail.Profile
                      ? {uri: this.props.userDetail.Profile}
                      : require('../../assets/profileImage2.png')
                  }
                />
                <Image
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 10,
                    height: 35,
                    width: 35,
                    borderRadius: 50,
                  }}
                  source={require('../../assets/edit.png')}
                />
              </View>

              <TextInput
                value={this.state.firstName}
                onChange={firstName => this.setState({firstName})}
                style={styles.inputTextView}
              />
              <TextInput
                value={this.state.lastName}
                onChange={lastName => this.setState({lastName})}
                style={styles.inputTextView}
              />
              <TextInput
                value={this.state.userName}
                onChange={userName => this.setState({userName})}
                style={styles.inputTextView}
              />
              <View style={styles.TextInputWrapper}>
                <DateAndTimePicker
                  format="MMM DD, YYYY"
                  mode="date"
                  value={this.state.date}
                  setDateAndTime={value => this.setState({DateTime: value})}
                  showPlaceholder={new Date().toDateString()}
                  datebutton={styles.datebutton}
                />
              </View>
              <View
                style={{
                  width: '90%',
                  height: 53,
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  borderRadius: 8,
                  alignSelf: 'center',
                  marginVertical: 20,
                  justifyContent: 'center',
                }}>
                <RNPickerSelect
                  style={{
                    inputIOS: {
                      paddingLeft: 20,
                    },
                    inputAndroid: {
                      paddingLeft: 20,
                    },
                  }}
                  selectedValue={this.state.gender}
                  value={this.state.gender}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({gender: itemValue})
                  }
                  items={[
                    {label: 'Female', value: 'Female'},
                    {label: 'Male', value: 'Male'},
                  ]}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.TextInputWrapper2,
                  {width: SCREEN.width - 40, justifyContent: 'center'},
                ]}
                onPress={() => this.setState({selectLocationFlag: true})}>
                {this.state.Address === '' ? (
                  <Text
                    style={[
                      styles.thirdinput,
                      {paddingTop: 15, color: 'grey'},
                    ]}>
                    Add Location
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.thirdinput,
                      {paddingTop: 10, color: 'grey'},
                    ]}>
                    {this.state.Address}
                  </Text>
                )}
              </TouchableOpacity>

              <TextInput
                value={this.state.bioText}
                onChange={bioText => this.setState({bioText})}
                placeholder={'Bio'}
                multiline={true}
                style={styles.messageText}
              />
              <TouchableOpacity style={styles.btn} onPress={() => this.firestoreLinking()}>
                <Text style={styles.btntext}>SAVE</Text>
              </TouchableOpacity>
            </View>
            <Modal
              visible={this.state.selectLocationFlag}
              onRequestClose={() => this.setState({selectLocationFlag: false})}
              animationType={'slide'}>
              <View
                style={{
                  marginTop: '10%',
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <GoogleSearchBar
                  closeLocationModal={() => {
                    this.setState({selectLocationFlag: false});
                  }}
                  getAddress={this.getAdress}
                  setLocation={this.setLocation}
                  clearGoogleSearch={this.state.clearGoogleSearch}
                  inputValue={'Address'}
                />
              </View>
            </Modal>
          </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={'Updating'} />}
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
export default connect(mapStateToProps, mapDispatchToProps)(editProfle);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  TextInputWrapper: {
    marginTop: 20,
    justifyContent: 'center',
    width: SCREEN.width - 40,
    alignSelf: 'center',
  },

  thirdinput: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 53,
    borderRadius: 10,
    width: '100%',
    paddingLeft: 20,
  },
  blockView: {
    marginTop: 30,
    // alignItems: 'center'
  },
  TextInputWrapper2: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  messageText: {
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    width: SCREEN.width - 40,
    height: 123,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: 'lightgrey',
    fontSize: 16,
    fontFamily: FONT.Nunito.regular,
    marginTop: 20,
    alignSelf: 'center',
  },
  form: {
    marginVertical: 5,
    borderWidth: 1,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    borderColor: 'lightgrey',
    height: 53,
    borderRadius: 5,
    justifyContent: 'center',
  },
  profileView: {
    height: 176,
    width: 50,
  },
  inputTextView: {
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {width: 1, height: 1},
    width: SCREEN.width - 40,
    height: 53,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: 'lightgrey',
    fontSize: 16,
    fontFamily: FONT.Nunito.regular,
    marginTop: 20,
    alignSelf: 'center',
  },
  DataTimeWrapper: {
    backgroundColor: WHITE.dark,
    height: 53,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    borderWidth: 0.3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: BLACK.shadow,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginVertical: 20,
  },
  input: {
    width: '100%',
    marginHorizontal: '5%',
    height: '100%',
  },
  logoAddCalenderView: {
    position: 'absolute',
    right: 0,
    width: 58,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: BLACK.border,
  },
  DateTimeInnerIOS: {
    height: '90%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: BLACK.shadow,
    shadowOffset: {width: 1, height: 1},
    backgroundColor: WHITE.dark,
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    paddingLeft: 10,
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    backgroundColor: 'black',
    borderRadius: 27.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
    fontWeight: 'bold',
  },
});
