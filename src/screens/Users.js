import React from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";
import { StyleSheet } from "react-native";

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="users"
        dataKey="users"
        renderKeys={["username", "email", "join_date"]}
        additionalStyles={additionalStyles}
      />
    </View>
  );
};
const additionalStyles = StyleSheet.create({
  email: {
    fontSize: 13,
  },
  join_date: {
    color: "red",
  },
});
export default Home;
