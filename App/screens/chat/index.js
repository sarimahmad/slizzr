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
export default class chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
     
    };
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.contentView}>
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
            <Text style={styles.titleText}>Profile Name</Text>
           
          </View>
          <View style={{margin:20}}>
         <View style={{flexDirection:'row',alignItems: 'center',}}>
         <Image
                      style={{height: 50, width: 50}}
                      source={require('../../assets/profile1.png')}
                    />
         <View>
         <View style={styles.myMessages}>
         <Text style={{color:'white'}}>Hey! Anything you want, might be chilly so maybe a jacket.</Text>
         </View>
         <Text >02/17/2020 - 08:02 PM</Text>
         </View>
         </View>
         <View style={{flexDirection:'row',alignItems: 'center',}}>
        <View>
         <View style={styles.otherMessages}>
         <Text >What do you reccomend I bring to this event?</Text>
         </View>
         <Text style={{textAlign:'right'}}>02/17/2020 - 08:02 PM</Text>
       
         </View>
         <Image
                      style={{height: 50, width: 50}} 
                      source={require('../../assets/profile1.png')}
                    />
         </View>
         </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },
  myMessages:{
  backgroundColor:'#F818D9',
  borderTopRightRadius:12,
  borderBottomRightRadius:12,
  borderTopLeftRadius:12,
  height:60,
  marginVertical:10,
  alignItems: 'center',
  justifyContent: 'center',
  },
  otherMessages:{
      marginVertical:10,
    borderTopRightRadius:12,
    borderBottomLeftRadius:12,
    borderTopLeftRadius:12,
    backgroundColor:'lightgrey',
    height:60  ,
    
  alignItems: 'center',
  justifyContent: 'center',
},
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    height: 40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
