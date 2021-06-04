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
  
  import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
export default class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
        findpeople: [
            {
              imgProfile:'',  
              profileName: 'Marriage Anniversary',
              adress: '2 hours ago',
            
            },
            {
                imgProfile:'',
              profileName: 'Celebration Time',
              adress: '2 hours ago',
          
            },
            {
                imgProfile:'',
              profileName: 'Sagar’s Birthday',
              adress: '2 hours ago',
        
            },
            {
                imgProfile:'',
              profileName: 'GMU Party',
              adress: '2 hours ago',
         
            },
        ]
    };
  }

  render() {
    return (
        <View style={styles.wrapperView}>
<SafeAreaView  style={styles.contentView}>
     
    <HeaderWithOptionBtn    
                    backColor={WHITE.dark}
                    headerTitle={'Notification'}
                    leftPress={() => this.props.navigation.openDrawer()}
                    leftIcon={require('../../assets/drawer.png')}
                />   
       

      <FlatList
          data={this.state.findpeople}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View >
            <View style={styles.flexRow}>
              <View style={styles.imgView}>
                <Image source={require('../../assets/notification2.png')} />
              
              </View>
              <View style={styles.detail}>
                <Text style={[styles.subtitleText]}>{item.profileName}</Text>
                <Text style={styles.greyText}>{item.adress}</Text>
              
              </View>
             
            </View>
           <View style={{hiehgt:1,borderBottomWidth:1,borderBottomColor:'lightgrey',width:SCREEN.width}}></View>
            </View>
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
      imgView:{
        width:  SCREEN.width* 0.16,
      },
      detail:{


      },
      contentView: {
        flex: 1,
        backgroundColor: WHITE.dark,
      },
    greyText:{
        fontSize: 12,
        color:BLACK.lightgrey,
        fontFamily: FONT.Nunito.regular,
        
    },
     flexRow: {
       flexDirection: 'row',
       height:80,
       alignItems: 'center',
       
     },

  
     subtitleText: {
       fontSize: 12,
       color:BLACK.grey,
       fontFamily: FONT.Nunito.semiBold,
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
       marginTop:10,
       textDecorationLine:'underline',
       fontFamily: FONT.Nunito.semiBold,
     },
    
    
   });