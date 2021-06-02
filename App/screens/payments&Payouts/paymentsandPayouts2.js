import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import { FONT, SCREEN } from '../../helper/Constant'
import { SafeAreaView } from 'react-navigation';
import { BLACK, WHITE } from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';

export default class paymentsandPayouts2 extends Component {
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
                        style={{marginTop:30}}
                            source={require('../../assets/Slizzer-icon/shapeImage2.png')}
                        />
                    </View>
                    <Text style={styles.text1}>Host Payout Method Added</Text>
                    <Text style={styles.text2}>It generally takes less than ??? business days for a new payout method to be validated to accept payouts. You’ll get an email when your method is validated.  Payouts are released ???</Text>
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
        alignSelf: 'center'
    }, text2: {
        fontFamily: FONT.Nunito.regular,
        fontSize: 16,
        color: BLACK.textColor,
        marginTop: 4,
        width: SCREEN.width - 40,
        textAlign: 'center',
        alignSelf: "center"
    },
    btn: {
        width: SCREEN.width - 40,
        height: 55,
        backgroundColor: '#1E1E1E',
        borderRadius: 27.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 64
    },
    btntext: {
        color: '#FFFFFF',
        fontFamily: FONT.Nunito.bold,
        fontSize: 14,
        letterSpacing: 0.7,
    },
})