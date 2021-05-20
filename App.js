import React, {Component} from 'react';
 import {View, Text,  StatusBar} from 'react-native';
 import { MainNavigation } from './App/Navigation/HomeNavigation'
 import {Provider} from 'react-redux';
 import configureStore from './App/redux/store';
 const store = configureStore()
 export default class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
     };
   }
   render() {
     return (
           <Provider store={store}>
             <StatusBar hidden={true} />
             <MainNavigation></MainNavigation>
        </Provider>
     )}
 }