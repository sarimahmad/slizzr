import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity,ScrollView } from 'react-native'
import { FONT,  SCREEN } from '../../helper/Constant'
import { SafeAreaView } from 'react-navigation';
import { BLACK,WHITE } from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class index extends Component {
    constructor() {
        super();
        this.state = {
            image: [{ id: 1, image: require('../../assets/Slizzer-icon/testImage.webp') },
            { id: 2, image: require('../../assets/Slizzer-icon/testImage.webp') },
            { id: 3, image: require('../../assets/Slizzer-icon/testImage.webp') },
            { id: 4, image: require('../../assets/Slizzer-icon/testImage.webp') },
            { id: 5, image: require('../../assets/Slizzer-icon/testImage.webp') },]
        }
    }
    footer = () => {
        return (
            <TouchableOpacity>
                <Text style={styles.purpleText}>See more</Text>
            </TouchableOpacity>
        )
    }
   async componentDidMount(){
    const userDetail = await AsyncStorage.getItem('userdetail');
    const TOKEN = await AsyncStorage.getItem('token');
   this.setState({userDetail:JSON.parse(userDetail)})
   console.log(this.state.userDetail.user)
   }
    render() {
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={styles.wrapperView}>
                    
                    <HeaderWithOptionBtn
                        leftIcon={require('../../assets/back.png')}
                        leftPress={() =>this.props.navigation.navigate("HomeStack")}
                        rightPress={() =>this.props.navigation.navigate("editProfle")}
                        
                        borderBottom={true}
                        rightIcon={require('../../assets/Slizzer-icon/group.png')}
                    />
                    <ScrollView style={styles.wrapperView}  bounces={true}>
                    <View style={styles.wrapperView2}>
                   
                        <View style={{width:SCREEN.width}}>
                       
                    <View style={{height:200,width:SCREEN.width}}>
                                 <Image
                            style={{position: 'absolute',left:0,height:140,width:140,borderRadius:50}}
                            source={require('../../assets/profileImage1.png')}/>
                            
                          <Image
                            style={{position: 'absolute',left:30,height:170,width:170,borderRadius:50}}
                            source={require('../../assets/profileImage2.png')}/>
                      
                           <Image
                            style={{position: 'absolute',right:0,height:140,width:140,borderRadius:50}}
                            source={require('../../assets/profileImage1.png')}/>
                            <Image
                            style={{position: 'absolute',right:30,height:170,width:170,borderRadius:50}}
                            source={require('../../assets/profileImage2.png')}/>
                        
                            
                           <Image
                            style={{position: 'absolute',alignSelf: 'center',height:200,width:200,borderRadius:50}}
                            source={require('../../assets/profileImage3.png')}/>
                          
                           </View>
                          
                  </View>
                        <View style={styles.messageIcon}>
                            <Image style={{ width: 51, width: 51, resizeMode: 'contain' }}
                                source={require('../../assets/Slizzer-icon/message.png')} />
                            <View style={{
                                height: 20,
                                width: 20,
                                position: 'absolute',
                            }}>
                                <Image source={require('../../assets/Slizzer-icon/insideMessage.png')} />
                            </View>
                        </View>
                        <Text style={styles.text1}>
                            {this.state.userDetail && this.state.userDetail.user.email}
                    </Text>
                        <Text style={styles.text2}>28 years,Male</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 5 }}>
                            <Image
                                style={{ marginRight: 5 }} source={require('../../assets/Slizzer-icon/location.png')} />
                            <Text style={styles.textView1}>Toronto, ON</Text>
                        </View>
                        <Text style={styles.text3}>BIO:</Text>
                        <Text style={styles.bio}>Tousled food truck polaroid, salvia bespoke small batch Pinterest Marfa. Fingerstache authentic craft beer, food truck Banksy Carles kale chips hoodie. Trust fund artisan master cleanse fingerstache post-ironic, fashion axe art party Etsy direct trade retro organic. Cliche Shoreditch Odd Future Pinterest, pug disrupt photo booth VHS literally occupy gluten-free polaroid Intelligentsia PBR mustache. Locavore fashion axe chia, iPhone cardigan disrupt Etsy dreamcatcher. Craft beer selvage fanny pack, 8-bit post-ironic keffiyeh iPhone mlkshk pop-up. Pug blog asymmetrical ethnic, stumptown shabby chic chillwave ugh before they sold out.</Text>
                        <View style={{ alignSelf: 'flex-start', marginLeft: 40, }}>
                            <Text style={[styles.titleText, { marginTop: 10, }]}>Mututal Connections</Text>
                            <View style={{ height: 50, width: SCREEN.width, marginTop: 11, }}>
                                <FlatList
                                    data={this.state.image}
                                    horizontal
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("mutualConnections")} style={styles.listView}>
                                            <Image style={styles.ImageView} source={item.image} />
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            {this.footer()}
                        </View>
                        <Text style={styles.blockUser}>BLOCK USER</Text>
                    </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapperView: {
        flex: 1,
        backgroundColor:WHITE.dark
    },
    wrapperView2: {
        flex: 1,
        alignItems: 'center'
    },
    imageBlock: {
        height: SCREEN.height*0.4,
        // width: 100,
 
    },
    messageIcon: {
        height: 51,
        width: 51,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 9,

    },
    text1: {
        fontFamily: FONT.Nunito.bold,
        fontSize: 17,
        color: BLACK.textColor,
        marginTop: 10
    },
    text2: {
        marginTop: 5,
        fontFamily: FONT.Nunito.bold,
        fontSize: 12,
        color: BLACK.textColor2
    }, text3: {
        fontFamily: FONT.Nunito.bold,
        fontSize: 17,
        color: BLACK.textColor,
        marginBottom: 5
    },
    bio: {
        fontFamily: FONT.Nunito.regular,
        fontSize: 12,
        color: BLACK.textColor,
        textAlign: 'center',
        width: SCREEN.width - 80
    },
    titleText: {
        color: BLACK.textInputTitle,
        fontFamily: FONT.Nunito.bold,
        fontSize: 17,

    },
    purpleText: {
        fontSize: 12,
        color: '#F818D9',
        textDecorationLine: 'underline',
        fontFamily: FONT.Nunito.semiBold,
        marginTop: 10
    },
    listView: {
        marginRight: 11,
    },
    ImageView: {
        width: 50,
        height: 50,
        borderRadius: 25,

    },
    blockUser: {
        fontFamily: FONT.Nunito.bold,
        fontSize: 14,
        color: '#FF2D55',
        letterSpacing: 0.7,
        marginTop: 40,
        marginBottom:10,
        textDecorationLine: 'underline'
    }
})
