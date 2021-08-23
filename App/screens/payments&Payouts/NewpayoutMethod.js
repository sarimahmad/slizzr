/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
import {ScrollView} from 'react-native';
import {
  newPayoutMethod,
  createHostStripe,
  getUserProfile,
} from '../../helper/Api';
import * as userActions from '../../redux/actions/user';
import Loader from '../../component/Loader';
import ErrorPopup from '../../component/ErrorPopup';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Validations from '../../helper/Validations';
class NewpayoutMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountholderName: '',
      Account_Number: '',
      Transit_Number: '',
      state: '',
      Institue_number: '',
      editType: true,
      country: '',
      isModalVisible: false,
      popUpError: false,
      btnOneText: '',
      errorTitle: '',
      errorText: '',
      btnTwoText: '',
      AccountType: '',
    };
  }
  isFormFilled() {
    let checkaccount_holder_name = Validations.checkUsername(
      this.state.accountholderName,
    );
    let checkaccount_holder_type = Validations.checkUsername(
      this.state.Account_Number,
    );
    let checkrouting_number = Validations.checkUsername(
      this.state.Transit_Number,
    );
    let checkInstitue_number = Validations.checkUsername(
      this.state.Institue_number,
    );

    if (
      checkaccount_holder_name &&
      checkaccount_holder_type &&
      checkrouting_number &&
      checkInstitue_number
    ) {
      return true;
    }
    if (!checkaccount_holder_name) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add accountholderName in form',
      });
    } else if (!checkaccount_holder_type) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add account_holder_type in form',
      });
    } else if (!checkrouting_number) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add Transit_Number in form',
      });
    } else if (!checkInstitue_number) {
      this.setState({
        errorTitle: 'Invalid Form',
        btnOneText: 'Ok',
        popUpError: true,
        errorText: 'Add Institue_number in form',
      });
    }
    return false;
  }

  newPayoutMethod = async () => {
    const userData = this.props.userDetail;
    if (userData.STRIPE_HOST_ID && userData.STRIPE_HOST_ID !== '') {
      if (this.isFormFilled()) {
        let data = {
          account_holder_name: this.state.accountholderName,
          account_holder_type: 'individual',
          routing_number:
            this.state.Transit_Number + '-' + this.state.Institue_number,
          account_number: this.state.Account_Number,
          user_id: userData.id,
          host_id: userData.STRIPE_HOST_ID,
        };
        this.setState({loading: true});
        this.addPayment(data);
      }
    } else {
      this.setState({loading: true});
      await createHostStripe({
        user_id: userData.id,
        email: userData.email,
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
      }).then(async _response => {
        if (_response.status === 404) {
          this.setState({
            loading: false,
            errorTitle: 'ERROR',
            errorText: 'Please complete your profile first',
            btnOneText: 'Ok',
            popUpError: true,
          });
        } else {
          await getUserProfile(userData.id).then(userResponse => {
            this.props.callApi(userResponse.User, userData.id);
            if (this.isFormFilled()) {
              let data = {
                account_holder_name: this.state.accountholderName,
                account_holder_type: 'individual',
                routing_number:
                  this.state.Transit_Number + '-' + this.state.Institue_number,
                account_number: this.state.Account_Number,
                user_id: userData.id,
                host_id: this.props.userDetail.STRIPE_HOST_ID,
              };
              this.setState({loading: true});
              this.addPayment(data);
            }
          });
        }
      });
      this.setState({loading: false});
    }
  };

  addPayment = async data => {
    await newPayoutMethod(data).then(response => {
      if (
        response &&
        response !== undefined &&
        response.message === 'Successfully Added Card'
      ) {
        this.setState({loading: false});
        this.props.navigation.navigate('paymentsandPayouts2');
      } else {
        this.setState({
          loading: false,
          errorTitle: 'ERROR',
          errorText: 'Card is inavlid',
          btnOneText: 'Ok',
          popUpError: true,
        });
      }
    });
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          {this.state.popUpError === true && (
            <Modal
              statusBarTranslucent={true}
              isVisible={this.state.popUpError}
              transparent={true}
              presentationStyle={'overFullScreen'}>
              <ErrorPopup
                cancelButtonPress={() => this.setState({popUpError: false})}
                doneButtonPress={() => this.setState({popUpError: false})}
                errorTitle={this.state.errorTitle}
                errorText={this.state.errorText}
                btnOneText={this.state.btnOneText}
              />
            </Modal>
          )}
          <ScrollView>
            {this.state.editType ? (
              <View>
                <HeaderWithOptionBtn
                  headerTitle={'New Payout Method'}
                  backColor={WHITE.dark}
                  borderBottom={true}
                  leftIcon={require('../../assets/back.png')}
                  leftPress={() => this.props.navigation.goBack()}
                />

                <View style={styles.blockView}>
                  <Text style={styles.textView}>Bank Transfer</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({editType: false})}>
                    <Image
                      style={styles.sideImage}
                      source={require('../../assets/listDetail.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{flex: 1}}>
                <HeaderWithOptionBtn
                  headerTitle={'Bank Transfer'}
                  backColor={WHITE.dark}
                  borderBottom={true}
                  leftIcon={require('../../assets/back.png')}
                  leftPress={() => this.setState({editType: true})}
                />
                <View style={styles.blockView2}>
                  <TextInput
                    style={styles.firstInput}
                    placeholder={'Account Holder Name'}
                    onChangeText={value =>
                      this.setState({accountholderName: value})
                    }
                    value={this.state.accountholderName}
                  />
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
                    selectedValue={this.state.AccountType}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({AccountType: itemValue})
                    }
                    items={[{label: 'individual', value: 'individual'}]}
                  
                  />
                </View>

                  {/* <RNPickerSelect
                    Icon={() => {
                      return (
                        <Icon
                          name="arrow-drop-down"
                          size={30}
                          color={'grey'}
                          style={{paddingTop: 35, marginRight: 25}}
                        />
                      );
                    }}
                    style={{
                      inputIOS: {
                        width: SCREEN.width - 40,
                        height: 53,
                        marginTop: 20,
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingLeft: 20,
                        borderColor: 'lightgrey',
                        fontSize: 16,
                        fontFamily: FONT.Nunito.regular,
                        alignSelf: 'center',
                      },
                      inputAndroid: {
                        width: SCREEN.width - 40,
                        height: 53,
                        marginTop: 20,
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingLeft: 20,
                        borderColor: 'lightgrey',
                        fontSize: 16,
                        fontFamily: FONT.Nunito.regular,
                        alignSelf: 'center',
                      },
                    }}
                    placeholder={{
                      label: 'Acount Type',
                    }}
                    selectedValue={this.state.AccountType}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({AccountType: itemValue})
                    }
                    items={[{label: 'individual', value: 'individual'}]}
                  /> */}
                  <View style={styles.shortInputView}>
                    <TextInput
                      style={styles.shortInput}
                      keyboardType="numeric"
                      placeholder={'Transit Number'}
                      maxLength={5}
                      onChangeText={value =>
                        this.setState({Transit_Number: value})
                      }
                      value={this.state.Transit_Number}
                    />

                    <TextInput
                      style={styles.shortInput}
                      keyboardType="numeric"
                      placeholder={'Institute Number'}
                      maxLength={3}
                      onChangeText={value =>
                        this.setState({Institue_number: value})
                      }
                      value={this.state.Institue_number}
                    />
                  </View>
                  <TextInput
                    style={styles.firstInput}
                    placeholder={'Account Number'}
                    maxLength={12}
                    onChangeText={value =>
                      this.setState({Account_Number: value})
                    }
                    value={this.state.Account_Number}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.newPayoutMethod()}
                  style={styles.btn}>
                  <Text style={styles.btntext}>SAVE</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {this.state.popUpError === true && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() => this.setState({popUpError: false})}
              doneButtonPress={() => this.setState({popUpError: false})}
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
export default connect(mapStateToProps, mapDispatchToProps)(NewpayoutMethod);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  blockView: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockView2: {
    marginTop: 30,
    alignItems: 'center',
  },
  textView: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    marginLeft: 20,
    marginVertical: 26,
    color: '#494949',
  },
  sideImage: {
    marginRight: 20,
  },
  TextInputWrapper: {
    justifyContent: 'center',
    width: SCREEN.width - 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  firstInput: {
    width: SCREEN.width - 40,
    height: 53,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: 'lightgrey',
    fontSize: 16,
    fontFamily: FONT.Nunito.regular,
    alignSelf: 'center',
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    marginBottom: 10,
    backgroundColor: 'black',
    borderRadius: 27.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
    fontWeight: 'bold',
  },
  shortInputView: {
    width: SCREEN.width - 40,
    height: 53,
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortInput: {
    width: SCREEN.width * 0.42,
    height: 53,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: 'lightgrey',
  },
});
