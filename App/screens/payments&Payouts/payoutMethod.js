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
export default class payoutMethod extends Component {
  constructor() {
    super();
    this.state = {
      payoutData: [
        {id: 1, name: 'TD Bank', card_number: '#********101'},
        {id: 2, name: 'Scotia Bank', card_number: '#********101'},
      ],
      editType: false,
      selectedMethod: 1,
    };
  }
  footer = () => {
    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => this.props.navigation.navigate('newPaymentMethods')}>
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
            rightIcon={require('../../assets/Slizzer-icon/edit.png')}
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
                          {color: item.id !== 1 ? '#494949' : '#F818D9'},
                        ]}>
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          styles.textView,
                          {
                            fontSize: 12,
                            color: item.id !== 1 ? '#494949' : '#F818D9',
                          },
                        ]}>
                        {item.card_number}
                      </Text>
                    </View>
                    {item.id === this.state.selectedMethod && (
                      <Image
                        style={{marginLeft: 8}}
                        source={require('../../assets/Slizzer-icon/pending.png')}
                      />
                    )}
                  </View>
                  {item.id === this.state.selectedMethod ? (
                    <Image
                      style={{marginRight: 5}}
                      source={require('../../assets/Slizzer-icon/default.png')}
                    />
                  ) : (
                    this.state.editType && (
                      <Image
                        style={{marginRight: 5, width: 60, height: 16}}
                        source={require('../../assets/Slizzer-icon/makedefault.png')}
                      />
                    )
                  )}
                </View>
              </View>
            )}
            ListFooterComponent={this.footer}
          />
        </SafeAreaView>
      </View>
    );
  }
}
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
