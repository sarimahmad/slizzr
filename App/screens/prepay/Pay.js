/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {ProviderPaymentsForCustomer} from '../../helper/Api';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';

const Pay = props => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState({});

  const fetchPaymentSheetParams = async () => {
    const fee = props.route.params.fee;
    await ProviderPaymentsForCustomer({
      cust_id: props.userDetail.STRIPE_CUST_ID,
      amount: "40",
    }).then(response => {

      setSecret(response.data)
      return {
        paymentIntent: response.data.paymentIntent,
        ephemeralKey: response.data.ephemeralKey,
        customer: response.data.customer,
      };
    });
  };

  const initializePaymentSheet = async () => {
    // const {paymentIntent, ephemeralKey, customer} = 
    await ProviderPaymentsForCustomer({
      cust_id: props.userDetail.STRIPE_CUST_ID,
      amount: "40",
    }).then(async response => {
       setSecret(response.data)
      const {error} = await initPaymentSheet({
        googlePay: true,
        customerId: response.data.customer,
        customerEphemeralKeySecret: response.data.ephemeralKey,
        paymentIntentClientSecret: response.data.paymentIntent,
      });
      if (!error) {
        setLoading(true);
      }
    });
    
  };

  const openPaymentSheet = async () => {
    console.log("function")
    const {error} = await presentPaymentSheet({clientSecret: secret.paymentIntent});

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{height: 40, paddingHorizontal: 20}}
        onPress={openPaymentSheet}>
        <Text>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, uid) => dispatch(userActions.alterUser({user, uid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pay);
