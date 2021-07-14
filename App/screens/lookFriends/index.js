import React, { Component } from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    Image,
    ScrollView,
  } from 'react-native';
  import {BLACK, BLUE, WHITE} from '../../helper/Color';
  import {FONT, SCREEN} from '../../helper/Constant';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
  import { getAllFriends } from '../../helper/Api';
  import {connect} from 'react-redux';
  import Loader from '../../component/Loader';
 class lookFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
        findpeople: [
            {
              imgProfile:'',  
              profileName: 'Marriage Anniversary',
              adress: '3 Mutal Connections',
            
            },
            {
                imgProfile:'',
              profileName: 'Celebration Time',
              adress: '3 Mutal Connections',
          
            },
            {
                imgProfile:'',
              profileName: 'Sagar’s Birthday',
              adress: '3 Mutal Connections',
        
            },
            {
                imgProfile:'',
              profileName: 'GMU Party',
              adress: 'Host: Jaclynn Bradley',
         
            },
        ]
    };
  }

  async getAllFriends() {
    this.setState({loading:true})
    await getAllFriends(this.props.userToken).then(response => {
      console.log("response"+response)
      this.setState({findpeople: response.Users, loading: false});
    });
    
  }
  componentDidMount(){
    this.getAllFriends()
  }
  render() {
    return (
        <View style={styles.wrapperView}>
   <SafeAreaView style={styles.contentView}>
       
     <HeaderWithOptionBtn
                    
                    borderBottom={true}
                    backColor={WHITE.dark}
                    headerTitle={'Look for Friends'}
                    leftPress={() => this.props.navigation.goBack()}
                    leftIcon={require('../../assets/back.png')}
                />   
       

       

       <View style={styles.searchBar}>
       <TouchableOpacity onPress={()=>this.props.navigation.navigate('lookFriends')}
              style={[
                styles.logo,
                {
                  marginRight: 5,
                  padding: 10,
                  borderRadius: 24,
                 
                },
              ]}>
              <Image source={require('../../assets/searchBlack.png')} />
            </TouchableOpacity>
  <TextInput style={{color:'grey',fontFamily:FONT.Nunito.regular}} placeholderTextColor='grey' placeholder={'Search'}/>
      </View>
      <FlatList
          
          data={this.state.findpeople}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("myProfile",{id:item.Friend.id})} >
            <View style={styles.flexRow}>
              <View style={styles.imgView}>
                <Image source={require('../../assets/lookFriend1.png')} />
              
              </View>
              <View style={styles.detail}>
                <Text style={styles.titleText}>{item.Friend && item.Friend.displayName}</Text>
                <Text style={styles.subtitleText}>Adress empty</Text>
              
              </View>
             
            </View>
           <View style={{hiehgt:1,borderBottomWidth:1,borderBottomColor:'lightgrey',width:SCREEN.width}}></View>
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
export default connect(mapStateToProps, mapDispatchToProps)(lookFriends);
const styles = StyleSheet.create({
    ageView:{
    flexDirection:'row',
    marginTop:10,
    alignItems: 'center',
    marginHorizontal:20
    },
     btnLocation: {
         // width: wp('0%'),
         marginHorizontal: 20,
         borderRadius: 25,
         marginVertical:20,
         marginBottom: 25,
         height: 50,
         backgroundColor:'black',
         elevation: 1,
         justifyContent:'center',
          
         borderWidth: 1,
         borderRadius: 24,
         borderColor: BLACK.light,   
         bottom: 10,
       },
     topView:{
      height:100
     },
     bottomView:{
     height:312,
     paddingHorizontal:20,
     marginTop:50
      
     },
     cardView:{
     marginHorizontal:10,
     borderRadius:20,
     height:412,
     marginTop:20,
     elevation:6
 
     // backgroundColor:'green'
     },
     detailView:{
    
     },
     searchBar:{
      backgroundColor:BLACK.textInput,
      height:40,
      width:SCREEN.width-40,
      marginHorizontal:20,
      marginVertical:10,
      borderRadius:10,
      flexDirection:'row',
           },
     flexRow: {
       flexDirection: 'row',
       paddingVertical: 10,
       paddingHorizontal:10,
       
     },
     detail: {
       width: wp('55%'),
     },
     next: {
       paddingTop: 15,
     },
     imgView: {
       width: wp('20%'),
     },
     inputSearch: {
       width: wp('90%'),
       marginHorizontal: '5%',
       borderWidth: 1,
       backgroundColor: 'white',
       paddingLeft: 40,
       marginVertical: 10,
       borderRadius: 24,
       borderColor: 'lightgrey',
       shadowColor: 'black',
       shadowOffset: {width: 0, height: 2},
       shadowRadius: 6,
       shadowOpacity: 0.1,
       elevation: 2,
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
       color: 'white',
       textAlign: 'center',
       color: 'white',
       fontFamily: FONT.Nunito.regular,
     },
     btnTextLocation: {
       fontSize: 16,
       color:'white',
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
      
   
    //    alignSelf: 'center',
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
       marginTop:12
     },
     purpleText: {
       fontSize: 12,
       color: '#F818D9',
       marginTop:10,
       textDecorationLine:'underline',
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
      width: SCREEN.width,
    },
   policyText: {
       alignSelf: 'center',
       marginTop: '2%',
       color: BLACK.appDark,
       fontFamily: FONT.Nunito.regular,
     },
   });