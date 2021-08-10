/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, ActivityIndicator, BackHandler, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';

import SwitchNavigator from './App/Navigation/HomeNavigation';
import store from './App/redux/store';
import {
  STRIPE_PUBLISHABLE_KEY,
  APPLE_MERCHANT_IDENTIFIER,
} from './App/helper/Env';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: true,
      token: '',
      setMessages: false,
      fcmRegistered: false,
      registerToken: '',
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
          <StripeProvider
            publishableKey={STRIPE_PUBLISHABLE_KEY}
            merchantIdentifier={APPLE_MERCHANT_IDENTIFIER} // required for Apple Pay
          ></StripeProvider>
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
