import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { FONT, SCREEN } from '../../helper/Constant'
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { SafeAreaView } from 'react-navigation';
import { WHITE } from '../../helper/Color';


export default class newPaymentMethods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentMethod: [{ id: 1, name: 'Apple Pay' },
            { id: 2, name: 'Google Pay' },
            { id: 3, name: 'Credit Card' },],
        }
    }
    render() {
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={styles.wrapperView}>
                    <HeaderWithOptionBtn
                        headerTitle={"New Payment Method"}
                        leftIcon={require('../../assets/back.png')}
                        leftPress={() => this.props.navigation.navigate("paymentsandPayouts")}
                        borderBottom={true}
                        backColor={WHITE.dark}
                    />
                    <FlatList
                        data={this.state.paymentMethod}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.blockView}>
                                <Text style={styles.textView}>{item.name}</Text>
                                <Image
                                    style={styles.sideImage} source={require('../../assets/listDetail.png')} />
                            </TouchableOpacity>
                        )}
                    />
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
    blockView:{
        justifyContent:'space-between',
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        height: 80,
        alignItems: 'center',
    },
    textView:{
        fontFamily: FONT.Nunito.regular,
        fontSize: 17,
        color:'#494949',
        marginLeft: 20,
    },
    sideImage: {
        marginRight: 20
    },
})

