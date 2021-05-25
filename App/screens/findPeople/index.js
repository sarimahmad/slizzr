import React, {Component} from 'react';
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
} from 'react-native';
import {BLACK, BLUE, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class findPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
        findpeople: [
        {
          imgProfile:'',  
          profileName: 'Marriage Anniversary',
          adress: 'Host: Tallah Cotton',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
        {
            imgProfile:'',
          profileName: 'Celebration Time',
          adress: 'Host: Jaclynn Bradley',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
        {
            imgProfile:'',
          profileName: 'Sagar’s Birthday',
          adress: 'Host: Kita Chihoko',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
        {
            imgProfile:'',
          profileName: 'GMU Party',
          adress: 'Host: Jaclynn Bradley',
          date: '11:30 PM | Feb 25, 2020 - WED',
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
          <View
            style={[
              styles.flex,
              {
                padding: 10,
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
              },
            ]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                source={require('../../assets/drawer.png')}
                style={styles.logo}
              />
            </TouchableOpacity>

            <Image
              source={require('../../assets/homeLogo.png')}
              style={styles.logo}
            />
            <View
              style={[
                styles.logo,
                {
                  elevation: 6,
                  marginRight: 5,
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 24,
                },
              ]}>
              <Image source={require('../../assets/searchGrey.png')} />
            </View>
          </View>
       
          <FlatList
          
            data={this.state.findpeople}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={{borderBottomWidth:1,borderBottomColor:'lightgrey'}}>
              <View style={styles.flexRow}>
                <View style={styles.imgView}>
                  <Image source={require('../../assets/profile1.png')} />
                  <Image
                    style={{position: 'absolute', right: 15}}
                    source={require('../../assets/private.png')}
                  />
                </View>
                <View style={styles.detail}>
                  <Text style={styles.titleText}>{item.profileName}</Text>
                  <Text style={styles.subtitleText}>{item.adress}</Text>
                  <Text style={styles.purpleText}>{item.date}</Text>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("peopleProfiles")} style={styles.next}>
                  <Image source={require('../../assets/listDetail.png')} />
                </TouchableOpacity>
              </View>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topView: {
    height: hp('35%'),
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
    width: wp('25%'),
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
  btnLocation: {
    width: wp('80%'),
    marginHorizontal: '10%',
    borderRadius: 25,
    marginTop: hp('5%'),
    height: 50,
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.1,
    elevation: 1,
    justifyContent: 'center',

    borderWidth: 1,
    borderRadius: 24,
    borderColor: BLACK.light,
    bottom: 10,
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
  bottomView: {
    position: 'absolute',

    bottom: 0,
    paddingBottom: 10,
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
    color: 'black',
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
  contentView: {
   flex:1
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
  },
  purpleText: {
    fontSize: 12,
    color: '#F818D9',

    fontFamily: FONT.Nunito.semiBold,
  },
  detailWrapper: {
    alignSelf: 'center',
  },
  wrapperView: {
   
    flex: 1,
  },
  policyText: {
    alignSelf: 'center',
    marginTop: '2%',
    color: BLACK.appDark,
    fontFamily: FONT.Nunito.regular,
  },
});
