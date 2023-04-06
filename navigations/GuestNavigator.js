import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn)

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
