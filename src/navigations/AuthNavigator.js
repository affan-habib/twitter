import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "expo-vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import Home from "../screens/Home";
import UsersList from "../screens/Users";
import Profile from "../screens/Profile";
import MyTweets from "../screens/MyTweets";
import { AuthContext } from "../context/AuthContext";
// import CustomHeader from "../components/CustomHeader";

const Tab = createBottomTabNavigator();

export default function AuthNavigator() {
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
              <AntDesign name="logout" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={UsersList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
          headerTitle: "Explore",
          headerStyle: styles.header,
          headerRight: () => (
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <AntDesign name="logout" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="My Tweets"
        component={MyTweets}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="retweet" size={24} color={color} />
          ),
          headerTitle: "My Tweets",
          headerStyle: styles.header,
          headerRight: () => (
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <AntDesign name="logout" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
          headerTitle: "Profile",
          headerStyle: styles.header,
          headerRight: () => (
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <AntDesign name="logout" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1DA1F2",
  },
  logoutButton: {
    marginRight: 15,
  },
});
