

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import home from '../screens/home';

import splash from '../screens/splash';
import introduction from '../screens/introduction';
import signIn from '../screens/signIn';
import resetPassword from '../screens/resetPassword';
import resetPasswordForm from '../screens/resetPasswordForm';
import signUp from '../screens/signup';
import birthDate from '../screens/birthDate';
import confirmEmail from '../screens/confirmEmail';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerShown: false
    }}>
   <Stack.Screen name="drawer" component={DrawerNavigation}></Stack.Screen> 
   <Stack.Screen name="Home" component={home}></Stack.Screen>
    </Stack.Navigator> );
};
function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeNavigation} />
    <Drawer.Screen name="Find People" component={HomeNavigation} />
    <Drawer.Screen name="Messages" component={HomeNavigation} />
    
    <Drawer.Screen name="Manage Events" component={HomeNavigation} />
    <Drawer.Screen name="Zickets" component={HomeNavigation} />
    <Drawer.Screen name="Notifications" component={HomeNavigation} />
    <Drawer.Screen name="Settings" component={HomeNavigation} />
    
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
             </Stack.Navigator> );
}
export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AccountStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={splash}></Stack.Screen>

        <Stack.Screen
          name="HomeStack"
          component={DrawerNavigation}></Stack.Screen>
        <Stack.Screen
          name="AccountStack"
          component={AccountNavigation}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
