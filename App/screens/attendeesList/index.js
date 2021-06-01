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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class attendeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {

        attendingEvents:true,
        myevents:false,
        
    
        attendeesLIst: [
            {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },
              {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },  
      
              {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },  
      
              {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },  
              {
                imgProfile: '',
                attendee: 'Ava Gregoraci',
                count:3
              },  
      
        ]
      
    };

  }
  render() {
    return (
      <View style={styles.wrapperView}>
         <View
            style={[{padding: 20, alignItems: 'center', alignItems: 'center'}]}>
            <View style={{position: 'absolute', left: 20, top: 10}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../../assets/back.png')}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>Attendee List</Text>
           
          </View>
     
        <SafeAreaView style={styles.contentView}>
        <View
              style={styles.inputSearch}
              >
                 <Image style={{marginHorizontal:10,marginTop:10}}
                source={require('../../assets/searchWhite.png')}
               
              />
             
              <TextInput
                placeholder={'Try “western homecoming party”'}
                placeholderTextColor={'#8e8e93'}
                // onChangeText={handleText}
              ></TextInput>
              
            </View>
         
        
             <FlatList
              data={this.state.attendeesLIst}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("")}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                  }}>
                  <View style={styles.flexRow}>
                    <View style={styles.imgView}>
                      <Image style={{height:50,width:50}} source={require('../../assets/profile1.png')} />
                     
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.titleText}>{item.attendee}</Text>
                     
                    </View>
                    <View style={{height:30,width:80,borderRadius:24,justifyContent: 'center',alignItems: 'center',backgroundColor:'#F818D9',}}>
                       <Text style={{color:'white'}}>DISINVITE</Text>
                  </View>
                  </View>
                </TouchableOpacity> 
              )}
            /> 
        <TouchableOpacity style={styles.btnMap}>
              <Text style={styles.btnText}>Message all 100 attendees</Text>
            </TouchableOpacity>
     
        </SafeAreaView>
      </View>
    );
  }
}
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
    paddingLeft: 20,
    backgroundColor: 'lightgrey',

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
  }, btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,

  },
 btnTextLocation: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.Nunito.regular,

  },
  btnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT.Nunito.regular,
  },

  btnMap: {
        width: wp('90%'),
        marginHorizontal: '5%',
        borderRadius: 25,
        height: 50,
        marginBottom:20,
        position: 'absolute',
        bottom:0,
        backgroundColor: 'black',
        justifyContent: 'center'
      },
    
  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    borderRadius: 25,
    marginTop: hp('5%'),
    height: 50,
    elevation: 1,
    justifyContent:'center',
    backgroundColor:'black',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal:10,
    alignSelf: 'center',
    alignItems: 'center',
    
  },
  detail: {
    width: wp('50%'),
  },
  next: {
    paddingTop: 15,
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
    height: 36,
    height:40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
