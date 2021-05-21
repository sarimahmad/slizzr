import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {FONT, SCREEN} from '../../helper/Constant';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../../component/Header';
import RBSheet from 'react-native-raw-bottom-sheet';
import {BLACK, BLUE, WHITE} from '../../helper/Color';

export default class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      pic: '',
      imageUri: '',
      event: 'Prepaid',
      eventis: 'Private',
      skip: false,
    };
  }

  PicMultiple() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({imageUri: image.path});
      console.log('imageDeatail', JSON.stringify(image));
    });
  }

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
              onPress={() => this.PicMultiple()}>
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
                <TextInput style={styles.firstInput} placeholder="+ Add" />
                <View style={styles.AbsoluteRightIcon}>
                  <Image
                    source={require('../../assets/Slizzer-icon/circle-edit-outline.png')}
                  />
                </View>
              </View>
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
                    selectedValue={this.state.event}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({event: itemValue})
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
                  <TextInput style={[styles.secondinput]} placeholder="$" />
                </View>
              </View>
              <View style={styles.RowView}>
                <View style={{flex: 1.5}}>
                  <Text style={[styles.TextInputTitle, {marginLeft: 0}]}>
                    {' '}
                    Location
                  </Text>
                  <View style={styles.TextInputWrapper2}>
                    <TextInput
                      placeholder="+ Add"
                      style={[styles.thirdinput]}
                    />
                    <View style={styles.AbsoluteRightIcon}>
                      <Image
                        source={require('../../assets/Slizzer-icon/circle-edit-outline.png')}
                      />
                    </View>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.TextInputTitle, {marginLeft: 0}]}>
                    {' '}
                    Attendee Limit
                  </Text>
                  <View style={styles.TextInputWrapper2}>
                    <TextInput placeholder="50" style={[styles.thirdinput]} />
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
                  <View style={styles.TextInputWrapper2}>
                    <TextInput placeholder="50" style={styles.thirdinput} />
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
                selectedValue={this.state.eventis}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({eventis: itemValue})
                }
                items={[
                  {label: 'Private', value: 'Private'},
                  {label: 'Public', value: 'Public'},
                ]}
              />
              <View>
                <TouchableOpacity
                  onPress={() => this.RBSheet.open()}
                  style={styles.button}>
                  <Text style={styles.text}> Create Event</Text>
                </TouchableOpacity>
              </View>
              <RBSheet
                ref={ref => {
                  this.RBSheet = ref;
                }}
                height={600}
                openDuration={250}
                customStyles={{
                  container: {
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                }}>
                <View>
                  <Image
                    style={{alignSelf: 'center'}}
                    source={require('../../assets/Oval.png')}
                  />
                  <Text style={styles.titleText}> Event Created!</Text>
                  {this.state.skip == false && (
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.text}> Share event</Text>
                    </TouchableOpacity>
                  )}
                  {this.state.skip == true && (
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.text}> Send Direct Invites</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => this.setState({skip: true})}>
                    <Text
                      style={{
                        marginVertical: 20,
                        textAlign: 'center',
                        color: '#F818D9',
                        textDecorationLine: 'underline',
                      }}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                </View>
              </RBSheet>
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
    alignItems: 'center',
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
    width: '90%',
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
