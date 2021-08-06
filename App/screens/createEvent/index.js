/* eslint-disable no-alert */
/* eslint-disable react/no-did-mount-set-state */
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
import uuid from 'react-native-uuid';
import moment from 'moment';
import {openSettings} from 'react-native-permissions';
import {connect} from 'react-redux';

import Header from '../../component/Header';
import GoogleSearchBar from '../../component/GoogleSearchBar';
import * as userActions from '../../redux/actions/user';
import RBSheet from 'react-native-raw-bottom-sheet';
import {BLACK, WHITE} from '../../helper/Color';
import Validations from '../../helper/Validations';
import DateAndTimePicker from '../../component/DateAndTimePicker';
import Loader from '../../component/Loader';
import ErrorPopup from '../../component/ErrorPopup';
import {Alert} from 'react-native';
import {getEventDetail, updateEvent, createHostStripe,EditEventNotify} from '../../helper/Api';

class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      screenTypeEdit: false,
      selectedImage: false,
      imageUploaded: false,
      selectLocationFlag: false,
      currentLocationPlace: '',
      localErrorLocation: null,
      uploading: false,
      transfered: 0,
      pic: '',
      imageUri: '',
      event: 'Prepaid',
      eventis: 'Private',
      skip: false,
      Address: '',
      AttendeeLimit: '',
      datetimeSelected: '',
      date: new Date(),
      DateTime: new Date(),
      Description: '',
      EventType: '',
      Fee: '',
      location: {},
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
      detailItem: {},
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
        this.setState({selectedImage: true});
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

     await this.getEventDetail(this.props.route.params.id);
    }
   await this.checkStripeHostId();
  }

  checkStripeHostId = async () => {
    const userData = this.props.userDetail;
    if (!userData.STRIPE_HOST_ID || userData.STRIPE_HOST_ID === '') {
      this.setState({loading: true});
  
      await createHostStripe({
        user_id: userData.id,
        email: userData.Email,
        city: userData.Address.city,
        name: userData.FirstName,
        line1: userData.Address.line1,
        postal_code: userData.Address.postal_code,
        state: userData.Address.state,
        day: userData.BirthDate.day,
        month: userData.BirthDate.month,
        year: userData.BirthDate.year,
        first_name: userData.FirstName,
        last_name: userData.LastName,
      }).then(_response => {
        this.setState({loading: false});
      });
    } else {
      this.setState({loading: false});
    }
  };

  async getEventDetail(id) {
    this.setState({loading: true});
    await getEventDetail(id).then(response => {
      this.setState({detailItem: response.Event});

      this.setState({Name: response.Event.Name});
      this.setState({DateTime: new Date(response.Event.DateTime)});
      this.setState({Description: response.Event.Description});
      this.setState({EventType: response.Event.EventType});
      this.setState({Fee: response.Event.Fee});
      this.setState({PublicPrivate: response.Event.PublicPrivate});
      this.setState({duration: response.Event.duration});
      this.setState({AttendeeLimit: response.Event.AttendeeLimit});
      this.setState({Address: response.Event.Address});
      this.setState({location: response.Event.location});
      this.setState({imageUri: response.Event.image});

      this.setState({loading: false});
    });
  }
  handleSubmit = async () => {
    console.log(this.state);
    if (this.isFormFilled()) {
      this.setState({loading: true});
      const uri = this.state.imageUri;
      const uniqueId = uuid.v4();

      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      var formdata = new FormData();
      formdata.append('file', {
        name: filename,
        type: 'jpg/png',
        uri: uploadUri,
      });

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch('https://slizzr-6a887.appspot.com/upload', requestOptions)
        .then(response => response.json())
        .then(async responseImage => {
          // Get Host Object From User's
          if (responseImage.messgae === 'Success') {
            const data = {
              Address: this.state.Address,
              AttendeeLimit: this.state.AttendeeLimit,
              DateTime: this.state.datetimeSelected,
              Description: this.state.Description,
              EventType: this.state.EventType,
              Fee: this.state.Fee,
              Host: this.props.userDetail,
              location: this.state.location,
              Name: this.state.Name,
              PublicPrivate: this.state.PublicPrivate,
              disbaleDateTimeFormate: this.state.disbaleDateTimeFormate,
              duration: this.state.duration,
              userId: this.props.userDetail.id,
              userName: this.props.userDetail.displayName,
              image: responseImage.url,
              id: uniqueId,
              Total: 0,
              job: 'scheduled',
              Start_date: moment(this.state.DateTime).format('llll'),
              End_date: moment(this.state.DateTime)
                .add(this.state.duration, 'hours')
                .format('llll'), // TimeStamp
            };
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
          } else {
            this.setState({
              loading: false,
              errorTitle: 'ERROR',
              errorText: 'Image size is too big. Please choose different pic',
              btnOneText: 'Ok',
              popUpError: true,
            });
          }
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
  async editEvent() {
    let datatoSend = {};
    if (this.state.selectedImage === true) {
      this.setState({loading: true});
      const uri = this.state.imageUri;

      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      var formdata = new FormData();
      formdata.append('file', {
        name: filename,
        type: 'jpg/png',
        uri: uploadUri,
      });

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch('https://slizzr-6a887.appspot.com/upload', requestOptions)
        .then(response => response.json())
        .then(async responseImage => {
          // Get Host Object From User's
          if (responseImage.messgae === 'Success') {
            datatoSend = {
              image: responseImage.url,
              Description: this.state.Description,
              Address: this.state.Address,
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              AttendeeLimit: this.state.AttendeeLimit,
              PublicPrivate: this.state.PublicPrivate,
            };
          }

          await updateEvent(
            this.state.detailItem.id,
            JSON.stringify(datatoSend),
          ).then(response => {
            this.setState({
              loading: false,
              errorTitle: 'Event Updated',
              btnOneText: 'Ok',
              popUpError: true,
            });
          });
        });
    } else {
      this.setState({loading: true});

      datatoSend = {
        image: this.state.imageUri,
        Description: this.state.Description,
        Address: this.state.Address,
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        AttendeeLimit: this.state.AttendeeLimit,
        PublicPrivate: this.state.PublicPrivate,
      };

      await updateEvent(
        this.state.detailItem.id,
        JSON.stringify(datatoSend),
      ).then(response => {
        this.setState({
          loading: false,
          errorTitle: 'Successful',
          errorText: 'Event Updated',

          btnOneText: 'Ok',
          popUpError: true,
        });

        this.setState({loading: false});
      });
      this.setState({loading: false});
    }
  }
  getAdress = address => {
    // alert(address);
    console.log(address);

    this.setState({
      currentLocationPlace: address,
      Address: address,
    });
  };
  done = () => {
    this.setState({popUpError: false});
    this.props.navigation.goBack();
  };
  onChange = selectedDate => {
    const currentDate = selectedDate || this.state.DateTime;
    const current_date = new Date(currentDate);
      this.setState({
        DateTime: current_date,
      });
   
  }
  editEventNotify=async()=>{
    let eventId= this.props.route.params.id
  await EditEventNotify(eventId).then(response=>{
    console.log(response)
  })
  }
  render() {
    return (
      <View style={styles.container}>
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
                    editable={this.state.screenTypeEdit === false}
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
                    format="MMM DD, YYYY - hh:mm "
                    mode="datetime"
                    type="datetime"
                    editable={this.state.screenTypeEdit}
                    value={this.state.DateTime}
                    setDateAndTime={value => this.onChange(value)}
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
                        disabled={this.state.screenTypeEdit}
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
                        editable={
                          (this.state.EventType !== 'FREE' &&
                            this.state.screenTypeEdit === false) ||
                          this.state.screenTypeEdit !== false
                        }
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
                        editable={this.state.screenTypeEdit === false}
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
                    // placeholder={{
                    //   label: 'Public',
                    //   value: this.state.PublicPrivate,
                    // }}
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
                  {this.state.screenTypeEdit === false ? (
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
                  ) : (
                    <TouchableOpacity
                      onPress={() => this.editEvent()}
                      style={[styles.button, {color: BLACK.btn}]}>
                      <Text style={styles.text}> EDIT EVENT</Text>
                    </TouchableOpacity>
                  )}
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
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
