import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BLACK } from '../../helper/Color';
import { FONT } from '../../helper/Constant';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.flex}>
        <TouchableOpacity 
        onPress={this.props.leftBtnPress} 
        activeOpacity={0.85} style={{position: 'absolute', left: 20, justifyContent: 'center', alignItems: 'center', height: 40, width: 40,}}>
          <Image source={require('../../assets/back.png')} style={{height: 40, width: 40,  justifyContent:'center'}} />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, textAlign:'center',fontFamily: FONT.Nunito.bold }}>
          {this.props.headerTitle}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    alignItems:'center',
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: BLACK.border,
    justifyContent: 'center',
  }
});
