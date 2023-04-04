import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TwitterSignupScreen from './screens/Signup';
import TwitterLoginScreen from './screens/Login';
import HomePage from './screens/HomePage';

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('jwtToken');
    setLoggedIn(token !== null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? (
          <Stack.Screen name="HomePage" component={HomePage} />
        ) : (
          <Stack.Screen name="TwitterLoginScreen" component={TwitterLoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
