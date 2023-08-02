import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "expo-vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import Home from "../screens/Home";
import { AuthContext } from "../context/AuthContext";

const Tab = createBottomTabNavigator();

export default function UserNavigator() {
  const { logout } = useContext(AuthContext);

  const tabOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      switch (route.name) {
        case "Home":
          iconName = "home";
          break;
        case "Dashboard":
          iconName = "appstore-o";
          break;
        case "Notification":
          iconName = "bells";
          break;
        case "Profile":
          iconName = "user";
          break;
        default:
          iconName = "home";
      }

      return <AntDesign name={iconName} size={24} color={color} />;
    },
    headerTitle: route.name,
    headerStyle: styles.header,
    headerRight: () => (
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <AntDesign name="logout" size={24} color="#00D42A" />
      </TouchableOpacity>
    ),
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#00D42A",
        inactiveTintColor: "#AAB8C2",
      }}
    >
      <Tab.Screen name="Home" component={Home} options={tabOptions} />
      <Tab.Screen name="Dashboard" component={Home} options={tabOptions} />
      <Tab.Screen name="Notification" component={Home} options={tabOptions} />
      <Tab.Screen name="Profile" component={Home} options={tabOptions} />
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
