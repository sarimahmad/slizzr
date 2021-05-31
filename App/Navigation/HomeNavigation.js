

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import home from '../screens/home';

import splash from '../screens/splash';
import introduction from '../screens/introduction';
import signIn from '../screens/signIn';
import resetPassword from '../screens/resetPassword';
import resetPasswordForm from '../screens/resetPasswordForm';
import signUp from '../screens/signup';
import birthDate from '../screens/birthDate';
import confirmEmail from '../screens/confirmEmail';
import CustomSidebarMenu from './CustomSidebarMenu';
import CreateEvent from '../screens/createEvent';
import FindPeople from '../screens/findPeople';
import PeopleProfiles from '../screens/peopleProfiles';
import lookFriends from '../screens/lookFriends';
import messages from '../screens/messages';
import paymentMethod from '../screens/payments&Payouts/paymentMethod';
import paymentsandPayouts from '../screens/payments&Payouts/paymentsandPayouts';
import NewpayoutMethod from '../screens/payments&Payouts/NewpayoutMethod';
import payoutMethod from '../screens/payments&Payouts/payoutMethod';
import payouts from '../screens/payments&Payouts/payouts';
import event from '../screens/payments&Payouts/event';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerShown: false
    }}>
   <Stack.Screen name="drawer" component={DrawerContent}></Stack.Screen> 
   <Stack.Screen name="Home" component={home}></Stack.Screen>
   <Stack.Screen name="createEvent" component={CreateEvent}></Stack.Screen>
   <Stack.Screen name="peopleProfiles" component={PeopleProfiles}></Stack.Screen>
   <Stack.Screen name="lookFriends" component={lookFriends}></Stack.Screen>
  
    </Stack.Navigator> );
};
function DrawerContent(props) {
  return (

    <Drawer.Navigator
      drawerPosition="left"
      drawerContentOptions={{
        itemStyle: { marginVertical: 5 },
        activeTintColor: 'white',
        labelStyle: {
          color: 'black',
        },
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          title: 'Home',
          
          drawerIcon: ({ focused, size }) => (
            <Image source={require('../assets/home.png')}  />
     
        
          )
        }}
        component={HomeNavigation} />
      <Drawer.Screen
        name="Find People"
        options={{
          title: 'Find People',
          drawerIcon: ({ focused, size }) => (
            <Image source={require('../assets/search.png')}  />
     
        
          )
        }}
        component={FindPeople} />
       
        
         <Drawer.Screen
        name="Messages"
        options={{
          title: 'Messages',
          
          drawerIcon: ({ focused, size }) => (
            <Image source={require('../assets/message.png')}  />
     
        
          )
        }}
        component={messages} /> 
        <Drawer.Screen
        name="Manage Events"
        options={{
          title: 'Manage Events',
          drawerIcon: ({ focused, size }) => (
            <Image source={require('../assets/events.png')}  />
     
        
          )
        }}
        component={HomeNavigation} />
         <Drawer.Screen
        name="Zickets"
        options={{
          title: 'Zickets',
          drawerIcon: ({ focused, size }) => (
            <Image source={require('../assets/zickets.png')}  />
     
        
          )
        }}
        component={HomeNavigation} /> 
        <Drawer.Screen
        name="Notifications"
        options={{
          title: 'Notifications',
          drawerIcon: ({ focused, size }) => (
            <Image source={require('../assets/notification.png')}  />
     
        
          )
        }}
        component={HomeNavigation} /> 
        <Drawer.Screen
        name="Settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ focused, size }) => (
            <Image source={require('../assets/settings.png')}  />
     
        
          )
        }}
        component={HomeNavigation} />
      </Drawer.Navigator>

   
  )
}


function AccountNavigation() {
  return (
    <Stack.Navigator initialRouteName="Intro" screenOptions={{
               headerShown: false
             }}>
               <Stack.Screen name="Intro" component={introduction}></Stack.Screen>
               <Stack.Screen name="Signin" component={signIn}></Stack.Screen>
               <Stack.Screen name="Signup" component={signUp}></Stack.Screen>
               <Stack.Screen name="ResetPass" component={resetPassword}></Stack.Screen>
               <Stack.Screen name="PassConfirm" component={resetPasswordForm}></Stack.Screen>
               <Stack.Screen name="BirthDate" component={birthDate}></Stack.Screen>
               <Stack.Screen name="ConfirmEmail" component={confirmEmail}></Stack.Screen>
               <Stack.Screen name="paymentMethod" component={paymentMethod}></Stack.Screen>
               <Stack.Screen name="paymentsandPayouts" component={paymentsandPayouts}></Stack.Screen>
               <Stack.Screen name="NewpayoutMethod" component={NewpayoutMethod}></Stack.Screen>
               <Stack.Screen name="payoutMethod" component={payoutMethod}></Stack.Screen>
               <Stack.Screen name="payouts" component={payouts}></Stack.Screen>
               <Stack.Screen name="event" component={event}></Stack.Screen>

             </Stack.Navigator> 
             );
}
export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="event"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={splash}></Stack.Screen>
        <Stack.Screen name="event" component={event}></Stack.Screen>
        <Stack.Screen
          name="HomeStack"
          component={DrawerContent}></Stack.Screen>
        <Stack.Screen
          name="AccountStack"
          component={AccountNavigation}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;

