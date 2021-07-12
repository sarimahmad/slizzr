/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import axios from 'axios';
import Server from '../../helper/Server';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TextInput
} from 'react-native';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { findPeoplebyDistance  } from '../../helper/Api';
import {connect} from 'react-redux';
import Loader from '../../component/Loader';
class peopleProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPeople: false,
      loading:false,
      min_age:0,
      max_age:20,
      findpeople: [
      ],
      image: [
        {id: 1, image: require('../../assets/profile2.png')},
        {id: 2, image: require('../../assets/profile2.png')},
        {id: 3, image: require('../../assets/profile2.png')},
        {id: 4, image: require('../../assets/profile2.png')},
        {id: 5, image: require('../../assets/profile2.png')},
        {id: 4, image: require('../../assets/profile2.png')},
        {id: 5, image: require('../../assets/profile2.png')},
        {id: 4, image: require('../../assets/profile2.png')},
        {id: 5, image: require('../../assets/profile2.png')},
      ],
    };
  }
  componentDidMount(){
    this.findPeoplebyDistance()
  }
  async findPeoplebyDistance() {
    this.setState({loading:true})
    await findPeoplebyDistance(this.state.min_age,this.state.max_age,this.props.userToken).then(response => {
      console.log("response"+response)
      this.setState({findpeople: response.Users, loading: false});
    });
    
  }
  handleSubmit=(type,value)=>{
    if(type=="max_age"){
      this.setState({max_age:value})
      this.findPeoplebyDistance()
    }else if(type=="min_age"){
      this.setState({min_age:value})
      this.findPeoplebyDistance()
    }
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            leftPress={() => this.props.navigation.pop()}
            leftIcon={require('../../assets/back.png')}
            rightPress={() => this.props.navigation.navigate('lookFriends')}
            searchIcon={require('../../assets/searchGrey.png')}
            centerIcon={require('../../assets/homeLogo.png')}
          />

          <ScrollView>
            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate('lookFriends')}
              style={styles.inputSearch}>
              <Text style={[styles.titleText, {fontSize: 11,marginTop:0}]}>
                FINDING PEOPLE FOR MY PARTY
              </Text>
            </TouchableOpacity>

            <View style={styles.ageView}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#F818D9',
                  fontFamily: FONT.Nunito.bold,
                  paddingRight: 5,
                }}>
                Age:
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: FONT.Nunito.regular,
                  paddingRight: 5,
                }}>
                Min:
              </Text>

              <TextInput
                  style={styles.box}
                    value={this.state.min_age}
                    onSubmitEditing={value => this.findPeoplebyDistance()}
                    onChangeText={value => this.setState({min_age:value})}
                    placeholder="0"
                    keyboardType="number-pad"
                    placeholderTextColor={'#B2ABB1'}
                  />
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: FONT.Nunito.regular,
                  paddingLeft: 15,
                  paddingRight: 5,
                }}>
                Max :
              </Text>
              <TextInput
                  style={styles.box}
                    value={this.state.max_age}
                    onSubmitEditing={value => this.findPeoplebyDistance()}
                    onChangeText={value => this.setState({max_age:value})}
                  placeholder="0"
                    keyboardType="number-pad"
                    placeholderTextColor={'#B2ABB1'}
                  />
              </View>

            <FlatList
              data={this.state.findpeople}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.cardView}>
                  <View style={styles.topView}>
                    <Image
                      source={require('../../assets/cardTopView.png')}
                      style={{
                        alignSelf: 'center',
                        width: SCREEN.width - 40,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                  </View>

                  <View style={styles.bottomView}>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={styles.titleText}>{item.displayName}</Text>
                      <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Image
                          source={require('../../assets/location.png')}
                          style={{marginHorizontal: 5}}
                        />
                        <Text>12 KM away</Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.titleText,
                        {alignItems: 'flex-start', marginTop: 10},
                      ]}>
                      Mutual Connections
                    </Text>

                    <View style={{marginTop: 10}}>
                      <FlatList
                        data={this.state.image}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <View>
                            <Image
                              style={{height: 50, width: 50}}
                              source={item.image}
                            />
                          </View>
                        )}
                      />
                    </View>
                    <Text style={[styles.purpleText, {marginTop: 10}]}>
                      See more
                    </Text>
                    <TouchableOpacity style={styles.btnLocation}>
                      <Text style={styles.btnTextLocation}>DIRECT INVITE</Text>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{uri:item.image}}
                    style={{position: 'absolute', alignSelf: 'center', top: 40}}
                  />
                </View>
              )}
            />
          </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
  
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(peopleProfiles);

const styles = StyleSheet.create({
  ageView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  box: {
    borderWidth: 1,
    borderRadius: 5,
    height:50,
    width:50,
    paddingLeft:20,
    borderColor: 'lightgrey',
    elevation: 2,
  },
  btnLocation: {
    // width: wp('0%'),
    marginHorizontal: 20,
    marginVertical: 20,
    marginTop: 20,
    marginBottom: 25,
    height: 50,
    backgroundColor: 'black',
    elevation: 1,
    justifyContent: 'center',

    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
  },
  topView: {
    height: 100,
  },
  bottomView: {
    height: 312,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  cardView: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.6,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 412,
    marginVertical: 10,
    alignSelf: 'center',
    width: SCREEN.width - 40,
    elevation: 6,

    // backgroundColor:'green'
  },
  detailView: {},
  searchBar: {
    borderWidth: 1,
    borderColor: 'grey',
    height: 40,
    elevation: 4,
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      //    height: 1,
      //    width: 1
    },
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  detail: {
    width: wp('55%'),
  },
  next: {
    paddingTop: 15,
  },
  imgView: {
    width: wp('25%'),
  },
  inputSearch: {
    width: SCREEN.width,
    height: 42,
    borderWidth: 1,
    paddingLeft: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  input: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderWidth: 1,
    height: hp('7%'),
    marginVertical: 10,
    borderRadius: 12,
    borderColor: 'lightgrey',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  btnMap: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  logoSearch: {
    position: 'absolute',
    left: 30,
    top: 25,
  },

  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
  },
  barChild: {
    borderWidth: 1,
    width: wp('20%'),
    height: hp('6%'),
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
  },
  subtitleText: {
    fontSize: 12,

    fontFamily: FONT.Nunito.semiBold,
  },
  logo: {
    //   height: 80,
    //   width: 100,
    //   resizeMode: 'contain',
    marginTop: 25,

    alignSelf: 'center',
  },
  logoAdd: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginTop: '10%',
  },
  logoAddCalender: {
    position: 'absolute',
    right: 5,
    top: 13,
    // alignSelf:'flex-end',
    // marginRight:'5%',
  },

  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
    marginTop: 12,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',

    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
  },
  detailWrapper: {
    alignSelf: 'center',
  },
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  contentView: {
    flex: 1,
    backgroundColor: WHITE.dark,
  },
  policyText: {
    alignSelf: 'center',
    marginTop: '2%',
    color: BLACK.appDark,
    fontFamily: FONT.Nunito.regular,
  },
});
