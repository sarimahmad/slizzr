/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';

import {FONT, SCREEN} from '../../helper/Constant';
import {BLACK, WHITE} from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithLogo';
import {blockUser, getUserImages} from '../../helper/Api';
import ErrorPopup from '../../component/ErrorPopup';
import firestore from '@react-native-firebase/firestore';
import { sendMutualConnection } from '../../helper/Api';
import Loader from '../../component/Loader';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      imageOfuser: [],
    };
  }
  footer = () => {
    return (
      <TouchableOpacity>
        <Text style={styles.purpleText}>See more</Text>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    if (this.props.route.params.from === 'drawer') {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.setState({userDetail: this.props.userDetail});
        this.getUserImages();
      });
    } else if (this.props.route.params.id) {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getUserFromFirestore(this.props.route.params.id);
        this.getOtherUserImages(this.props.route.params.id);
      });
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  getUserFromFirestore = id => {
    this.setState({loading: true});
    const usersRef = firestore().collection('users');
    usersRef
      .doc(id)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          return;
        } else {
          this.setState({
            loading: false,
            userDetail: firestoreDocument.data(),
          });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          btnOneText: 'Ok',
          errorTitle: 'ERROR',
          errorText: JSON.stringify(error),
          popUpError: true,
        });
      });
  };
  async getOtherUserImages(id) {
    await getUserImages(id).then(response => {
      this.setState({imageOfuser: response.Pictures});
    });
  }
  async getUserImages() {
    await getUserImages(this.props.userToken).then(response => {
      this.setState({imageOfuser: response.Pictures});
    });
  }
rightIconPress=async()=>{
  if(this.props.route.params.from === 'drawer' || (this.props.route.params.id === this.props.userToken) ){
  this.props.navigation.navigate('editProfle', {
    imageOfuser: this.state.imageOfuser,
  })
}else if(this.props.route.params.id !== this.props.userToken){
  data={
    user_id:this.props.userToken,
    friend_user_id:this.props.route.params.id
  }
  this.setState({loading:true})
    await  sendMutualConnection(data).then(response => {
      this.setState({loading:false})
      alert(response.message)
   
 
    this.props.navigation.pop()
    });
  
}
}
blockUser=async()=>{
  data={
    user_id:this.props.userToken,
    mutual_connection_id:this.props.route.params.id
   
  }
  this.setState({loading:true})
  
  await  blockUser(data).then(response => {
    alert(response.message)/
    this.setState({loading:false})
  
    this.props.navigation.pop()
    });
}

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <HeaderWithOptionBtn
            leftIcon={require('../../assets/back.png')}
            leftPress={() => this.props.navigation.pop()}
            rightPress={() =>
             this.rightIconPress()
            }
            borderBottom={true}

            rightIcon={
              this.props.route.params.from === 'drawer' || (this.props.route.params.id === this.props.userToken  )
                ? require('../../assets/edit.png')
                : require('../../assets/Slizzer-icon/group.png')
            }  
          />
          <ScrollView style={styles.wrapperView} bounces={true}>
            <View style={styles.wrapperView2}>
              <View style={{width: SCREEN.width}}>
                <View style={{height: 200, width: SCREEN.width}}>
                  <Image
                    style={{
                      position: 'absolute',
                      left: 0,
                      height: 140,
                      width: 140,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageOfuser.length > 3
                        ? {uri: this.state.imageOfuser[3].Profile_Url}
                        : require('../../assets/plus.png')
                    }
                  />

                  <Image
                    style={{
                      position: 'absolute',
                      left: 30,
                      height: 170,
                      width: 170,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageOfuser.length > 4
                        ? {uri: this.state.imageOfuser[4].Profile_Url}
                        : require('../../assets/plus.png')
                    }
                  />

                  <Image
                    style={{
                      position: 'absolute',
                      right: 0,
                      height: 140,
                      width: 140,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageOfuser.length > 2
                        ? {uri: this.state.imageOfuser[2].Profile_Url}
                        : require('../../assets/plus.png')
                    }
                  />
                  <Image
                    style={{
                      position: 'absolute',
                      right: 30,
                      height: 170,
                      width: 170,
                      borderRadius: 70,
                    }}
                    source={
                      this.state.imageOfuser.length > 1
                        ? {uri: this.state.imageOfuser[1].Profile_Url}
                        : require('../../assets/plus.png')
                    }
                  />

                  <Image
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      height: 200,
                      width: 200,
                      borderRadius: 100,
                    }}
                    source={
                      this.state.imageOfuser.length > 0
                        ? {uri: this.state.imageOfuser[0].Profile_Url}
                        : require('../../assets/plus.png')
                    }
                  />
                </View>
              </View>
              {this.props.userDetail &&
                this.state.userDetail &&
                this.props.userDetail.id !== this.state.userDetail.id && (
                  <View style={styles.messageIcon}>
                    <Image
                      style={{width: 51, resizeMode: 'contain'}}
                      source={require('../../assets/Slizzer-icon/message.png')}
                    />
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        position: 'absolute',
                      }}>
                      <Image
                        source={require('../../assets/Slizzer-icon/insideMessage.png')}
                      />
                    </View>
                  </View>
                )}
              <Text style={styles.text1}>
                {this.state.userDetail && this.state.userDetail.FirstName}
              </Text>
              <Text style={styles.text2}>
                {this.props.userDetail && this.props.userDetail.age
                  ? parseInt(this.props.userDetail.age)
                  : '28'}{' '}
                years,{this.props.userDetail && this.props.userDetail.Gender}
              </Text>
              <View
                style={{flexDirection: 'row', marginBottom: 30, marginTop: 5}}>
                <Image
                  style={{marginRight: 5}}
                  source={require('../../assets/Slizzer-icon/location.png')}
                />
                <Text style={styles.textView1}>
                  {this.props.userDetail && this.props.userDetail.Address
                    ? this.props.userDetail.Address.city
                    : 'Toronto'}
                  ,ON
                </Text>
              </View>
              <Text style={styles.text3}>BIO:</Text>
              <Text style={styles.bio}>
                {this.state.userDetail && this.state.userDetail.bio
                  ? this.state.userDetail.bio
                  : 'Empty Bio'}
              </Text>
              {this.props.userDetail &&
                this.state.userDetail &&
                this.props.userDetail.id !== this.state.userDetail.id && (
                  <View style={{alignSelf: 'flex-start', marginLeft: 40}}>
                    <Text style={[styles.titleText, {marginTop: 10}]}>
                      Mututal Connections
                    </Text>
                    <View
                      style={{height: 50, width: SCREEN.width, marginTop: 11}}>
                      <FlatList
                        data={this.state.image}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate(
                                'mutualConnections',
                              )
                            }
                            style={styles.listView}>
                            <Image
                              style={styles.ImageView}
                              source={item.image}
                            />
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                    {this.footer()}
                  </View>
                )}
              {this.props.route.params.id !== this.props.userToken && (
                <TouchableOpacity onPress={()=>this.blockUser()} style={styles.blockUser}>
                  
                 <Text style={[styles.titleText,{color:'#FF2D55',textDecorationLine:'underline'}]}>BLOCK USER</Text>
                  </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
        {this.state.popUpError && (
          <Modal
            statusBarTranslucent={true}
            isVisible={this.state.popUpError}
            transparent={true}
            presentationStyle={'overFullScreen'}>
            <ErrorPopup
              cancelButtonPress={() =>
                this.setState({
                  popUpError: false,
                  btnOneText: this.state.btnOneText,
                  errorTitle: this.state.titleText,
                  errorText: this.state.errorText,
                })
              }
              doneButtonPress={() => this.doneClick()}
              errorTitle={this.state.errorTitle}
              errorText={this.state.errorText}
              btnOneText={this.state.btnOneText}
              btnTwoText={this.state.btnTwoText}
            />
          </Modal>
        )}
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

const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, uid) => dispatch(userActions.alterUser({user, uid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  wrapperView2: {
    flex: 1,
    alignItems: 'center',
  },
  imageBlock: {
    height: SCREEN.height * 0.4,
    // width: 100,
  },
  messageIcon: {
    height: 51,
    width: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
  },
  text1: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    color: BLACK.grey,
    marginTop: 10,
  },
  text2: {
    marginTop: 5,
    fontFamily: FONT.Nunito.bold,
    fontSize: 12,
    color: BLACK.textColor2,
  },
  text3: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    color: BLACK.textColor,
    marginBottom: 5,
  },
  bio: {
    fontFamily: FONT.Nunito.regular,
    fontSize: 12,
    color: BLACK.textColor,
    textAlign: 'center',
    width: SCREEN.width - 80,
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
    marginTop: 10,
  },
  listView: {
    marginRight: 11,
  },
  ImageView: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  blockUser: {
    fontFamily: FONT.Nunito.bold,
    fontSize: 14,
    color: '#FF2D55',
    letterSpacing: 0.7,
    marginTop: 40,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});
