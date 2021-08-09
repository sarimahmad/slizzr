import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { FONT, SCREEN } from '../../helper/Constant'
import { SafeAreaView } from 'react-navigation';
import { BLACK } from '../../helper/Color';
import { TextInput } from 'react-native';
var selectedUser = ['Dai J.'];
import Share from 'react-native-share';
export default class directInvites extends Component {
    constructor() {
        super();
        this.state = {
            data: [{ id: 1, name: 'Corabelle D.', pic: require('../../assets/Slizzer-icon/display.jpg') },
            { id: 2, name: 'Jube B.', pic: require('../../assets/Slizzer-icon/display.jpg') },
            { id: 3, name: 'Dai J.', pic: require('../../assets/Slizzer-icon/display.jpg') },
            { id: 4, name: 'Corabelle D.', pic: require('../../assets/Slizzer-icon/display.jpg') },
            { id: 5, name: 'Dai J. ', pic: require('../../assets/Slizzer-icon/display.jpg') },
            { id: 6, name: 'Jube B.', pic: require('../../assets/Slizzer-icon/display.jpg') },
            { id: 7, name: 'Corabelle D.', pic: require('../../assets/Slizzer-icon/display.jpg') },
            { id: 8, name: 'Jube B.', pic: require('../../assets/Slizzer-icon/display.jpg') },
            { id: 8, name: 'Dai J. ', pic: require('../../assets/Slizzer-icon/display.jpg') },]
        }
    }
    footer = () => {
        return (
            <View>
            <TouchableOpacity onPress={()=>this.directInvites()} style={styles.btn}>
                <Text style={styles.btntext}>DIRECT INVITES</Text>
            </TouchableOpacity>
            <Text style={styles.lastText}>More Invite Options</Text>
            </View>
        )
    }
    directInvites=()=>{
        Share.open(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });
    }
    render() {
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={styles.wrapperView}>
                    <TouchableOpacity style={styles.headerView}>
                        <Text style={styles.headerTxt}>Direct Invites</Text>

                        <TouchableOpacity  onPress={()=>this.props.navigation.goBack()} style={styles.closeBtn}>
                            <Image
                                source={require('../../assets/Slizzer-icon/close.png')} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={[styles.textInput,{backgroundColor: 'lightgrey', marginTop:18}]}>
                    <Image 
                    style={{position:'absolute',bottom:10,left:20,width:17.5, height: 17.5}}
                    source={require('../../assets/searchBlack.png')}/>
                    <TextInput
                    style={styles.textInput}
                    placeholder={"Search Slizzr Connections"}/>
                    </View>
                    <Text style={styles.text1}>Select people to directly invite to your event: EVENT NAME HERE.</Text>
                    <FlatList
                        numColumns={3}
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.blockView}>
                                <View style={[styles.blockView, { height: SCREEN.width / 3}]}>
                                    <Image
                                        style={styles.imageView}
                                        source={item.pic} />
                                    {selectedUser.includes(item.name) && <View style={[styles.imageView, { position: 'absolute', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0, 0.5)' }]}>
                                        <Image style={styles.imageView2} source={require('../../assets/Slizzer-icon/tickWhite.png')} />
                                    </View>}
                                </View>
                                <Text style={styles.textView}>{item.name}</Text>
                            </View>
                        )}
                        ListFooterComponent={this.footer}
                    />
                    
                </SafeAreaView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapperView: {
        flex: 1
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    headerTxt: {
        fontFamily: FONT.Nunito.bold,
        fontSize: 30,
        color: '#494949',
        marginLeft: 32
    },
    closeBtn: {
        backgroundColor: 'white',
        height: 35,
        width: 35,
        marginRight: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowOpacity: 0.4,
        shadowOffset: { height: 4 }
    },
    text1: {
        fontFamily: FONT.Nunito.regular,
        fontSize: 14,
        color: '#979797',
        marginHorizontal: 20,
        marginTop: 23,

    },
    blockView: {
        width: SCREEN.width / 3,
        alignItems: 'center',
        marginTop: 9,
    },
    textView: {
        fontFamily: FONT.Nunito.regular,
        fontSize: 17,
        color: BLACK.textColor,
    },
    imageView: {
        height: '90%',
        width: '90%',
        borderRadius: (SCREEN.width / 3) / 2,
    },
    imageView2: {
        width: '40%',
        height: '29%',
    },
    btn: {
        width: SCREEN.width - 40,
        height: 55,
        backgroundColor: BLACK.textColor3,
        borderRadius: 27.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32
    },
    btntext: {
        color: '#FFFFFF',
        fontFamily: FONT.Nunito.bold,
        fontSize: 14,
        letterSpacing: 0.7,
    },
    lastText: {
        textAlign: 'center',
        fontFamily: FONT.Nunito.regular,
        fontSize: 14,
        color: BLACK.textColor2,
        marginBottom: 31,
        textDecorationLine: 'underline',
        marginTop:31
    },
    textInput:{
        width:SCREEN.width-40,
        height: 36,
        borderRadius: 10,
        alignSelf:'center',
        paddingLeft: 33.5,
    }

})