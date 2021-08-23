/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableHighlight, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import {FONT, SCREEN} from '../../helper/Constant';
import {APPCOLOR, BLACK, WHITE} from '../../helper/Color';
import {SafeAreaView} from 'react-native';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {ScanZicket, payAndJoin} from '../../helper/Api';
export default class scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      flash: RNCamera.Constants.FlashMode.off,
      cameraType: 'back',
      item: '',
      responseMessage:'',
      success:'',
    };
  }
  componentDidMount() {
    let item = this.props.route.params.item;
    this.setState({item: item});
  }
  onSuccess = async e => {
    this.setState({success:true})
    let userId = e.data.split('_')[0].trim();
    let eventId = e.data.split('_')[1].trim();

    console.log(userId);
    if (this.state.item === 'PREPAID' || this.state.item === 'FREE') {
      await ScanZicket(eventId,e.data).then(response => {
      if(response.Success === false){
       this.setState({success:false,responseMessage:response.Message})
      
      }else if(response.Success === true){
        this.setState({success:true,responseMessage:response.Message})
        
      }
      });
    } else if (this.state.item === 'SCAN-&-PAY AT DOOR') {
      data = {
        user_id: userId,
        event_id: eventId,
      };
      await payAndJoin(data).then(async response => {
        if (response === 'success') {
          await ScanZicket(eventId).then(response => {
            if(response.status === 200){
              this.setState({success:false})
            
            console.log(response);
            }
          });
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderWithOptionBtn
          leftPress={() => this.props.navigation.pop()}
          leftIcon={require('../../assets/back.png')}
        />
        <SafeAreaView style={styles.SafeView}>
          <QRCodeScanner
            onRead={this.onSuccess}
            containerStyle={{height: SCREEN.height, width: SCREEN.width}}
            cameraType={this.state.cameraType}
            reactivateTimeout={2000}
            cameraStyle={{height: SCREEN.height, width: SCREEN.width}}
            reactivate={true}
            showMarker={false}
            flashMode={this.state.flash}
          />
          <View style={styles.AbsoluteScanner}>
            <View style={styles.IconWrapper}>
              <Image
                style={[
                  styles.IconWrapper,
                  {position: 'absolute', marginBottom: 0},
                ]}
                source={require('../../assets/icon_oval.png')}
              />
              <Image
                style={[styles.IconInnerImg]}
                source={require('../../assets/logo.png')}
              />
            </View>
            <View style={styles.ScanerFocus}>
              <Image
                style={[styles.ScanerFocus, {position: 'absolute'}]}
                source={require('../../assets/scanner_focus.png')}
              />
             {this.state.success===false  &&
             <View style={{alignItems:'center',justifyContent: 'center',}}>
              <Image
                style={styles.resultIcon}
                source={require('../../assets/redBlock.png')}
              />
              <Text style={styles.resultText}>
             {this.state.responseMessage}
              </Text>
              </View>
  }
      {this.state.success===true  &&
         
            <View style={{alignItems:'center',justifyContent: 'center',}}>
            <Image
              style={styles.resultIcon}
              source={require('../../assets/checked.png')}
            />
            <Text style={styles.resultText}>
           {this.state.responseMessage}
            </Text>
            </View>
           
            }
            </View>
            <TouchableHighlight onPress={()=>this.props.navigation.pop()} style={styles.ScanBtn}>
              <Text style={styles.BtnText}>BACK TO SCANNER</Text>
            </TouchableHighlight>
            <Text style={styles.DoneText}>Done</Text>
          </View>
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
    backgroundColor: BLACK.dark,
  },
  ScannerWrapper: {
    height: SCREEN.height,
    width: SCREEN.width,
  },
  AbsoluteScanner: {
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    width: SCREEN.width,
  },
  IconWrapper: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
    marginBottom: 20,
  },
  IconInnerImg: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  ScanerFocus: {
    height: SCREEN.width - 20,
    width: SCREEN.width - 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScanBtn: {
    height: 55,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27.5,
    backgroundColor: APPCOLOR.text,
  },
  BtnText: {
    fontSize: 14,
    color: WHITE.app,
    fontFamily: FONT.Nunito.bold,
  },
  resultIcon: {
    height: 168,
    width: 168,
    resizeMode: 'contain',
  },
  resultText: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 30,
    color: WHITE.dark,
    marginTop: 20,
    textAlign: 'center',
  },
  DoneText: {
    marginTop: 30,
    color: APPCOLOR.text,
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.regular,
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
