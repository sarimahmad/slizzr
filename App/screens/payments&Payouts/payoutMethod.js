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
import {FONT, SCREEN} from '../../helper/Constant';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
import {getAllPayoutMethods, makeDefaultPayout} from '../../helper/Api';
import Loader from '../../component/Loader';
import {connect} from 'react-redux';

class payoutMethod extends Component {
  constructor() {
    super();
    this.state = {
      payoutData: [
        //   {id: 1, name: 'TD Bank', card_number: '#********101'},
        //   {id: 2, name: 'Scotia Bank', card_number: '#********101'},
      ],
      loading: false,
      editType: false,
      selectedMethod: 1,
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getPayoutMethods();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async getPayoutMethods() {
    this.setState({loading: true});

    await getAllPayoutMethods(this.props.userToken).then(response => {
      this.setState({payoutData: response});
      this.setState({loading: false});
    });
  }

  makeDeafult = async id => {
    this.setState({loading: true});

    await makeDefaultPayout({
      user_id: this.props.userDetail.id,
      payout_card_id: id,
    }).then(response => {
      this.getPayoutMethods();
    });
  };

  footer = () => {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => this.props.navigation.navigate('NewpayoutMethod')}>
        <Text style={styles.btntext}> ADD NEW PAYOUT METHOD</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            headerTitle={'Payout Methods'}
            backColor={WHITE.dark}
            borderBottom={true}
            leftIcon={require('../../assets/back.png')}
            leftPress={() => this.props.navigation.goBack()}
            rightIconText={this.state.editType === false ? 'EDIT' : 'DONE'}
            rightPress={() => this.setState({editType: !this.state.editType})}
          />
          <FlatList
            data={this.state.payoutData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View>
                <View style={styles.blockView}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {this.state.editType && (
                      <Image
                        style={{width: 23, height: 22, marginLeft: 8}}
                        source={require('../../assets/Slizzer-icon/cross.png')}
                      />
                    )}
                    <View>
                      <Text
                        style={[
                          styles.textView,
                          {
                            color:
                              item.Card.default_for_currency === false
                                ? '#494949'
                                : '#F818D9',
                          },
                        ]}>
                        {item.Card.bank_name}
                      </Text>
                      <Text
                        style={[
                          styles.textView,
                          {
                            fontSize: 12,
                            color:
                              item.Card.default_for_currency === false
                                ? '#494949'
                                : '#F818D9',
                          },
                        ]}>
                        #******{item.Card.last4}
                      </Text>
                    </View>
                    {item.id === this.state.selectedMethod && (
                      <Image
                        style={{marginLeft: 8}}
                        source={require('../../assets/Slizzer-icon/pending.png')}
                      />
                    )}
                  </View>
                  {item.Card.default_for_currency === true ? (
                    <Image
                      style={{marginRight: 5}}
                      source={require('../../assets/Slizzer-icon/default.png')}
                    />
                  ) : (
                    this.state.editType && (
                      <TouchableOpacity
                        onPress={() => this.makeDeafult(item.id)}>
                        <Image
                          style={{marginRight: 5, width: 60, height: 16}}
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
export default connect(mapStateToProps, mapDispatchToProps)(payoutMethod);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  blockView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    height: 80,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    marginLeft: 17,
  },
  btn: {
    width: SCREEN.width - 40,
    height: 55,
    backgroundColor: '#1E1E1E',
    borderRadius: 27.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 34,
  },
  btntext: {
    color: '#FFFFFF',
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    letterSpacing: 0.7,
  },
});
