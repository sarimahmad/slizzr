import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { FONT, SCREEN } from '../../helper/Constant'
import { SafeAreaView } from 'react-navigation';
import { BLACK, WHITE } from '../../helper/Color';
import HeaderWithOptionBtn from '../../component/HeaderWithOptionBtn';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Textarea from 'react-native-textarea'

import AsyncStorage from '@react-native-async-storage/async-storage';

import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';

class editProfle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enableMap: false,
            date: new Date(),
            showDate: false,
            events: false,
            event: 'Female',
        }
    }

    showDatepicker = () => {
        this.setState({ showDate: true });
    };
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;

        this.setState({ date: currentDate });
        this.setState({ showDate: false });
    };
    showDatepicker = () => {
        this.setState({ showDate: true });
    };
    async componentDidMount(){
        const userDetail = await AsyncStorage.getItem('userdetail');
       this.setState({profileData:JSON.parse(userDetail.user)})
      console.log(this.state.userDetail)
    }

    render() {
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={styles.wrapperView}>
                    <HeaderWithOptionBtn
                       backColor={WHITE.dark}
                        borderBottom={true}
                        leftIcon={require('../../assets/back.png')}
                        leftPress={() => this.props.navigation.navigate("myProfile")}
                        headerTitle={"Edit Profile"}
                    />
                    <ScrollView style={styles.wrapperView} bounces={true}>
                        <View style={styles.blockView}>
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
                            <Image
                            style={{position: 'absolute',alignSelf: 'center',bottom:10,height:35,width:35,borderRadius:50}}
                            source={require('../../assets/edit.png')}/>
                           </View>
                           
                            <TextInput
                                value={"Zoya"}
                                style={styles.inputTextView}
                            />
                            <TextInput
                                value={"Rajput"}
                                style={styles.inputTextView}
                            />
                            <TextInput
                                value={"Rajput"}
                                style={styles.inputTextView}
                            />
                            {Platform.OS === 'android' ? (
                                <TouchableOpacity
                                    onPress={this.showDatepicker}
                                    style={styles.DataTimeWrapper}>
                                    <View style={styles.input}>
                                        <Text style={{ paddingTop: 15, paddingLeft: 20 }}>
                                            {this.state.date.toDateString()}
                                        </Text>
                                    </View>

                                    <View style={styles.logoAddCalenderView}>
                                        <Image
                                            source={require('../../assets/calendar-range.png')}/>
                                    </View>
                                    {this.state.showDate && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={this.state.date}
                                            mode={'date'}
                                            is24Hour={true}
                                            display="default"
                                            onChange={this.onChange}
                                        />
                                    )}

                                    <View />
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.DataTimeWrapper}>
                                    <DateTimePicker
                                        style={styles.DateTimeInnerIOS}
                                        testID="dateTimePicker"
                                        value={this.state.date}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        textColor="black"
                                        themeVariant="light"
                                        onChange={this.onChange}
                                    />
                                    <View style={styles.logoAddCalenderView}>
                                        <Image
                                            source={require('../../assets/calendar-range.png')}
                                        />
                                    </View>
                                </View>
                            )}
                            <RNPickerSelect
                                style={{
                                    inputIOS: {
                                        width: '90%',
                                        height: 53,
                                        borderWidth: 1,
                                        borderColor: 'lightgrey',
                                        borderRadius: 8,
                                        paddingLeft: 20,
                                        alignSelf: 'center'
                                    },
                                    inputAndroid: {
                                        width: '90%',
                                        height: 53,
                                        borderWidth: 1,
                                        borderColor: 'lightgrey',
                                        borderRadius: 8,
                                        marginTop: 8,
                                        paddingLeft: 20,
                                        alignSelf: 'center'
                                    },
                                }}
                                selectedValue={this.state.event}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ event: itemValue })
                                }
                                items={[
                                    { label: 'Female', value: 'Female' },
                                    { label: 'Male', value: 'Male' },
                                ]}
                            />
                            <TextInput
                                value={"Niagara Falls, ON"}
                                style={styles.inputTextView}
                            />
                        <Textarea
                        style={[styles.inputTextView,{height: 159}]}
                        placeholder="Message"
                        />
                         <TouchableOpacity style={styles.btn}>
                                <Text style={styles.btntext}>SAVE</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
 
    return {  
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
     
   
      callApi: (user,uid) => dispatch(userActions.alterUser({user,uid})),
     
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(editProfle);
  
const styles = StyleSheet.create({
    wrapperView: {
        flex: 1,
        backgroundColor: WHITE.dark
       
    },
    blockView: {
        
        marginTop: 30,
        // alignItems: 'center'

    },
    profileView: {
        height: 176,
        width: 50,
    },
    inputTextView: {
        shadowOpacity: 0.6,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        width: SCREEN.width - 40,
        height: 53,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        borderColor: 'lightgrey',
        fontSize: 16,
        fontFamily: FONT.Nunito.regular,
        marginTop: 20,
        alignSelf:'center'
    },
    DataTimeWrapper: {
        backgroundColor: WHITE.dark,
        height: 53,
        width: SCREEN.width - 40,
        alignSelf: 'center',
        borderWidth: 0.3,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: BLACK.shadow,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 2,
        marginVertical: 20,
    },
    input: {
        width: '100%',
        marginHorizontal: '5%',
        height: '100%',
    },
    logoAddCalenderView: {
        position: 'absolute',
        right: 0,
        width: 58,
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: BLACK.border,
    },
    DateTimeInnerIOS: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: BLACK.shadow,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 2,
        marginLeft:10
    },
    logoAddCalenderView: {
        position: 'absolute',
        right: 0,
        width: 58,
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: BLACK.border,
    },
    btn: {
        width: SCREEN.width - 40,
        height: 55,
        backgroundColor: 'black',
        borderRadius: 27.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    btntext: {
        color: '#FFFFFF',
        fontFamily: FONT.Nunito.bold,
        fontSize: 14,
        letterSpacing: 0.7,
        fontWeight: 'bold'
    }

})
