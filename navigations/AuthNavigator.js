import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Home from "../screens/Home";
import UsersList from "../screens/Users";
import Login from "../screens/Login";
import Profile from "../screens/Profile";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        let iconName;

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Search") {
          iconName = "search";
        } else if (route.name === "Notifications") {
          iconName = "bell";
        } else if (route.name === "Profile") {
          iconName = "user";
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center", paddingVertical: 12 }}
          >
            <Feather
              name={iconName}
              size={24}
              color={isFocused ? "#1DA1F2" : "#AAB8C2"}
            />
            <Text
              style={{ color: isFocused ? "#1DA1F2" : "#AAB8C2", marginTop: 8 }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function AuthNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={UsersList} />
      <Tab.Screen name="Notifications" component={UsersList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
