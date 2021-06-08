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
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
export default class newMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendingEvents: true,
      myevents: false,

      messages: [
        {
          imgProfile: '',
          message: 'Marriage Anniversary',
          name: 'Amelia Edwards',
        },
        {
          imgProfile: '',
          message: 'Marriage Anniversary',
          name: 'Ava Gregoraci',
        },

        {
          imgProfile: '',
          message: 'Marriage Anniversary',
          name: 'Carmen Beltrán',
        },

        {
          imgProfile: '',
          message: 'Marriage Anniversary',
          name: 'Mahnaz Farzin',
        },
        {
          imgProfile: '',
          message: 'Marriage Anniversary',
          name: 'Mahnaz Farzin',
        },
      ],
    };
  }
  render() {
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
                backgroundColor:'lightgrey',
                flexDirection: 'row',
                 marginBottom:5,
                alignItems: 'center',  
                borderRadius:12,
                marginHorizontal:20
              }}>
              <Image style={{marginHorizontal:10}}
                source={require('../../assets/searchWhite.png')}
               
              />
              <TextInput
                style={styles.inputSearch}
                placeholder={'Search'}
                placeholderTextColor={'#B2ABB1'}
                style={{fontFamily:FONT.Nunito.regular,fontSize:17,color:'#B2ABB1'}}
                // onChangeText={handleText}
              ></TextInput>
              
            </View>
          <FlatList
            data={this.state.messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('chat')}
                style={{
                  borderWidth: 1,
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
                      style={{height: 26, width: 28,marginLeft:5,resizeMode:'contain'}}
                      source={require('../../assets/newProfile.png')}
                    />
                  </View>
                 
                </View>
              </TouchableOpacity>
            )}
          />
             <TouchableOpacity style={styles.btnMap} onPress={()=>this.props.navigation.navigate("chat")}>
              <Text style={styles.btnText}>MESSAGE ALL 87 ATTENDEES</Text>
            </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}
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
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    width: wp('20%'),
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {},
  titleText: {
    color: BLACK.textInputTitle,
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
});
