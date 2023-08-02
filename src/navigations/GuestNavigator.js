import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import AuthNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

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
  const { isAuthenticated, role } = useContext(AuthContext);

  const renderNavigatorBasedOnRole = () => {
    if (isAuthenticated) {
      // Check the user's role and render the appropriate navigator
      switch (role) {
        case "2":
          return <AuthNavigator />;
        case "5":
          return <AdminNavigator />;
        default:
          // Add handling for other roles or unknown roles if needed
          return null;
      }
    } else {
      return <AuthStack />;
    }
  };

  return (
    <NavigationContainer>
      {renderNavigatorBasedOnRole()}
    </NavigationContainer>
  );
};

export default AppNavigator;
