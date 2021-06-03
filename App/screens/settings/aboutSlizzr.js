import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FONT, SCREEN } from '../../helper/Constant'
import Header from '../../component/Header';


export default class about extends Component {
    render() {
        return (
            <View style={styles.wrapperView}>
                <Header
                    headerTitle={'About Slizzr'}
                    navigation={this.props.navigation}
                    route={'SettingsNavigation'}
                />
                <View style={styles.textView2}>
                    <Text style={styles.text}>
                        Tousled food truck polaroid, salvia bespoke small batch Pinterest Marfa. Fingerstache authentic craft beer, food truck Banksy Carles kale chips hoodie. Trust fund artisan master cleanse fingerstache post-ironic, fashion axe art party Etsy direct trade retro organic. Cliche Shoreditch Odd Future Pinterest, pug disrupt photo booth VHS literally occupy gluten-free polaroid Intelligentsia PBR mustache. Locavore fashion axe chia, iPhone cardigan disrupt Etsy dreamcatcher. Craft beer selvage fanny pack, 8-bit post-ironic keffiyeh iPhone mlkshk pop-up. Pug blog asymmetrical ethnic, stumptown shabby chic chillwave ugh before they sold out.
                </Text>
                </View>


            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapperView: {
        flex: 1,
        marginTop: 20
    },
    textView2: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        marginTop: 42,
        fontFamily: FONT.Nunito.regular,
        fontSize: 17,
        color: '#494949',
        marginLeft: 22,
        marginRight: 18,
        lineHeight: 30
    },


})