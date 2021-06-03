import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {BLACK, BLUE, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class messagesEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {

        attendingEvents:true,
        myevents:false,
        
    
        messages: [
            {
                imgProfile: '',
                message: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                count:3
              },
              {
                imgProfile: '',
                message: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                count:3
              },  
      
              {
                imgProfile: '',
                message: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                count:3
              },  
      
              {
                imgProfile: '',
                message: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                count:3
              },  
              {
                imgProfile: '',
                message: 'Marriage Anniversary',
                adress: 'Host: Tallah Cotton',
                count:3
              },  
      
        ]
      
    };

  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <View style={[ {padding: 20, alignItems: 'center',alignItems: 'center',borderBottomColor:'lightgrey',borderBottomWidth:1}]}>
          <View style={{position: 'absolute',left:20,top:10}}>
           <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../../assets/back.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
            </View>
            <Text style={styles.titleText}>Messages</Text>
            <View style={{position: 'absolute',right:20,top:10}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("newMessage")}>
              <Image
                source={require('../../assets/newMesssage.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
            </View>
          </View>
      
        <SafeAreaView style={styles.contentView}>
         
        
            <FlatList
              data={this.state.messages}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('chat')}>
             
               <View style={styles.flexRow}>
                    <View style={styles.imgView}>
                      <Image style={{height:50,width:50}} source={require('../../assets/profile1.png')} />
                     
                    </View>
                    <View style={styles.detail}>
                      <Text style={[styles.titleText,{fontFamily:FONT.Nunito.semiBold}]}>{item.message}</Text>
                      <Text style={{color:'#B2ABB1',fontSize:12}}>{item.adress}</Text>
                
                    </View>
                    <View style={{height:23,width:23,borderRadius:24,justifyContent: 'center',alignItems: 'center',backgroundColor:'#F818D9',}}>
                       <Text style={[styles.titleText,{color:'white'}]}>{item.count}</Text>
                  </View>
                  </View>
                  <View style={{hiehgt:1,borderBottomWidth:1,borderBottomColor:'lightgrey',width:SCREEN.width}}></View>
          
                </TouchableOpacity> 
              )}
            />
       
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
    // width: wp('80%'),
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
    justifyContent: 'center',
    
  },
  detail: {
    width: wp('55%'),
  },
  next: {
    paddingTop: 15,
  },
  detail: {
    width: wp('60%'),
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
