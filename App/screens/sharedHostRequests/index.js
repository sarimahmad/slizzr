/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import {connect} from 'react-redux';
import {getAllSharedRequests,approveSharedHostRequest,removeSharedHostRequest} from '../../helper/Api';
import Loader from '../../component/Loader';

class sharedHostRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendingEvents: true,
      myevents: false,
      userSharedRequests:[] ,
      loading:false
    };
  }
  componentDidMount(){
    this.getAllSharedRequests()
  }
  async getAllSharedRequests() {
    this.setState({loading:true})
    await getAllSharedRequests(this.props.userToken).then(response => {
      this.setState({loading:false})
      this.setState({userSharedRequests: response.data.SharedhostRequest});
    });
  }



  approveSharedHostRequest=async(id)=>{
    this.setState({loading:true})
    await approveSharedHostRequest(id).then(response=>{
      if(response.status === 200){
        this.setState({loading:false})
     
        Alert.alert(
          "Successfull",
          response.data.message,
          [
           
            { text: "OK", onPress: () =>  this.getAllSharedRequests()}
          ])
       }else{
        this.setState({loading:false})
     
        alert("Failed")
      }
    })
    }
    removeSharedHostRequest=async(id)=>{
      this.setState({loading:true})
  
      await removeSharedHostRequest(id).then(response=>{
        if(response.status === 200){
          this.setState({loading:false})
          Alert.alert(
            "Successfull",
            response.data.message,
            [
             
              { text: "OK", onPress: () =>  this.getAllSharedRequests()}
            ])
          }else{
            this.setState({loading:false})
     
            alert("Failed")
          }
          this.setState({loading:false})
     
      })
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
                  You have no notification at the moment.
                </Text>
               
              </View>
         
           </View>
        );
      };
     
  render() {
    return (
      <View style={styles.wrapperView}>
        {/* <View style={[styles.flex, {padding: 20, alignItems: 'center',marginTop:20 }]}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("manageEvent")}>
              <Image
                source={require('../../assets/back.png')}
                style={styles.logo}
              />
            </TouchableOpacity>

            <Text style={styles.titleText}>Shared Host Requests</Text>
            <View></View>
          </View> */}

        <SafeAreaView style={styles.contentView}>
        <HeaderWithOptionBtn
          borderBottom={true}
          backColor={WHITE.dark}
          headerTitle={'Shared Host Requests'}
          leftPress={() => this.props.navigation.goBack()}
          leftIcon={require('../../assets/back.png')}
        />
       <FlatList
       data={this.state.userSharedRequests}
       keyExtractor={item => item.id}
       ListEmptyComponent={this.emptyListComponent}
            
       renderItem={({item}) => (
         <View
           style={{
             width:SCREEN.width,
             borderBottomWidth: 1,
             borderBottomColor: 'lightgrey',
           }}>
           
           <View style={styles.flexRow}>
           <View style={styles.flexRow}>
                    <View style={styles.imgView}>
                      <Image
                        source={{uri: item.Event.image}}
                        style={{borderRadius: 44, height: 60, width: 60}}
                      />
   {item.Event.PublicPrivate==="Private" &&
                    
                      <Image
                        style={{position: 'absolute', right: -10}}
                        source={require('../../assets/private.png')}
                      />
                }
                    </View>

                    <View style={styles.detail}>
                      <Text style={styles.titleText}>{item.Event.Name}</Text>
                      <Text style={styles.subtitleText}>
                        Host: {item.Event.Host.displayName}
                      </Text>
                      <Text style={[styles.purpleText, {marginTop: 5}]}>
                        {item.Event.DateTime}
                      </Text>
                    </View>
                    <View>
               <TouchableOpacity
                 onPress={() =>this.approveSharedHostRequest(item.SharedHostID)
                 }
                 style={{
                   marginBottom: 5,
                   marginRight: 5,
                   height: 30,
                   width: 30,
                   borderRadius: 24,
                   backgroundColor: '#4CD964',
                   alignItems: 'center',
                   justifyContent: 'center',
                 }}>
                 <Image source={require('../../assets/check.png')} />
               </TouchableOpacity>
               <TouchableOpacity
                 onPress={() =>
                  this.removeSharedHostRequest(item.SharedHostID) 
                }
               style={{
                   marginRight: 5,
                   height: 30,
                   width: 30,
                   borderRadius: 24,
                   backgroundColor: '#FF3B30',
                   alignItems: 'center',
                   justifyContent: 'center',
                 }}>
                 <Image source={require('../../assets/closeIcon.png')} />
               </TouchableOpacity>
             </View>
        </View>
           </View>
         </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(sharedHostRequests);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  emptyFont: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal:20,
    color: '#494949',
    fontFamily: FONT.Nunito.regular,
    marginBottom: 20,
  },
  contentView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    // width: SCREEN.width - 40,
    backgroundColor: WHITE.dark,
  },
  btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,
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
    width:SCREEN.width- 40,
    alignSelf: 'center', height:80,
    alignItems:'center',
    justifyContent:'space-between'

  },

  imgView: {
    width:50,
   height: 50,
   borderRadius:25,

    marginRight:20

  },
  shareView: {
    width: wp('20%'),
    justifyContent: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {},
  titleText: {
    color: BLACK.grey,
    fontFamily: FONT.Nunito.bold,
    fontSize: 17,
  },
  subtitleText:{
    color: BLACK.grey,
    fontFamily: FONT.Nunito.regular,
    fontSize: 12,

  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',
    textDecorationLine: 'underline',
    fontFamily: FONT.Nunito.bold,
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
