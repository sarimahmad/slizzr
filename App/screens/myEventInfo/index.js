import React, { Component } from 'react';
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
  import {width, height} from '../../helper/Constant';
  
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { getEventDetail } from '../../helper/Api';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
export default class myEventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailItem:{}
    };
  }
componentDidMount(){
  let id = this.props.route.params.id;
  if(id){
    this.getEventDetail(id)
  }
 
}
async getEventDetail(id) {
 
  await getEventDetail(id).then((response) => {
    this.setState({ detailItem: response.Event }) 
  });
  // const eventRef = firestore().collection('events');
  // eventRef
  //   .doc(id)
  //   .get()
  //   .then(firestoreDocument => {
  //     if (!firestoreDocument.exists) {
  //     } else {
  //       // this.setState({
  //       //   myEvent:
  //       //     firestoreDocument.data().Host.id === this.props.userDetail.id,
  //       // });
  //       this.setState({detailItem: firestoreDocument.data()});
        
        // this.setState({
        //   date: firestoreDocument
        //     .data()
        //     .DateTime.toDate()
        //     .toLocaleTimeString(),
        // });
//       }
//     });
// console.log(this.state.detailItem)
}
  
  render() {
    return (
        <View style={styles.wrapperView}>
      <HeaderWithOptionBtn
                    
                    borderBottom={true}
                    backColor={WHITE.dark}
                    headerTitle={'Event'}
                    leftPress={() => this.props.navigation.goBack()}
                    leftIcon={require('../../assets/back.png')}
                />   
       
        <SafeAreaView style={styles.contentView}>
          <ScrollView>
          <Image
                source={require('../../assets/eventInfo.png')}
                style={styles.logoEvent}
              />
          
          <View style={{alignSelf: 'center',}}>
          <Text style={[styles.titleText,{textAlign:'center'}]}>{this.state.detailItem.Name}</Text>
          <Text style={[styles.text,{textAlign:'center'}]}>{this.state.detailItem.EventType} | $5</Text>
          <Text style={[styles.purpleText,{textAlign:'center'}]}>{moment(this.state.detailItem.DateTime).format('hh:mm A | MMM DD, YYYY - ddd')}11:30 PM | Feb 25, 2020 - WED | 2 HRS</Text>
         
          <Text style={{textAlign:'center',marginVertical:5}}>
              <Text style={[styles.titleText,{fontSize:12}]}>Host:</Text>
              <Text style={styles.purpleText}>{this.state.detailItem.Host && this.state.detailItem.Host.displayName}  </Text>
          </Text>
          </View>
         <View style={{flexDirection:'row',backgroundColor:'rgba(178, 171, 177, 0.246039)',padding:20,margin:20,borderRadius:10}}>
         <Image
                source={require('../../assets/location.png')}
                style={styles.logoEvent}
              />
        
         <Text>{this.state.detailItem.Address}</Text>
            </View>
            <Text style={[styles.titleText,{textAlign:'center'}]}>Description:</Text>
            <Text style={[styles.text,{textAlign:'center',marginHorizontal:36,marginVertical:10}]}>{this.state.detailItem.Description}</Text>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("FindPeople")} style={styles.btnMap}>
              <Text style={styles.btnText}>Find PEOPLE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Scan")} style={styles.btnMap}>
              <Text style={styles.btnText}>ZICKET SCANNER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMap} onPress={()=>this.props.navigation.navigate("attendeesList",{id:this.state.detailItem.id})}>
              <Text style={styles.btnText}>ATTENDEES</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("sharedHosts")} style={styles.btnMap}>
              <Text style={styles.btnText}>SHARED HOSTS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("createEvent")} style={styles.btnMap}>
              <Text style={styles.btnText}>EDIT</Text>
            </TouchableOpacity>
          
            
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.btnTextCancel}>CANCEL EVENT</Text>
            </TouchableOpacity>
          
            </ScrollView>
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
      btnTextCancel: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        color: 'red',
        fontFamily: FONT.Nunito.regular,
      },
      cancelButton:{
        width: wp('90%'),
        marginHorizontal: '5%',
        borderRadius: 25,
        height: 50,
        marginBottom:20,
        borderWidth:1,
        borderColor:'black',
        justifyContent: 'center'
      
      },
    btnMap: {
        width: wp('90%'),
        marginHorizontal: '5%',
        borderRadius: 25,
        height: 50,
        marginBottom:20,
      
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
      paddingVertical: 10,
      paddingHorizontal:10,
      
    },
    detail: {
      width: wp('55%'),
    },
    next: {
      paddingTop: 15,
    },
    detail: {
      width: wp('55%'),
    },
    imgView: {
      width: wp('25%'),
    },
    shareView: {
  
      width: wp('20%'),
      justifyContent: 'center',
    },
    flex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text:{
   fontSize:12,
   color:'#494949'
    },
    logo: {
        },
    
    logoEvent: {
        width:width
    },
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
      fontFamily: FONT.Nunito.regular,
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
  