/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image} from 'react-native';

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
import messagesEvent from '../screens/messagesEvent';
import newMessage from '../screens/newMessage';
import chat from '../screens/chat';
import manageEvents from '../screens/manageEvents';
import attendingEventInfo from '../screens/attendingEventInfo';
import myEventInfo from '../screens/myEventInfo';
import attendeesList from '../screens/attendeesList';
import sharedHosts from '../screens/sharedHosts';
import sharedHostRequests from '../screens/sharedHostRequests';
import eventDetail from '../screens/eventDetail';
import eventDetail2 from '../screens/eventDetail2';
import prepay from '../screens/prepay';
import event from '../screens/payments&Payouts/event';
import index from '../screens/directInvites';
import zickets from '../screens/zickets';
import scan from '../screens/scan';
import notification from '../screens/notification';
import Pay from '../screens/prepay/Pay';

import newPaymentMethods from '../screens/payments&Payouts/newPaymentMethods';
import paymentMethod from '../screens/payments&Payouts/paymentMethod';
import paymentsandPayouts from '../screens/payments&Payouts/paymentsandPayouts';
import paymentsandPayouts2 from '../screens/payments&Payouts/paymentsandPayouts2';
import paymentsandPayouts3 from '../screens/payments&Payouts/paymentsandPayouts3';
import payoutMethod from '../screens/payments&Payouts/payoutMethod';
import payouts from '../screens/payments&Payouts/payouts';

import BlockedUser from '../screens/settings/BlockedUser';
import aboutSlizzr from '../screens/settings/aboutSlizzr';
import contactUs from '../screens/settings/contactUs';
import help from '../screens/settings/help';
import settings from '../screens/settings/index';
import Profile from '../screens/myProfile';
import editProfle from '../screens/myProfile/editProfle';
import zicketDetail from '../screens/zicketDetail';
import mutualConnections from '../screens/mutualConnections';
import directInvites from '../screens/directInvites';
import NewpayoutMethod from '../screens/payments&Payouts/NewpayoutMethod';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="drawer" component={DrawerContent}></Stack.Screen>
      <Stack.Screen name="Home" component={home}></Stack.Screen>
    </Stack.Navigator>
  );
};
const SettingsNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Settings" component={settings}></Stack.Screen>
    </Stack.Navigator>
  );
};
const PaymentsNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="paymentsandPayouts"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="paymentsandPayouts"
        component={paymentsandPayouts}></Stack.Screen>
    </Stack.Navigator>
  );
};
const ManageEventNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="manageEvent" component={manageEvents}></Stack.Screen>
    </Stack.Navigator>
  );
};
function DrawerContent(props) {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerContentOptions={{
        itemStyle: {marginVertical: 5},
        activeTintColor: 'white',
        labelStyle: {
          color: 'black',
        },
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          title: 'Home',

          drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/home.png')} />
          ),
        }}
        component={HomeNavigation}
      />
      <Drawer.Screen
        name="FindPeople"
        options={{
          title: 'Find People',
          drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/search.png')} />
          ),
        }}
        component={FindPeople}
      />

      <Drawer.Screen
        name="Messages"
        options={{
          title: 'Messages',

          drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/message.png')} />
          ),
        }}
        component={messagesNavigation}
      />
      <Drawer.Screen
        name="Manage Events"
        options={{
          title: 'Manage Events',
          drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/events.png')} />
          ),
        }}
        component={ManageEventNavigation}
      />
      <Drawer.Screen
        name="Zickets"
        options={{
          title: 'Zickets',
          drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/zickets.png')} />
          ),
        }}
        component={zicketsNavigation}
      />
      <Drawer.Screen
        name="Notifications"
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/notification.png')} />
          ),
        }}
        component={notification}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          title: 'Settings',
          drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/settings.png')} />
          ),
        }}
        component={SettingsNavigation}
      />
    </Drawer.Navigator>
  );
}
function messagesNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="messages"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="messages" component={messages}></Stack.Screen>
    </Stack.Navigator>
  );
}
function zicketsNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Zickets"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Zickets" component={zickets}></Stack.Screen>
    </Stack.Navigator>
  );
}
function AccountNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Intro" component={introduction}></Stack.Screen>
      <Stack.Screen name="Signin" component={signIn}></Stack.Screen>
      <Stack.Screen name="Signup" component={signUp}></Stack.Screen>
      <Stack.Screen name="ResetPass" component={resetPassword}></Stack.Screen>
      <Stack.Screen
        name="PassConfirm"
        component={resetPasswordForm}></Stack.Screen>
      <Stack.Screen name="BirthDate" component={birthDate}></Stack.Screen>
      <Stack.Screen name="ConfirmEmail" component={confirmEmail}></Stack.Screen>
      <Stack.Screen name="index" component={index}></Stack.Screen>
    </Stack.Navigator>
  );
}

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={splash}></Stack.Screen>
        <Stack.Screen name="index" component={index}></Stack.Screen>
        <Stack.Screen name="Scan" component={scan}></Stack.Screen>
        <Stack.Screen name="Intro" component={introduction}></Stack.Screen>
        <Stack.Screen
          name="paymentsandPayouts3"
          component={paymentsandPayouts3}></Stack.Screen>
        <Stack.Screen
          name="Notifications"
          component={notification}></Stack.Screen>
        <Stack.Screen
          name="SettingsNavigation"
          component={SettingsNavigation}></Stack.Screen>
        <Stack.Screen name="myProfile" component={Profile}></Stack.Screen>

        <Stack.Screen name="HomeStack" component={DrawerContent}></Stack.Screen>

        <Stack.Screen
          name="directInvites"
          component={directInvites}></Stack.Screen>

        <Stack.Screen
          name="zicketDetail"
          component={zicketDetail}></Stack.Screen>
        <Stack.Screen
          name="AccountStack"
          component={AccountNavigation}></Stack.Screen>
        <Stack.Screen
          name="BirthDateSplash"
          component={birthDate}></Stack.Screen>

        {/*  */}
        <Stack.Screen name="myEventInfo" component={myEventInfo}></Stack.Screen>
        <Stack.Screen name="sharedHosts" component={sharedHosts}></Stack.Screen>

        <Stack.Screen
          name="attendingEventInfo"
          component={attendingEventInfo}></Stack.Screen>
        <Stack.Screen
          name="attendeesList"
          component={attendeesList}></Stack.Screen>
        <Stack.Screen
          name="sharedHostRequests"
          component={sharedHostRequests}></Stack.Screen>

        {/*  */}
        <Stack.Screen name="createEvent" component={CreateEvent}></Stack.Screen>
        <Stack.Screen
          name="peopleProfiles"
          component={PeopleProfiles}></Stack.Screen>
        <Stack.Screen name="lookFriends" component={lookFriends}></Stack.Screen>
        <Stack.Screen name="eventDetail" component={eventDetail}></Stack.Screen>
        <Stack.Screen
          name="eventDetail2"
          component={eventDetail2}></Stack.Screen>
        <Stack.Screen name="prepay" component={prepay}></Stack.Screen>
        {/*  */}
        <Stack.Screen name="editProfle" component={editProfle}></Stack.Screen>
        <Stack.Screen
          name="mutualConnections"
          component={mutualConnections}></Stack.Screen>

        {/*  */}
        <Stack.Screen
          name="messagesEvent"
          component={messagesEvent}></Stack.Screen>
        <Stack.Screen name="newMessage" component={newMessage}></Stack.Screen>
        <Stack.Screen name="chat" component={chat}></Stack.Screen>
        {/*  */}
        <Stack.Screen name="event" component={event}></Stack.Screen>

        <Stack.Screen
          name="newPaymentMethods"
          component={newPaymentMethods}></Stack.Screen>
        <Stack.Screen
          name="paymentMethod"
          component={paymentMethod}></Stack.Screen>
        <Stack.Screen
          name="paymentsandPayouts2"
          component={paymentsandPayouts2}></Stack.Screen>

        <Stack.Screen name="payouts" component={payouts}></Stack.Screen>
        <Stack.Screen name="Pay" component={Pay}></Stack.Screen>
        <Stack.Screen
          name="payoutMethod"
          component={payoutMethod}></Stack.Screen>
        <Stack.Screen
          name="NewpayoutMethod"
          component={NewpayoutMethod}></Stack.Screen>
        {/*  */}
        <Stack.Screen
          name="paymentsandPayouts"
          component={PaymentsNavigation}></Stack.Screen>
        <Stack.Screen name="BlockedUser" component={BlockedUser}></Stack.Screen>
        <Stack.Screen name="aboutSlizzr" component={aboutSlizzr}></Stack.Screen>
        <Stack.Screen name="contactUs" component={contactUs}></Stack.Screen>
        <Stack.Screen name="help" component={help}></Stack.Screen>
        {/*  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
