import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.flex}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.route)} activeOpacity={0.85}>
          <Image source={require('../../assets/back.png')} />
        </TouchableOpacity>
        <Text style={{ paddingTop: 10, fontSize: 16, color: '#8e8e93', fontWeight: 'bold' }}>
          {this.props.headerTitle}
        </Text>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    height: hp('10%'),
    paddingTop:20,
    paddingHorizontal: '5%',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
  }
});
