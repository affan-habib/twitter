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
        renderKeys={["id"]}
        additionalStyles={additionalStyles}
      />
    </View>
  );
};
const additionalStyles = StyleSheet.create({

});

export default Followers;
