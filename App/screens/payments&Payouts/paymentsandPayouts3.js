import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import { FONT, SCREEN } from '../../helper/Constant'
import { SafeAreaView } from 'react-navigation';
import { BLACK, WHITE } from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';

export default class paymentsandPayouts3 extends Component {
    render() {
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={styles.wrapperView}>
                    <HeaderWithOptionBtn
                        leftIcon={require('../../assets/back.png')}
                        leftPress={() => alert('ok')}
                        headerTitle={"Payments & Payouts"}
                        backColor={WHITE.dark}
                        borderBottom={true}
                    />
                    <View style={styles.View1}>
                        <Image
                        style={{marginTop: 40}}
                            source={require('../../assets/Slizzer-icon/shapeImage.png')}
                        />
                    </View>
                    <Text style={styles.text1}>Thanks for Adding your Payment Method</Text>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btntext}>DONE</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapperView: {
        flex: 1,
        backgroundColor: WHITE.dark
    },
    View1: {
        width: SCREEN.width,
        height: 226,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text1: {
        fontFamily: FONT.Nunito.bold,
        fontSize: 24,
        color: BLACK.textColor,
        textAlign: 'center',
        width: SCREEN.width - 40,
        alignSelf: 'center',
    }, 
    btn: {
        width: SCREEN.width - 40,
        height: 55,
        backgroundColor: '#1E1E1E',
        borderRadius: 27.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    btntext: {
        color: '#FFFFFF',
        fontFamily: FONT.Nunito.bold,
        fontSize: 14,
        letterSpacing: 0.7,
    },
})