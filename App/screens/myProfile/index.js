import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { FONT, SCREEN } from '../../helper/Constant'
import { SafeAreaView } from 'react-navigation';
import { BLACK } from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';

export default class index extends Component {
    render() {
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={styles.wrapperView}>
                <HeaderWithOptionBtn
                        headerTitle={"Payouts"}
                        borderBottom={true}
                        leftIcon={require('../../assets/back.png')}
                        leftPress={() => alert('ok')}/>

                </SafeAreaView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapperView: {
        flex: 1
    },
})
