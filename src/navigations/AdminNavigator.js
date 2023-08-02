import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "expo-vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import Home from "../screens/Home";
import { AuthContext } from "../context/AuthContext";
// import CustomHeader from "../components/CustomHeader";

const Tab = createBottomTabNavigator();

export default function AdminNavigator() {
  const { logout } = useContext(AuthContext);
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#1DA1F2",
        inactiveTintColor: "#AAB8C2",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          headerTitle: "Home",
          headerStyle: styles.header,
          headerRight: () => (
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <AntDesign name="logout" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
          headerTitle: "Explore",
          headerStyle: styles.header,
          headerRight: () => (
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <AntDesign name="logout" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F5EBEB",
  },
  logoutButton: {
    marginRight: 15,
  },
});
