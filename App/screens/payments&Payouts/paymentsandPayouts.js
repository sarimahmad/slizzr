import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { FONT} from '../../helper/Constant'
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import { SafeAreaView } from 'react-navigation';
import { WHITE } from '../../helper/Color';



export default class paymentsandPayouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PaymentsandPayouts: [{ id: 1, name: 'Payout method' },
            { id: 2, name: 'Payments Methods' },
            { id: 3, name: 'View Payouts' },
            { id: 4, name: 'Currency' },],
            selectedMethod: 4
        }
    }
    render() {
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={styles.wrapperView}>
                    <HeaderWithOptionBtn
                        headerTitle={'Payments and Payouts'}
                        borderBottom={true}
                        backColor={WHITE.dark}
                        leftPress={() => alert('ok')}
                        leftIcon={require('../../assets/back.png')}
                    />
                    <FlatList
                        data={this.state.PaymentsandPayouts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.blockView} onPress={() => this.props.navigation.navigate('paymentMethod')}>
                                <Text style={styles.textView}>{item.name}</Text>

                                {item.id !== this.state.selectedMethod ? <Image
                                    style={styles.imageView}
                                    source={require('../../assets/listDetail.png')} />:(
                                        <Text style={styles.text2}>CAD$</Text>
                                    )}
      
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
        backgroundColor: WHITE.dark,
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
    imageView:{
        marginRight: 20
    },
    text2:{
        fontFamily: FONT.Nunito.bold,
        fontSize: 17,
        color:'#F818D9',
        marginRight: 26,
        lineHeight:23

    }
})
