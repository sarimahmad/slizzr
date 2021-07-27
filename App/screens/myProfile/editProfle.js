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
  Platform,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import {SafeAreaView} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

import {BLACK, WHITE} from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import RNPickerSelect from 'react-native-picker-select';

import {connect} from 'react-redux';

import GoogleSearchBar from '../../component/GoogleSearchBar';
import * as userActions from '../../redux/actions/user';
import DateAndTimePicker from '../../component/DateAndTimePicker';
import Loader from '../../component/Loader';
import {updateProfile, uploadImage} from '../../helper/Api';
import ErrorPopup from '../../component/ErrorPopup';

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
      city: '',
      state: '',
      day: '',
      month: '',
      year: '',
      age: '',
      imageOfuser: [],
      imageUpload: [],
      currentLocationPlace: '',
    };
  }

  openImagePicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    }).then(image => {
      this.setState({imageUpload: image});
    });
  }
  onChange = selectedDate => {
    const currentDate = selectedDate || this.state.DateTime;
    const current_date = new Date();
    const difference_date =
      current_date.getTime() - new Date(currentDate).getTime();
    const difference_in_days = difference_date / (1000 * 3600 * 24);
    const age_in_year = difference_in_days / 365;
    if (age_in_year > 16) {
      this.setState({
        DateTime: currentDate,
        day: currentDate.getUTCDate(),
        month: currentDate.getUTCMonth(),
        year: currentDate.getUTCFullYear(),
        age: age_in_year,
      });
    }
  };

  setAllOldstate() {
    if (this.state.firstName !== this.props.userDetail.FirstName) {
      const day = this.props.userDetail.BirthDate.day
        ? this.props.userDetail.BirthDate.day
        : '';
      const month = this.props.userDetail.BirthDate.month
        ? this.props.userDetail.BirthDate.month
        : '';
      const year = this.props.userDetail.BirthDate.year
        ? this.props.userDetail.BirthDate.year
        : '';
      this.setState({
        firstName: this.props.userDetail.FirstName,
        lastName: this.props.userDetail.LastName,
        userName: this.props.userDetail.displayName,
        bioText: this.props.userDetail.bio ? this.props.userDetail.bio : '',
        age: this.props.userDetail.age ? this.props.userDetail.age : 17,
        Address:
          this.props.userDetail.Address.line1 +
          this.props.userDetail.Address.city +
          this.props.userDetail.Address.state
            ? this.props.userDetail.Address.line1
            : '',
        city: this.props.userDetail.Address.city
          ? this.props.userDetail.Address.city
          : '',
        state: this.props.userDetail.Address.state
          ? this.props.userDetail.Address.state
          : '',
        day: day,
        month: month,
        year: year,
        DateTime:  this.props.userDetail.BirthDate,
        imageOfuser: this.props.route.params.imageOfuser,
      });
    }
 
    
    console.log(this.state.DateTime)
  
  }

  firestoreLinking = async () => {
    let pictureUploadUrl = [];
    this.setState({loading: true});
    if (this.state.imageUpload.length > 0) {
      pictureUploadUrl = [];
      let sizeOfArray = this.state.imageUpload.length;
      this.state.imageUpload.forEach(async (item, index) => {
        const uri = item.path;

        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        var formdata = new FormData();
        formdata.append('file', {
          name: filename,
          type: 'jpg/png',
          uri: uploadUri,
        });
        uploadImage(formdata).then(response => {
          if (response.messgae === 'Success') {
            pictureUploadUrl.push(response.url);
            if (sizeOfArray - 1 === index) {
              const dataToSend = {
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                displayName: this.state.userName,
                address: this.state.Address,
                day: this.state.day,
                month: this.state.month,
                year: this.state.year,
                bio: this.state.bioText,
                Gender: this.state.gender,
                profile_pic_url: pictureUploadUrl,
              };
              this.updateProfileApi(dataToSend);
            }
          }
        });
      });
    } else {
      const dataToSend = {
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        displayName: this.state.userName,
        day: this.state.day,
        month: this.state.month,
        year: this.state.year,
        age: this.state.age,
        bio: this.state.bioText,
        Gender: this.state.gender,
        address: this.state.Address,
      };
      this.updateProfileApi(dataToSend);
    }
  };

  updateProfileApi = async dataToSend => {
    await updateProfile(this.props.userToken, dataToSend).then(response => {
      this.getUserFromFirestore(this.props.userToken);
      this.setState({loading: false});
    });
    this.setState({loading: false});
  };

  componentDidMount() {
    this.setAllOldstate();
  }

  setLocation = (latitude, longitude, state, city) => {
    this.setState({
      selectLocationFlag: false,
      localErrorLocation: null,
      state: state,
      city: city,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };

  getUserFromFirestore = id => {
    this.setState({loading: true});
    const usersRef = firestore().collection('users');
    usersRef
      .doc(id)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          return;
        } else {
          this.props.callApi(firestoreDocument.data(), id);
          this.setState({
            loading: false,
            btnOneText: 'Ok',
            errorTitle: 'UPDATED',
            errorText: 'Your profile has been updated!',
            popUpError: true,
          });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          btnOneText: 'Ok',
          errorTitle: 'ERROR',
          errorText: JSON.stringify(error),
          popUpError: true,
        });
      });
  };
  getAdress = address => {
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
              {this.state.imageUpload.length > 0 ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{height: 200, width: SCREEN.width}}
                  onPress={() => this.openImagePicker()}>
                  <Image
                    style={{
                      position: 'absolute',
                      left: 0,
                      height: 140,
                      width: 140,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageUpload.length > 3
                        ? {uri: this.state.imageUpload[3].path}
                        : require('../../assets/plus.png')
                    }
                  />

                  <Image
                    style={{
                      position: 'absolute',
                      left: 30,
                      height: 170,
                      width: 170,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageUpload.length > 4
                        ? {uri: this.state.imageUpload[4].path}
                        : require('../../assets/plus.png')
                    }
                  />

                  <Image
                    style={{
                      position: 'absolute',
                      right: 0,
                      height: 140,
                      width: 140,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageUpload.length > 2
                        ? {uri: this.state.imageUpload[2].path}
                        : require('../../assets/plus.png')
                    }
                  />
                  <Image
                    style={{
                      position: 'absolute',
                      right: 30,
                      height: 170,
                      width: 170,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageUpload.length > 1
                        ? {uri: this.state.imageUpload[1].path}
                        : require('../../assets/plus.png')
                    }
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
                      this.state.imageUpload.length > 0
                        ? {uri: this.state.imageUpload[0].path}
                        : require('../../assets/plus.png')
                    }
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{height: 200, width: SCREEN.width}}
                  onPress={() => this.openImagePicker()}>
                  <Image
                    style={{
                      position: 'absolute',
                      left: 0,
                      height: 140,
                      width: 140,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageOfuser.length > 3
                        ? {uri: this.state.imageOfuser[3].Profile_Url}
                        : require('../../assets/plus.png')
                    }
                  />

                  <Image
                    style={{
                      position: 'absolute',
                      left: 30,
                      height: 170,
                      width: 170,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageOfuser.length > 4
                        ? {uri: this.state.imageOfuser[4].Profile_Url}
                        : require('../../assets/plus.png')
                    }
                  />

                  <Image
                    style={{
                      position: 'absolute',
                      right: 0,
                      height: 140,
                      width: 140,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageOfuser.length > 2
                        ? {uri: this.state.imageOfuser[2].Profile_Url}
                        : require('../../assets/plus.png')
                    }
                  />
                  <Image
                    style={{
                      position: 'absolute',
                      right: 30,
                      height: 170,
                      width: 170,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageOfuser.length > 1
                        ? {uri: this.state.imageOfuser[1].Profile_Url}
                        : require('../../assets/plus.png')
                    }
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
                      this.state.imageOfuser.length > 0
                        ? {uri: this.state.imageOfuser[0].Profile_Url}
                        : require('../../assets/plus.png')
                    }
                  />
                </TouchableOpacity>
              )}
              <TextInput
                value={this.state.firstName}
                onChangeText={firstName => this.setState({firstName})}
                style={styles.inputTextView}
              />
              <TextInput
                value={this.state.lastName}
                onChangeText={lastName => this.setState({lastName})}
                style={styles.inputTextView}
              />
              <TextInput
                value={this.state.userName}
                onChangeText={userName => this.setState({userName})}
                style={styles.inputTextView}
              />
              <View style={styles.TextInputWrapper}>
                {this.props.userDetail && (
                  <DateAndTimePicker
                    format="MMM DD, YYYY"
                    mode="date"
                    type="onlyDate"
                    value={this.props.userDetail.BirthDate}
                    setDateAndTime={value => this.onChange(value)}
                    showPlaceholder={this.props.userDetail.BirthDate}
                    datebutton={styles.datebutton}
                  />
                )}
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
                onChangeText={bioText => this.setState({bioText})}
                placeholder={'Bio'}
                multiline={true}
                style={styles.messageText}
              />
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.firestoreLinking()}>
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
    callApi: (user, uid) => dispatch(userActions.setUser({user, uid})),
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
    shadowOpacity: 0.1,
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
    backgroundColor: WHITE.app,
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
    shadowOpacity: 0.1,
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
    backgroundColor: WHITE.dark,
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
