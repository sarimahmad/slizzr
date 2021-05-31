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
        <SafeAreaView style={styles.contentView}>
            <View style={[ {padding: 20, alignItems: 'center',alignItems: 'center',}]}>
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
      
        
            <FlatList
              data={this.state.messages}
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
                      <Text style={styles.titleText}>{item.message}</Text>
                      <Text style={{color:'#B2ABB1'}}>{item.adress}</Text>
                
                    </View>
                    <View style={{height:30,width:30,borderRadius:24,justifyContent: 'center',alignItems: 'center',backgroundColor:'#F818D9',}}>
                       <Text style={{color:'white'}}>{item.count}</Text>
                  </View>
                  </View>
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
    height:40,
    borderColor: 'lightgrey',
    paddingTop: 12,
    fontFamily: FONT.Nunito.regular,
    textAlign: 'center',
    alignItems: 'center',
  },
});
