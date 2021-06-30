/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {width} from '../../helper/Constant';
import { getEventDetail } from '../../helper/Api';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import moment from 'moment';
import Loader from '../../component/Loader';
import {connect} from 'react-redux';

 class zicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailItem: {},
      loading: false,
    };
  }
  componentDidMount() {
    let id = this.props.route.params.id;
    if (id) {
      this.getEventDetail(id);
    }
  }
  async getEventDetail(id) {
    this.setState({loading: true});
    await getEventDetail(id).then(response => {
      this.setState({detailItem: response.Event});
      this.setState({loading: false});
    });
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            headerTitle={'zickets'}
            leftPress={() => this.props.navigation.goBack()}
            leftIcon={require('../../assets/back.png')}
          />

          <ScrollView>
            <Image
              source={{uri:this.state.detailItem.image}}
              style={styles.detailImage}
            />

<View style={{alignSelf: 'center',}}>
          <Text style={[styles.titleText,{textAlign:'center'}]}>{this.state.detailItem.Name}</Text>
          <Text style={[styles.text,{textAlign:'center'}]}>{this.state.detailItem.EventType} | $5</Text>
          <Text style={[styles.purpleText,{textAlign:'center'}]}>{moment(this.state.detailItem.DateTime).format('hh:mm A | MMM DD, YYYY - ddd')}11:30 PM | Feb 25, 2020 - WED | 2 HRS</Text>
         
          <Text style={{textAlign:'center',marginVertical:5}}>
              <Text style={[styles.titleText,{fontSize:12}]}>Host:</Text>
              <Text style={styles.purpleText}>{this.state.detailItem.Host && this.state.detailItem.Host.displayName}  </Text>
          </Text>
          </View>
          <View style={{flexDirection:'row',backgroundColor:'rgba(178, 171, 177, 0.246039)',padding:20,margin:20,borderRadius:10}}>
         <Image
                source={require('../../assets/location.png')}
                style={{height:16,width:12,marginRight:5}}
              />
        
         <Text style={{fontSize:12,fontFamily:FONT.Nunito.regular,color:'#494949'}}>1817 18 St. SW Calgary AB T2T 4T2 (Calgary, Alberta)</Text>
            </View>
        <View
              style={{
                borderWidth: 2,
                alignSelf: 'center',
                borderColor: '#F818D9',
                height: 242,
                width: 242,
              }}>
              <Image
                source={require('../../assets/barCode.png')}
                style={{height: 239, width: 239}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              <Text style={styles.titleText}>Host: </Text>
              <Text style={{fontFamily: FONT.Nunito.regular}}>
                {this.state.detailItem.Host && this.state.detailItem.Host.displayName}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text style={styles.titleText}>Attendee: </Text>
              <Text style={{fontFamily: FONT.Nunito.regular}}>{this.props.userDetail && this.props.userDetail.displayName}</Text>
            </View>
            <View style={{alignSelf: 'center', marginTop: 20}}>
              <Image
                source={require('../../assets/appleWallet.png')}
                style={{height: 55, width: 174}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 26,
                
                
                marginBottom: 10,
              
              }}>
              <Image
                source={require('../../assets/invalid.png')}
                // style={{height:55,width:174}}
              />
              <Text
                style={{
                  fontFamily: FONT.Nunito.semiBold,
                  fontSize: 12,
                  color: '#F818D9',
                  textAlign:'left'
                }}>
                {' '}
                #Valid payment method must be set up to ensure entry at door
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
    
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

export default connect(mapStateToProps)(zicketDetail);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  detailImage:{
    width:SCREEN.width-40,
                    alignSelf:'center',
                    marginVertical:20,
                    borderRadius:20,
                    height:110
  },
  
  contentView: {
    flex: 1,
    width: SCREEN.width - 20,
    alignSelf: 'center',
    backgroundColor: WHITE.dark,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },
  btnTextCancel: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    fontFamily: FONT.Nunito.regular,
  },
  cancelButton: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  btnMap: {
    borderRadius: 25,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
    width: SCREEN.width - 40,
    backgroundColor: 'black',
    justifyContent: 'center',
  },

  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    marginTop: hp('5%'),
    height: 50,
    elevation: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  next: {
    paddingTop: 15,
  },
  detail: {
    width: wp('55%'),
  },

  imgView: {
    width: wp('25%'),
  },
  shareView: {
    width: wp('20%'),
    justifyContent: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    color: '#494949',
  },
  logo: {},

  logoEvent: {
    width: width,
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    marginTop: 10,

    fontFamily: FONT.Nunito.semiBold,
  },
  barChild: {
    borderWidth: 1,
    width: wp('50%'),
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
