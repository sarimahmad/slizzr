/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FONT, SCREEN} from '../../helper/Constant';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';

export default class NewpayoutMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMethod: [
        {id: 1, name: 'Address'},
        {id: 1, name: 'Address'},
        {id: 2, name: 'APT, Suite, ETC'},
        {id: 3, name: 'City'},
        {id: 4, name: 'State'},
        {id: 5, name: 'Postal Code'},
      ],
      editType: true,
    };
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          {this.state.editType ? (
            <View>
              <HeaderWithOptionBtn
                headerTitle={'New Payout Method'}
                backColor={WHITE.dark}
                borderBottom={true}
                leftIcon={require('../../assets/back.png')}
                leftPress={() => alert()}
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
                borderBottom={true}
                leftIcon={require('../../assets/back.png')}
                leftPress={() => alert()}
              />
              <View style={styles.blockView2}>
                <FlatList
                  data={this.state.inputMethod}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View style={styles.TextInputWrapper}>
                      <TextInput
                        style={styles.firstInput}
                        placeholder={item.name}
                      />
                    </View>
                  )}
                />
              </View>
              <View style={styles.TextInputWrapper}>
                <TextInput style={styles.firstInput} placeholder="Canada" />
              </View>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btntext}> SEND MESSAGE</Text>
              </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockView2: {
    flexDirection: 'row',
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
});
