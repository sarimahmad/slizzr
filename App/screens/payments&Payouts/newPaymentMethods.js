/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FONT} from '../../helper/Constant';
import {connect} from 'react-redux';
import {CreditCardInput} from 'react-native-credit-card-input';
import {newPaymentMethod} from '../../helper/Api';

import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
import {Modal} from 'react-native';
import Loader from '../../component/Loader';

class newPaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: [
        {id: 1, name: 'Apple Pay'},
        {id: 2, name: 'Google Pay'},
        {id: 3, name: 'Credit Card'},
      ],
      prepayModal: false,
    };
  }

  async addPaymenmtMethod() {
    let exp_month = this.state.exp_year.substring(0, 2);
    let exp_year = this.state.exp_year.substring(3, 5);
    console.log(exp_year, exp_month);
    if (this.state.formValid === false) {
      alert('Invalid Form');
    } else {
      this.setState({loading: true});
      this.setState({prepayModal: false});
      const data = {
        number: this.state.number,
        exp_month: parseInt(exp_month),
        exp_year: parseInt(exp_year),
        cvc: this.state.cvc,
        cust_id: this.props.userDetail.STRIPE_CUST_ID,
        user_id: this.props.userDetail.id,
      };
      await newPaymentMethod(data).then(response => {
        this.setState({loading: false});
        this.props.navigation.pop();
      });
    }
  }

  _onChange = form => {
    this.setState({cvc: form.values.cvc});
    this.setState({exp_month: form.values.expiry});
    this.setState({exp_year: form.values.expiry});

    this.setState({number: form.values.number});
    if (form.valid === true) {
      this.setState({formValid: true});
    }
  };

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            headerTitle={'New Payment Method'}
            leftIcon={require('../../assets/back.png')}
            leftPress={() =>
              this.props.navigation.navigate('paymentsandPayouts')
            }
            borderBottom={true}
            backColor={WHITE.dark}
          />
          <FlatList
            data={this.state.paymentMethod}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.blockView}>
                <Text style={styles.textView}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (item.id === 3) {
                      this.setState({prepayModal: true});
                    } else {
                      this.props.navigation.navigate('paymentsandPayouts3');
                    }
                  }}>
                  <Image
                    style={styles.sideImage}
                    source={require('../../assets/listDetail.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {this.state.prepayModal === true && (
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.prepayModal}
              onRequestClose={() => {
                this.setState({prepayModal: !this.state.prepayModal});
              }}>
              <SafeAreaView style={{marginTop: 50}}>
                <HeaderWithOptionBtn
                  headerTitle={'New Payment Method'}
                  leftIcon={require('../../assets/back.png')}
                  leftPress={() => this.props.navigation.pop()}
                  borderBottom={true}
                  backColor={WHITE.dark}
                />
                <CreditCardInput onChange={this._onChange} />
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() => this.addPaymenmtMethod()}
                    style={[
                      styles.btnPay,
                      {alignSelf: 'center', marginBottom: 100},
                    ]}>
                    <Text
                      style={[
                        {
                          fontSize: 14,
                          fontFamily: FONT.Nunito.bold,
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        },
                      ]}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </Modal>
          )}
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
export default connect(mapStateToProps, mapDispatchToProps)(newPaymentMethods);
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  blockView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    height: 80,
    alignItems: 'center',
  },
  btnPay: {
    // marginHorizontal: '10%',
    borderRadius: 25,
    marginTop: 30,
    alignItems: 'center',
    height: 56,
    width: 92,
    elevation: 1,
    justifyContent: 'center',
    backgroundColor: '#1FB438',
    bottom: 10,
  },
  textView: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    color: '#494949',
    marginLeft: 20,
  },
  sideImage: {
    marginRight: 20,
  },
});
