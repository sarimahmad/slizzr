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

export default class paymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: [
        {id: 1, name: 'Visa Ending in 1881'},
        {id: 2, name: 'MasterCard Ending in 1881'},
        {id: 3, name: 'American Express Ending in 1881'},
        {id: 4, name: 'Apple Pay'},
      ],
      selectedMethod: 1,
      editType: true,
    };
  }
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
            leftPress={
              () => this.props.navigation.navigate('paymentsandPayouts')
              // this.setState({ editType: !this.state.editType })
            }
            rightIcon={require('../../assets/Slizzer-icon/edit.png')}
            rightPress={() => this.setState({editType: !this.state.editType})}
          />
          {!this.state.paymentMethod.length > 0 ? (
            <FlatList
              data={this.state.paymentMethod}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.blockView}>
                  <View style={styles.directionView}>
                    {this.state.editType ? (
                      <Image
                        source={require('../../assets/Slizzer-icon/visa.png')}
                        style={styles.imageView}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/Slizzer-icon/cross.png')}
                        style={[styles.imageView, {height: 25}]}
                      />
                    )}
                    <Text style={styles.textView}>{item.name}</Text>
                    {item.id === this.state.selectedMethod ? (
                      <View style={styles.imageView2}>
                        <Image
                          style={styles.sideImage}
                          source={require('../../assets/Slizzer-icon/default.png')}
                        />
                      </View>
                    ) : (
                      !this.state.editType && (
                        <View style={styles.imageView2}>
                          <Image
                            style={styles.sideImage}
                            source={require('../../assets/Slizzer-icon/makedefault.png')}
                          />
                        </View>
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
