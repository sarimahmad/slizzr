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
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {FONT, SCREEN} from '../../helper/Constant';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../../component/Header';
import GoogleSearchBar from '../../component/GoogleSearchBar';
import RBSheet from 'react-native-raw-bottom-sheet';
import {BLACK, WHITE} from '../../helper/Color';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateAndTimePicker from '../../component/DateAndTimePicker';
export default class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      imageUploaded:false,
      selectLocationFlag:false,
      currentLocationPlace:'',
      localErrorLocation:null,
      location:null,
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
      DateTime: '',
      Description: '',
      EventType: '',
      Fee: '',
      Host: '',
      Latitude: 0,
      Longitude: 0,
      Name: '',
      PublicPrivate: '',
      disbaleDateTimeFormate: '',
      duration: '',
      userId: '',
      userName: '',
    };
  }
  selectImage = async() => {
    ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          this.setState({imageUri: image.path});
      
         
        });
  
      };
  uploadImage = async () => {
    const uri = this.state.imageUri;
          console.log(uri)
          const filename = uri.substring(uri.lastIndexOf('/') + 1);
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
         
          const task = storage().ref(filename).putFile(uploadUri);
          task.on('state_changed', snapshot => {
         this.setState({imageUploaded:true})
         
          });
         
        
        
  
  };

  directInvites = () => {
    this.props.navigation.navigate('directInvites');
    this.RBSheet.close();
  };
  isFormFilled() {
    let checkPassword = Validations.checkPassword(this.state.password);
    let checkEmail = Validations.checkEmail(this.state.email);
    let checkfirstName = Validations.checkUsername(this.state.firstName);
    let checklastName = Validations.checkUsername(this.state.lastName);
    if (checkEmail && checkPassword && checkfirstName && checklastName) {
      return true;
    }
    if (!checkfirstName) {
      alert('firstName required');
    } else if (!checkEmail) {
      alert('invalid email');
    } else if (!checklastName) {
      alert('lastname required');
    } else if (!checkPassword) {
      alert('invalid password');
    }
    return false;
  }
  async componentDidMount() {
    const TOKEN = await AsyncStorage.getItem('token');
    const userDetail = await AsyncStorage.getItem('userdetail');
    console.log(JSON.parse(userDetail).user.firstName);
    this.setState({userName: JSON.parse(userDetail).user.firstName});
    this.setState({userId: JSON.parse(TOKEN)});
    console.log(this.state.userName, this.state.userId);
  }
  handleSubmit = async() => {
   await this.uploadImage()
    
 
if(this.state.imageUploaded==true){
  alert(
    'Photo uploaded!',
    'Your photo has been uploaded to Firebase Cloud Storage!',
  );


  console.log(this.state);
    const data = {
      Address: this.state.Address,
      AttendeeLimit: this.state.AttendeeLimit,
      DateTime: this.state.DateTime,
      Description: this.state.Description,
      EventType: this.state.EventType,
      Fee: this.state.Fee,
      Host: this.state.Host,
      // Latitude: this.state.Latitude,
      // Longitude: this.state.Longitude,
      location:this.state.location,
      Name: this.state.Name,
      PublicPrivate: this.state.PublicPrivate,
      disbaleDateTimeFormate: this.state.disbaleDateTimeFormate,
      duration: this.state.duration,
      userId: this.state.userId,
      userName: this.state.userName,
      image:this.state.imageUri
    };
    const usersRef = firestore().collection('events');
    usersRef
      .doc(this.state.userId)
      .set(data)
      .then(async firestoreDocument => {
        this.RBSheet.open();
      })

      .catch(error => {
        alert(error);
      });
    }else{
      alert("image upload failed")
    }
  };
  setLocation = (latitude, longitude) => {
   console.log(latitude,longitude)
    this.setState({
      selectLocationFlag: false,
      localErrorLocation: null,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };
  getAdress = (address) => {
    // alert(address);
    console.log(address)
 
    this.setState({
      currentLocationPlace: address,
      Address: address,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Header
            headerTitle={'Create Events'}
            navigation={this.props.navigation}
            route={'Home'}
          />
          <ScrollView style={[styles.container]} bounces={false}>
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
                />
                <View style={styles.AbsoluteRightIcon}>
                  <Image
                    source={require('../../assets/Slizzer-icon/lock-outline.png')}
                  />
                </View>
              </View>
              <Text style={styles.TextInputTitle}>Description:</Text>
              <View style={styles.TextInputWrapper}>
                <TextInput
                  style={styles.firstInput}
                  onChangeText={value => this.setState({Description: value})}
                  value={this.state.Description}
                  placeholder="Breif Description of your Event"
                />
                <View style={styles.AbsoluteRightIcon}>
                  <Image
                    source={require('../../assets/Slizzer-icon/circle-edit-outline.png')}
                  />
                </View>
              </View>

              <Text style={styles.TextInputTitle}>Date and Time:</Text>
              <View style={styles.TextInputWrapper}>
              <DateAndTimePicker

          format="MMM DD, YYYY - ddd "
          mode="date"
          value={this.state.date}
          setDateAndTime={(value) => this.setState({DateTime:value})}
          showPlaceholder="+ Add"
          datebutton={styles.datebutton}
        />
        </View>
              {/* <View style={styles.TextInputWrapper}>
                <TextInput style={styles.firstInput} 
                placeholder="+ Add" 
                onChangeText={(value)=>this.setState({DateTime:value})}
                value={this.state.DateTime}
             
                />
                <View style={styles.AbsoluteRightIcon}>
                  <Image
                    source={require('../../assets/Slizzer-icon/circle-edit-outline.png')}
                  />
                </View>
              </View> */}
              <View style={styles.RowView}>
                <View style={{flex: 1}}>
                  <Text style={[styles.TextInputTitle, {marginLeft: 0}]}>
                    Event Types:
                  </Text>
                  <RNPickerSelect
                    style={{
                      inputIOS: {
                        width: '90%',
                        height: 53,
                        borderWidth: 1,
                        borderColor: 'lightgrey',
                        borderRadius: 8,
                        paddingLeft: 7,
                      },
                      inputAndroid: {
                        width: '90%',
                        height: 53,
                        borderWidth: 1,
                        borderColor: 'lightgrey',
                        borderRadius: 8,
                        marginTop: 8,
                        paddingLeft: 7,
                      },
                    }}
                    selectedValue={this.state.EventType}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({EventType: itemValue})
                    }
                    items={[
                      {label: 'Prepaid', value: 'Prepaid'},
                      {label: 'Billing', value: 'Billing'},
                      {label: 'Postpaid', value: 'Postpaid'},
                    ]}
                  />
                </View>
                <View style={{flex: 1}}>
                  <View style={{flexDirection: 'row', marginVertical: 11}}>
                    <Text style={[{marginLeft: 0, marginTop: 1}]}>Fee</Text>
                    <Image
                      source={require('../../assets/Slizzer-icon/Shape.png')}
                      style={styles.feeicon}
                    />
                  </View>
                  <TextInput
                    style={[styles.secondinput]}
                    placeholder="$"
                    onChangeText={value => this.setState({Fee: value})}
                    value={this.state.Fee}
                  />
                </View>
              </View>
              
              <View style={styles.RowView}>
                 <View style={{flex: 1}}>
                  <Text style={[styles.TextInputTitle, {marginLeft: 0}]}>
                    Location
                  </Text>
                  <TouchableOpacity
                    style={[styles.TextInputWrapper2,{width:SCREEN.width*0.3}]}     
                     onPress={() =>
                        this.setState({ selectLocationFlag: true })
                      }
                    >
                   <Text   style={[styles.thirdinput,{paddingTop:15}]}
                    >+ADD</Text>
                  
                  </TouchableOpacity>
                </View>
                
                <View style={{flex: 1}}>
                  <Text style={[styles.TextInputTitle, {marginLeft: 0}]}>
                    {' '}
                    Attendee Limit
                  </Text>
                  <View style={[styles.TextInputWrapper2,{width:SCREEN.width*0.25}]}>
                    <TextInput
                      placeholder="50"
                      style={[styles.thirdinput]}
                      onChangeText={value =>
                        this.setState({AttendeeLimit: value})
                      }
                      value={this.state.AttendeeLimit}
                    />
                    <View style={styles.AbsoluteRightIcon}>
                      <Image
                        source={require('../../assets/Slizzer-icon/circle-edit-outline.png')}
                      />
                    </View>
                  </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text style={[styles.TextInputTitle, {marginLeft: 0}]}>
                    Duration (HRS)
                  </Text>
                  <View style={[styles.TextInputWrapper2,{width:SCREEN.width*0.25}]}>
                    <TextInput
                      placeholder="50"
                      style={styles.thirdinput}
                      onChangeText={value => this.setState({duration: value})}
                      value={this.state.duration}
                    />
                    <View style={styles.AbsoluteRightIcon}>
                      <Image
                        source={require('../../assets/Slizzer-icon/circle-edit-outline.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            
              <Text style={[styles.TextInputTitle]}>Public or Private</Text>
              <RNPickerSelect
                style={{
                  inputIOS: {
                    width: '90%',
                    height: 53,
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    borderRadius: 8,
                    paddingLeft: 7,
                    marginLeft: 15,
                  },
                  inputAndroid: {
                    width: '90%',
                    height: 53,
                    backgroundColor: 'red',
                    borderWidth: 2,
                    borderColor: 'lightgrey',
                    borderRadius: 8,
                    marginTop: 8,
                    paddingLeft: 7,
                    marginLeft: 15,
                  },
                }}
                selectedValue={this.state.PublicPrivate}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({PublicPrivate: itemValue})
                }
                items={[
                  {label: 'Private', value: 'Private'},
                  {label: 'Public', value: 'Public'},
                ]}
              />
              <View style={{marginBottom: 20}}>
                <TouchableOpacity
                  onPress={() => this.handleSubmit()}
                  style={styles.button}>
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
                    <TouchableOpacity onPress={() => this.RBSheet.close()}>
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
                        this.setState({ selectLocationFlag: false })
                      }
                      animationType={"slide"}
                    >
                      <View
                        style={{
                          marginTop: "10%",
                          flex: 1,
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <GoogleSearchBar
                          closeLocationModal={() => {
                            this.setState({ selectLocationFlag: false });
                          }}
                          getAddress={this.getAdress}
                          setLocation={this.setLocation}
                          clearGoogleSearch={this.state.clearGoogleSearch}
                          inputValue={'Address'}
                        />
                      </View>
                    </Modal>
                   
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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
    marginTop: 20,
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
