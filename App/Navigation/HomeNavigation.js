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
import Scan from '../screens/scan';
import event from '../screens/payments&Payouts/event';
import index from '../screens/directInvites';
import zickets from '../screens/zickets';
import Zickets from '../screens/zickets';
import scan from '../screens/scan';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="drawer" component={DrawerContent} />
      <Stack.Screen name="Home" component={home} />
      <Stack.Screen name="createEvent" component={CreateEvent} />
      <Stack.Screen name="peopleProfiles" component={PeopleProfiles} />
      <Stack.Screen name="lookFriends" component={lookFriends} />
      <Stack.Screen name="eventDetail" component={eventDetail} />
      <Stack.Screen name="eventDetail2" component={eventDetail2} />
      <Stack.Screen name="prepay" component={prepay} />
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
      <Stack.Screen name="manageEvent" component={manageEvents} />
      <Stack.Screen name="attendingEventInfo" component={attendingEventInfo} />
      <Stack.Screen name="myEventInfo" component={myEventInfo} />
      <Stack.Screen name="attendeesList" component={attendeesList} />
      <Stack.Screen name="sharedHosts" component={sharedHosts} />
      <Stack.Screen name="sharedHostRequests" component={sharedHostRequests} />
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
        name="Find People"
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
        component={Zickets}
      />
      <Drawer.Screen
        name="Notifications"
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/notification.png')} />
          ),
        }}
        component={HomeNavigation}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          title: 'Settings',
          drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/settings.png')} />
          ),
        }}
        component={HomeNavigation}
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
      <Stack.Screen name="messages" component={messages} />
      <Stack.Screen name="messagesEvent" component={messagesEvent} />
      <Stack.Screen name="newMessage" component={newMessage} />
      <Stack.Screen name="chat" component={chat} />
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
      <Stack.Screen name="Intro" component={introduction} />
      <Stack.Screen name="Signin" component={signIn} />
      <Stack.Screen name="Signup" component={signUp} />
      <Stack.Screen name="ResetPass" component={resetPassword} />
      <Stack.Screen name="PassConfirm" component={resetPasswordForm} />
      <Stack.Screen name="BirthDate" component={birthDate} />
      <Stack.Screen name="ConfirmEmail" component={confirmEmail} />
      <Stack.Screen name="index" component={index} />
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
        <Stack.Screen name="Splash" component={splash} />
        <Stack.Screen name="index" component={index} />

        <Stack.Screen name="HomeStack" component={DrawerContent} />
        <Stack.Screen name="AccountStack" component={AccountNavigation} />
        <Stack.Screen name="Scan" component={scan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
