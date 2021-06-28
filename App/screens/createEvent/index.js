/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {FONT, SCREEN} from '../../helper/Constant';
import RNPickerSelect from 'react-native-picker-select';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import moment from 'moment';
import {openSettings} from 'react-native-permissions';

import Header from '../../component/Header';
import GoogleSearchBar from '../../component/GoogleSearchBar';
import RBSheet from 'react-native-raw-bottom-sheet';
import {BLACK, WHITE} from '../../helper/Color';
import Validations from '../../helper/Validations';
import DateAndTimePicker from '../../component/DateAndTimePicker';
import Loader from '../../component/Loader';
import ErrorPopup from '../../component/ErrorPopup';
import {Alert} from 'react-native';

export default class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      imageUploaded: false,
      selectLocationFlag: false,
      currentLocationPlace: '',
      localErrorLocation: null,
      location: null,
      uploading: false,
      transfered: 0,
      pic: '',
      imageUri: '',
      event: 'Prepaid',
      eventis: 'Private',
      skip: false,
      Address: '',
      AttendeeLimit: '',
      date: new Date(),
      DateTime: new Date(),
      Description: '',
      EventType: '',
      Fee: '',
      Host: '',
      Latitude: 0,
      Longitude: 0,
      Name: '',
      PublicPrivate: 'Public',
      disbaleDateTimeFormate: new Date(),
      duration: '',
      userId: '',
      userName: '',
      imageName: '',
      loading: false,
      isModalVisible: false,
      popUpError: false,
      btnOneText: '',
      errorTitle: '',
      errorText: '',
      btnTwoText: '',
    };
  }
  selectImage = async () => {
    ImagePicker.openPicker({
      width: 250,
      height: 300,
      cropping: true,
    })
      .then(image => {
        this.setState({imageUri: image.path});
      })
      .catch(error => {
        if (error.code === 'E_NO_LIBRARY_PERMISSION') {
          this.setState({
            errorPopUp: true,
            leftBtnText: 'Go To Setting',
            rightBtnText: 'ok',
            errorMsg: 'Please go to setting allow the album permission for app',
            errorTitle: 'Permission error',
          });
        } else {
          openSettings().catch(() => console.warn('cannot open settings'));
        }
      });
  };
  showModal = id => {
    this.setState({
      selectedEventId: id,
      isModalVisible: true,
    });
  };
  uploadImage = async () => {
    const uri = this.state.imageUri;

    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    this.setState({imageUri: filename});
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const task = storage().ref(filename).putFile(uploadUri);
    task.on('state_changed', snapshot => {
      this.setState({imageUploaded: true});
    });
  };

  directInvites = () => {
    this.props.navigation.navigate('directInvites');
    this.RBSheet.close();
  };

  isAllDataFilled() {
    let checkAddress = Validations.checkUsername(this.state.Address);
    let checkAttendeeLimit = Validations.checkUsername(
      this.state.AttendeeLimit,
    );
    let checkDateTime = Validations.checkUsername(this.state.DateTime);
    let checkDescription = Validations.checkUsername(this.state.Description);
    let checkEventType = Validations.checkUsername(this.state.EventType);
    let checkFee =
      this.state.EventType === 'FREE'
        ? true
        : Validations.checkUsername(this.state.Fee);
    let checkPublicPrivate = Validations.checkUsername(
      this.state.PublicPrivate,
    );
    let checkduration = Validations.checkUsername(this.state.duration);

    if (
      checkAddress &&
      checkAttendeeLimit &&
      checkDateTime &&
      checkDescription &&
      checkduration &&
      checkFee &&
      checkPublicPrivate &&
      checkEventType
    ) {
      return true;
    } else {
      return false;
    }
  }
  isFormFilled() {
    let checkAddress = Validations.checkUsername(this.state.Address);
    let checkAttendeeLimit = Validations.checkUsername(
      this.state.AttendeeLimit,
    );
    let checkDateTime = Validations.checkUsername(this.state.DateTime);
    let checkDescription = Validations.checkUsername(this.state.Description);
    let checkEventType = Validations.checkUsername(this.state.EventType);
    let checkFee =
      this.state.EventType === 'FREE'
        ? true
        : Validations.checkUsername(this.state.Fee);
    let checkPublicPrivate = Validations.checkUsername(
      this.state.PublicPrivate,
    );
    let checkduration = Validations.checkUsername(this.state.duration);

    if (
      checkAddress &&
      checkAttendeeLimit &&
      checkDateTime &&
      checkDescription &&
      checkduration &&
      checkPublicPrivate &&
      checkFee &&
      checkEventType
    ) {
      return true;
    }
    if (!checkAddress) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add Title in form',
      });
    } else if (!checkAttendeeLimit) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add AttendeeLimit in form',
      });
    } else if (!checkDateTime) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add Date Time in form',
      });
    } else if (!checkDescription) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add Description in form',
      });
    } else if (!checkEventType) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add EventType in form',
      });
    } else if (!checkPublicPrivate) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add Public Private in form',
      });
    } else if (!checkFee && this.state.PublicPrivate !== 'Public') {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add Fee in form',
      });
    } else if (!checkduration) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add Duration in form',
      });
    }
    return false;
  }
  async componentDidMount() {
    const isParamsExist =
      this.props.route.params && this.props.route.params.from === 'edit';
    if (isParamsExist) {
      this.setState({screenTypeEdit: true});
    }
    const TOKEN = await AsyncStorage.getItem('token');
    const userDetail = await AsyncStorage.getItem('userdetail');
    console.log(JSON.parse(userDetail).user.firstName);
    this.setState({userName: JSON.parse(userDetail).user.firstName});
    this.setState({userId: JSON.parse(TOKEN)});
    console.log(this.state.userName, this.state.userId);
  }
  handleSubmit = async () => {
    if (this.isFormFilled()) {
      this.setState({loading: true});
      this.uploadImage()
        .then(async () => {
          // Get Host Object From User's
          await firestore()
            .collection('users')
            .doc(this.state.userId)
            .get()
            .then(docRef => {
              this.setState({Host: docRef.data()});
              console.warn(docRef.data());
            })
            .catch(error => alert(error));

          const uniqueId = uuid.v4();
          const data = {
            Address: this.state.Address,
            AttendeeLimit: this.state.AttendeeLimit,
            DateTime: this.state.DateTime,
            Description: this.state.Description,
            EventType: this.state.EventType,
            Fee: this.state.Fee,
            Host: this.state.Host,
            location: this.state.location,
            Name: this.state.Name,
            PublicPrivate: this.state.PublicPrivate,
            disbaleDateTimeFormate: this.state.disbaleDateTimeFormate,
            duration: this.state.duration,
            userId: this.state.userId,
            userName: this.state.Host.displayName,
            image: this.state.imageUri,
            id: uniqueId,
            Attendees: [],
            job: 'scheduled',
            Start_date: this.state.DateTime,
            End_date: moment(this.state.DateTime)
              .add(this.state.duration, 'hours')
              .format('X'), // TimeStamp
          };
          console.warn(data);
          const usersRef = firestore().collection('events');
          usersRef
            .doc(uniqueId)
            .set(data)
            .then(async firestoreDocument => {
              this.setState({loading: false});
              this.RBSheet.open();
            })

            .catch(error => {
              this.setState({
                loading: false,
                errorTitle: 'ERROR',
                errorText: JSON.stringify(error),
                btnOneText: 'Ok',
                popUpError: true,
              });
            });
        })
        .catch(error => {
          this.setState({
            loading: false,
            errorTitle: 'ERROR',
            errorText: JSON.stringify(error),
            btnOneText: 'Ok',
            popUpError: true,
          });
        });
    }
  };
  setLocation = (latitude, longitude) => {
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
      <View style={styles.container}>
        {this.state.isModalVisible === true && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() => this.setState({isModalVisible: false})}
              doneButtonPress={() => this.setState({isModalVisible: false})}
              errorTitle={this.state.errorTitle}
              errorText={this.state.errorText}
              btnOneText={this.state.btnOneText}
              btnTwoText={this.state.btnTwoText}
            />
          </Modal>
        )}

        <SafeAreaView style={styles.container}>
          <Header
            headerTitle={'Create Event'}
            navigation={this.props.navigation}
            route={'Home'}
          />

          <ScrollView style={[styles.container]} bounces={false}>
            <View style={{flex: 1, marginTop: 20}}>
              <TouchableOpacity
                style={styles.add}
                onPress={() => this.selectImage()}>
                <View style={styles.addimage}>
                  <Image
                    style={[
                      this.state.imageUri === ''
                        ? styles.imagebefore
                        : styles.imageafter,
                    ]}
                    source={
                      this.state.imageUri !== ''
                        ? {uri: this.state.imageUri}
                        : require('../../assets/Slizzer-icon/plus.png')
                    }
                  />
                  {this.state.imageUri !== '' && (
                    <View style={styles.editIcon}>
                      <Image
                        source={require('../../assets/Slizzer-icon/edit.png')}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              <View style={styles.Textfields}>
                <Text style={styles.TextInputTitle}>Event Titles:</Text>
                <View style={styles.TextInputWrapper}>
                  <TextInput
                    style={styles.firstInput}
                    value={this.state.Name}
                    onChangeText={value => this.setState({Name: value})}
                    placeholder="Enter a name for you Event"
                    placeholderTextColor={'#B2ABB1'}
                  />
                  {this.state.screenTypeEdit && (
                    <View style={styles.AbsoluteRightIcon}>
                      <Image
                        source={require('../../assets/Slizzer-icon/lock-outline.png')}
                      />
                    </View>
                  )}
                </View>
                <Text style={styles.TextInputTitle}>Description:</Text>
                <View style={styles.TextInputWrapper}>
                  <TextInput
                    style={styles.firstInput}
                    onChangeText={value => this.setState({Description: value})}
                    value={this.state.Description}
                    placeholder="Breif Description of your Event"
                    placeholderTextColor={'#B2ABB1'}
                  />
                  {this.state.screenTypeEdit && (
                    <View style={styles.AbsoluteRightIcon}>
                      <Image
                        source={require('../../assets/Slizzer-icon/circle-edit-outline.png')}
                      />
                    </View>
                  )}
                </View>

                <Text style={styles.TextInputTitle}>Date and Time:</Text>
                <View style={styles.TextInputWrapper}>
                  <DateAndTimePicker
                    format="MMM DD, YYYY - ddd "
                    mode="date"
                    value={this.state.date}
                    setDateAndTime={value => this.setState({DateTime: value})}
                    showPlaceholder="+ Add"
                    datebutton={styles.datebutton}
                  />
                </View>
                <View style={styles.RowView}>
                  <View style={{flex: 1}}>
                    <Text style={[styles.TextInputTitle, {marginLeft: 0}]}>
                      Event Types:
                    </Text>
                    <View
                      style={{
                        width: '90%',
                        borderWidth: 1,
                        borderColor: 'lightgrey',
                        borderRadius: 8,
                      }}>
                      <RNPickerSelect
                        style={{
                          inputIOS: {
                            paddingLeft: 7,
                            color: 'black',
                            textAlignVertical: 'center',
                            height: 51,
                          },
                          inputAndroid: {
                            paddingLeft: 7,
                            color: 'black',
                            height: 51,
                            textAlignVertical: 'center',
                          },
                        }}
                        selectedValue={this.state.EventType}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({EventType: itemValue})
                        }
                        items={[
                          // {label: 'ALL', value: 'ALL'},
                          {label: 'PREPAID', value: 'PREPAID'},
                          {label: 'SCAN-&-PAY AT DOOR', value: 'SCAN'},
                          {label: 'FREE', value: 'FREE'},
                        ]}
                      />
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', marginVertical: 11}}>
                      <Text style={[{marginLeft: 0, marginTop: -2}]}>Fee</Text>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            'Fee',
                            'A non-refundable service and payment processing fee of 5.9% + $0.30 will be deducted from each paid Zicket sold (e.g., on every $10 Zicket sold, $0.89 will be deducted, so you will be making $9.11 per Zicket sold). Free Events will always be free to host.',
                          )
                        }>
                        <Image
                          source={require('../../assets/Slizzer-icon/Shape.png')}
                          style={styles.feeicon}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TextInput
                        style={[styles.secondinput]}
                        placeholder="$"
                        editable={this.state.EventType !== 'FREE'}
                        onChangeText={value =>
                          this.setState({Fee: value.slice(2)})
                        }
                        value={`$ ${this.state.Fee}`}
                        placeholderTextColor={'#B2ABB1'}
                        keyboardType={'numeric'}
                      />
                      {this.state.screenTypeEdit && (
                        <View style={styles.AbsoluteRightIcon}>
                          <Image
                            source={require('../../assets/Slizzer-icon/lock-outline.png')}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.RowView}>
                  <View style={{flex: 1}}>
                    <Text style={[styles.TextInputTitle, {marginLeft: 0}]}>
                      Location
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.TextInputWrapper2,
                        {width: SCREEN.width * 0.3},
                      ]}
                      onPress={() => this.setState({selectLocationFlag: true})}>
                      {this.state.Address === '' ? (
                        <Text
                          style={[
                            styles.thirdinput,
                            {paddingTop: 15, color: 'grey'},
                          ]}>
                          + Add
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
                  </View>

                  <View style={{flex: 1}}>
                    <Text style={[styles.TextInputTitle, {marginLeft: 13}]}>
                      {' '}
                      Attendee Limit
                    </Text>
                    <View
                      style={[
                        styles.TextInputWrapper2,
                        {width: SCREEN.width * 0.25},
                      ]}>
                      <TextInput
                        placeholder="50"
                        style={[styles.thirdinput]}
                        onChangeText={value =>
                          this.setState({AttendeeLimit: value})
                        }
                        value={this.state.AttendeeLimit}
                        placeholderTextColor={'#B2ABB1'}
                        keyboardType={'numeric'}
                      />
                      {this.state.screenTypeEdit && (
                        <View style={styles.AbsoluteRightIcon}>
                          <Image
                            source={require('../../assets/Slizzer-icon/circle-edit-outline.png')}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={[styles.TextInputTitle, {marginRight: 11}]}>
                      Duration (HRS)
                    </Text>
                    <View
                      style={[
                        styles.TextInputWrapper2,
                        {width: SCREEN.width * 0.25},
                      ]}>
                      <TextInput
                        placeholder="50"
                        style={styles.thirdinput}
                        onChangeText={value => this.setState({duration: value})}
                        value={this.state.duration}
                        placeholderTextColor={'#B2ABB1'}
                        keyboardType={'numeric'}
                      />
                      {this.state.screenTypeEdit && (
                        <View style={styles.AbsoluteRightIcon}>
                          <Image
                            source={require('../../assets/Slizzer-icon/circle-edit-outline.png')}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <Text style={[styles.TextInputTitle]}>Public or Private</Text>
                <View
                  style={{
                    borderRadius: 8,
                    width: SCREEN.width - 40,
                    alignSelf: 'center',
                    borderWidth: 2,
                    borderColor: 'lightgrey',
                  }}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Public',
                      value: this.state.PublicPrivate,
                    }}
                    style={{
                      inputIOS: {
                        paddingLeft: 7,
                        marginLeft: 15,
                        height: 51,
                        width: '100%',
                      },
                      inputAndroid: {
                        paddingLeft: 7,
                        color: 'black',
                        height: 51,
                        textAlignVertical: 'center',
                      },
                    }}
                    selectedValue={this.state.PublicPrivate}
                    onValueChange={itemValue =>
                      this.setState({PublicPrivate: itemValue})
                    }
                    items={[
                      {label: 'Private', value: 'Private'},
                      {label: 'Public', value: 'Public'},
                    ]}
                  />
                </View>

                <View style={{marginBottom: 20}}>
                  <TouchableOpacity
                    onPress={() => this.handleSubmit()}
                    style={[
                      styles.button,
                      {
                        backgroundColor: this.isAllDataFilled()
                          ? BLACK.btn
                          : 'grey',
                      },
                    ]}>
                    <Text style={styles.text}> CREATE EVENT</Text>
                  </TouchableOpacity>
                </View>
                <RBSheet
                  ref={ref => {
                    this.RBSheet = ref;
                  }}
                  height={SCREEN.height}
                  openDuration={250}
                  customStyles={{
                    container: {},
                  }}>
                  <SafeAreaView>
                    <View style={[styles.flex, {padding: 10}]}>
                      <TouchableOpacity
                        onPress={() => {
                          this.RBSheet.close();
                          this.props.navigation.pop();
                        }}>
                        <Image
                          source={require('../../assets/back.png')}
                          style={styles.logo}
                        />
                      </TouchableOpacity>

                      <Image
                        source={require('../../assets/homeLogo.png')}
                        style={styles.logo}
                      />
                      <Image
                        source={require('../../assets/bell.png')}
                        style={styles.logo}
                      />
                    </View>
                    <View style={{marginTop: 100}}>
                      <Image
                        style={{alignSelf: 'center'}}
                        source={require('../../assets/Oval.png')}
                      />
                      <Text style={[styles.titleText, {marginTop: 100}]}>
                        {' '}
                        Event Created!
                      </Text>
                      {this.state.skip === false && (
                        <TouchableOpacity
                          onPress={this.directInvites}
                          style={styles.button}>
                          <Text style={styles.text}> SHARE EVENT</Text>
                        </TouchableOpacity>
                      )}
                      {this.state.skip === true && (
                        <TouchableOpacity style={styles.button}>
                          <Text style={styles.text}> Send Direct Invites</Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        onPress={() => this.setState({skip: true})}>
                        <Text
                          style={{
                            marginVertical: 20,
                            textAlign: 'center',
                            color: '#F818D9',
                            textDecorationLine: 'underline',
                          }}>
                          SKIP
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                </RBSheet>
                <Modal
                  visible={this.state.selectLocationFlag}
                  onRequestClose={() =>
                    this.setState({selectLocationFlag: false})
                  }
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
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        {this.state.loading && <Loader loading={this.state.loading} />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },

  add: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    width: SCREEN.width - 30,
    alignSelf: 'center',
    height: 120,
    borderRadius: 20,
  },
  imagebefore: {
    // height: 0,
    // width: SCREEN.width - 350
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  imageafter: {
    width: '100%',
    height: 110,
    borderRadius: 20,
  },
  addimage: {
    alignItems: 'center',
    width: SCREEN.width - 40,
    alignSelf: 'center',
  },
  titleText: {
    marginTop: 20,
    marginBottom: 30,
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 24,
    alignSelf: 'center',
  },
  subtitletext: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.semiBold,
    fontSize: 16,
    alignSelf: 'center',
  },
  Textfields: {
    marginLeft: 10,
  },
  firstInput: {
    width: SCREEN.width - 40,
    height: 53,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: 'lightgrey',
    fontSize: 16,
    fontFamily: FONT.Nunito.regular,
    alignSelf: 'center',
  },
  secondinput: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 53,
    borderRadius: 10,
    width: SCREEN.width / 2 - 20,
    paddingLeft: 10,
  },
  RowView: {
    flexDirection: 'row',
    width: SCREEN.width - 40,
    // alignItems: 'center',
    alignSelf: 'center',
  },
  TextInputTitle: {
    fontSize: 12,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 20,
  },
  AbsoluteRightIcon: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    top: 10,
  },
  TextInputWrapper: {
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
  button: {
    width: SCREEN.width / 1.1,
    height: 60,
    marginTop: 35,
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 50,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  TextInputWrapper2: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  feeicon: {
    marginLeft: 5,
  },
  editIcon: {
    position: 'absolute',
    bottom: -25,
  },
});
