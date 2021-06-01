/* eslint-disable no-alert */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import {SCREEN} from '../../helper/Constant';
import {BLACK} from '../../helper/Color';
import {SafeAreaView} from 'react-native';

export default class scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      flash: RNCamera.Constants.FlashMode.off,
      cameraType: 'back',
    };
  }

  onSuccess = e => {
    alert(JSON.stringify(e));
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.SafeView}>
          <QRCodeScanner
            onRead={this.onSuccess}
            containerStyle={styles.ScannerWrapper}
            cameraType={this.state.cameraType}
            reactivateTimeout={2000}
            cameraStyle={styles.ScannerWrapper}
            reactivate={true}
            showMarker={false}
            flashMode={this.state.flash}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK.app,
  },
  SafeView: {
    flex: 1,
  },
  ScannerWrapper: {
    height: SCREEN.height,
    width: SCREEN.width,
  },
  AbsoluteScanner: {
    position: 'absolute',
    justifyContent: 'center',
    height: SCREEN.height,
    width: SCREEN.width,
  },
});
