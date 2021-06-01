import React, {Component} from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';
import {WHITE} from '../../helper/Color';

class splash extends Component {
  state = {};
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('AccountStack');
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
    );
  }
}

export default splash;

const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 70,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE.dark,
  },
});
