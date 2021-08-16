import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {BLACK, BLUE, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {width, height} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Loader from '../../component/Loader';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { getAllFriends } from '../../helper/Api';
const KEYS_TO_FILTERS = ['Name'];
import SearchInput, { createFilter } from 'react-native-search-filter';
 class newMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendingEvents: true,
      myevents: false,
      friends:[]
    };
  }
  componentDidMount(){
    this.getAllFriends()
  }
  async getAllFriends() {
    this.setState({loading:true})
    await getAllFriends(this.props.userToken).then(response => {
      console.log("response"+response)
      this.setState({friends: response.Users, loading: false});
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
              You have  no friend at the moment.
            </Text>
          </View>
        
      </View>
    );
  };
  render() {
    const friends = this.state.friends.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
  
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
        
          <HeaderWithOptionBtn
                    
                    borderBottom={true}
                    backColor={WHITE.dark}
                    headerTitle={'New Messages'}
                    leftPress={() =>this.props.navigation.goBack()}
                    leftIcon={require('../../assets/back.png')}
                />   
       
          <View
              style={{
                backgroundColor:BLACK.textInput,
                flexDirection: 'row',
                 marginVertical:5,
                alignItems: 'center',  
                borderRadius:12,
                marginHorizontal:20,
                // height: 36
              }}>
              <Image style={{marginHorizontal:10,height:20,width:20}}
                source={require('../../assets/searchWhite.png')}
               
              />
              <TextInput
                style={styles.inputSearch}
                placeholder={'Search'}
                placeholderTextColor={'#B2ABB1'}
                style={{fontFamily:FONT.Nunito.regular,fontSize:17,color:'#B2ABB1',paddingTop:5}}
                // onChangeText={handleText}
              ></TextInput>
              
            </View>
          <FlatList
            data={friends}
            keyExtractor={item => item.id}
            ListEmptyComponent={this.emptyListComponent}
        
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('chat')}
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgrey',
                  justifyContent: 'center',
                }}>
                <View style={styles.flexRow}>
                  <View style={styles.imgView}>
                    <Image
                      style={{height: 50, width: 50}}
                      source={require('../../assets/profile1.png')}
                    />
                  </View>
                  <View style={styles.detail}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Image
                      style={{height: 26, width: 28,marginLeft:8,resizeMode:'contain'}}
                      source={require('../../assets/newProfile.png')}
                    />
                  </View>
                 
                </View>
              </TouchableOpacity>
            )}
          />
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
export default connect(mapStateToProps, mapDispatchToProps)(newMessage);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor:WHITE.dark
  },
  btnMap: {
    width: wp('90%'),
    alignItems:'center',
    borderRadius: 25,
    height: 50,
    marginBottom:20,
    alignSelf:'center',
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.bold,
  },
  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    borderRadius: 25,
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
    height:80,
    alignItems: 'center',
  },
  detail: {
    flexDirection: 'row',
    width: wp('60%'),
    paddingTop:10
  },
  next: {
    paddingTop: 15,
  },
 
  contentView: {
    flex: 1,
    backgroundColor:WHITE.dark
  },
  imgView: {
    marginHorizontal:20,
   width:50, height:50,
   borderRadius: 25

    },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {},
  titleText: {
    color: BLACK.grey,
    fontFamily: FONT.Nunito.semiBold,
    fontSize: 17,
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.semiBold,
  },
  barChild: {
    borderWidth: 1,
    width: wp('50%'),
    height: 36,
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
  inputSearch:{
    
  }
});
