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
import FlipImage from '../../component/FlipImage';
export default class eventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [{ id: 1, image: require('../../assets/Slizzer-icon/testImage.webp') },
      { id: 2, image: require('../../assets/Slizzer-icon/testImage.webp') },
      { id: 3, image: require('../../assets/Slizzer-icon/testImage.webp') },
      { id: 4, image: require('../../assets/Slizzer-icon/testImage.webp') },
      { id: 5, image: require('../../assets/Slizzer-icon/testImage.webp') },],
      detailItem:{},
      date:''
    }
  
  }
  componentDidMount(){
   
    let detailItem = this.props.route.params.detailItem;
      
    this.setState({detailItem:detailItem})
    this.setState({date:detailItem.DateTime.toDate().toLocaleTimeString()})
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
                    rightIcon={require('../../assets/share.png')}
                    centerIcon={require('../../assets/slizerLogo.png')}
                
                />   
       
     
          <ScrollView bounces={false}>
          <View style={{marginTop:20,alignSelf:'center', alignItems:'center' ,width:SCREEN.width}}>
                <FlipImage
          imageUrl={this.state.detailItem.imageUrl}
          Name={this.state.detailItem.Name}
          Description={this.state.detailItem.Description}
          Address={this.state.detailItem.Address}
        />
       
          </View>
          <View style={{width:SCREEN.width - 40,alignSelf:'center'}}>
          <View style={styles.flex}>
          <Text style={[styles.titleText]}>{this.state.detailItem.Name}</Text>
          {this.state.detailItem.EventType!=="SCAN" &&
          <Text style={[styles.purpleText]}>{this.state.detailItem.EventType}</Text>
  }
          {this.state.detailItem.EventType==="SCAN" &&
          <Text style={[styles.purpleText]}>      SCAN-&-PAY AT DOOR
          </Text>
    }
          </View>
          <View style={[styles.flexRow,{paddingTop:8}]}>
          <Text style={[styles.titleText,{fontSize:12,fontFamily:FONT.Nunito.regular}]}>Host: </Text>
          <Text style={[styles.purpleText,{textDecorationLine:'underline',fontFamily:FONT.Nunito.regular,paddingLeft:4}]}>Holly Smith</Text>
          </View>
          <Text style={{fontFamily:FONT.Nunito.bold, fontSize: 12, color: BLACK.textColor3, marginTop:3}}>{this.state.date}</Text>
        <View style={[styles.flexRow,{justifyContent:'space-between'}]}>
          <View style={[styles.flexRow,{paddingTop: 5}]}>
            <Image style={{width:12, height: 16, marginRight: 5}} source={require('../../assets/location.png')}/>
            <Text style={{fontFamily: FONT.Nunito.semiBold, fontSize: 12, color: BLACK.grey}}>15 KM away</Text>
          </View>
          <Text style={{fontFamily:FONT.Nunito.bold, fontSize: 17, color: BLACK.textColor2}}>$15</Text>
          </View>
          <Text style={[styles.titleText,{marginTop:9}]}>Mututal Attendes</Text>
          <View style={{ height: 50, width: SCREEN.width, marginTop: 11, }}>
                                <FlatList
                                    data={this.state.image}
                                    horizontal
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.listView}>
                                            <Image style={styles.ImageView} source={item.image} />
                                        </View>
                                    )}
                                />
                            </View>
                            <Text style={[styles.purpleText,{marginTop:9, textDecorationLine:'underline',}]}>See more</Text>
         </View>
         
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("prepay")} style={styles.btnMap}>
              <Text style={styles.btnText}>ATTEND</Text>
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
      backgroundColor:WHITE.dark
    },
    btnTextLocation: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      fontFamily: FONT.Nunito.regular,
  
    },
    listView: {
      marginRight: 11,
  },

    ImageView: {
      width: 50,
      height: 50,
      borderRadius: 25,

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
        marginVertical:30,
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
    contentView: {
      flex: 1,
      backgroundColor:WHITE.dark
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
      color: BLACK.grey,
      fontFamily: FONT.Nunito.bold,
      fontSize: 17,
      
    },
    purpleText: {
      fontSize: 12,
      color: BLACK.textColor2,
      fontFamily: FONT.Nunito.bold,
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
  