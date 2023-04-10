import React from "react";
import { View } from "react-native";
import ApiFlatList from "../components/ApiFlatList";
import { StyleSheet } from "react-native";

const Followers = () => {
  return (
    <View style={{ flex: 1 }}>
      <ApiFlatList
        endpoint="followers"
        dataKey="followers"
        renderKeys={["username", "join_date"]}
        additionalStyles={additionalStyles}
      />
    </View>
  );
};
const additionalStyles = StyleSheet.create({
  join_date: {
    fontSize: 12,
    color: "green",
  },
});

export default Followers;
