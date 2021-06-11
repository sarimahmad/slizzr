



import React, {useEffect} from 'react';
import {View,Image,StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';

import {FONT, SCREEN} from '../../helper/Constant';
import {BLACK, BLUE, WHITE} from '../../helper/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
const splash = (props) => {
  useEffect(() => {
    checkUSer();
  });

  const checkUSer = async () => {
    const userDetail = await AsyncStorage.getItem('userdetail');
    const TOKEN = await AsyncStorage.getItem('token');
   
    setTimeout(async () => {
      
      if (userDetail) {
        
        props.navigation.navigate('HomeStack');
        props.callApi(JSON.parse(userDetail.user),JSON.parse(TOKEN))
      }else if (!userDetail) {
        props.navigation.navigate('AccountStack');
      }
    }, 100);
  };
  return    <View style={styles.container} >
   <Image source={require('../../assets/logo.png')} style={styles.logo} />
</View>

};
const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 70,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE.dark,
  },
});

const mapStateToProps = (state, ownProps) => {
 
  return {  
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   
 
    callApi: (user,uid) => dispatch(userActions.alterUser({user,uid})),
   
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(splash);
