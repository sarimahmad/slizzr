// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import signIn from '../screens/signIn';
// import resetPassword from '../screens/resetPassword';
// import resetPasswordForm from '../screens/resetPasswordForm';
// import SignUp from '../screens/signup';

// const Stack = createStackNavigator();

// export const MainNavigation = () => {
//   return (
//     <NavigationContainer >
//       <Stack.Navigator initialRouteName="Signin" screenOptions={{
//         headerShown: false
//       }}>
//         <Stack.Screen name="Signin" component={signIn}></Stack.Screen>
//         <Stack.Screen name="Signup" component={SignUp}></Stack.Screen>
//         <Stack.Screen name="ResetPass" component={resetPassword}></Stack.Screen>
//         <Stack.Screen name="passConfirm" component={resetPasswordForm}></Stack.Screen>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
