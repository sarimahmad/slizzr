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

import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
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
        <HeaderWithOptionBtn
                    
                    borderBottom={true}
                    backColor={WHITE.dark}
                    leftPress={() => this.props.navigation.goBack()}
                    leftIcon={require('../../assets/back.png')}
                    rightPress={() =>this.props.navigation.navigate("newMessage")}
                    rightIcon={require('../../assets/newMesssage.png')}
                    headerTitle={'Messages'}
                   
                />   
        
            <FlatList
              data={this.state.messages}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('chat')}>
             
               <View style={styles.flexRow}>
                 <View style={{flexDirection:"row", alignItems:"center"}}>
                    <View style={styles.imgView}>
                      <Image style={{height:50,width:50}} source={require('../../assets/profile1.png')} />
                    </View>
                    <View style={styles.detail}>
                      <Text style={[styles.titleText,{fontFamily:FONT.Nunito.semiBold}]}>{item.message}</Text>
                      <Text style={{color:'#B2ABB1',fontSize:12}}>{item.adress}</Text>
                    </View>
                    </View>
                    <View style={{height:23,width:23,borderRadius:24,justifyContent: 'center',alignItems: 'center',backgroundColor:'#F818D9',marginRight:9}}>
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

  flexRow: {
    width:SCREEN.width - 40,

    flexDirection: 'row',
    paddingVertical: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },

  next: {
    paddingTop: 15,
  },
  detail: {
    width: wp('60%'),
  },
  imgView: {

    width: 50,
    height:50, 
    borderRadius:25,
    marginRight: 20
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
