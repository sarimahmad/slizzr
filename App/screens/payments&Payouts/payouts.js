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
import {GetAllPayoutStatusForEvents} from '../../helper/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default class payouts extends Component {
  constructor() {
    super();
    this.state = {
      payoutData: [],
    };
  }
  componentDidMount() {
    this.getAllPayoutEvents();
  }

  async getAllPayoutEvents() {
    await GetAllPayoutStatusForEvents({
      user_id: (await AsyncStorage.getItem('token')).replace(/['"]+/g, ''),
    }).then(response => {
      console.log(response);
      if (response.UserHostedEvent) {
        this.setState({
          payoutData: response.UserHostedEvent,
        });
      }
    });
  }

  emptyListComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          display: 'flex',
          marginTop: SCREEN.height / 4,
        }}>
        <View>
          <Text style={styles.emptyFont}>
            You are not hosting any events at the moment.
          </Text>
        </View>
      </View>
    );
  };

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
            ListEmptyComponent={this.emptyListComponent}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  style={styles.blockView}
                  onPress={() =>
                    this.props.navigation.navigate('event', {id: item.id})
                  }>
                  <Image
                    style={styles.imageView}
                    source={require('../../assets/Slizzer-icon/pic.png')}
                  />
                  <View style={styles.columnView}>
                    <Text style={styles.txt1}>{item.Name}</Text>
                    <Text style={styles.txt2}>{item.Address}</Text>
                    <Text style={styles.txt3}>
                      {moment(item.Start_date).format(
                        'hh:mm A | MMM DD, YYYY - ddd',
                      )}
                    </Text>
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
