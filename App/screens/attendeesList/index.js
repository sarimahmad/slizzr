/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
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
import {BLACK, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { getAttendeesList } from '../../helper/Api';
import Loader from '../../component/Loader';
import {connect} from 'react-redux';

 class attendeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendingEvents: true,
      myevents: false,
      attendeesList:[],
      attendeesCount:0,
      attendeesIdList:[]
    };
  }
  
componentDidMount(){
  let eventId = this.props.route.params.id;
  if(eventId){
    this.getAttendeesList(eventId)
  }
 
}
async getAttendeesList(eventId) {
 let attendeesIdList=[]
 this.setState({loading:true})
  await getAttendeesList(eventId).then((response) => {
    this.setState({ attendeesLIst: response.Attendees }) 
    this.setState({attendeesCount:response.Attendees.length})
    response.Attendees.forEach(element => {
      attendeesIdList.push(element.id)
  });
    this.setState({attendeesIdList:attendeesIdList})
    this.setState({loading:false})
  
  });

}
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <HeaderWithOptionBtn
            borderBottom={true}
            backColor={WHITE.dark}
            headerTitle={'Attendee List'}
            leftPress={() => this.props.navigation.goBack()}
            leftIcon={require('../../assets/back.png')}
          />
          <View style={styles.inputSearch}>
            <Image
              style={{marginHorizontal: 10, marginTop: 10}}
              source={require('../../assets/searchWhite.png')}
            />

            <TextInput
              placeholder={'Search'}
              placeholderTextColor={'#8e8e93'}
              style={{fontSize: 17, fontFamily: FONT.Nunito.regular}}
              // onChangeText={handleText}
            ></TextInput>
          </View>

          <FlatList
            data={this.state.attendeesLIst}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("myProfile",{id:item.User.id})}
                style={{
                  width:SCREEN.width,
                  borderBottomWidth: 1,
                  borderBottomColor: 'lightgrey',
                }}>
                <View style={[styles.flexRow, {height: 70}]}>
                  <View style={{flexDirection: 'row',width:SCREEN.width*0.6,}}>
                    <View style={styles.imgView}>
                      <Image
                        style={{height: 50, width: 50}}
                        source={{uri:item.User.Profile}}
                      />
                    </View>
                    <View
                      style={[
                        styles.detail,
                        {flexDirection: 'row', alignItems: 'center'},
                      ]}>
                      <Text
                        style={[
                          styles.titleText,
                          {fontFamily: FONT.Nunito.semiBold, marginRight: 7},
                        ]}>
                        {item.User && item.User.FirstName}
                      </Text>
                      <Image
                        style={{height: 26, width: 28, resizeMode: 'contain'}}
                        source={require('../../assets/option.png')}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      height: 30,
                      width: 80,
                      borderRadius: 24,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#F818D9',
                    }}>
                    <Text style={{color: 'white'}}>DISINVITE</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('chat',{
              HostUID: this.props.userToken,
              AttendeesList: this.state.attendeesIdList,
              EventID: this.props.route.params.id,
              chatType:"group"
    
            })}
            style={styles.btnMap}>
            <Text style={styles.btnText}>Message all {this.state.attendeesCount} attendees</Text>
          </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(attendeesList);

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,

    backgroundColor: WHITE.dark,
  },
  inputSearch: {
    width: SCREEN.width - 40,
    flexDirection: 'row',
    height: 42,
    borderWidth: 1,
    justifyContent: 'flex-start',
    paddingLeft: 5,
    backgroundColor: BLACK.textInput,

    marginVertical: 10,
    borderRadius: 12,
    borderColor: 'lightgrey',
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
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: WHITE.dark,
    fontFamily: FONT.Nunito.regular,
  },

  btnMap: {
    width: wp('90%'),
    marginHorizontal: '5%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
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
    width: SCREEN.width - 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    width: wp('50%'),
  },
  next: {
    paddingTop: 15,
  },
  imgView: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 20,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {},
  titleText: {
    color: BLACK.textInputTitle,
    fontFamily: FONT.Nunito.bold,
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
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
