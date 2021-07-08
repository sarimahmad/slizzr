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
import {FONT} from '../../helper/Constant';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {SafeAreaView} from 'react-navigation';
import {WHITE} from '../../helper/Color';
export default class payouts extends Component {
  constructor() {
    super();
    this.state = {
      payoutData: [
        {
          id: 1,
          text1: 'Clapping Banger',
          text2: 'Niagra Falls, ON',
          text3: '11:30 PM | Feb 25, 2020 - WED',
          btn: require('../../assets/Slizzer-icon/atdoor.png'),
        },
        {
          id: 2,
          text1: 'Uroojs Banger',
          text2: 'Niagra Falls, ON',
          text3: '11:30 PM | Feb 25, 2020 - WED',
          btn: require('../../assets/Slizzer-icon/prepaid.png'),
        },
      ],
    };
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            headerTitle={'Payouts'}
            borderBottom={true}
            leftIcon={require('../../assets/back.png')}
            backColor={WHITE.dark}
            leftPress={() =>
              this.props.navigation.navigate('paymentsandPayouts')
            }
          />
          <FlatList
            data={this.state.payoutData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  style={styles.blockView}
                  onPress={() => this.props.navigation.navigate('event')}>
                  <Image
                    style={styles.imageView}
                    source={require('../../assets/Slizzer-icon/pic.png')}
                  />
                  <View style={styles.columnView}>
                    <Text style={styles.txt1}>{item.text1}</Text>
                    <Text style={styles.txt2}>{item.text2}</Text>
                    <Text style={styles.txt3}>{item.text3}</Text>
                    <Image style={{marginTop: 5}} source={item.btn} />
                  </View>
                  <View style={styles.imageView2}>
                    <Image
                      style={{marginRight: 20}}
                      source={require('../../assets/listDetail.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
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
    height: 101,
    alignItems: 'center',
  },
  imageView: {
    marginLeft: 5,
  },
  imageView2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  columnView: {
    justifyContent: 'center',
  },
  txt1: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    color: '#494949',
  },
  txt2: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 12,
    color: '#494949',
  },
  txt3: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 12,
    color: '#F818D9',
    textTransform: 'uppercase',
  },
});
