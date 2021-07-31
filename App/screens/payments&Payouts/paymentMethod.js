/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {FONT, SCREEN} from '../../helper/Constant';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {
  getAllPaymentMethods,
  makeDefaultPayment,
  removePaymentMethod,
} from '../../helper/Api';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
import Loader from '../../component/Loader';

class paymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: [],
      selectedMethod: 1,
      editType: true,
      loading: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getPaymentMethods();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async getPaymentMethods() {
    this.setState({loading: true});

    await getAllPaymentMethods(this.props.userToken).then(response => {
      this.setState({paymentMethod: response, editType: true});
      this.setState({loading: false});
    });
  }

  makeDeafult = async id => {
    this.setState({loading: true});

    await makeDefaultPayment({
      user_id: this.props.userDetail.id,
      payment_card_id: id,
    }).then(response => {
      this.getPaymentMethods();
    });
  };
  removePaymentMethod = async payment_card_id => {
    this.setState({loading: true});
    let data = {
      user_id: this.props.userToken,
      payment_card_id: payment_card_id,
    };
    await removePaymentMethod(data).then(response => {
      if (response.status === 200) {
        this.getPaymentMethods();
      } else {
        this.setState({
          loading: false,
          errorTitle: 'ERROR',
          errorText: JSON.stringify(response),
          btnOneText: 'Ok',
          popUpError: true,
        });
      }
    });
  };
  footer = () => {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => this.props.navigation.navigate('newPaymentMethods')}>
        <Text style={styles.btntext}> ADD NEW PAYMENT METHOD</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            headerTitle={'Payment Methods'}
            borderBottom={!this.state.paymentMethod.length > 0 ? true : false}
            leftIcon={require('../../assets/back.png')}
            backColor={WHITE.dark}
            leftPress={() =>
              this.props.navigation.navigate('paymentsandPayouts')
            }
            rightIconText={this.state.editType === true ? 'EDIT' : 'DONE'}
            rightPress={() => this.setState({editType: !this.state.editType})}
          />
          {this.state.paymentMethod.length > 0 ? (
            <FlatList
              data={this.state.paymentMethod}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.blockView}>
                  <View style={styles.directionView}>
                    {item.default === true || this.state.editType ? (
                      <Image
                        source={require('../../assets/Slizzer-icon/visa.png')}
                        style={styles.imageView}
                      />
                    ) : (
                      !this.state.editType && (
                        <TouchableOpacity
                          onPress={() => this.removePaymentMethod(item.id)}>
                          <Image
                            source={require('../../assets/Slizzer-icon/cross.png')}
                            style={[styles.imageView, {height: 25}]}
                          />
                        </TouchableOpacity>
                      )
                    )}
                    <Text
                      style={[
                        styles.textView,
                        {color: item.default === true ? '#F818D9' : '#000'},
                      ]}>
                      Ending in {item.Card && item.Card.last4}
                    </Text>
                    {item.default === true ? (
                      <View style={styles.imageView2}>
                        <Image
                          style={styles.sideImage}
                          source={require('../../assets/Slizzer-icon/default.png')}
                        />
                      </View>
                    ) : (
                      !this.state.editType && (
                        <TouchableOpacity
                          style={styles.imageView2}
                          onPress={() => this.makeDeafult(item.id)}>
                          <Image
                            style={styles.sideImage}
                            source={require('../../assets/Slizzer-icon/makedefault.png')}
                          />
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </View>
              )}
              ListFooterComponent={this.footer}
            />
          ) : (
            <View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'lightgrey',
                }}>
                <Text style={styles.headerText}>No Payment Method</Text>
              </View>
              <View>{this.footer()}</View>
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(paymentMethod);
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  blockView: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
  },
  directionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    width: 33,
    height: 22,
    marginRight: 8,
    marginLeft: 7,
    resizeMode: 'contain',
  },
  textView: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 16,
    color: '#F818D9',
  },
  imageView2: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 13,
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    backgroundColor: '#1E1E1E',
    borderRadius: 27.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
  },
  sideImage: {
    width: 60,
    height: 16,
  },
  headerText: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 17,
    marginLeft: 20,
    marginTop: 20,
    color: '#494949',
    marginBottom: 26,
  },
});
