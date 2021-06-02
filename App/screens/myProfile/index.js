import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity,ScrollView } from 'react-native'
import { FONT,  SCREEN } from '../../helper/Constant'
import { SafeAreaView } from 'react-navigation';
import { BLACK,WHITE } from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithLogo';



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
    render() {
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={styles.wrapperView}>
                    
                    <HeaderWithOptionBtn
                        leftIcon={require('../../assets/back.png')}
                        leftPress={() => alert('ok')}
                        borderBottom={true}
                        rightIcon={require('../../assets/Slizzer-icon/group.png')}
                    />
                    <ScrollView style={styles.wrapperView}  bounces={true}>
                    <View style={styles.wrapperView2}>
                        <View style={styles.imageBlock}>
                            <Image
                            style={{width:400, height: 180, alignSelf:'center',marginTop:30,backgroundColor:WHITE.dark}}
                            source={require('../../assets/Slizzer-icon/image3.png')}/>
                          
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
                            Dwayne Johnson
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
                            <Text style={[styles.titleText, { marginTop: 10, }]}>Mututal Attendes</Text>
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
        height: SCREEN.height / 3 - 90,
        width: 100,
 
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
        color: BLACK.textColor4,
        letterSpacing: 0.7,
        marginTop: 40,
        textDecorationLine: 'underline'
    }
})
