import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import TwitterSignupScreen from './screens/Signup';
import TwitterLoginScreen from './screens/Login';

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('jwt_token');
    setLoggedIn(token !== null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? (
          <Stack.Screen name="Dashboard" component={TwitterSignupScreen} />
        ) : (
          <Stack.Screen name="Login" component={TwitterSignupScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
