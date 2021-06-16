

/*eslint-disable no-dupe-class-members */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 import React, {Component} from 'react';
 import {View, ActivityIndicator, BackHandler,Text, StatusBar} from 'react-native';
 import {Provider} from 'react-redux';

 import SwitchNavigator from './App/Navigation/HomeNavigation';
 import store from './App/redux/store';
 
 export default class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       isReady: true,
     };
   }
   componentWillUnmount() {
     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }
   handleBackButton() {
     return true;
   }
   async componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
     // eslint-disable-next-line react/no-did-mount-set-state
     this.setState({isReady: true});
   }
   render() {
     return this.state.isReady ? (
       <Provider store={store}>
         <View style={{flex: 1}}>
           <StatusBar hidden={true} />
        
           <SwitchNavigator />
         </View>
      </Provider>
     ) : (
       <View
         style={{
           backgroundColor: 'transparent',
           justifyContent: 'center',
           alignItems: 'center',
         }}>
         <ActivityIndicator size="large" color={'#000000'} />
       </View>
     );
   }
 }